#!/usr/bin/env bash
# Push the benchmark to a client location, start a run there, check on it, or pull its results back.
#
#   scripts/remote.sh <location> push
#   scripts/remote.sh <location> start <tag> [bench.ts args...]
#   scripts/remote.sh <location> status <tag>
#   scripts/remote.sh <location> pull
#   scripts/remote.sh <location> clean
#
# Locations: ms-a2, railway-ashburn, railway-amsterdam, tenki-seattle, freestyle-sf, boat-lille.
# Results land in results/raw/ here; each run writes its own <runId>.jsonl and .meta.json.
set -euo pipefail
cd "$(dirname "$0")/.."

loc=${1:?location}
action=${2:?action}
shift 2

TENKI_SESSION=01a141b4-7331-794a-b7a9-00a7803df620
FREESTYLE_VM=vm-aa4625cf969f4e4297f86a09c32ab4e2
BOAT_BOX=bx_6276vfhv
LOCAL_DIR="$HOME/.cache/storage-bench-run"
FREESTYLE="$HOME/.bun/bin/freestyle"

# Railway's CLI prints config-as-code deprecation notes on every call; keep them out of piped data.
railway_quiet() {
  sed -E 's/warning: Config as Code.*$//' | grep -v -iE '^ *→ Migrate:|Existing files keep working|Using SSH key' || true
}

bundle() {
  tar czf /tmp/storage-bench.tgz package.json package-lock.json tsconfig.json src scripts/patch-upstash-blob.mjs
}

# Runs a shell snippet in the location's benchmark directory, with credentials loaded.
remote_sh() {
  local script=$1
  case $loc in
    ms-a2) (cd "$LOCAL_DIR" && set -a && . ./.env && set +a && bash -c "$script") ;;
    railway-ashburn) timeout 120 railway ssh -s runner -- "cd /app && $script" 2>&1 | railway_quiet ;;
    railway-amsterdam) timeout 120 railway ssh -s runner-ams -- "cd /app && $script" 2>&1 | railway_quiet ;;
    tenki-seattle) timeout 120 tenki sandbox exec --session "$TENKI_SESSION" -c "cd /home/tenki/bench && set -a && . ./.env && set +a && $script" 2>&1 | sed -e '/^status *:/,$d' -e '/^$/d' ;;
    freestyle-sf) timeout 120 "$FREESTYLE" vm exec "$FREESTYLE_VM" -- bash -c "cd /home/ubuntu/bench && set -a && . ./.env && set +a && $script" 2>&1 ;;
    boat-lille) timeout 120 boat ssh "$BOAT_BOX" -- "cd /home/user/bench && set -a && . ./.env && set +a && $script" 2>&1 ;;
    *) echo "unknown location $loc" >&2; exit 2 ;;
  esac
}

