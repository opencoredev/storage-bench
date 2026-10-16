#!/usr/bin/env bash
# Runs several full passes from every client location, unattended.
#
#   scripts/campaign.sh <passes> <location>[:<first pass>]...
#
# Each location works through its passes on its own. The first-pass field lets a location resume after an
# interrupted campaign without repeating passes it already finished; a pass that is already running is picked
# up, not started again. A client only ever runs one benchmark process at a time, so runs never compete for
# its bandwidth.
set -uo pipefail
cd "$(dirname "$0")/.."

passes=${1:?passes}
shift
locations=("$@")
version=$(git rev-parse --short HEAD)
providers=aws-s3,r2,railway,b2,neon,bunny,appwrite,convex
mkdir -p logs/campaign

say() { echo "[$(date -u +%H:%M:%S)] $*" | tee -a logs/campaign/campaign.log; }

# Polls a run until it exits, or gives up after 5 hours.
wait_for() {
  local loc=$1 tag=$2 deadline=$((SECONDS + 5 * 3600)) last
  while [ $SECONDS -lt $deadline ]; do
    last=$(scripts/remote.sh "$loc" status "$tag" 2>/dev/null | tail -1)
    case $last in
      "EXIT 0") return 0 ;;
      EXIT*) say "$loc $tag failed: $last"; return 1 ;;
    esac
    sleep 60
  done
  say "$loc $tag timed out"
  return 1
}

run() {
  local loc=$1 tag=$2
  if scripts/remote.sh "$loc" status "$tag" 2>/dev/null | grep -qE '\] run |done|^EXIT'; then
    say "$loc resume $tag"
  else
    say "$loc start $tag ($providers)"
    scripts/remote.sh "$loc" start "$tag" --profile full --providers "$providers" --code-version "$version" >/dev/null 2>&1
  fi
  wait_for "$loc" "$tag" && say "$loc done $tag"
  scripts/remote.sh "$loc" pull >/dev/null 2>&1
}

worker() {
  local loc first
  IFS=: read -r loc first <<<"$1"
  for pass in $(seq "${first:-1}" "$passes"); do run "$loc" "p$pass-main"; done
  say "$loc finished all passes"
}

say "campaign $version: $passes passes from ${locations[*]}"
for loc in "${locations[@]}"; do worker "$loc" & done
wait
say "campaign complete"