case $action in
  push)
    bundle
    case $loc in
      ms-a2)
        mkdir -p "$LOCAL_DIR" && rm -rf "$LOCAL_DIR/src" && tar xzf /tmp/storage-bench.tgz -C "$LOCAL_DIR"
        install -m 600 .env "$LOCAL_DIR/.env" && (cd "$LOCAL_DIR" && npm ci --no-audit --no-fund >/dev/null 2>&1)
        ;;
      railway-ashburn) timeout 900 railway up -s runner --ci 2>&1 | tail -1 ;;
      railway-amsterdam) timeout 900 railway up -s runner-ams --ci 2>&1 | tail -1 ;;
      tenki-seattle)
        base64 -w0 /tmp/storage-bench.tgz > /tmp/storage-bench.b64
        tenki sandbox write --session "$TENKI_SESSION" --path /home/tenki/bench.b64 --data-file /tmp/storage-bench.b64 >/dev/null
        tenki sandbox write --session "$TENKI_SESSION" --path /home/tenki/bench/.env --data-file .env >/dev/null
        timeout 300 tenki sandbox exec --session "$TENKI_SESSION" -c 'cd /home/tenki/bench && rm -rf src && base64 -d ../bench.b64 | tar xz && chmod 600 .env && npm ci --no-audit --no-fund >/dev/null 2>&1 && echo pushed' | head -1
        ;;
      freestyle-sf)
        "$FREESTYLE" vm exec "$FREESTYLE_VM" -- mkdir -p /home/ubuntu/bench >/dev/null
        "$FREESTYLE" vm scp /tmp/storage-bench.tgz "$FREESTYLE_VM:/home/ubuntu/storage-bench.tgz" >/dev/null
        "$FREESTYLE" vm scp .env "$FREESTYLE_VM:/home/ubuntu/bench/.env" >/dev/null
        # scp writes as root; hand everything to the user the benchmark runs as.
        "$FREESTYLE" vm exec "$FREESTYLE_VM" --linux-user root -- chown -R ubuntu:ubuntu /home/ubuntu >/dev/null
        timeout 300 "$FREESTYLE" vm exec "$FREESTYLE_VM" -- bash -c 'cd /home/ubuntu/bench && rm -rf src && tar xzf ../storage-bench.tgz && chmod 600 .env && npm ci --no-audit --no-fund >/dev/null 2>&1 && echo pushed'
        ;;
      boat-lille)
        boat ssh "$BOAT_BOX" -- mkdir -p /home/user/bench >/dev/null
        boat scp /tmp/storage-bench.tgz "$BOAT_BOX:/home/user/storage-bench.tgz" >/dev/null
        boat scp .env "$BOAT_BOX:/home/user/bench/.env" >/dev/null
        timeout 300 boat ssh "$BOAT_BOX" -- 'cd /home/user/bench && rm -rf src && tar xzf ../storage-bench.tgz && chmod 600 .env && npm ci --no-audit --no-fund >/dev/null 2>&1 && echo pushed'
        ;;
    esac
    ;;
  start)
    tag=${1:?tag}
    shift
    # Detached so the run outlives this connection. The tag names the log for status checks.
    # The final EXIT line is what campaign.sh waits for.
    # On ms-a2, systemd-run keeps the run alive when the agent session that started it ends; it starts
    # from a clean environment, so the run loads .env itself.
    run="node --experimental-strip-types src/bench.ts --client $loc --out results/raw $*; echo EXIT \$?"
    if [ "$loc" = ms-a2 ]; then
      remote_sh "mkdir -p results/raw logs && systemd-run --user --collect --quiet --same-dir --unit=storage-bench-$tag sh -c 'set -a; . ./.env; set +a; ($run) > logs/$tag.log 2>&1'; sleep 2; head -1 logs/$tag.log"
    else
      remote_sh "mkdir -p results/raw logs && (setsid nohup sh -c '$run' > logs/$tag.log 2>&1 &) ; sleep 2; head -1 logs/$tag.log"
    fi
    ;;
  status)
    tag=${1:?tag}
    remote_sh "grep -E '^\[.*\] run |done|^EXIT' logs/$tag.log | tail -1"
    ;;
  clean)
    # Only after a pull: deletes this location's copies of results and logs.
    remote_sh "rm -rf results/raw logs && echo cleaned"
    ;;
  pull)
    mkdir -p results/raw
    for f in $(remote_sh 'ls results/raw' | grep -E '\.(jsonl|meta\.json)$'); do
      # Download to a temp file and keep it only if every line is JSON, so a dropped connection or a CLI
      # error message can never overwrite a good copy.
      tmp="results/raw/.part-$f"
      case $loc in
        ms-a2) cp "$LOCAL_DIR/results/raw/$f" "$tmp" ;;
        railway-ashburn) timeout 300 railway ssh -s runner -- "cat /app/results/raw/$f" 2>&1 | railway_quiet > "$tmp" ;;
        railway-amsterdam) timeout 300 railway ssh -s runner-ams -- "cat /app/results/raw/$f" 2>&1 | railway_quiet > "$tmp" ;;
        tenki-seattle) tenki sandbox read --session "$TENKI_SESSION" --path "/home/tenki/bench/results/raw/$f" > "$tmp" ;;
        freestyle-sf) "$FREESTYLE" vm scp "$FREESTYLE_VM:/home/ubuntu/bench/results/raw/$f" "$tmp" >/dev/null ;;
        boat-lille) boat scp "$BOAT_BOX:/home/user/bench/results/raw/$f" "$tmp" >/dev/null ;;
      esac
      if node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8"); if (process.argv[1].endsWith(".jsonl")) t.split("\n").filter(l=>l.trim()).forEach(l=>JSON.parse(l)); else JSON.parse(t);' "$tmp" 2>/dev/null && [ -s "$tmp" ]; then
        mv "$tmp" "results/raw/$f"
        echo "pulled $f"
      else
        rm -f "$tmp"
        echo "skipped $f: download was not valid JSON" >&2
      fi
    done
    ;;
  *) echo "unknown action $action" >&2; exit 2 ;;
esac
