# Results

- **ms-a2** (Florida, AS7018 AT&T Enterprises, LLC), run 2026-10-16T16-36-58-049Z-ms-a2, Node v24.20.0, files-sdk 3.0.0
- **tenki-seattle** (Washington, AS19538 Luxor), run 2026-10-16T16-36-58-526Z-tenki-seattle, Node v24.14.0, files-sdk 3.0.0
- **freestyle-sf** (California, AS36320 Freestyle Cloud, Inc.), run 2026-10-16T16-37-00-507Z-freestyle-sf, Node v24.21.0, files-sdk 3.0.0
- **railway-ashburn** (Virginia, AS400940 Railway), run 2026-10-16T16-37-00-933Z-railway-ashburn, Node v24.21.0, files-sdk 3.0.0
- **railway-amsterdam** (North Holland, AS400940 Railway), run 2026-10-16T16-37-01-479Z-railway-amsterdam, Node v24.21.0, files-sdk 3.0.0
- **boat-lille** (Hauts-de-France, AS16276 OVH SAS), run 2026-10-16T16-37-02-383Z-boat-lille, Node v24.18.1, files-sdk 3.0.0
- **railway-ashburn** (Virginia, AS400940 Railway), run 2026-10-16T17-23-15-749Z-railway-ashburn, Node v24.21.0, files-sdk 3.0.0
- **ms-a2** (Florida, AS7018 AT&T Enterprises, LLC), run 2026-10-16T17-56-00-734Z-ms-a2, Node v24.20.0, files-sdk 3.0.0
- **tenki-seattle** (Washington, AS19538 Luxor), run 2026-10-16T18-03-46-528Z-tenki-seattle, Node v24.14.0, files-sdk 3.0.0
- **railway-ashburn** (Virginia, AS400940 Railway), run 2026-10-16T18-12-34-241Z-railway-ashburn, Node v24.21.0, files-sdk 3.0.0
- **railway-amsterdam** (North Holland, AS400940 Railway), run 2026-10-16T18-17-48-056Z-railway-amsterdam, Node v24.21.0, files-sdk 3.0.0
- **freestyle-sf** (), run 2026-10-16T18-23-43-982Z-freestyle-sf, Node v24.21.0, files-sdk 3.0.0
- **boat-lille** (Hauts-de-France, AS16276 OVH SAS), run 2026-10-16T18-42-22-063Z-boat-lille, Node v24.18.1, files-sdk 3.0.0
- **tenki-seattle** (Washington, AS19538 Luxor), run 2026-10-16T19-31-36-492Z-tenki-seattle, Node v24.14.0, files-sdk 3.0.0
- **ms-a2** (Florida, AS7018 AT&T Enterprises, LLC), run 2026-10-16T19-50-03-672Z-ms-a2, Node v24.20.0, files-sdk 3.0.0
- **boat-lille** (Hauts-de-France, AS16276 OVH SAS), run 2026-10-16T20-39-34-454Z-boat-lille, Node v24.18.1, files-sdk 3.0.0
- **freestyle-sf** (), run 2026-10-16T20-45-26-202Z-freestyle-sf, Node v24.21.0, files-sdk 3.0.0
- **railway-amsterdam** (North Holland, AS400940 Railway), run 2026-10-16T22-25-36-685Z-railway-amsterdam, Node v24.21.0, files-sdk 3.0.0
- Excluded samples from **tenki-seattle** between 2026-10-09T20:39:00.396Z and 2026-10-09T21:06:51.638Z: Tenki paused the sandbox twice when it hit its default maximum run time. Any sample whose request overlaps the pause is dropped. The sandbox was made sticky afterwards.
- Excluded samples from **boat-lille** between 2026-10-15T20:13:59.000Z and 2026-10-15T20:15:53.000Z: A campaign restart briefly started a second run on the same machine. The duplicate was stopped and its data deleted; samples from the surviving run during the overlap are dropped.
- Excluded samples from **freestyle-sf** between 2026-10-15T22:05:48.000Z and 2026-10-15T22:06:35.000Z: A campaign restart briefly started a second run on the same machine. The duplicate was stopped and its data deleted; samples from the surviving run during the overlap are dropped.
- Excluded samples from railway on every client between 2026-10-16T20:45:00.000Z and 2026-10-16T22:30:00.000Z: The Railway account running two of the test machines hit its monthly compute spending limit. Railway paused its deployments and also returned Access Denied for its bucket until the limit was raised, so Railway Buckets samples in this window measure the account limit, not the service.

## From ms-a2

| Provider | Op | Size | p50 | p95 | p99 | TTFB p50 | MB/s p50 | n | fail % |
|---|---|---|---|---|---|---|---|---|---|
| aws-s3 | burst-upload | 32x100KB | 238 ms | 359 ms | 414 ms | – | 13.8 | 30 | 0.0 |
| railway | burst-upload | 32x100KB | 246 ms | 560 ms | 678 ms | – | 13.3 | 30 | 0.0 |
| neon | burst-upload | 32x100KB | 304 ms | 1.54 s | 1.56 s | – | 10.8 | 30 | 0.0 |
| tigris | burst-upload | 32x100KB | 323 ms | 463 ms | 507 ms | – | 10.1 | 30 | 0.0 |
| r2 | burst-upload | 32x100KB | 509 ms | 729 ms | 795 ms | – | 6.4 | 30 | 0.0 |
| upstash | burst-upload | 32x100KB | 598 ms | 1.12 s | 1.25 s | – | 5.5 | 30 | 0.0 |
| convex | burst-upload | 32x100KB | 673 ms | 960 ms | 987 ms | – | 4.9 | 30 | 0.0 |
| appwrite | burst-upload | 32x100KB | 1.18 s | 2.47 s | 4.88 s | – | 2.8 | 30 | 0.0 |
| b2 | burst-upload | 32x100KB | 1.21 s | 4.39 s | 5.36 s | – | 2.7 | 30 | 10.0 |
| bunny | burst-upload | 32x100KB | 2.12 s | 5.45 s | 7.58 s | – | 1.5 | 30 | 0.0 |
| aws-s3 | concurrent-download | 16x100KB | 83 ms | 161 ms | 166 ms | – | 19.7 | 30 | 0.0 |
| tigris | concurrent-download | 16x100KB | 87 ms | 216 ms | 245 ms | – | 18.7 | 30 | 0.0 |
| neon | concurrent-download | 16x100KB | 135 ms | 287 ms | 1.06 s | – | 12.1 | 30 | 0.0 |
| b2 | concurrent-download | 16x100KB | 136 ms | 209 ms | 259 ms | – | 12.0 | 30 | 3.3 |
| railway | concurrent-download | 16x100KB | 209 ms | 456 ms | 506 ms | – | 7.8 | 30 | 0.0 |
| bunny | concurrent-download | 16x100KB | 224 ms | 499 ms | 793 ms | – | 7.3 | 30 | 0.0 |
| r2 | concurrent-download | 16x100KB | 257 ms | 476 ms | 515 ms | – | 6.4 | 30 | 0.0 |
| upstash | concurrent-download | 16x100KB | 261 ms | 510 ms | 577 ms | – | 6.3 | 30 | 0.0 |
| convex | concurrent-download | 16x100KB | 296 ms | 736 ms | 937 ms | – | 5.5 | 30 | 0.0 |
| appwrite | concurrent-download | 16x100KB | 395 ms | 532 ms | 571 ms | – | 4.1 | 30 | 0.0 |
| aws-s3 | concurrent-upload | 16x100KB | 218 ms | 339 ms | 353 ms | – | 7.5 | 30 | 0.0 |
| railway | concurrent-upload | 16x100KB | 219 ms | 552 ms | 597 ms | – | 7.5 | 30 | 0.0 |
| neon | concurrent-upload | 16x100KB | 257 ms | 983 ms | 1.53 s | – | 6.4 | 30 | 0.0 |
| tigris | concurrent-upload | 16x100KB | 285 ms | 419 ms | 557 ms | – | 5.8 | 30 | 0.0 |
| upstash | concurrent-upload | 16x100KB | 477 ms | 664 ms | 818 ms | – | 3.4 | 30 | 0.0 |
| r2 | concurrent-upload | 16x100KB | 534 ms | 735 ms | 787 ms | – | 3.1 | 30 | 0.0 |
| convex | concurrent-upload | 16x100KB | 572 ms | 1.03 s | 1.21 s | – | 2.9 | 30 | 0.0 |
| appwrite | concurrent-upload | 16x100KB | 830 ms | 1.70 s | 1.78 s | – | 2.0 | 30 | 0.0 |
| bunny | concurrent-upload | 16x100KB | 958 ms | 3.99 s | 4.73 s | – | 1.7 | 30 | 0.0 |
| b2 | concurrent-upload | 16x100KB | 1.08 s | 2.58 s | 5.07 s | – | 1.5 | 30 | 0.0 |
| aws-s3 | copy | 10MB | 181 ms | 227 ms | 271 ms | – | – | 60 | 0.0 |
| neon | copy | 10MB | 271 ms | 375 ms | 622 ms | – | – | 60 | 0.0 |
| railway | copy | 10MB | 304 ms | 423 ms | 475 ms | – | – | 54 | 0.0 |
| tigris | copy | 10MB | 314 ms | 460 ms | 533 ms | – | – | 60 | 1.7 |
| bunny | copy | 10MB | 553 ms | 1.13 s | 2.02 s | – | – | 60 | 0.0 |
| b2 | copy | 10MB | 728 ms | 1.62 s | 1.87 s | – | – | 59 | 0.0 |
| r2 | copy | 10MB | 1.09 s | 2.08 s | 2.39 s | – | – | 60 | 0.0 |
| upstash | copy | 10MB | 1.10 s | 1.69 s | 2.19 s | – | – | 60 | 0.0 |
| b2 | delete | 1KB | 37 ms | 66 ms | 128 ms | – | – | 177 | 0.0 |
| neon | delete | 1KB | 55 ms | 67 ms | 106 ms | – | – | 179 | 0.0 |
| railway | delete | 1KB | 57 ms | 84 ms | 117 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 1KB | 59 ms | 71 ms | 128 ms | – | – | 180 | 0.0 |
| convex | delete | 1KB | 64 ms | 148 ms | 282 ms | – | – | 180 | 0.0 |
| tigris | delete | 1KB | 72 ms | 131 ms | 222 ms | – | – | 180 | 0.0 |
| upstash | delete | 1KB | 99 ms | 171 ms | 285 ms | – | – | 180 | 0.0 |
| bunny | delete | 1KB | 124 ms | 322 ms | 1.54 s | – | – | 180 | 0.0 |
| r2 | delete | 1KB | 129 ms | 237 ms | 392 ms | – | – | 179 | 0.0 |
| appwrite | delete | 1KB | 136 ms | 194 ms | 942 ms | – | – | 180 | 0.0 |
| b2 | delete | 1MB | 38 ms | 60 ms | 158 ms | – | – | 90 | 0.0 |
| neon | delete | 1MB | 55 ms | 149 ms | 270 ms | – | – | 90 | 0.0 |
| railway | delete | 1MB | 59 ms | 90 ms | 121 ms | – | – | 90 | 0.0 |
| aws-s3 | delete | 1MB | 60 ms | 72 ms | 78 ms | – | – | 90 | 0.0 |
| convex | delete | 1MB | 63 ms | 105 ms | 143 ms | – | – | 90 | 0.0 |
| tigris | delete | 1MB | 75 ms | 163 ms | 219 ms | – | – | 90 | 0.0 |
| upstash | delete | 1MB | 109 ms | 252 ms | 451 ms | – | – | 90 | 0.0 |
| bunny | delete | 1MB | 128 ms | 2.21 s | 3.26 s | – | – | 90 | 0.0 |
| r2 | delete | 1MB | 130 ms | 192 ms | 253 ms | – | – | 90 | 0.0 |
| appwrite | delete | 1MB | 133 ms | 167 ms | 219 ms | – | – | 90 | 0.0 |
| b2 | delete | 10MB | 38 ms | 50 ms | 60 ms | – | – | 60 | 0.0 |
| neon | delete | 10MB | 56 ms | 84 ms | 217 ms | – | – | 60 | 0.0 |
| railway | delete | 10MB | 59 ms | 76 ms | 94 ms | – | – | 60 | 0.0 |
| aws-s3 | delete | 10MB | 61 ms | 67 ms | 99 ms | – | – | 60 | 0.0 |
| convex | delete | 10MB | 64 ms | 118 ms | 259 ms | – | – | 60 | 0.0 |
| tigris | delete | 10MB | 79 ms | 209 ms | 266 ms | – | – | 60 | 0.0 |
| upstash | delete | 10MB | 105 ms | 184 ms | 201 ms | – | – | 60 | 0.0 |
| r2 | delete | 10MB | 132 ms | 203 ms | 306 ms | – | – | 60 | 0.0 |
| appwrite | delete | 10MB | 135 ms | 191 ms | 673 ms | – | – | 59 | 0.0 |
| bunny | delete | 10MB | 143 ms | 843 ms | 2.13 s | – | – | 60 | 0.0 |
| b2 | delete | 100KB | 37 ms | 63 ms | 108 ms | – | – | 180 | 0.0 |
| neon | delete | 100KB | 54 ms | 68 ms | 113 ms | – | – | 180 | 0.0 |
| railway | delete | 100KB | 57 ms | 84 ms | 123 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 100KB | 61 ms | 71 ms | 78 ms | – | – | 180 | 0.0 |
| convex | delete | 100KB | 63 ms | 107 ms | 296 ms | – | – | 179 | 0.0 |
| tigris | delete | 100KB | 73 ms | 132 ms | 335 ms | – | – | 180 | 0.0 |
| upstash | delete | 100KB | 105 ms | 196 ms | 300 ms | – | – | 180 | 0.0 |
| bunny | delete | 100KB | 130 ms | 467 ms | 1.67 s | – | – | 180 | 0.0 |
| r2 | delete | 100KB | 133 ms | 226 ms | 331 ms | – | – | 180 | 0.0 |
| appwrite | delete | 100KB | 136 ms | 215 ms | 301 ms | – | – | 180 | 0.0 |
| b2 | delete | 100MB | 38 ms | 72 ms | 128 ms | – | – | 22 | 0.0 |
| railway | delete | 100MB | 58 ms | 69 ms | 85 ms | – | – | 23 | 0.0 |
| neon | delete | 100MB | 58 ms | 84 ms | 88 ms | – | – | 24 | 0.0 |
| convex | delete | 100MB | 65 ms | 130 ms | 363 ms | – | – | 24 | 0.0 |
| aws-s3 | delete | 100MB | 68 ms | 75 ms | 81 ms | – | – | 23 | 0.0 |
| tigris | delete | 100MB | 83 ms | 179 ms | 350 ms | – | – | 23 | 0.0 |
| upstash | delete | 100MB | 101 ms | 318 ms | 392 ms | – | – | 24 | 0.0 |
| r2 | delete | 100MB | 126 ms | 152 ms | 170 ms | – | – | 24 | 0.0 |
| appwrite | delete | 100MB | 133 ms | 459 ms | 679 ms | – | – | 24 | 0.0 |
| bunny | delete | 100MB | 1.61 s | 4.29 s | 7.05 s | – | – | 24 | 0.0 |
| tigris | download | 1KB | 38 ms | 59 ms | 72 ms | 38 ms | 0.0 | 180 | 0.0 |
| railway | download | 1KB | 41 ms | 58 ms | 116 ms | 41 ms | 0.0 | 180 | 0.0 |
| b2 | download | 1KB | 42 ms | 66 ms | 114 ms | 42 ms | 0.0 | 177 | 0.0 |
| aws-s3 | download | 1KB | 65 ms | 104 ms | 160 ms | 65 ms | 0.0 | 180 | 0.0 |
| neon | download | 1KB | 67 ms | 87 ms | 117 ms | 67 ms | 0.0 | 179 | 0.0 |
| bunny | download | 1KB | 84 ms | 205 ms | 272 ms | 84 ms | 0.0 | 180 | 0.0 |
| convex | download | 1KB | 139 ms | 305 ms | 590 ms | 139 ms | 0.0 | 180 | 0.0 |
| r2 | download | 1KB | 156 ms | 268 ms | 324 ms | 156 ms | 0.0 | 179 | 0.0 |
| upstash | download | 1KB | 157 ms | 262 ms | 337 ms | 157 ms | 0.0 | 180 | 0.0 |
| appwrite | download | 1KB | 159 ms | 235 ms | 897 ms | 158 ms | 0.0 | 180 | 0.0 |
| aws-s3 | download | 1MB | 76 ms | 229 ms | 300 ms | 65 ms | 13.7 | 90 | 0.0 |
| neon | download | 1MB | 87 ms | 169 ms | 311 ms | 68 ms | 12.1 | 90 | 0.0 |
| tigris | download | 1MB | 101 ms | 252 ms | 407 ms | 63 ms | 10.4 | 90 | 0.0 |
| bunny | download | 1MB | 118 ms | 311 ms | 437 ms | 87 ms | 8.9 | 90 | 0.0 |
| b2 | download | 1MB | 229 ms | 250 ms | 268 ms | 61 ms | 4.6 | 90 | 0.0 |
| r2 | download | 1MB | 243 ms | 428 ms | 554 ms | 173 ms | 4.3 | 90 | 0.0 |
| appwrite | download | 1MB | 262 ms | 376 ms | 523 ms | 261 ms | 4.0 | 90 | 0.0 |
| railway | download | 1MB | 264 ms | 526 ms | 583 ms | 65 ms | 4.0 | 90 | 0.0 |
| upstash | download | 1MB | 272 ms | 458 ms | 556 ms | 179 ms | 3.9 | 90 | 1.1 |
| convex | download | 1MB | 290 ms | 440 ms | 898 ms | 144 ms | 3.6 | 90 | 0.0 |
| tigris | download | 10MB | 262 ms | 514 ms | 648 ms | 96 ms | 40.1 | 60 | 0.0 |
| bunny | download | 10MB | 278 ms | 915 ms | 1.88 s | 107 ms | 37.7 | 60 | 0.0 |
| neon | download | 10MB | 300 ms | 397 ms | 938 ms | 70 ms | 34.9 | 60 | 0.0 |
| aws-s3 | download | 10MB | 369 ms | 869 ms | 1.37 s | 66 ms | 28.4 | 60 | 0.0 |
| b2 | download | 10MB | 386 ms | 430 ms | 449 ms | 72 ms | 27.1 | 60 | 0.0 |
| convex | download | 10MB | 443 ms | 1.09 s | 8.12 s | 147 ms | 23.7 | 60 | 0.0 |
| railway | download | 10MB | 467 ms | 645 ms | 741 ms | 68 ms | 22.4 | 60 | 0.0 |
| upstash | download | 10MB | 612 ms | 1.04 s | 1.69 s | 189 ms | 17.1 | 60 | 0.0 |
| r2 | download | 10MB | 618 ms | 1.08 s | 2.03 s | 182 ms | 17.0 | 60 | 0.0 |
| appwrite | download | 10MB | 653 ms | 1.70 s | 2.63 s | 647 ms | 16.1 | 59 | 0.0 |
| tigris | download | 100KB | 55 ms | 133 ms | 221 ms | 41 ms | 1.9 | 180 | 0.0 |
| aws-s3 | download | 100KB | 67 ms | 142 ms | 242 ms | 66 ms | 1.5 | 180 | 0.0 |
| neon | download | 100KB | 71 ms | 133 ms | 241 ms | 68 ms | 1.5 | 180 | 0.0 |
| bunny | download | 100KB | 95 ms | 210 ms | 283 ms | 80 ms | 1.1 | 180 | 0.0 |
| b2 | download | 100KB | 115 ms | 151 ms | 212 ms | 52 ms | 0.9 | 180 | 0.0 |
| railway | download | 100KB | 152 ms | 205 ms | 313 ms | 56 ms | 0.7 | 180 | 0.0 |
| r2 | download | 100KB | 161 ms | 283 ms | 493 ms | 157 ms | 0.6 | 180 | 0.0 |
| upstash | download | 100KB | 163 ms | 243 ms | 362 ms | 155 ms | 0.6 | 180 | 0.0 |
| appwrite | download | 100KB | 198 ms | 287 ms | 485 ms | 198 ms | 0.5 | 180 | 0.0 |
| convex | download | 100KB | 205 ms | 309 ms | 550 ms | 147 ms | 0.5 | 179 | 0.0 |
| convex | download | 100MB | 1.40 s | 2.85 s | 14.25 s | 156 ms | 75.1 | 24 | 0.0 |
| neon | download | 100MB | 1.53 s | 2.21 s | 2.30 s | 71 ms | 68.6 | 24 | 0.0 |
| tigris | download | 100MB | 1.56 s | 1.95 s | 5.65 s | 81 ms | 67.3 | 23 | 0.0 |
| b2 | download | 100MB | 1.90 s | 3.80 s | 3.96 s | 72 ms | 55.2 | 22 | 0.0 |
| railway | download | 100MB | 2.02 s | 2.48 s | 2.59 s | 63 ms | 51.9 | 23 | 0.0 |
| bunny | download | 100MB | 2.08 s | 3.88 s | 7.07 s | 204 ms | 50.5 | 24 | 0.0 |
| aws-s3 | download | 100MB | 2.40 s | 2.79 s | 2.81 s | 68 ms | 43.6 | 23 | 0.0 |
| appwrite | download | 100MB | 2.42 s | 3.01 s | 3.04 s | 2.35 s | 43.4 | 24 | 0.0 |
| upstash | download | 100MB | 5.38 s | 8.45 s | 9.50 s | 288 ms | 19.5 | 24 | 0.0 |
| r2 | download | 100MB | 5.94 s | 12.09 s | 13.95 s | 298 ms | 17.7 | 24 | 0.0 |
| convex | first-request | 1KB | 79 ms | 95 ms | 162 ms | – | – | 60 | 0.0 |
| appwrite | first-request | 1KB | 89 ms | 124 ms | 141 ms | – | – | 60 | 0.0 |
| upstash | first-request | 1KB | 96 ms | 157 ms | 202 ms | – | – | 60 | 0.0 |
| b2 | first-request | 1KB | 109 ms | 129 ms | 182 ms | – | – | 60 | 0.0 |
| r2 | first-request | 1KB | 111 ms | 155 ms | 287 ms | – | – | 60 | 0.0 |
| tigris | first-request | 1KB | 113 ms | 164 ms | 1.63 s | – | – | 60 | 0.0 |
| railway | first-request | 1KB | 115 ms | 159 ms | 230 ms | – | – | 60 | 0.0 |
| bunny | first-request | 1KB | 127 ms | 212 ms | 247 ms | – | – | 60 | 0.0 |
| neon | first-request | 1KB | 134 ms | 158 ms | 297 ms | – | – | 60 | 0.0 |
| aws-s3 | first-request | 1KB | 152 ms | 172 ms | 183 ms | – | – | 60 | 3.3 |
| b2 | head | 1KB | 36 ms | 45 ms | 134 ms | – | – | 177 | 0.0 |
| tigris | head | 1KB | 36 ms | 51 ms | 63 ms | – | – | 180 | 0.0 |
| railway | head | 1KB | 40 ms | 49 ms | 66 ms | – | – | 180 | 0.0 |
| neon | head | 1KB | 41 ms | 64 ms | 69 ms | – | – | 179 | 0.0 |
| aws-s3 | head | 1KB | 52 ms | 64 ms | 110 ms | – | – | 180 | 0.0 |
| bunny | head | 1KB | 57 ms | 137 ms | 179 ms | – | – | 180 | 0.0 |
| convex | head | 1KB | 59 ms | 121 ms | 357 ms | – | – | 180 | 0.0 |
| appwrite | head | 1KB | 62 ms | 121 ms | 247 ms | – | – | 180 | 0.0 |
| upstash | head | 1KB | 69 ms | 148 ms | 205 ms | – | – | 180 | 0.0 |
| r2 | head | 1KB | 87 ms | 190 ms | 305 ms | – | – | 179 | 0.0 |
| tigris | head | 1MB | 36 ms | 56 ms | 65 ms | – | – | 90 | 0.0 |
| b2 | head | 1MB | 37 ms | 78 ms | 123 ms | – | – | 90 | 0.0 |
| neon | head | 1MB | 41 ms | 67 ms | 91 ms | – | – | 90 | 0.0 |
| railway | head | 1MB | 41 ms | 49 ms | 55 ms | – | – | 90 | 0.0 |
| bunny | head | 1MB | 50 ms | 122 ms | 148 ms | – | – | 90 | 0.0 |
| aws-s3 | head | 1MB | 53 ms | 67 ms | 167 ms | – | – | 90 | 0.0 |
| appwrite | head | 1MB | 62 ms | 80 ms | 136 ms | – | – | 90 | 0.0 |
| convex | head | 1MB | 62 ms | 149 ms | 217 ms | – | – | 90 | 0.0 |
| upstash | head | 1MB | 69 ms | 207 ms | 325 ms | – | – | 90 | 0.0 |
| r2 | head | 1MB | 89 ms | 156 ms | 192 ms | – | – | 90 | 0.0 |
| tigris | head | 10MB | 36 ms | 60 ms | 92 ms | – | – | 60 | 0.0 |
| railway | head | 10MB | 43 ms | 70 ms | 89 ms | – | – | 60 | 0.0 |
| neon | head | 10MB | 43 ms | 67 ms | 240 ms | – | – | 60 | 0.0 |
| bunny | head | 10MB | 53 ms | 165 ms | 238 ms | – | – | 60 | 0.0 |
| aws-s3 | head | 10MB | 54 ms | 159 ms | 176 ms | – | – | 60 | 0.0 |
| appwrite | head | 10MB | 59 ms | 114 ms | 180 ms | – | – | 59 | 0.0 |
| convex | head | 10MB | 61 ms | 133 ms | 270 ms | – | – | 60 | 0.0 |
| upstash | head | 10MB | 71 ms | 135 ms | 376 ms | – | – | 60 | 0.0 |
| r2 | head | 10MB | 92 ms | 241 ms | 339 ms | – | – | 60 | 0.0 |
| b2 | head | 10MB | 110 ms | 132 ms | 168 ms | – | – | 60 | 0.0 |
| b2 | head | 100KB | 36 ms | 75 ms | 136 ms | – | – | 180 | 0.0 |
| tigris | head | 100KB | 36 ms | 46 ms | 65 ms | – | – | 180 | 0.0 |
| neon | head | 100KB | 40 ms | 52 ms | 75 ms | – | – | 180 | 0.0 |
| railway | head | 100KB | 41 ms | 50 ms | 143 ms | – | – | 180 | 0.0 |
| bunny | head | 100KB | 51 ms | 123 ms | 176 ms | – | – | 180 | 0.0 |
| aws-s3 | head | 100KB | 53 ms | 60 ms | 81 ms | – | – | 180 | 0.0 |
| convex | head | 100KB | 60 ms | 152 ms | 319 ms | – | – | 179 | 0.0 |
| appwrite | head | 100KB | 62 ms | 90 ms | 330 ms | – | – | 180 | 0.0 |
| upstash | head | 100KB | 71 ms | 138 ms | 209 ms | – | – | 180 | 0.0 |
| r2 | head | 100KB | 92 ms | 197 ms | 254 ms | – | – | 180 | 0.0 |
| b2 | head | 100MB | 37 ms | 45 ms | 66 ms | – | – | 22 | 0.0 |
| railway | head | 100MB | 40 ms | 58 ms | 110 ms | – | – | 23 | 0.0 |
| neon | head | 100MB | 45 ms | 78 ms | 170 ms | – | – | 24 | 0.0 |
| tigris | head | 100MB | 51 ms | 92 ms | 105 ms | – | – | 23 | 0.0 |
| aws-s3 | head | 100MB | 53 ms | 64 ms | 84 ms | – | – | 23 | 0.0 |
| upstash | head | 100MB | 59 ms | 112 ms | 240 ms | – | – | 24 | 0.0 |
| bunny | head | 100MB | 60 ms | 150 ms | 151 ms | – | – | 24 | 0.0 |
| appwrite | head | 100MB | 62 ms | 76 ms | 90 ms | – | – | 24 | 0.0 |
| convex | head | 100MB | 64 ms | 150 ms | 171 ms | – | – | 24 | 0.0 |
| r2 | head | 100MB | 86 ms | 147 ms | 172 ms | – | – | 24 | 0.0 |
| neon | list-all | 1000 objects | 56 ms | – | – | – | – | 18 | 0.0 |
| railway | list-all | 1000 objects | 71 ms | – | – | – | – | 12 | 0.0 |
| tigris | list-all | 1000 objects | 96 ms | – | – | – | – | 18 | 0.0 |
| aws-s3 | list-all | 1000 objects | 103 ms | – | – | – | – | 18 | 0.0 |
| b2 | list-all | 1000 objects | 210 ms | – | – | – | – | 18 | 0.0 |
| bunny | list-all | 1000 objects | 393 ms | – | – | – | – | 18 | 0.0 |
| upstash | list-all | 1000 objects | 472 ms | – | – | – | – | 18 | 0.0 |
| r2 | list-all | 1000 objects | 573 ms | – | – | – | – | 18 | 0.0 |
| appwrite | list-all | 1000 objects | 860 ms | – | – | – | – | 18 | 0.0 |
| neon | range-get | 256KB of 10MB | 69 ms | 104 ms | 179 ms | 64 ms | – | 60 | 0.0 |
| aws-s3 | range-get | 256KB of 10MB | 77 ms | 197 ms | 199 ms | 67 ms | – | 60 | 0.0 |
| tigris | range-get | 256KB of 10MB | 93 ms | 374 ms | 392 ms | 75 ms | – | 60 | 0.0 |
| b2 | range-get | 256KB of 10MB | 168 ms | 198 ms | 254 ms | 64 ms | – | 59 | 0.0 |
| bunny | range-get | 256KB of 10MB | 183 ms | 361 ms | 433 ms | 152 ms | – | 60 | 0.0 |
| railway | range-get | 256KB of 10MB | 200 ms | 471 ms | 493 ms | 72 ms | – | 54 | 0.0 |
| convex | range-get | 256KB of 10MB | 245 ms | 396 ms | 464 ms | 143 ms | – | 60 | 0.0 |
| r2 | range-get | 256KB of 10MB | 253 ms | 409 ms | 496 ms | 206 ms | – | 60 | 0.0 |
| upstash | signed-upload | 1MB | 333 ms | 507 ms | 666 ms | – | – | 60 | 0.0 |
| b2 | signed-upload | 1MB | 340 ms | 433 ms | 472 ms | – | – | 60 | 0.0 |
| tigris | signed-upload | 1MB | 366 ms | 441 ms | 538 ms | – | – | 60 | 0.0 |
| railway | signed-upload | 1MB | 376 ms | 429 ms | 533 ms | – | – | 54 | 0.0 |
| r2 | signed-upload | 1MB | 380 ms | 532 ms | 622 ms | – | – | 60 | 0.0 |
| neon | signed-upload | 1MB | 396 ms | 461 ms | 550 ms | – | – | 60 | 0.0 |
| aws-s3 | signed-upload | 1MB | 482 ms | 605 ms | 729 ms | – | – | 60 | 0.0 |
| bunny | signed-upload | 1MB | 510 ms | 1.50 s | 2.09 s | – | – | 60 | 0.0 |
| railway | upload | 1KB | 53 ms | 78 ms | 130 ms | – | 0.0 | 180 | 0.0 |
| tigris | upload | 1KB | 61 ms | 101 ms | 156 ms | – | 0.0 | 180 | 0.0 |
| aws-s3 | upload | 1KB | 66 ms | 83 ms | 143 ms | – | 0.0 | 180 | 0.0 |
| neon | upload | 1KB | 103 ms | 154 ms | 207 ms | – | 0.0 | 180 | 0.6 |
| upstash | upload | 1KB | 236 ms | 398 ms | 585 ms | – | 0.0 | 180 | 0.0 |
| bunny | upload | 1KB | 268 ms | 854 ms | 2.36 s | – | 0.0 | 180 | 0.0 |
| r2 | upload | 1KB | 278 ms | 425 ms | 634 ms | – | 0.0 | 180 | 0.6 |
| b2 | upload | 1KB | 348 ms | 923 ms | 1.11 s | – | 0.0 | 180 | 1.7 |
| convex | upload | 1KB | 353 ms | 550 ms | 844 ms | – | 0.0 | 180 | 0.0 |
| appwrite | upload | 1KB | 408 ms | 528 ms | 1.40 s | – | 0.0 | 180 | 0.0 |
| neon | upload | 1MB | 289 ms | 357 ms | 419 ms | – | 3.6 | 90 | 0.0 |
| railway | upload | 1MB | 296 ms | 336 ms | 416 ms | – | 3.5 | 90 | 0.0 |
| b2 | upload | 1MB | 326 ms | 425 ms | 1.71 s | – | 3.2 | 90 | 0.0 |
| aws-s3 | upload | 1MB | 331 ms | 385 ms | 408 ms | – | 3.2 | 90 | 0.0 |
| tigris | upload | 1MB | 334 ms | 482 ms | 519 ms | – | 3.1 | 90 | 0.0 |
| upstash | upload | 1MB | 341 ms | 632 ms | 792 ms | – | 3.1 | 90 | 0.0 |
| r2 | upload | 1MB | 357 ms | 590 ms | 729 ms | – | 2.9 | 90 | 0.0 |
| convex | upload | 1MB | 457 ms | 750 ms | 916 ms | – | 2.3 | 90 | 0.0 |
| bunny | upload | 1MB | 495 ms | 2.84 s | 4.26 s | – | 2.1 | 90 | 0.0 |
| appwrite | upload | 1MB | 619 ms | 1.29 s | 1.89 s | – | 1.7 | 90 | 0.0 |
| neon | upload | 10MB | 510 ms | 608 ms | 665 ms | – | 20.5 | 60 | 0.0 |
| railway | upload | 10MB | 616 ms | 798 ms | 921 ms | – | 17.0 | 60 | 0.0 |
| tigris | upload | 10MB | 618 ms | 741 ms | 898 ms | – | 17.0 | 60 | 0.0 |
| r2 | upload | 10MB | 764 ms | 1.63 s | 1.85 s | – | 13.7 | 60 | 0.0 |
| upstash | upload | 10MB | 769 ms | 1.39 s | 1.60 s | – | 13.6 | 60 | 0.0 |
| aws-s3 | upload | 10MB | 785 ms | 1.00 s | 1.07 s | – | 13.4 | 60 | 0.0 |
| bunny | upload | 10MB | 826 ms | 2.62 s | 4.00 s | – | 12.7 | 60 | 0.0 |
| convex | upload | 10MB | 854 ms | 1.19 s | 3.98 s | – | 12.3 | 60 | 0.0 |
| b2 | upload | 10MB | 927 ms | 2.23 s | 3.69 s | – | 11.3 | 60 | 0.0 |
| appwrite | upload | 10MB | 2.22 s | 7.02 s | 9.36 s | – | 4.7 | 60 | 1.7 |
| railway | upload | 100KB | 166 ms | 204 ms | 251 ms | – | 0.6 | 180 | 0.0 |
| neon | upload | 100KB | 174 ms | 259 ms | 306 ms | – | 0.6 | 180 | 0.0 |
| aws-s3 | upload | 100KB | 195 ms | 226 ms | 293 ms | – | 0.5 | 180 | 0.0 |
| tigris | upload | 100KB | 200 ms | 261 ms | 307 ms | – | 0.5 | 180 | 0.0 |
| upstash | upload | 100KB | 261 ms | 443 ms | 598 ms | – | 0.4 | 180 | 0.0 |
| r2 | upload | 100KB | 293 ms | 459 ms | 542 ms | – | 0.3 | 180 | 0.0 |
| bunny | upload | 100KB | 359 ms | 960 ms | 2.47 s | – | 0.3 | 180 | 0.0 |
| convex | upload | 100KB | 385 ms | 560 ms | 740 ms | – | 0.3 | 180 | 0.6 |
| b2 | upload | 100KB | 435 ms | 882 ms | 1.14 s | – | 0.2 | 180 | 0.0 |
| appwrite | upload | 100KB | 473 ms | 648 ms | 1.46 s | – | 0.2 | 180 | 0.0 |
| railway | upload | 100MB | 3.44 s | 4.42 s | 4.51 s | – | 30.5 | 24 | 4.2 |
| tigris | upload | 100MB | 3.47 s | 4.71 s | 5.28 s | – | 30.2 | 24 | 4.2 |
| r2 | upload | 100MB | 3.75 s | 4.19 s | 4.63 s | – | 27.9 | 24 | 0.0 |
| convex | upload | 100MB | 3.84 s | 4.26 s | 4.29 s | – | 27.3 | 24 | 0.0 |
| aws-s3 | upload | 100MB | 4.46 s | 5.30 s | 5.53 s | – | 23.5 | 24 | 4.2 |
| neon | upload | 100MB | 4.79 s | 5.41 s | 5.51 s | – | 21.9 | 24 | 0.0 |
| b2 | upload | 100MB | 5.08 s | 7.45 s | 8.07 s | – | 20.6 | 24 | 8.3 |
| bunny | upload | 100MB | 6.91 s | 10.78 s | 11.13 s | – | 15.2 | 24 | 0.0 |
| appwrite | upload | 100MB | 7.76 s | 10.41 s | 11.67 s | – | 13.5 | 24 | 0.0 |
| upstash | upload | 100MB | 9.19 s | 11.36 s | 11.78 s | – | 11.4 | 24 | 0.0 |
| convex | url-get | 1KB | 77 ms | 107 ms | 188 ms | 77 ms | 0.0 | 180 | 0.0 |
| upstash | url-get | 1KB | 111 ms | 220 ms | 545 ms | 111 ms | 0.0 | 180 | 0.0 |
| tigris | url-get | 1KB | 114 ms | 172 ms | 241 ms | 114 ms | 0.0 | 180 | 0.6 |
| b2 | url-get | 1KB | 116 ms | 156 ms | 201 ms | 116 ms | 0.0 | 177 | 0.0 |
| railway | url-get | 1KB | 121 ms | 154 ms | 245 ms | 120 ms | 0.0 | 180 | 0.0 |
| appwrite | url-get | 1KB | 131 ms | 217 ms | 328 ms | 131 ms | 0.0 | 180 | 0.0 |
| r2 | url-get | 1KB | 155 ms | 256 ms | 326 ms | 155 ms | 0.0 | 179 | 0.6 |
| aws-s3 | url-get | 1KB | 159 ms | 181 ms | 199 ms | 159 ms | 0.0 | 180 | 0.0 |
| neon | url-get | 1KB | 162 ms | 210 ms | 321 ms | 162 ms | 0.0 | 179 | 0.0 |
| bunny | url-get | 1KB | 177 ms | 293 ms | 352 ms | 177 ms | 0.0 | 180 | 0.0 |
| convex | url-get | 1MB | 121 ms | 280 ms | 570 ms | 80 ms | 8.7 | 90 | 0.0 |
| upstash | url-get | 1MB | 164 ms | 262 ms | 286 ms | 137 ms | 6.4 | 90 | 0.0 |
| r2 | url-get | 1MB | 220 ms | 446 ms | 548 ms | 188 ms | 4.8 | 90 | 0.0 |
| appwrite | url-get | 1MB | 254 ms | 361 ms | 434 ms | 168 ms | 4.1 | 90 | 0.0 |
| b2 | url-get | 1MB | 318 ms | 372 ms | 405 ms | 134 ms | 3.3 | 90 | 0.0 |
| railway | url-get | 1MB | 347 ms | 394 ms | 451 ms | 150 ms | 3.0 | 90 | 0.0 |
| neon | url-get | 1MB | 350 ms | 404 ms | 454 ms | 177 ms | 3.0 | 90 | 1.1 |
| tigris | url-get | 1MB | 366 ms | 425 ms | 485 ms | 146 ms | 2.9 | 90 | 0.0 |
| aws-s3 | url-get | 1MB | 367 ms | 397 ms | 448 ms | 162 ms | 2.9 | 90 | 0.0 |
| bunny | url-get | 1MB | 389 ms | 519 ms | 629 ms | 191 ms | 2.7 | 90 | 0.0 |
| convex | url-get | 10MB | 283 ms | 843 ms | 968 ms | 79 ms | 37.1 | 60 | 0.0 |
| b2 | url-get | 10MB | 470 ms | 522 ms | 550 ms | 146 ms | 22.3 | 60 | 0.0 |
| neon | url-get | 10MB | 497 ms | 983 ms | 1.44 s | 172 ms | 21.1 | 60 | 0.0 |
| tigris | url-get | 10MB | 509 ms | 601 ms | 674 ms | 157 ms | 20.6 | 60 | 0.0 |
| railway | url-get | 10MB | 514 ms | 977 ms | 1.68 s | 149 ms | 20.4 | 60 | 0.0 |
| upstash | url-get | 10MB | 547 ms | 1.01 s | 1.28 s | 164 ms | 19.2 | 60 | 0.0 |
| bunny | url-get | 10MB | 547 ms | 638 ms | 676 ms | 207 ms | 19.2 | 60 | 0.0 |
| aws-s3 | url-get | 10MB | 589 ms | 882 ms | 1.43 s | 157 ms | 17.8 | 60 | 0.0 |
| r2 | url-get | 10MB | 667 ms | 977 ms | 15.88 s | 236 ms | 15.7 | 60 | 0.0 |
| appwrite | url-get | 10MB | 715 ms | 976 ms | 1.18 s | 552 ms | 14.7 | 59 | 0.0 |
| convex | url-get | 100KB | 85 ms | 170 ms | 248 ms | 78 ms | 1.2 | 179 | 0.0 |
| upstash | url-get | 100KB | 122 ms | 231 ms | 258 ms | 118 ms | 0.8 | 180 | 0.0 |
| appwrite | url-get | 100KB | 168 ms | 256 ms | 385 ms | 137 ms | 0.6 | 180 | 0.0 |
| r2 | url-get | 100KB | 172 ms | 288 ms | 354 ms | 167 ms | 0.6 | 180 | 0.0 |
| b2 | url-get | 100KB | 200 ms | 270 ms | 928 ms | 127 ms | 0.5 | 180 | 0.0 |
| railway | url-get | 100KB | 239 ms | 291 ms | 354 ms | 143 ms | 0.4 | 180 | 0.0 |
| tigris | url-get | 100KB | 239 ms | 310 ms | 409 ms | 134 ms | 0.4 | 180 | 0.0 |
| aws-s3 | url-get | 100KB | 246 ms | 272 ms | 320 ms | 164 ms | 0.4 | 180 | 0.0 |
| neon | url-get | 100KB | 254 ms | 300 ms | 325 ms | 175 ms | 0.4 | 180 | 0.0 |
| bunny | url-get | 100KB | 272 ms | 422 ms | 669 ms | 190 ms | 0.4 | 180 | 0.6 |
| convex | url-get | 100MB | 1.10 s | 2.29 s | 5.75 s | 83 ms | 95.3 | 24 | 0.0 |
| railway | url-get | 100MB | 1.56 s | 5.86 s | 6.59 s | 160 ms | 67.3 | 23 | 0.0 |
| neon | url-get | 100MB | 1.63 s | 2.04 s | 2.32 s | 173 ms | 64.3 | 24 | 0.0 |
| tigris | url-get | 100MB | 1.80 s | 2.26 s | 2.51 s | 140 ms | 58.3 | 23 | 0.0 |
| b2 | url-get | 100MB | 2.05 s | 3.15 s | 3.26 s | 155 ms | 51.2 | 22 | 0.0 |
| bunny | url-get | 100MB | 2.17 s | 4.12 s | 4.20 s | 305 ms | 48.3 | 24 | 0.0 |
| appwrite | url-get | 100MB | 2.29 s | 2.75 s | 3.27 s | 349 ms | 45.8 | 24 | 0.0 |
| aws-s3 | url-get | 100MB | 2.43 s | 3.64 s | 3.77 s | 160 ms | 43.2 | 23 | 0.0 |
| upstash | url-get | 100MB | 4.45 s | 7.45 s | 11.57 s | 169 ms | 23.6 | 24 | 0.0 |
| r2 | url-get | 100MB | 4.67 s | 6.14 s | 11.19 s | 223 ms | 22.4 | 24 | 0.0 |

## From tenki-seattle

| Provider | Op | Size | p50 | p95 | p99 | TTFB p50 | MB/s p50 | n | fail % |
|---|---|---|---|---|---|---|---|---|---|
| tigris | burst-upload | 32x100KB | 262 ms | 476 ms | 740 ms | – | 12.5 | 30 | 3.3 |
| aws-s3 | burst-upload | 32x100KB | 382 ms | 529 ms | 560 ms | – | 8.6 | 30 | 0.0 |
| neon | burst-upload | 32x100KB | 459 ms | 697 ms | 1.23 s | – | 7.1 | 30 | 0.0 |
| railway | burst-upload | 32x100KB | 535 ms | 786 ms | 865 ms | – | 6.1 | 30 | 0.0 |
| r2 | burst-upload | 32x100KB | 617 ms | 754 ms | 864 ms | – | 5.3 | 30 | 0.0 |
| upstash | burst-upload | 32x100KB | 699 ms | 1.69 s | 2.02 s | – | 4.7 | 30 | 0.0 |
| convex | burst-upload | 32x100KB | 822 ms | 1.12 s | 1.39 s | – | 4.0 | 30 | 0.0 |
| appwrite | burst-upload | 32x100KB | 1.43 s | 2.06 s | 2.10 s | – | 2.3 | 30 | 0.0 |
| b2 | burst-upload | 32x100KB | 1.56 s | 2.61 s | 3.13 s | – | 2.1 | 30 | 3.3 |
| bunny | burst-upload | 32x100KB | 2.22 s | 7.95 s | 8.62 s | – | 1.5 | 30 | 0.0 |
| tigris | concurrent-download | 16x100KB | 87 ms | 132 ms | 160 ms | – | 18.7 | 30 | 0.0 |
| aws-s3 | concurrent-download | 16x100KB | 118 ms | 240 ms | 254 ms | – | 13.9 | 30 | 0.0 |
| neon | concurrent-download | 16x100KB | 178 ms | 410 ms | 1.19 s | – | 9.2 | 30 | 0.0 |
| b2 | concurrent-download | 16x100KB | 248 ms | 304 ms | 1.08 s | – | 6.6 | 30 | 0.0 |
| bunny | concurrent-download | 16x100KB | 266 ms | 566 ms | 827 ms | – | 6.2 | 30 | 0.0 |
| r2 | concurrent-download | 16x100KB | 352 ms | 529 ms | 650 ms | – | 4.6 | 30 | 0.0 |
| upstash | concurrent-download | 16x100KB | 360 ms | 593 ms | 621 ms | – | 4.6 | 30 | 0.0 |
| railway | concurrent-download | 16x100KB | 398 ms | 937 ms | 1.08 s | – | 4.1 | 30 | 0.0 |
| convex | concurrent-download | 16x100KB | 594 ms | 834 ms | 924 ms | – | 2.8 | 30 | 0.0 |
| appwrite | concurrent-download | 16x100KB | 678 ms | 704 ms | 842 ms | – | 2.4 | 30 | 0.0 |
| tigris | concurrent-upload | 16x100KB | 263 ms | 491 ms | 945 ms | – | 6.2 | 30 | 0.0 |
| aws-s3 | concurrent-upload | 16x100KB | 368 ms | 492 ms | 505 ms | – | 4.4 | 30 | 0.0 |
| neon | concurrent-upload | 16x100KB | 424 ms | 791 ms | 1.46 s | – | 3.9 | 30 | 0.0 |
| railway | concurrent-upload | 16x100KB | 529 ms | 681 ms | 827 ms | – | 3.1 | 30 | 0.0 |
| upstash | concurrent-upload | 16x100KB | 626 ms | 799 ms | 950 ms | – | 2.6 | 30 | 0.0 |
| r2 | concurrent-upload | 16x100KB | 630 ms | 777 ms | 1.02 s | – | 2.6 | 30 | 0.0 |
| convex | concurrent-upload | 16x100KB | 788 ms | 1.10 s | 1.19 s | – | 2.1 | 30 | 0.0 |
| appwrite | concurrent-upload | 16x100KB | 984 ms | 1.51 s | 1.69 s | – | 1.7 | 30 | 0.0 |
| b2 | concurrent-upload | 16x100KB | 1.14 s | 2.21 s | 2.46 s | – | 1.4 | 30 | 0.0 |
| bunny | concurrent-upload | 16x100KB | 1.40 s | 6.33 s | 6.66 s | – | 1.2 | 30 | 0.0 |
| aws-s3 | copy | 10MB | 200 ms | 256 ms | 266 ms | – | – | 60 | 0.0 |
| neon | copy | 10MB | 321 ms | 431 ms | 574 ms | – | – | 60 | 0.0 |
| tigris | copy | 10MB | 323 ms | 387 ms | 532 ms | – | – | 58 | 0.0 |
| bunny | copy | 10MB | 508 ms | 1.08 s | 1.43 s | – | – | 60 | 0.0 |
| railway | copy | 10MB | 581 ms | 814 ms | 991 ms | – | – | 52 | 0.0 |
| b2 | copy | 10MB | 677 ms | 1.75 s | 3.04 s | – | – | 60 | 0.0 |
| r2 | copy | 10MB | 1.32 s | 1.91 s | 2.36 s | – | – | 60 | 0.0 |
| upstash | copy | 10MB | 1.55 s | 2.16 s | 3.29 s | – | – | 60 | 0.0 |
| tigris | delete | 1KB | 45 ms | 154 ms | 258 ms | – | – | 180 | 0.0 |
| b2 | delete | 1KB | 69 ms | 96 ms | 126 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 1KB | 83 ms | 91 ms | 97 ms | – | – | 180 | 0.0 |
| neon | delete | 1KB | 97 ms | 121 ms | 239 ms | – | – | 180 | 0.0 |
| convex | delete | 1KB | 105 ms | 164 ms | 310 ms | – | – | 180 | 0.0 |
| upstash | delete | 1KB | 151 ms | 214 ms | 338 ms | – | – | 180 | 0.0 |
| railway | delete | 1KB | 155 ms | 240 ms | 347 ms | – | – | 180 | 0.0 |
| r2 | delete | 1KB | 158 ms | 232 ms | 271 ms | – | – | 180 | 0.0 |
| appwrite | delete | 1KB | 168 ms | 249 ms | 560 ms | – | – | 180 | 0.0 |
| bunny | delete | 1KB | 169 ms | 631 ms | 2.56 s | – | – | 180 | 0.0 |
| tigris | delete | 1MB | 46 ms | 120 ms | 167 ms | – | – | 90 | 0.0 |
| b2 | delete | 1MB | 70 ms | 94 ms | 124 ms | – | – | 90 | 0.0 |
| aws-s3 | delete | 1MB | 84 ms | 96 ms | 107 ms | – | – | 90 | 0.0 |
| neon | delete | 1MB | 97 ms | 229 ms | 250 ms | – | – | 90 | 0.0 |
| convex | delete | 1MB | 109 ms | 226 ms | 585 ms | – | – | 90 | 0.0 |
| bunny | delete | 1MB | 142 ms | 362 ms | 1.08 s | – | – | 90 | 0.0 |
| railway | delete | 1MB | 150 ms | 228 ms | 274 ms | – | – | 90 | 0.0 |
| upstash | delete | 1MB | 155 ms | 313 ms | 409 ms | – | – | 90 | 0.0 |
| r2 | delete | 1MB | 158 ms | 240 ms | 331 ms | – | – | 90 | 0.0 |
| appwrite | delete | 1MB | 172 ms | 276 ms | 567 ms | – | – | 90 | 0.0 |
| tigris | delete | 10MB | 49 ms | 66 ms | 101 ms | – | – | 60 | 0.0 |
| b2 | delete | 10MB | 70 ms | 99 ms | 132 ms | – | – | 60 | 0.0 |
| aws-s3 | delete | 10MB | 84 ms | 94 ms | 103 ms | – | – | 60 | 0.0 |
| neon | delete | 10MB | 100 ms | 128 ms | 263 ms | – | – | 60 | 0.0 |
| convex | delete | 10MB | 111 ms | 405 ms | 502 ms | – | – | 60 | 0.0 |
| upstash | delete | 10MB | 158 ms | 229 ms | 237 ms | – | – | 60 | 0.0 |
| r2 | delete | 10MB | 160 ms | 297 ms | 507 ms | – | – | 60 | 0.0 |
| appwrite | delete | 10MB | 169 ms | 225 ms | 316 ms | – | – | 60 | 0.0 |
| bunny | delete | 10MB | 180 ms | 1.76 s | 4.19 s | – | – | 60 | 0.0 |
| railway | delete | 10MB | 199 ms | 259 ms | 503 ms | – | – | 60 | 0.0 |
| tigris | delete | 100KB | 46 ms | 140 ms | 208 ms | – | – | 180 | 0.0 |
| b2 | delete | 100KB | 69 ms | 84 ms | 132 ms | – | – | 179 | 0.0 |
| aws-s3 | delete | 100KB | 84 ms | 90 ms | 94 ms | – | – | 180 | 0.0 |
| neon | delete | 100KB | 97 ms | 111 ms | 231 ms | – | – | 180 | 0.0 |
| convex | delete | 100KB | 106 ms | 191 ms | 465 ms | – | – | 180 | 0.0 |
| upstash | delete | 100KB | 149 ms | 263 ms | 397 ms | – | – | 180 | 0.0 |
| r2 | delete | 100KB | 158 ms | 281 ms | 453 ms | – | – | 180 | 0.0 |
| bunny | delete | 100KB | 161 ms | 406 ms | 2.60 s | – | – | 180 | 0.0 |
| appwrite | delete | 100KB | 169 ms | 259 ms | 739 ms | – | – | 180 | 0.0 |
| railway | delete | 100KB | 191 ms | 235 ms | 250 ms | – | – | 180 | 0.0 |
| tigris | delete | 100MB | 48 ms | 77 ms | 89 ms | – | – | 23 | 0.0 |
| b2 | delete | 100MB | 71 ms | 125 ms | 187 ms | – | – | 24 | 0.0 |
| aws-s3 | delete | 100MB | 92 ms | 99 ms | 100 ms | – | – | 24 | 0.0 |
| neon | delete | 100MB | 102 ms | 136 ms | 215 ms | – | – | 24 | 0.0 |
| convex | delete | 100MB | 113 ms | 199 ms | 232 ms | – | – | 24 | 0.0 |
| railway | delete | 100MB | 133 ms | 217 ms | 225 ms | – | – | 24 | 0.0 |
| r2 | delete | 100MB | 152 ms | 172 ms | 174 ms | – | – | 24 | 0.0 |
| upstash | delete | 100MB | 156 ms | 262 ms | 410 ms | – | – | 24 | 0.0 |
| appwrite | delete | 100MB | 168 ms | 352 ms | 406 ms | – | – | 24 | 0.0 |
| bunny | delete | 100MB | 1.51 s | 2.99 s | 3.20 s | – | – | 24 | 0.0 |
| tigris | download | 1KB | 26 ms | 70 ms | 141 ms | 26 ms | 0.0 | 180 | 0.0 |
| b2 | download | 1KB | 74 ms | 95 ms | 141 ms | 74 ms | 0.0 | 180 | 0.0 |
| aws-s3 | download | 1KB | 88 ms | 99 ms | 119 ms | 88 ms | 0.0 | 180 | 0.0 |
| bunny | download | 1KB | 110 ms | 236 ms | 314 ms | 110 ms | 0.0 | 180 | 0.0 |
| neon | download | 1KB | 110 ms | 145 ms | 217 ms | 109 ms | 0.0 | 180 | 0.0 |
| railway | download | 1KB | 149 ms | 224 ms | 385 ms | 149 ms | 0.0 | 180 | 0.0 |
| appwrite | download | 1KB | 188 ms | 448 ms | 514 ms | 188 ms | 0.0 | 180 | 0.0 |
| convex | download | 1KB | 226 ms | 331 ms | 412 ms | 226 ms | 0.0 | 180 | 0.0 |
| r2 | download | 1KB | 248 ms | 335 ms | 410 ms | 248 ms | 0.0 | 180 | 0.0 |
| upstash | download | 1KB | 254 ms | 336 ms | 393 ms | 254 ms | 0.0 | 180 | 0.0 |
| tigris | download | 1MB | 87 ms | 155 ms | 167 ms | 65 ms | 12.1 | 90 | 0.0 |
| aws-s3 | download | 1MB | 98 ms | 414 ms | 470 ms | 89 ms | 10.8 | 90 | 0.0 |
| neon | download | 1MB | 118 ms | 246 ms | 292 ms | 110 ms | 8.9 | 90 | 0.0 |
| bunny | download | 1MB | 159 ms | 621 ms | 702 ms | 120 ms | 6.6 | 90 | 0.0 |
| railway | download | 1MB | 287 ms | 475 ms | 704 ms | 272 ms | 3.7 | 90 | 0.0 |
| r2 | download | 1MB | 335 ms | 543 ms | 630 ms | 271 ms | 3.1 | 90 | 0.0 |
| upstash | download | 1MB | 366 ms | 606 ms | 3.41 s | 284 ms | 2.9 | 90 | 0.0 |
| b2 | download | 1MB | 447 ms | 475 ms | 501 ms | 105 ms | 2.3 | 90 | 0.0 |
| appwrite | download | 1MB | 647 ms | 981 ms | 1.34 s | 646 ms | 1.6 | 90 | 0.0 |
| convex | download | 1MB | 654 ms | 1.28 s | 2.46 s | 237 ms | 1.6 | 90 | 0.0 |
| neon | download | 10MB | 216 ms | 420 ms | 767 ms | 114 ms | 48.6 | 60 | 0.0 |
| bunny | download | 10MB | 268 ms | 493 ms | 568 ms | 119 ms | 39.1 | 60 | 0.0 |
| tigris | download | 10MB | 269 ms | 412 ms | 486 ms | 83 ms | 39.0 | 60 | 0.0 |
| railway | download | 10MB | 426 ms | 745 ms | 1.42 s | 286 ms | 24.6 | 60 | 0.0 |
| aws-s3 | download | 10MB | 680 ms | 716 ms | 777 ms | 89 ms | 15.4 | 60 | 0.0 |
| b2 | download | 10MB | 720 ms | 745 ms | 820 ms | 113 ms | 14.6 | 60 | 0.0 |
| convex | download | 10MB | 770 ms | 1.95 s | 4.20 s | 229 ms | 13.6 | 60 | 0.0 |
| r2 | download | 10MB | 855 ms | 1.26 s | 2.05 s | 266 ms | 12.3 | 60 | 0.0 |
| upstash | download | 10MB | 882 ms | 1.23 s | 1.63 s | 289 ms | 11.9 | 60 | 0.0 |
| appwrite | download | 10MB | 1.32 s | 1.69 s | 1.79 s | 1.31 s | 7.9 | 60 | 0.0 |
| tigris | download | 100KB | 36 ms | 78 ms | 119 ms | 28 ms | 2.8 | 180 | 0.0 |
| aws-s3 | download | 100KB | 91 ms | 215 ms | 222 ms | 89 ms | 1.1 | 180 | 0.0 |
| neon | download | 100KB | 111 ms | 168 ms | 312 ms | 109 ms | 0.9 | 180 | 0.0 |
| bunny | download | 100KB | 145 ms | 300 ms | 432 ms | 117 ms | 0.7 | 180 | 0.0 |
| b2 | download | 100KB | 228 ms | 238 ms | 261 ms | 94 ms | 0.4 | 179 | 0.0 |
| r2 | download | 100KB | 247 ms | 344 ms | 454 ms | 244 ms | 0.4 | 180 | 0.0 |
| upstash | download | 100KB | 261 ms | 363 ms | 470 ms | 258 ms | 0.4 | 180 | 0.0 |
| railway | download | 100KB | 267 ms | 386 ms | 496 ms | 258 ms | 0.4 | 180 | 0.0 |
| appwrite | download | 100KB | 373 ms | 668 ms | 721 ms | 372 ms | 0.3 | 180 | 0.0 |
| convex | download | 100KB | 445 ms | 698 ms | 1.01 s | 236 ms | 0.2 | 180 | 0.0 |
| neon | download | 100MB | 1.76 s | 1.83 s | 2.61 s | 113 ms | 59.7 | 24 | 0.0 |
| railway | download | 100MB | 1.92 s | 2.92 s | 8.32 s | 234 ms | 54.6 | 24 | 0.0 |
| tigris | download | 100MB | 1.98 s | 2.66 s | 3.01 s | 85 ms | 52.9 | 23 | 0.0 |
| aws-s3 | download | 100MB | 2.45 s | 2.87 s | 7.20 s | 107 ms | 42.8 | 24 | 0.0 |
| convex | download | 100MB | 2.46 s | 10.81 s | 12.35 s | 269 ms | 42.6 | 24 | 0.0 |
| bunny | download | 100MB | 2.59 s | 4.72 s | 5.76 s | 225 ms | 40.4 | 24 | 0.0 |
| b2 | download | 100MB | 2.68 s | 4.64 s | 10.72 s | 112 ms | 39.2 | 24 | 0.0 |
| appwrite | download | 100MB | 3.68 s | 4.68 s | 5.29 s | 3.55 s | 28.5 | 24 | 0.0 |
| r2 | download | 100MB | 8.34 s | 11.33 s | 15.69 s | 410 ms | 12.6 | 24 | 0.0 |
| upstash | download | 100MB | 8.65 s | 21.56 s | 55.09 s | 410 ms | 12.1 | 24 | 0.0 |
| tigris | first-request | 1KB | 83 ms | 262 ms | 7.08 s | – | – | 60 | 0.0 |
| appwrite | first-request | 1KB | 100 ms | 153 ms | 227 ms | – | – | 60 | 0.0 |
| convex | first-request | 1KB | 112 ms | 230 ms | 385 ms | – | – | 60 | 0.0 |
| upstash | first-request | 1KB | 126 ms | 184 ms | 267 ms | – | – | 60 | 0.0 |
| r2 | first-request | 1KB | 135 ms | 201 ms | 296 ms | – | – | 60 | 0.0 |
| railway | first-request | 1KB | 177 ms | 258 ms | 399 ms | – | – | 60 | 0.0 |
| b2 | first-request | 1KB | 203 ms | 236 ms | 261 ms | – | – | 60 | 0.0 |
| bunny | first-request | 1KB | 215 ms | 269 ms | 342 ms | – | – | 60 | 0.0 |
| aws-s3 | first-request | 1KB | 223 ms | 232 ms | 235 ms | – | – | 60 | 0.0 |
| neon | first-request | 1KB | 300 ms | 330 ms | 358 ms | – | – | 60 | 0.0 |
| tigris | head | 1KB | 25 ms | 63 ms | 117 ms | – | – | 180 | 0.0 |
| b2 | head | 1KB | 68 ms | 80 ms | 140 ms | – | – | 180 | 0.0 |
| aws-s3 | head | 1KB | 76 ms | 85 ms | 229 ms | – | – | 180 | 0.0 |
| bunny | head | 1KB | 81 ms | 165 ms | 198 ms | – | – | 180 | 0.0 |
| neon | head | 1KB | 83 ms | 106 ms | 120 ms | – | – | 180 | 0.0 |
| convex | head | 1KB | 103 ms | 174 ms | 267 ms | – | – | 180 | 0.0 |
| appwrite | head | 1KB | 104 ms | 342 ms | 555 ms | – | – | 180 | 0.0 |
| upstash | head | 1KB | 116 ms | 189 ms | 270 ms | – | – | 180 | 0.0 |
| r2 | head | 1KB | 116 ms | 145 ms | 234 ms | – | – | 180 | 0.0 |
| railway | head | 1KB | 121 ms | 215 ms | 488 ms | – | – | 180 | 0.0 |
| tigris | head | 1MB | 24 ms | 33 ms | 45 ms | – | – | 90 | 0.0 |
| b2 | head | 1MB | 68 ms | 81 ms | 99 ms | – | – | 90 | 0.0 |
| aws-s3 | head | 1MB | 76 ms | 86 ms | 234 ms | – | – | 90 | 0.0 |
| bunny | head | 1MB | 78 ms | 154 ms | 186 ms | – | – | 90 | 0.0 |
| neon | head | 1MB | 83 ms | 110 ms | 133 ms | – | – | 90 | 0.0 |
| appwrite | head | 1MB | 103 ms | 342 ms | 397 ms | – | – | 90 | 0.0 |
| convex | head | 1MB | 106 ms | 141 ms | 491 ms | – | – | 90 | 0.0 |
| r2 | head | 1MB | 118 ms | 206 ms | 272 ms | – | – | 90 | 0.0 |
| upstash | head | 1MB | 119 ms | 190 ms | 301 ms | – | – | 90 | 0.0 |
| railway | head | 1MB | 177 ms | 215 ms | 250 ms | – | – | 90 | 0.0 |
| tigris | head | 10MB | 26 ms | 132 ms | 206 ms | – | – | 60 | 0.0 |
| bunny | head | 10MB | 81 ms | 150 ms | 277 ms | – | – | 60 | 0.0 |
| neon | head | 10MB | 86 ms | 110 ms | 310 ms | – | – | 60 | 0.0 |
| appwrite | head | 10MB | 108 ms | 344 ms | 458 ms | – | – | 60 | 0.0 |
| convex | head | 10MB | 110 ms | 215 ms | 264 ms | – | – | 60 | 0.0 |
| upstash | head | 10MB | 118 ms | 179 ms | 335 ms | – | – | 60 | 0.0 |
| r2 | head | 10MB | 118 ms | 185 ms | 239 ms | – | – | 60 | 0.0 |
| railway | head | 10MB | 185 ms | 213 ms | 406 ms | – | – | 60 | 0.0 |
| b2 | head | 10MB | 206 ms | 224 ms | 230 ms | – | – | 60 | 1.7 |
| aws-s3 | head | 10MB | 217 ms | 232 ms | 241 ms | – | – | 60 | 0.0 |
| tigris | head | 100KB | 24 ms | 38 ms | 67 ms | – | – | 180 | 0.0 |
| b2 | head | 100KB | 68 ms | 76 ms | 127 ms | – | – | 179 | 0.0 |
| aws-s3 | head | 100KB | 76 ms | 101 ms | 229 ms | – | – | 180 | 0.0 |
| neon | head | 100KB | 83 ms | 107 ms | 171 ms | – | – | 180 | 0.0 |
| bunny | head | 100KB | 83 ms | 170 ms | 213 ms | – | – | 180 | 0.0 |
| appwrite | head | 100KB | 101 ms | 347 ms | 404 ms | – | – | 180 | 0.0 |
| convex | head | 100KB | 104 ms | 218 ms | 525 ms | – | – | 180 | 0.0 |
| r2 | head | 100KB | 118 ms | 177 ms | 259 ms | – | – | 180 | 0.0 |
| upstash | head | 100KB | 120 ms | 166 ms | 282 ms | – | – | 180 | 0.0 |
| railway | head | 100KB | 157 ms | 235 ms | 589 ms | – | – | 180 | 0.0 |
| tigris | head | 100MB | 34 ms | 56 ms | 68 ms | – | – | 23 | 0.0 |
| b2 | head | 100MB | 69 ms | 86 ms | 92 ms | – | – | 24 | 0.0 |
| aws-s3 | head | 100MB | 77 ms | 79 ms | 86 ms | – | – | 24 | 0.0 |
| bunny | head | 100MB | 77 ms | 134 ms | 147 ms | – | – | 24 | 0.0 |
| neon | head | 100MB | 87 ms | 97 ms | 108 ms | – | – | 24 | 0.0 |
| upstash | head | 100MB | 103 ms | 191 ms | 206 ms | – | – | 24 | 0.0 |
| railway | head | 100MB | 108 ms | 192 ms | 194 ms | – | – | 24 | 0.0 |
| appwrite | head | 100MB | 113 ms | 365 ms | 452 ms | – | – | 24 | 0.0 |
| r2 | head | 100MB | 118 ms | 203 ms | 316 ms | – | – | 24 | 0.0 |
| convex | head | 100MB | 136 ms | 321 ms | 549 ms | – | – | 24 | 0.0 |
| tigris | list-all | 1000 objects | 84 ms | – | – | – | – | 18 | 0.0 |
| neon | list-all | 1000 objects | 118 ms | – | – | – | – | 18 | 0.0 |
| aws-s3 | list-all | 1000 objects | 142 ms | – | – | – | – | 18 | 0.0 |
| railway | list-all | 1000 objects | 175 ms | – | – | – | – | 12 | 0.0 |
| b2 | list-all | 1000 objects | 528 ms | – | – | – | – | 18 | 0.0 |
| bunny | list-all | 1000 objects | 627 ms | – | – | – | – | 18 | 0.0 |
| r2 | list-all | 1000 objects | 651 ms | – | – | – | – | 18 | 0.0 |
| upstash | list-all | 1000 objects | 716 ms | – | – | – | – | 18 | 0.0 |
| appwrite | list-all | 1000 objects | 1.37 s | – | – | – | – | 18 | 0.0 |
| neon | range-get | 256KB of 10MB | 115 ms | 181 ms | 412 ms | 111 ms | – | 60 | 0.0 |
| tigris | range-get | 256KB of 10MB | 120 ms | 219 ms | 394 ms | 109 ms | – | 58 | 0.0 |
| bunny | range-get | 256KB of 10MB | 206 ms | 487 ms | 566 ms | 173 ms | – | 60 | 0.0 |
| aws-s3 | range-get | 256KB of 10MB | 281 ms | 346 ms | 370 ms | 90 ms | – | 60 | 0.0 |
| railway | range-get | 256KB of 10MB | 298 ms | 602 ms | 854 ms | 290 ms | – | 52 | 0.0 |
| r2 | range-get | 256KB of 10MB | 319 ms | 590 ms | 756 ms | 291 ms | – | 60 | 0.0 |
| b2 | range-get | 256KB of 10MB | 324 ms | 342 ms | 355 ms | 107 ms | – | 60 | 0.0 |
| convex | range-get | 256KB of 10MB | 456 ms | 711 ms | 1.41 s | 238 ms | – | 59 | 0.0 |
| tigris | signed-upload | 1MB | 306 ms | 449 ms | 535 ms | – | – | 60 | 1.7 |
| r2 | signed-upload | 1MB | 421 ms | 773 ms | 977 ms | – | – | 60 | 0.0 |
| upstash | signed-upload | 1MB | 433 ms | 704 ms | 899 ms | – | – | 60 | 0.0 |
| railway | signed-upload | 1MB | 533 ms | 878 ms | 966 ms | – | – | 52 | 0.0 |
| b2 | signed-upload | 1MB | 611 ms | 699 ms | 840 ms | – | – | 60 | 0.0 |
| aws-s3 | signed-upload | 1MB | 703 ms | 785 ms | 825 ms | – | – | 60 | 0.0 |
| neon | signed-upload | 1MB | 799 ms | 846 ms | 891 ms | – | – | 60 | 0.0 |
| bunny | signed-upload | 1MB | 802 ms | 2.61 s | 3.88 s | – | – | 60 | 0.0 |
| tigris | upload | 1KB | 39 ms | 130 ms | 289 ms | – | 0.0 | 180 | 0.0 |
| aws-s3 | upload | 1KB | 91 ms | 99 ms | 118 ms | – | 0.0 | 180 | 0.0 |
| neon | upload | 1KB | 147 ms | 203 ms | 247 ms | – | 0.0 | 180 | 0.0 |
| railway | upload | 1KB | 163 ms | 246 ms | 397 ms | – | 0.0 | 180 | 0.0 |
| bunny | upload | 1KB | 307 ms | 831 ms | 7.04 s | – | 0.0 | 180 | 0.0 |
| r2 | upload | 1KB | 344 ms | 492 ms | 580 ms | – | 0.0 | 180 | 0.0 |
| upstash | upload | 1KB | 348 ms | 495 ms | 832 ms | – | 0.0 | 180 | 0.0 |
| b2 | upload | 1KB | 396 ms | 864 ms | 1.09 s | – | 0.0 | 180 | 0.0 |
| convex | upload | 1KB | 422 ms | 652 ms | 862 ms | – | 0.0 | 180 | 0.0 |
| appwrite | upload | 1KB | 456 ms | 813 ms | 1.69 s | – | 0.0 | 180 | 0.0 |
| tigris | upload | 1MB | 213 ms | 279 ms | 350 ms | – | 4.9 | 90 | 0.0 |
| r2 | upload | 1MB | 445 ms | 736 ms | 1.21 s | – | 2.4 | 90 | 0.0 |
| upstash | upload | 1MB | 455 ms | 914 ms | 3.93 s | – | 2.3 | 90 | 0.0 |
| railway | upload | 1MB | 482 ms | 877 ms | 1.13 s | – | 2.2 | 90 | 0.0 |
| aws-s3 | upload | 1MB | 487 ms | 621 ms | 760 ms | – | 2.2 | 90 | 0.0 |
| neon | upload | 1MB | 576 ms | 644 ms | 691 ms | – | 1.8 | 90 | 0.0 |
| convex | upload | 1MB | 595 ms | 974 ms | 1.93 s | – | 1.8 | 90 | 0.0 |
| b2 | upload | 1MB | 615 ms | 715 ms | 761 ms | – | 1.7 | 90 | 0.0 |
| bunny | upload | 1MB | 669 ms | 1.70 s | 3.64 s | – | 1.6 | 90 | 0.0 |
| appwrite | upload | 1MB | 919 ms | 1.35 s | 2.61 s | – | 1.1 | 90 | 0.0 |
| tigris | upload | 10MB | 551 ms | 859 ms | 1.94 s | – | 19.0 | 60 | 0.0 |
| upstash | upload | 10MB | 877 ms | 1.34 s | 1.91 s | – | 12.0 | 60 | 0.0 |
| r2 | upload | 10MB | 959 ms | 1.54 s | 1.76 s | – | 10.9 | 60 | 0.0 |
| railway | upload | 10MB | 1.12 s | 2.16 s | 4.69 s | – | 9.3 | 60 | 0.0 |
| neon | upload | 10MB | 1.14 s | 1.19 s | 1.26 s | – | 9.2 | 60 | 0.0 |
| bunny | upload | 10MB | 1.18 s | 3.49 s | 4.95 s | – | 8.9 | 60 | 0.0 |
| aws-s3 | upload | 10MB | 1.24 s | 1.36 s | 1.44 s | – | 8.4 | 60 | 0.0 |
| b2 | upload | 10MB | 1.40 s | 2.03 s | 2.37 s | – | 7.5 | 60 | 0.0 |
| convex | upload | 10MB | 1.45 s | 1.88 s | 2.11 s | – | 7.3 | 60 | 0.0 |
| appwrite | upload | 10MB | 3.05 s | 6.92 s | 11.48 s | – | 3.4 | 60 | 0.0 |
| tigris | upload | 100KB | 162 ms | 324 ms | 785 ms | – | 0.6 | 180 | 0.0 |
| aws-s3 | upload | 100KB | 288 ms | 357 ms | 403 ms | – | 0.4 | 180 | 0.0 |
| neon | upload | 100KB | 342 ms | 402 ms | 443 ms | – | 0.3 | 180 | 0.0 |
| railway | upload | 100KB | 345 ms | 530 ms | 625 ms | – | 0.3 | 180 | 0.0 |
| r2 | upload | 100KB | 355 ms | 534 ms | 646 ms | – | 0.3 | 180 | 0.0 |
| upstash | upload | 100KB | 359 ms | 598 ms | 783 ms | – | 0.3 | 180 | 0.0 |
| bunny | upload | 100KB | 432 ms | 1.15 s | 1.85 s | – | 0.2 | 180 | 0.0 |
| convex | upload | 100KB | 455 ms | 739 ms | 916 ms | – | 0.2 | 180 | 0.0 |
| appwrite | upload | 100KB | 587 ms | 870 ms | 1.45 s | – | 0.2 | 180 | 0.0 |
| b2 | upload | 100KB | 633 ms | 1.20 s | 1.30 s | – | 0.2 | 180 | 0.6 |
| tigris | upload | 100MB | 2.72 s | 4.03 s | 4.44 s | – | 38.6 | 24 | 4.2 |
| r2 | upload | 100MB | 4.17 s | 4.60 s | 4.65 s | – | 25.1 | 24 | 0.0 |
| aws-s3 | upload | 100MB | 5.59 s | 5.89 s | 5.97 s | – | 18.8 | 24 | 0.0 |
| railway | upload | 100MB | 5.80 s | 7.44 s | 9.97 s | – | 18.1 | 24 | 0.0 |
| b2 | upload | 100MB | 7.07 s | 10.12 s | 10.87 s | – | 14.8 | 24 | 0.0 |
| neon | upload | 100MB | 7.31 s | 7.73 s | 7.85 s | – | 14.3 | 24 | 0.0 |
| convex | upload | 100MB | 8.55 s | 10.68 s | 10.77 s | – | 12.3 | 24 | 0.0 |
| appwrite | upload | 100MB | 8.64 s | 21.78 s | 26.35 s | – | 12.1 | 24 | 0.0 |
| bunny | upload | 100MB | 8.83 s | 14.35 s | 22.06 s | – | 11.9 | 24 | 0.0 |
| upstash | upload | 100MB | 12.49 s | 15.65 s | 16.01 s | – | 8.4 | 24 | 0.0 |
| convex | url-get | 1KB | 119 ms | 155 ms | 250 ms | 119 ms | 0.0 | 180 | 0.0 |
| tigris | url-get | 1KB | 139 ms | 305 ms | 515 ms | 139 ms | 0.0 | 180 | 0.0 |
| upstash | url-get | 1KB | 174 ms | 267 ms | 407 ms | 174 ms | 0.0 | 180 | 0.0 |
| appwrite | url-get | 1KB | 181 ms | 436 ms | 491 ms | 181 ms | 0.0 | 180 | 0.0 |
| r2 | url-get | 1KB | 190 ms | 263 ms | 400 ms | 190 ms | 0.0 | 180 | 0.0 |
| b2 | url-get | 1KB | 209 ms | 245 ms | 288 ms | 209 ms | 0.0 | 180 | 0.0 |
| railway | url-get | 1KB | 224 ms | 325 ms | 767 ms | 224 ms | 0.0 | 180 | 0.0 |
| aws-s3 | url-get | 1KB | 227 ms | 243 ms | 260 ms | 227 ms | 0.0 | 180 | 0.0 |
| bunny | url-get | 1KB | 268 ms | 392 ms | 463 ms | 268 ms | 0.0 | 180 | 0.0 |
| neon | url-get | 1KB | 326 ms | 368 ms | 446 ms | 326 ms | 0.0 | 180 | 0.0 |
| convex | url-get | 1MB | 226 ms | 1.03 s | 1.60 s | 124 ms | 4.6 | 90 | 0.0 |
| upstash | url-get | 1MB | 232 ms | 431 ms | 473 ms | 210 ms | 4.5 | 90 | 0.0 |
| r2 | url-get | 1MB | 239 ms | 348 ms | 431 ms | 209 ms | 4.4 | 90 | 0.0 |
| tigris | url-get | 1MB | 318 ms | 496 ms | 1.25 s | 196 ms | 3.3 | 90 | 1.1 |
| railway | url-get | 1MB | 448 ms | 587 ms | 689 ms | 333 ms | 2.3 | 90 | 0.0 |
| aws-s3 | url-get | 1MB | 554 ms | 627 ms | 630 ms | 230 ms | 1.9 | 90 | 0.0 |
| b2 | url-get | 1MB | 600 ms | 634 ms | 673 ms | 238 ms | 1.7 | 90 | 0.0 |
| bunny | url-get | 1MB | 648 ms | 726 ms | 824 ms | 289 ms | 1.6 | 90 | 0.0 |
| appwrite | url-get | 1MB | 664 ms | 1.03 s | 1.17 s | 217 ms | 1.6 | 90 | 0.0 |
| neon | url-get | 1MB | 756 ms | 822 ms | 893 ms | 343 ms | 1.4 | 90 | 0.0 |
| convex | url-get | 10MB | 370 ms | 936 ms | 2.55 s | 125 ms | 28.3 | 60 | 0.0 |
| tigris | url-get | 10MB | 425 ms | 555 ms | 745 ms | 208 ms | 24.7 | 60 | 1.7 |
| railway | url-get | 10MB | 548 ms | 872 ms | 1.04 s | 336 ms | 19.1 | 60 | 0.0 |
| upstash | url-get | 10MB | 613 ms | 922 ms | 1.17 s | 237 ms | 17.1 | 60 | 0.0 |
| r2 | url-get | 10MB | 644 ms | 961 ms | 1.35 s | 251 ms | 16.3 | 60 | 0.0 |
| aws-s3 | url-get | 10MB | 830 ms | 848 ms | 870 ms | 231 ms | 12.6 | 60 | 0.0 |
| bunny | url-get | 10MB | 857 ms | 978 ms | 1.06 s | 284 ms | 12.2 | 60 | 0.0 |
| b2 | url-get | 10MB | 880 ms | 946 ms | 1.80 s | 256 ms | 11.9 | 60 | 1.7 |
| neon | url-get | 10MB | 985 ms | 1.02 s | 1.10 s | 337 ms | 10.6 | 60 | 0.0 |
| appwrite | url-get | 10MB | 1.37 s | 1.70 s | 2.70 s | 609 ms | 7.7 | 60 | 0.0 |
| convex | url-get | 100KB | 145 ms | 498 ms | 615 ms | 123 ms | 0.7 | 180 | 0.0 |
| upstash | url-get | 100KB | 180 ms | 272 ms | 310 ms | 177 ms | 0.6 | 180 | 0.0 |
| r2 | url-get | 100KB | 203 ms | 359 ms | 437 ms | 200 ms | 0.5 | 180 | 0.0 |
| tigris | url-get | 100KB | 217 ms | 350 ms | 472 ms | 159 ms | 0.5 | 180 | 4.4 |
| aws-s3 | url-get | 100KB | 357 ms | 381 ms | 421 ms | 230 ms | 0.3 | 180 | 0.0 |
| railway | url-get | 100KB | 363 ms | 452 ms | 532 ms | 317 ms | 0.3 | 180 | 0.0 |
| b2 | url-get | 100KB | 379 ms | 411 ms | 435 ms | 227 ms | 0.3 | 179 | 0.6 |
| appwrite | url-get | 100KB | 380 ms | 702 ms | 1.36 s | 191 ms | 0.3 | 180 | 0.0 |
| bunny | url-get | 100KB | 441 ms | 556 ms | 687 ms | 290 ms | 0.2 | 180 | 0.0 |
| neon | url-get | 100KB | 534 ms | 579 ms | 598 ms | 329 ms | 0.2 | 180 | 0.0 |
| convex | url-get | 100MB | 1.60 s | 3.66 s | 5.02 s | 134 ms | 65.5 | 24 | 0.0 |
| tigris | url-get | 100MB | 1.73 s | 2.95 s | 3.57 s | 160 ms | 60.5 | 23 | 0.0 |
| railway | url-get | 100MB | 1.74 s | 2.57 s | 8.45 s | 301 ms | 60.1 | 24 | 0.0 |
| neon | url-get | 100MB | 1.99 s | 2.09 s | 2.20 s | 330 ms | 52.8 | 24 | 0.0 |
| bunny | url-get | 100MB | 2.52 s | 7.29 s | 9.15 s | 372 ms | 41.6 | 24 | 0.0 |
| aws-s3 | url-get | 100MB | 2.62 s | 3.66 s | 3.86 s | 235 ms | 40.0 | 24 | 0.0 |
| b2 | url-get | 100MB | 2.82 s | 4.37 s | 11.67 s | 251 ms | 37.2 | 24 | 0.0 |
| appwrite | url-get | 100MB | 3.47 s | 4.57 s | 6.05 s | 416 ms | 30.2 | 24 | 0.0 |
| r2 | url-get | 100MB | 4.08 s | 5.73 s | 6.27 s | 223 ms | 25.7 | 24 | 0.0 |
| upstash | url-get | 100MB | 4.61 s | 7.36 s | 8.88 s | 209 ms | 22.7 | 24 | 0.0 |

## From freestyle-sf

| Provider | Op | Size | p50 | p95 | p99 | TTFB p50 | MB/s p50 | n | fail % |
|---|---|---|---|---|---|---|---|---|---|
| tigris | burst-upload | 32x100KB | 245 ms | 425 ms | 606 ms | – | 13.4 | 20 | 0.0 |
| aws-s3 | burst-upload | 32x100KB | 393 ms | 662 ms | 1.14 s | – | 8.3 | 20 | 0.0 |
| neon | burst-upload | 32x100KB | 469 ms | 1.09 s | 1.39 s | – | 7.0 | 20 | 0.0 |
| railway | burst-upload | 32x100KB | 610 ms | 889 ms | 1.08 s | – | 5.4 | 20 | 0.0 |
| r2 | burst-upload | 32x100KB | 793 ms | – | – | – | 4.1 | 20 | 5.0 |
| upstash | burst-upload | 32x100KB | 798 ms | 1.15 s | 1.89 s | – | 4.1 | 20 | 0.0 |
| convex | burst-upload | 32x100KB | 886 ms | – | – | – | 3.7 | 20 | 15.0 |
| b2 | burst-upload | 32x100KB | 1.31 s | 2.15 s | 2.38 s | – | 2.5 | 20 | 0.0 |
| appwrite | burst-upload | 32x100KB | 1.51 s | 5.82 s | 9.45 s | – | 2.2 | 20 | 0.0 |
| bunny | burst-upload | 32x100KB | 2.34 s | 7.19 s | 9.61 s | – | 1.4 | 20 | 0.0 |
| tigris | concurrent-download | 16x100KB | 41 ms | 83 ms | 86 ms | – | 40.4 | 20 | 0.0 |
| aws-s3 | concurrent-download | 16x100KB | 143 ms | 241 ms | 263 ms | – | 11.4 | 20 | 0.0 |
| neon | concurrent-download | 16x100KB | 209 ms | 459 ms | 544 ms | – | 7.9 | 20 | 0.0 |
| b2 | concurrent-download | 16x100KB | 257 ms | – | – | – | 6.4 | 19 | 5.3 |
| bunny | concurrent-download | 16x100KB | 263 ms | 432 ms | 585 ms | – | 6.2 | 20 | 0.0 |
| railway | concurrent-download | 16x100KB | 313 ms | 831 ms | 3.91 s | – | 5.2 | 20 | 0.0 |
| r2 | concurrent-download | 16x100KB | 360 ms | 2.87 s | 3.21 s | – | 4.5 | 20 | 0.0 |
| upstash | concurrent-download | 16x100KB | 432 ms | – | – | – | 3.8 | 19 | 0.0 |
| convex | concurrent-download | 16x100KB | 575 ms | 787 ms | 881 ms | – | 2.8 | 20 | 0.0 |
| appwrite | concurrent-download | 16x100KB | 673 ms | 966 ms | 2.07 s | – | 2.4 | 20 | 0.0 |
| tigris | concurrent-upload | 16x100KB | 198 ms | 413 ms | 499 ms | – | 8.3 | 20 | 0.0 |
| aws-s3 | concurrent-upload | 16x100KB | 325 ms | 566 ms | 626 ms | – | 5.0 | 20 | 0.0 |
| neon | concurrent-upload | 16x100KB | 479 ms | 802 ms | 803 ms | – | 3.4 | 20 | 0.0 |
| railway | concurrent-upload | 16x100KB | 521 ms | 798 ms | 837 ms | – | 3.1 | 20 | 0.0 |
| r2 | concurrent-upload | 16x100KB | 651 ms | 2.98 s | 3.15 s | – | 2.5 | 20 | 0.0 |
| upstash | concurrent-upload | 16x100KB | 707 ms | – | – | – | 2.3 | 20 | 5.0 |
| convex | concurrent-upload | 16x100KB | 837 ms | 1.34 s | 2.07 s | – | 2.0 | 20 | 0.0 |
| bunny | concurrent-upload | 16x100KB | 1.01 s | 4.42 s | 4.67 s | – | 1.6 | 20 | 0.0 |
| appwrite | concurrent-upload | 16x100KB | 1.09 s | 4.31 s | 4.95 s | – | 1.5 | 20 | 0.0 |
| b2 | concurrent-upload | 16x100KB | 1.43 s | – | – | – | 1.1 | 20 | 5.0 |
| aws-s3 | copy | 10MB | 214 ms | 252 ms | 301 ms | – | – | 39 | 0.0 |
| tigris | copy | 10MB | 284 ms | 452 ms | 542 ms | – | – | 40 | 0.0 |
| neon | copy | 10MB | 320 ms | 439 ms | 464 ms | – | – | 40 | 0.0 |
| railway | copy | 10MB | 533 ms | 701 ms | 797 ms | – | – | 40 | 0.0 |
| bunny | copy | 10MB | 553 ms | 1.53 s | 5.46 s | – | – | 40 | 0.0 |
| b2 | copy | 10MB | 854 ms | 2.21 s | 3.35 s | – | – | 40 | 0.0 |
| r2 | copy | 10MB | 1.40 s | 2.40 s | 2.53 s | – | – | 40 | 0.0 |
| upstash | copy | 10MB | 1.53 s | 2.44 s | 18.49 s | – | – | 40 | 0.0 |
| tigris | delete | 1KB | 33 ms | 98 ms | 197 ms | – | – | 180 | 0.0 |
| b2 | delete | 1KB | 71 ms | 102 ms | 155 ms | – | – | 178 | 0.0 |
| aws-s3 | delete | 1KB | 82 ms | 118 ms | 128 ms | – | – | 180 | 0.0 |
| neon | delete | 1KB | 99 ms | 136 ms | 176 ms | – | – | 180 | 0.0 |
| convex | delete | 1KB | 109 ms | 161 ms | 249 ms | – | – | 179 | 0.0 |
| railway | delete | 1KB | 115 ms | 210 ms | 232 ms | – | – | 120 | 0.8 |
| r2 | delete | 1KB | 151 ms | 241 ms | 370 ms | – | – | 180 | 0.0 |
| bunny | delete | 1KB | 164 ms | 543 ms | 2.30 s | – | – | 180 | 0.0 |
| upstash | delete | 1KB | 168 ms | 310 ms | 637 ms | – | – | 179 | 0.0 |
| appwrite | delete | 1KB | 169 ms | 225 ms | 577 ms | – | – | 179 | 0.0 |
| tigris | delete | 1MB | 30 ms | 70 ms | 82 ms | – | – | 90 | 0.0 |
| b2 | delete | 1MB | 71 ms | 86 ms | 112 ms | – | – | 89 | 0.0 |
| aws-s3 | delete | 1MB | 82 ms | 92 ms | 122 ms | – | – | 88 | 0.0 |
| neon | delete | 1MB | 96 ms | 116 ms | 2.24 s | – | – | 90 | 0.0 |
| convex | delete | 1MB | 106 ms | 146 ms | 370 ms | – | – | 90 | 0.0 |
| r2 | delete | 1MB | 157 ms | 228 ms | 287 ms | – | – | 89 | 0.0 |
| upstash | delete | 1MB | 164 ms | 319 ms | 358 ms | – | – | 90 | 0.0 |
| appwrite | delete | 1MB | 168 ms | 353 ms | 650 ms | – | – | 90 | 0.0 |
| railway | delete | 1MB | 169 ms | 236 ms | 333 ms | – | – | 60 | 0.0 |
| bunny | delete | 1MB | 173 ms | 1.42 s | 4.42 s | – | – | 90 | 0.0 |
| tigris | delete | 10MB | 36 ms | 97 ms | 550 ms | – | – | 56 | 0.0 |
| b2 | delete | 10MB | 71 ms | 110 ms | 362 ms | – | – | 60 | 0.0 |
| aws-s3 | delete | 10MB | 82 ms | 91 ms | 94 ms | – | – | 60 | 0.0 |
| neon | delete | 10MB | 101 ms | 121 ms | 242 ms | – | – | 60 | 0.0 |
| convex | delete | 10MB | 109 ms | 263 ms | 395 ms | – | – | 60 | 0.0 |
| r2 | delete | 10MB | 161 ms | 264 ms | 1.37 s | – | – | 60 | 0.0 |
| appwrite | delete | 10MB | 166 ms | 292 ms | 388 ms | – | – | 60 | 0.0 |
| bunny | delete | 10MB | 173 ms | 1.78 s | 2.19 s | – | – | 60 | 0.0 |
| upstash | delete | 10MB | 174 ms | 425 ms | 2.10 s | – | – | 59 | 0.0 |
| railway | delete | 10MB | 179 ms | 211 ms | 327 ms | – | – | 40 | 0.0 |
| tigris | delete | 100KB | 31 ms | 102 ms | 162 ms | – | – | 178 | 0.0 |
| b2 | delete | 100KB | 71 ms | 119 ms | 228 ms | – | – | 180 | 0.6 |
| aws-s3 | delete | 100KB | 83 ms | 104 ms | 121 ms | – | – | 179 | 0.0 |
| neon | delete | 100KB | 97 ms | 237 ms | 321 ms | – | – | 180 | 0.0 |
| convex | delete | 100KB | 111 ms | 188 ms | 360 ms | – | – | 180 | 0.0 |
| upstash | delete | 100KB | 163 ms | 284 ms | 598 ms | – | – | 178 | 0.0 |
| appwrite | delete | 100KB | 166 ms | 229 ms | 1.08 s | – | – | 180 | 0.0 |
| r2 | delete | 100KB | 172 ms | 316 ms | 531 ms | – | – | 180 | 0.0 |
| bunny | delete | 100KB | 173 ms | 1.47 s | 4.15 s | – | – | 180 | 0.0 |
| railway | delete | 100KB | 178 ms | 224 ms | 337 ms | – | – | 120 | 0.0 |
| tigris | delete | 100MB | 40 ms | 105 ms | 121 ms | – | – | 22 | 0.0 |
| b2 | delete | 100MB | 70 ms | 77 ms | 182 ms | – | – | 21 | 0.0 |
| aws-s3 | delete | 100MB | 89 ms | 96 ms | 129 ms | – | – | 23 | 0.0 |
| railway | delete | 100MB | 102 ms | – | – | – | – | 16 | 0.0 |
| neon | delete | 100MB | 103 ms | 141 ms | 229 ms | – | – | 23 | 0.0 |
| convex | delete | 100MB | 113 ms | 213 ms | 291 ms | – | – | 24 | 0.0 |
| r2 | delete | 100MB | 168 ms | 295 ms | 2.89 s | – | – | 23 | 0.0 |
| appwrite | delete | 100MB | 168 ms | 225 ms | 235 ms | – | – | 24 | 0.0 |
| upstash | delete | 100MB | 175 ms | 250 ms | 398 ms | – | – | 22 | 0.0 |
| bunny | delete | 100MB | 1.54 s | 2.21 s | 3.13 s | – | – | 23 | 0.0 |
| tigris | download | 1KB | 10 ms | 44 ms | 119 ms | 10 ms | 0.1 | 180 | 0.0 |
| b2 | download | 1KB | 76 ms | 104 ms | 357 ms | 76 ms | 0.0 | 178 | 0.0 |
| aws-s3 | download | 1KB | 87 ms | 124 ms | 149 ms | 87 ms | 0.0 | 180 | 0.6 |
| railway | download | 1KB | 100 ms | 213 ms | 433 ms | 100 ms | 0.0 | 120 | 0.0 |
| neon | download | 1KB | 113 ms | 153 ms | 249 ms | 112 ms | 0.0 | 180 | 0.0 |
| bunny | download | 1KB | 123 ms | 233 ms | 270 ms | 123 ms | 0.0 | 180 | 0.0 |
| appwrite | download | 1KB | 189 ms | 426 ms | 2.29 s | 189 ms | 0.0 | 179 | 0.0 |
| convex | download | 1KB | 231 ms | 343 ms | 448 ms | 231 ms | 0.0 | 179 | 0.0 |
| r2 | download | 1KB | 233 ms | 347 ms | 430 ms | 233 ms | 0.0 | 180 | 0.0 |
| upstash | download | 1KB | 275 ms | 476 ms | 2.29 s | 275 ms | 0.0 | 179 | 0.0 |
| tigris | download | 1MB | 87 ms | 243 ms | 392 ms | 52 ms | 12.0 | 90 | 0.0 |
| aws-s3 | download | 1MB | 105 ms | 411 ms | 455 ms | 87 ms | 10.0 | 88 | 0.0 |
| neon | download | 1MB | 149 ms | 529 ms | 4.87 s | 111 ms | 7.0 | 90 | 0.0 |
| bunny | download | 1MB | 169 ms | 498 ms | 561 ms | 124 ms | 6.2 | 90 | 0.0 |
| railway | download | 1MB | 234 ms | 507 ms | 2.33 s | 215 ms | 4.5 | 60 | 0.0 |
| r2 | download | 1MB | 324 ms | 516 ms | 578 ms | 255 ms | 3.2 | 89 | 0.0 |
| upstash | download | 1MB | 380 ms | 607 ms | 977 ms | 298 ms | 2.8 | 90 | 0.0 |
| b2 | download | 1MB | 452 ms | 510 ms | 593 ms | 109 ms | 2.3 | 89 | 0.0 |
| appwrite | download | 1MB | 541 ms | 858 ms | 2.98 s | 540 ms | 1.9 | 90 | 0.0 |
| convex | download | 1MB | 617 ms | 848 ms | 4.02 s | 237 ms | 1.7 | 90 | 0.0 |
| tigris | download | 10MB | 281 ms | 657 ms | 2.78 s | 77 ms | 37.3 | 56 | 0.0 |
| bunny | download | 10MB | 390 ms | 935 ms | 1.00 s | 132 ms | 26.9 | 60 | 0.0 |
| railway | download | 10MB | 478 ms | 745 ms | 1.02 s | 275 ms | 21.9 | 40 | 0.0 |
| aws-s3 | download | 10MB | 678 ms | 1.93 s | 2.40 s | 88 ms | 15.5 | 60 | 0.0 |
| convex | download | 10MB | 731 ms | 2.26 s | 4.77 s | 240 ms | 14.3 | 60 | 0.0 |
| b2 | download | 10MB | 747 ms | 835 ms | 924 ms | 117 ms | 14.0 | 60 | 0.0 |
| r2 | download | 10MB | 849 ms | 1.10 s | 23.70 s | 264 ms | 12.4 | 60 | 0.0 |
| neon | download | 10MB | 890 ms | 1.42 s | 1.64 s | 117 ms | 11.8 | 60 | 0.0 |
| upstash | download | 10MB | 929 ms | 1.44 s | 3.74 s | 322 ms | 11.3 | 59 | 0.0 |
| appwrite | download | 10MB | 1.07 s | 1.47 s | 1.83 s | 1.06 s | 9.8 | 60 | 0.0 |
| tigris | download | 100KB | 14 ms | 45 ms | 88 ms | 12 ms | 7.2 | 178 | 0.0 |
| aws-s3 | download | 100KB | 90 ms | 218 ms | 303 ms | 88 ms | 1.1 | 179 | 0.0 |
| neon | download | 100KB | 114 ms | 342 ms | 785 ms | 112 ms | 0.9 | 180 | 0.0 |
| bunny | download | 100KB | 154 ms | 315 ms | 416 ms | 123 ms | 0.7 | 180 | 0.0 |
| railway | download | 100KB | 209 ms | 333 ms | 471 ms | 192 ms | 0.5 | 120 | 0.0 |
| b2 | download | 100KB | 231 ms | 294 ms | 2.08 s | 100 ms | 0.4 | 180 | 0.0 |
| r2 | download | 100KB | 252 ms | 415 ms | 566 ms | 250 ms | 0.4 | 180 | 0.0 |
| upstash | download | 100KB | 282 ms | 489 ms | 636 ms | 274 ms | 0.4 | 178 | 0.6 |
| appwrite | download | 100KB | 336 ms | 457 ms | 965 ms | 336 ms | 0.3 | 180 | 0.0 |
| convex | download | 100KB | 437 ms | 562 ms | 752 ms | 242 ms | 0.2 | 180 | 0.0 |
| tigris | download | 100MB | 1.74 s | 8.68 s | 26.25 s | 66 ms | 60.3 | 22 | 0.0 |
| railway | download | 100MB | 2.02 s | – | – | 233 ms | 51.8 | 16 | 0.0 |
| convex | download | 100MB | 2.40 s | 5.38 s | 5.54 s | 273 ms | 43.6 | 24 | 0.0 |
| bunny | download | 100MB | 3.02 s | 5.22 s | 7.38 s | 211 ms | 34.7 | 23 | 0.0 |
| b2 | download | 100MB | 3.32 s | 4.85 s | 5.50 s | 133 ms | 31.6 | 21 | 0.0 |
| appwrite | download | 100MB | 3.42 s | 4.28 s | 4.87 s | 3.24 s | 30.7 | 24 | 0.0 |
| aws-s3 | download | 100MB | 3.72 s | 8.06 s | 25.01 s | 127 ms | 28.2 | 23 | 0.0 |
| neon | download | 100MB | 5.15 s | 43.21 s | 50.16 s | 115 ms | 20.4 | 23 | 0.0 |
| r2 | download | 100MB | 6.03 s | 12.27 s | 14.33 s | 341 ms | 17.4 | 23 | 4.3 |
| upstash | download | 100MB | 6.91 s | 10.44 s | 11.39 s | 422 ms | 15.2 | 22 | 0.0 |
| tigris | first-request | 1KB | 62 ms | 199 ms | 264 ms | – | – | 40 | 0.0 |
| appwrite | first-request | 1KB | 111 ms | 141 ms | 195 ms | – | – | 40 | 0.0 |
| convex | first-request | 1KB | 137 ms | 237 ms | 345 ms | – | – | 40 | 0.0 |
| upstash | first-request | 1KB | 153 ms | 414 ms | 3.48 s | – | – | 40 | 0.0 |
| r2 | first-request | 1KB | 168 ms | 251 ms | 3.27 s | – | – | 40 | 0.0 |
| railway | first-request | 1KB | 198 ms | 361 ms | 807 ms | – | – | 40 | 0.0 |
| b2 | first-request | 1KB | 210 ms | 252 ms | 399 ms | – | – | 40 | 0.0 |
| aws-s3 | first-request | 1KB | 226 ms | 264 ms | 3.35 s | – | – | 40 | 0.0 |
| bunny | first-request | 1KB | 232 ms | 293 ms | 365 ms | – | – | 40 | 0.0 |
| neon | first-request | 1KB | 329 ms | 389 ms | 22.44 s | – | – | 40 | 0.0 |
| tigris | head | 1KB | 8 ms | 40 ms | 66 ms | – | – | 180 | 0.0 |
| b2 | head | 1KB | 70 ms | 98 ms | 154 ms | – | – | 178 | 0.0 |
| aws-s3 | head | 1KB | 75 ms | 115 ms | 231 ms | – | – | 180 | 0.0 |
| neon | head | 1KB | 85 ms | 117 ms | 128 ms | – | – | 180 | 0.0 |
| bunny | head | 1KB | 85 ms | 167 ms | 240 ms | – | – | 180 | 0.0 |
| appwrite | head | 1KB | 96 ms | 141 ms | 257 ms | – | – | 179 | 0.0 |
| railway | head | 1KB | 107 ms | 192 ms | 652 ms | – | – | 120 | 0.0 |
| convex | head | 1KB | 108 ms | 233 ms | 308 ms | – | – | 179 | 0.0 |
| r2 | head | 1KB | 114 ms | 183 ms | 301 ms | – | – | 180 | 0.0 |
| upstash | head | 1KB | 134 ms | 259 ms | 374 ms | – | – | 179 | 0.0 |
| tigris | head | 1MB | 8 ms | 14 ms | 27 ms | – | – | 90 | 0.0 |
| b2 | head | 1MB | 70 ms | 89 ms | 140 ms | – | – | 89 | 0.0 |
| aws-s3 | head | 1MB | 74 ms | 91 ms | 237 ms | – | – | 88 | 0.0 |
| bunny | head | 1MB | 82 ms | 144 ms | 189 ms | – | – | 90 | 0.0 |
| neon | head | 1MB | 84 ms | 112 ms | 296 ms | – | – | 90 | 0.0 |
| appwrite | head | 1MB | 94 ms | 123 ms | 201 ms | – | – | 90 | 0.0 |
| railway | head | 1MB | 98 ms | 208 ms | 284 ms | – | – | 60 | 0.0 |
| convex | head | 1MB | 109 ms | 172 ms | 446 ms | – | – | 90 | 0.0 |
| r2 | head | 1MB | 117 ms | 223 ms | 398 ms | – | – | 89 | 0.0 |
| upstash | head | 1MB | 131 ms | 221 ms | 310 ms | – | – | 90 | 0.0 |
| tigris | head | 10MB | 13 ms | 117 ms | 202 ms | – | – | 56 | 1.8 |
| bunny | head | 10MB | 83 ms | 243 ms | 255 ms | – | – | 60 | 0.0 |
| neon | head | 10MB | 87 ms | 332 ms | 432 ms | – | – | 60 | 0.0 |
| appwrite | head | 10MB | 95 ms | 136 ms | 318 ms | – | – | 60 | 0.0 |
| convex | head | 10MB | 109 ms | 188 ms | 294 ms | – | – | 60 | 0.0 |
| r2 | head | 10MB | 123 ms | 268 ms | 11.31 s | – | – | 60 | 0.0 |
| upstash | head | 10MB | 133 ms | 253 ms | 337 ms | – | – | 59 | 0.0 |
| railway | head | 10MB | 170 ms | 296 ms | 436 ms | – | – | 40 | 0.0 |
| b2 | head | 10MB | 216 ms | 304 ms | 2.50 s | – | – | 60 | 0.0 |
| aws-s3 | head | 10MB | 227 ms | 271 ms | 317 ms | – | – | 60 | 0.0 |
| tigris | head | 100KB | 8 ms | 29 ms | 60 ms | – | – | 178 | 0.0 |
| b2 | head | 100KB | 69 ms | 102 ms | 144 ms | – | – | 180 | 0.0 |
| aws-s3 | head | 100KB | 75 ms | 102 ms | 156 ms | – | – | 179 | 0.6 |
| neon | head | 100KB | 84 ms | 124 ms | 172 ms | – | – | 180 | 0.0 |
| bunny | head | 100KB | 90 ms | 174 ms | 214 ms | – | – | 180 | 0.0 |
| appwrite | head | 100KB | 95 ms | 132 ms | 611 ms | – | – | 180 | 0.0 |
| convex | head | 100KB | 109 ms | 160 ms | 444 ms | – | – | 180 | 0.0 |
| upstash | head | 100KB | 128 ms | 218 ms | 348 ms | – | – | 178 | 0.0 |
| r2 | head | 100KB | 141 ms | 266 ms | 384 ms | – | – | 180 | 0.0 |
| railway | head | 100KB | 153 ms | 234 ms | 899 ms | – | – | 120 | 0.0 |
| tigris | head | 100MB | 22 ms | 37 ms | 42 ms | – | – | 22 | 0.0 |
| b2 | head | 100MB | 70 ms | 103 ms | 121 ms | – | – | 21 | 0.0 |
| aws-s3 | head | 100MB | 73 ms | 75 ms | 81 ms | – | – | 23 | 0.0 |
| bunny | head | 100MB | 83 ms | 154 ms | 213 ms | – | – | 23 | 0.0 |
| neon | head | 100MB | 88 ms | 98 ms | 105 ms | – | – | 23 | 0.0 |
| railway | head | 100MB | 91 ms | – | – | – | – | 16 | 0.0 |
| appwrite | head | 100MB | 97 ms | 6.97 s | 22.33 s | – | – | 24 | 0.0 |
| upstash | head | 100MB | 122 ms | 184 ms | 237 ms | – | – | 22 | 0.0 |
| r2 | head | 100MB | 129 ms | 190 ms | 225 ms | – | – | 23 | 0.0 |
| convex | head | 100MB | 166 ms | 341 ms | 4.38 s | – | – | 24 | 0.0 |
| tigris | list-all | 1000 objects | 56 ms | – | – | – | – | 12 | 0.0 |
| aws-s3 | list-all | 1000 objects | 143 ms | – | – | – | – | 12 | 0.0 |
| railway | list-all | 1000 objects | 146 ms | – | – | – | – | 12 | 0.0 |
| neon | list-all | 1000 objects | 188 ms | – | – | – | – | 12 | 0.0 |
| b2 | list-all | 1000 objects | 476 ms | – | – | – | – | 12 | 8.3 |
| bunny | list-all | 1000 objects | 561 ms | – | – | – | – | 12 | 0.0 |
| r2 | list-all | 1000 objects | 671 ms | – | – | – | – | 12 | 0.0 |
| upstash | list-all | 1000 objects | 671 ms | – | – | – | – | 12 | 0.0 |
| appwrite | list-all | 1000 objects | 1.53 s | – | – | – | – | 12 | 0.0 |
| tigris | range-get | 256KB of 10MB | 113 ms | 315 ms | 401 ms | 101 ms | – | 40 | 0.0 |
| neon | range-get | 256KB of 10MB | 122 ms | 396 ms | 420 ms | 112 ms | – | 40 | 0.0 |
| bunny | range-get | 256KB of 10MB | 210 ms | 484 ms | 526 ms | 176 ms | – | 40 | 0.0 |
| railway | range-get | 256KB of 10MB | 219 ms | 461 ms | 618 ms | 211 ms | – | 40 | 0.0 |
| aws-s3 | range-get | 256KB of 10MB | 271 ms | 361 ms | 548 ms | 90 ms | – | 39 | 0.0 |
| b2 | range-get | 256KB of 10MB | 331 ms | 386 ms | 476 ms | 114 ms | – | 40 | 0.0 |
| r2 | range-get | 256KB of 10MB | 337 ms | 595 ms | 615 ms | 298 ms | – | 40 | 0.0 |
| convex | range-get | 256KB of 10MB | 464 ms | 584 ms | 611 ms | 251 ms | – | 40 | 0.0 |
| tigris | signed-upload | 1MB | 230 ms | 480 ms | 7.09 s | – | – | 40 | 5.0 |
| upstash | signed-upload | 1MB | 469 ms | 933 ms | 987 ms | – | – | 40 | 0.0 |
| r2 | signed-upload | 1MB | 493 ms | 749 ms | 4.39 s | – | – | 40 | 0.0 |
| railway | signed-upload | 1MB | 608 ms | 893 ms | 1.43 s | – | – | 40 | 0.0 |
| b2 | signed-upload | 1MB | 632 ms | 704 ms | 861 ms | – | – | 40 | 0.0 |
| aws-s3 | signed-upload | 1MB | 758 ms | 1.31 s | 5.85 s | – | – | 40 | 0.0 |
| bunny | signed-upload | 1MB | 824 ms | 1.28 s | 2.40 s | – | – | 40 | 0.0 |
| neon | signed-upload | 1MB | 844 ms | 1.18 s | 1.45 s | – | – | 40 | 0.0 |
| tigris | upload | 1KB | 26 ms | 166 ms | 1.30 s | – | 0.0 | 180 | 0.0 |
| aws-s3 | upload | 1KB | 90 ms | 248 ms | 5.27 s | – | 0.0 | 180 | 0.0 |
| neon | upload | 1KB | 151 ms | 483 ms | 38.65 s | – | 0.0 | 180 | 0.0 |
| railway | upload | 1KB | 169 ms | 236 ms | 397 ms | – | 0.0 | 120 | 0.0 |
| bunny | upload | 1KB | 310 ms | 876 ms | 5.48 s | – | 0.0 | 180 | 0.0 |
| r2 | upload | 1KB | 342 ms | 512 ms | 573 ms | – | 0.0 | 180 | 0.0 |
| upstash | upload | 1KB | 389 ms | 831 ms | 2.49 s | – | 0.0 | 180 | 0.6 |
| b2 | upload | 1KB | 425 ms | 974 ms | 5.35 s | – | 0.0 | 180 | 1.1 |
| appwrite | upload | 1KB | 436 ms | 694 ms | 5.56 s | – | 0.0 | 180 | 0.6 |
| convex | upload | 1KB | 475 ms | 805 ms | 5.55 s | – | 0.0 | 180 | 0.6 |
| tigris | upload | 1MB | 124 ms | 355 ms | 3.02 s | – | 8.5 | 90 | 0.0 |
| railway | upload | 1MB | 420 ms | 809 ms | 11.64 s | – | 2.5 | 60 | 0.0 |
| r2 | upload | 1MB | 427 ms | 708 ms | 879 ms | – | 2.5 | 90 | 1.1 |
| aws-s3 | upload | 1MB | 484 ms | 975 ms | 1.17 s | – | 2.2 | 90 | 2.2 |
| upstash | upload | 1MB | 486 ms | 814 ms | 1.04 s | – | 2.2 | 90 | 0.0 |
| neon | upload | 1MB | 617 ms | 1.04 s | 1.45 s | – | 1.7 | 90 | 0.0 |
| b2 | upload | 1MB | 632 ms | 813 ms | 1.72 s | – | 1.7 | 90 | 1.1 |
| bunny | upload | 1MB | 692 ms | 1.63 s | 2.84 s | – | 1.5 | 90 | 0.0 |
| convex | upload | 1MB | 731 ms | 1.30 s | 6.24 s | – | 1.4 | 90 | 0.0 |
| appwrite | upload | 1MB | 817 ms | 2.60 s | 5.97 s | – | 1.3 | 90 | 0.0 |
| tigris | upload | 10MB | 490 ms | 806 ms | 3.47 s | – | 21.4 | 60 | 6.7 |
| railway | upload | 10MB | 984 ms | 2.66 s | 5.56 s | – | 10.7 | 40 | 0.0 |
| upstash | upload | 10MB | 995 ms | 1.81 s | 3.25 s | – | 10.5 | 60 | 1.7 |
| r2 | upload | 10MB | 1.05 s | 1.88 s | 3.76 s | – | 10.0 | 60 | 0.0 |
| aws-s3 | upload | 10MB | 1.23 s | 3.04 s | 4.04 s | – | 8.5 | 60 | 0.0 |
| neon | upload | 10MB | 1.27 s | 3.78 s | 4.74 s | – | 8.3 | 60 | 0.0 |
| bunny | upload | 10MB | 1.31 s | 4.25 s | 12.94 s | – | 8.0 | 60 | 0.0 |
| b2 | upload | 10MB | 1.37 s | 2.66 s | 4.77 s | – | 7.6 | 60 | 0.0 |
| convex | upload | 10MB | 1.57 s | 1.96 s | 6.65 s | – | 6.7 | 60 | 0.0 |
| appwrite | upload | 10MB | 2.80 s | 18.61 s | 32.70 s | – | 3.7 | 60 | 0.0 |
| tigris | upload | 100KB | 105 ms | 306 ms | 531 ms | – | 1.0 | 180 | 1.1 |
| aws-s3 | upload | 100KB | 280 ms | 437 ms | 578 ms | – | 0.4 | 180 | 0.6 |
| railway | upload | 100KB | 314 ms | 541 ms | 740 ms | – | 0.3 | 120 | 0.0 |
| neon | upload | 100KB | 356 ms | 631 ms | 2.35 s | – | 0.3 | 180 | 0.0 |
| r2 | upload | 100KB | 396 ms | 697 ms | 3.81 s | – | 0.3 | 180 | 0.0 |
| upstash | upload | 100KB | 408 ms | 832 ms | 5.44 s | – | 0.3 | 180 | 1.1 |
| bunny | upload | 100KB | 487 ms | 2.07 s | 6.22 s | – | 0.2 | 180 | 0.0 |
| appwrite | upload | 100KB | 540 ms | 835 ms | 1.73 s | – | 0.2 | 180 | 0.0 |
| convex | upload | 100KB | 543 ms | 903 ms | 4.93 s | – | 0.2 | 180 | 0.0 |
| b2 | upload | 100KB | 652 ms | 1.17 s | 1.98 s | – | 0.2 | 180 | 0.0 |
| tigris | upload | 100MB | 2.39 s | 3.46 s | 16.66 s | – | 43.8 | 23 | 4.3 |
| r2 | upload | 100MB | 4.55 s | 7.66 s | 19.71 s | – | 23.1 | 23 | 0.0 |
| railway | upload | 100MB | 5.47 s | – | – | – | 19.2 | 16 | 0.0 |
| b2 | upload | 100MB | 7.54 s | 13.14 s | 13.77 s | – | 13.9 | 23 | 8.7 |
| appwrite | upload | 100MB | 8.10 s | 17.61 s | 31.23 s | – | 12.9 | 24 | 0.0 |
| convex | upload | 100MB | 8.88 s | 9.61 s | 9.68 s | – | 11.8 | 24 | 0.0 |
| aws-s3 | upload | 100MB | 9.93 s | 25.48 s | 33.98 s | – | 10.6 | 23 | 0.0 |
| neon | upload | 100MB | 9.99 s | 11.80 s | 27.44 s | – | 10.5 | 23 | 0.0 |
| bunny | upload | 100MB | 12.43 s | 47.28 s | 62.44 s | – | 8.4 | 23 | 0.0 |
| upstash | upload | 100MB | 13.41 s | 26.38 s | 51.84 s | – | 7.8 | 23 | 4.3 |
| tigris | url-get | 1KB | 110 ms | 290 ms | 393 ms | 110 ms | 0.0 | 180 | 2.8 |
| convex | url-get | 1KB | 125 ms | 187 ms | 293 ms | 125 ms | 0.0 | 179 | 0.0 |
| appwrite | url-get | 1KB | 167 ms | 224 ms | 368 ms | 167 ms | 0.0 | 179 | 0.0 |
| upstash | url-get | 1KB | 180 ms | 314 ms | 439 ms | 180 ms | 0.0 | 179 | 1.1 |
| railway | url-get | 1KB | 190 ms | 437 ms | 4.44 s | 190 ms | 0.0 | 120 | 0.8 |
| r2 | url-get | 1KB | 208 ms | 377 ms | 2.01 s | 208 ms | 0.0 | 180 | 0.6 |
| b2 | url-get | 1KB | 220 ms | 316 ms | 2.13 s | 220 ms | 0.0 | 178 | 0.0 |
| aws-s3 | url-get | 1KB | 232 ms | 383 ms | 5.24 s | 231 ms | 0.0 | 180 | 0.0 |
| bunny | url-get | 1KB | 310 ms | 488 ms | 1.96 s | 310 ms | 0.0 | 180 | 0.0 |
| neon | url-get | 1KB | 362 ms | 518 ms | 1.63 s | 361 ms | 0.0 | 180 | 0.0 |
| convex | url-get | 1MB | 198 ms | 588 ms | 658 ms | 125 ms | 5.3 | 90 | 0.0 |
| tigris | url-get | 1MB | 201 ms | 471 ms | 1.46 s | 163 ms | 5.2 | 90 | 0.0 |
| upstash | url-get | 1MB | 231 ms | 403 ms | 589 ms | 206 ms | 4.5 | 90 | 0.0 |
| r2 | url-get | 1MB | 273 ms | 517 ms | 3.44 s | 241 ms | 3.8 | 89 | 0.0 |
| railway | url-get | 1MB | 316 ms | 441 ms | 931 ms | 287 ms | 3.3 | 60 | 0.0 |
| appwrite | url-get | 1MB | 431 ms | 683 ms | 1.17 s | 196 ms | 2.4 | 90 | 0.0 |
| aws-s3 | url-get | 1MB | 552 ms | 609 ms | 670 ms | 234 ms | 1.9 | 88 | 0.0 |
| b2 | url-get | 1MB | 622 ms | 702 ms | 776 ms | 254 ms | 1.7 | 89 | 0.0 |
| bunny | url-get | 1MB | 692 ms | 838 ms | 1.03 s | 309 ms | 1.5 | 90 | 0.0 |
| neon | url-get | 1MB | 788 ms | 1.04 s | 1.89 s | 373 ms | 1.3 | 90 | 1.1 |
| tigris | url-get | 10MB | 423 ms | 876 ms | 1.15 s | 191 ms | 24.8 | 56 | 0.0 |
| convex | url-get | 10MB | 452 ms | 1.00 s | 1.82 s | 124 ms | 23.2 | 60 | 0.0 |
| railway | url-get | 10MB | 474 ms | 892 ms | 1.03 s | 300 ms | 22.1 | 40 | 0.0 |
| upstash | url-get | 10MB | 751 ms | 1.78 s | 2.52 s | 270 ms | 14.0 | 59 | 0.0 |
| r2 | url-get | 10MB | 779 ms | 1.38 s | 6.68 s | 289 ms | 13.5 | 60 | 0.0 |
| aws-s3 | url-get | 10MB | 848 ms | 2.10 s | 2.84 s | 236 ms | 12.4 | 60 | 0.0 |
| b2 | url-get | 10MB | 918 ms | 1.39 s | 7.30 s | 271 ms | 11.4 | 60 | 0.0 |
| bunny | url-get | 10MB | 988 ms | 1.24 s | 1.48 s | 310 ms | 10.6 | 60 | 0.0 |
| appwrite | url-get | 10MB | 992 ms | 1.56 s | 1.74 s | 548 ms | 10.6 | 60 | 0.0 |
| neon | url-get | 10MB | 1.27 s | 5.15 s | 5.91 s | 372 ms | 8.3 | 60 | 0.0 |
| tigris | url-get | 100KB | 140 ms | 464 ms | 5.18 s | 130 ms | 0.7 | 178 | 0.0 |
| convex | url-get | 100KB | 150 ms | 348 ms | 419 ms | 125 ms | 0.7 | 180 | 0.0 |
| upstash | url-get | 100KB | 193 ms | 313 ms | 449 ms | 191 ms | 0.5 | 178 | 1.1 |
| r2 | url-get | 100KB | 225 ms | 362 ms | 580 ms | 220 ms | 0.5 | 180 | 0.0 |
| railway | url-get | 100KB | 298 ms | 536 ms | 1.07 s | 286 ms | 0.3 | 120 | 0.8 |
| appwrite | url-get | 100KB | 325 ms | 386 ms | 622 ms | 167 ms | 0.3 | 180 | 0.0 |
| aws-s3 | url-get | 100KB | 358 ms | 472 ms | 685 ms | 234 ms | 0.3 | 179 | 0.0 |
| b2 | url-get | 100KB | 394 ms | 628 ms | 5.56 s | 243 ms | 0.3 | 180 | 0.0 |
| bunny | url-get | 100KB | 463 ms | 639 ms | 1.90 s | 309 ms | 0.2 | 180 | 0.0 |
| neon | url-get | 100KB | 573 ms | 789 ms | 896 ms | 366 ms | 0.2 | 180 | 0.6 |
| tigris | url-get | 100MB | 1.59 s | 1.88 s | 2.01 s | 96 ms | 65.9 | 22 | 0.0 |
| convex | url-get | 100MB | 1.79 s | 3.33 s | 4.47 s | 129 ms | 58.6 | 24 | 0.0 |
| railway | url-get | 100MB | 1.83 s | – | – | 271 ms | 57.3 | 16 | 0.0 |
| aws-s3 | url-get | 100MB | 3.10 s | 4.56 s | 5.95 s | 254 ms | 33.9 | 23 | 0.0 |
| appwrite | url-get | 100MB | 3.25 s | 7.62 s | 52.90 s | 380 ms | 32.2 | 24 | 0.0 |
| b2 | url-get | 100MB | 3.37 s | 4.64 s | 4.69 s | 266 ms | 31.1 | 21 | 4.8 |
| bunny | url-get | 100MB | 3.66 s | 7.38 s | 10.28 s | 432 ms | 28.7 | 23 | 0.0 |
| upstash | url-get | 100MB | 5.59 s | 9.19 s | 11.43 s | 257 ms | 18.8 | 22 | 0.0 |
| r2 | url-get | 100MB | 5.60 s | 8.13 s | 12.20 s | 307 ms | 18.7 | 23 | 0.0 |
| neon | url-get | 100MB | 6.10 s | 30.35 s | 51.79 s | 429 ms | 17.2 | 23 | 0.0 |

## From railway-ashburn

| Provider | Op | Size | p50 | p95 | p99 | TTFB p50 | MB/s p50 | n | fail % |
|---|---|---|---|---|---|---|---|---|---|
| aws-s3 | burst-upload | 32x100KB | 129 ms | 200 ms | 227 ms | – | 25.5 | 30 | 0.0 |
| railway | burst-upload | 32x100KB | 184 ms | 287 ms | 453 ms | – | 17.8 | 30 | 0.0 |
| tigris | burst-upload | 32x100KB | 185 ms | 290 ms | 309 ms | – | 17.8 | 30 | 0.0 |
| neon | burst-upload | 32x100KB | 241 ms | 425 ms | 506 ms | – | 13.6 | 30 | 3.3 |
| r2 | burst-upload | 32x100KB | 416 ms | 770 ms | 1.39 s | – | 7.9 | 30 | 0.0 |
| upstash | burst-upload | 32x100KB | 524 ms | 719 ms | 767 ms | – | 6.2 | 30 | 0.0 |
| convex | burst-upload | 32x100KB | 608 ms | 937 ms | 1.39 s | – | 5.4 | 30 | 0.0 |
| b2 | burst-upload | 32x100KB | 1.02 s | 1.82 s | 2.01 s | – | 3.2 | 30 | 0.0 |
| appwrite | burst-upload | 32x100KB | 1.13 s | 1.66 s | 1.84 s | – | 2.9 | 30 | 0.0 |
| bunny | burst-upload | 32x100KB | 2.78 s | 5.91 s | 7.43 s | – | 1.2 | 30 | 0.0 |
| tigris | concurrent-download | 16x100KB | 35 ms | 86 ms | 191 ms | – | 47.2 | 30 | 0.0 |
| b2 | concurrent-download | 16x100KB | 40 ms | 60 ms | 76 ms | – | 41.1 | 30 | 0.0 |
| aws-s3 | concurrent-download | 16x100KB | 79 ms | 163 ms | 187 ms | – | 20.8 | 30 | 0.0 |
| railway | concurrent-download | 16x100KB | 99 ms | 341 ms | 356 ms | – | 16.5 | 30 | 0.0 |
| neon | concurrent-download | 16x100KB | 104 ms | 296 ms | 323 ms | – | 15.7 | 30 | 0.0 |
| bunny | concurrent-download | 16x100KB | 158 ms | 280 ms | 426 ms | – | 10.3 | 30 | 0.0 |
| convex | concurrent-download | 16x100KB | 168 ms | 598 ms | 725 ms | – | 9.8 | 30 | 0.0 |
| r2 | concurrent-download | 16x100KB | 214 ms | 434 ms | 484 ms | – | 7.7 | 30 | 0.0 |
| upstash | concurrent-download | 16x100KB | 218 ms | 333 ms | 661 ms | – | 7.5 | 30 | 0.0 |
| appwrite | concurrent-download | 16x100KB | 283 ms | 917 ms | 1.99 s | – | 5.8 | 30 | 0.0 |
| aws-s3 | concurrent-upload | 16x100KB | 138 ms | 187 ms | 204 ms | – | 11.9 | 30 | 0.0 |
| railway | concurrent-upload | 16x100KB | 148 ms | 442 ms | 515 ms | – | 11.1 | 30 | 0.0 |
| tigris | concurrent-upload | 16x100KB | 162 ms | 297 ms | 382 ms | – | 10.1 | 30 | 0.0 |
| neon | concurrent-upload | 16x100KB | 183 ms | 312 ms | 356 ms | – | 8.9 | 30 | 0.0 |
| r2 | concurrent-upload | 16x100KB | 393 ms | 603 ms | 611 ms | – | 4.2 | 30 | 0.0 |
| upstash | concurrent-upload | 16x100KB | 419 ms | 1.10 s | 1.48 s | – | 3.9 | 30 | 0.0 |
| convex | concurrent-upload | 16x100KB | 499 ms | 1.11 s | 1.26 s | – | 3.3 | 30 | 0.0 |
| appwrite | concurrent-upload | 16x100KB | 764 ms | 1.53 s | 1.96 s | – | 2.1 | 30 | 0.0 |
| b2 | concurrent-upload | 16x100KB | 847 ms | 2.24 s | 3.68 s | – | 1.9 | 30 | 0.0 |
| bunny | concurrent-upload | 16x100KB | 934 ms | 4.97 s | 6.17 s | – | 1.8 | 30 | 0.0 |
| aws-s3 | copy | 10MB | 139 ms | 210 ms | 227 ms | – | – | 60 | 0.0 |
| neon | copy | 10MB | 237 ms | 359 ms | 481 ms | – | – | 60 | 0.0 |
| railway | copy | 10MB | 278 ms | 421 ms | 554 ms | – | – | 60 | 0.0 |
| tigris | copy | 10MB | 288 ms | 455 ms | 476 ms | – | – | 60 | 0.0 |
| bunny | copy | 10MB | 445 ms | 1.18 s | 1.79 s | – | – | 60 | 0.0 |
| b2 | copy | 10MB | 554 ms | 1.35 s | 1.99 s | – | – | 60 | 0.0 |
| r2 | copy | 10MB | 1.11 s | 2.67 s | 3.65 s | – | – | 60 | 0.0 |
| upstash | copy | 10MB | 1.15 s | 1.89 s | 6.05 s | – | – | 60 | 0.0 |
| b2 | delete | 1KB | 7 ms | 15 ms | 23 ms | – | – | 180 | 0.0 |
| railway | delete | 1KB | 27 ms | 49 ms | 70 ms | – | – | 180 | 0.0 |
| neon | delete | 1KB | 29 ms | 47 ms | 175 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 1KB | 34 ms | 46 ms | 52 ms | – | – | 180 | 0.0 |
| convex | delete | 1KB | 35 ms | 95 ms | 420 ms | – | – | 180 | 0.0 |
| tigris | delete | 1KB | 40 ms | 71 ms | 86 ms | – | – | 180 | 0.0 |
| bunny | delete | 1KB | 100 ms | 622 ms | 3.01 s | – | – | 180 | 0.0 |
| appwrite | delete | 1KB | 105 ms | 181 ms | 1.04 s | – | – | 180 | 0.0 |
| r2 | delete | 1KB | 107 ms | 197 ms | 469 ms | – | – | 180 | 0.0 |
| upstash | delete | 1KB | 110 ms | 184 ms | 290 ms | – | – | 180 | 0.0 |
| b2 | delete | 1MB | 7 ms | 18 ms | 21 ms | – | – | 90 | 0.0 |
| railway | delete | 1MB | 30 ms | 53 ms | 59 ms | – | – | 90 | 0.0 |
| neon | delete | 1MB | 30 ms | 46 ms | 57 ms | – | – | 90 | 0.0 |
| convex | delete | 1MB | 36 ms | 77 ms | 398 ms | – | – | 90 | 0.0 |
| aws-s3 | delete | 1MB | 37 ms | 54 ms | 66 ms | – | – | 90 | 0.0 |
| tigris | delete | 1MB | 39 ms | 68 ms | 626 ms | – | – | 90 | 0.0 |
| bunny | delete | 1MB | 102 ms | 339 ms | 1.04 s | – | – | 90 | 0.0 |
| appwrite | delete | 1MB | 107 ms | 159 ms | 362 ms | – | – | 90 | 0.0 |
| r2 | delete | 1MB | 111 ms | 200 ms | 264 ms | – | – | 90 | 0.0 |
| upstash | delete | 1MB | 111 ms | 203 ms | 316 ms | – | – | 90 | 0.0 |
| b2 | delete | 10MB | 8 ms | 22 ms | 63 ms | – | – | 60 | 0.0 |
| railway | delete | 10MB | 28 ms | 64 ms | 79 ms | – | – | 60 | 0.0 |
| neon | delete | 10MB | 30 ms | 38 ms | 51 ms | – | – | 60 | 0.0 |
| aws-s3 | delete | 10MB | 34 ms | 45 ms | 55 ms | – | – | 60 | 0.0 |
| convex | delete | 10MB | 39 ms | 237 ms | 535 ms | – | – | 60 | 0.0 |
| tigris | delete | 10MB | 45 ms | 80 ms | 551 ms | – | – | 60 | 0.0 |
| appwrite | delete | 10MB | 107 ms | 173 ms | 385 ms | – | – | 60 | 0.0 |
| r2 | delete | 10MB | 113 ms | 165 ms | 322 ms | – | – | 60 | 0.0 |
| upstash | delete | 10MB | 113 ms | 242 ms | 360 ms | – | – | 60 | 0.0 |
| bunny | delete | 10MB | 114 ms | 434 ms | 1.80 s | – | – | 60 | 0.0 |
| b2 | delete | 100KB | 7 ms | 20 ms | 113 ms | – | – | 180 | 0.0 |
| railway | delete | 100KB | 27 ms | 57 ms | 86 ms | – | – | 180 | 0.0 |
| neon | delete | 100KB | 29 ms | 37 ms | 180 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 100KB | 34 ms | 44 ms | 54 ms | – | – | 180 | 0.0 |
| convex | delete | 100KB | 37 ms | 121 ms | 383 ms | – | – | 180 | 0.0 |
| tigris | delete | 100KB | 39 ms | 61 ms | 83 ms | – | – | 180 | 0.0 |
| appwrite | delete | 100KB | 106 ms | 174 ms | 225 ms | – | – | 180 | 0.0 |
| r2 | delete | 100KB | 107 ms | 170 ms | 239 ms | – | – | 180 | 0.0 |
| upstash | delete | 100KB | 109 ms | 202 ms | 279 ms | – | – | 180 | 0.0 |
| bunny | delete | 100KB | 112 ms | 331 ms | 2.48 s | – | – | 180 | 0.0 |
| b2 | delete | 100MB | 8 ms | 63 ms | 81 ms | – | – | 24 | 0.0 |
| railway | delete | 100MB | 27 ms | 48 ms | 51 ms | – | – | 24 | 0.0 |
| neon | delete | 100MB | 33 ms | 174 ms | 247 ms | – | – | 24 | 0.0 |
| convex | delete | 100MB | 37 ms | 66 ms | 169 ms | – | – | 24 | 0.0 |
| aws-s3 | delete | 100MB | 41 ms | 48 ms | 49 ms | – | – | 24 | 0.0 |
| tigris | delete | 100MB | 43 ms | 129 ms | 160 ms | – | – | 23 | 0.0 |
| r2 | delete | 100MB | 110 ms | 294 ms | 561 ms | – | – | 24 | 0.0 |
| appwrite | delete | 100MB | 110 ms | 151 ms | 158 ms | – | – | 24 | 0.0 |
| upstash | delete | 100MB | 114 ms | 213 ms | 255 ms | – | – | 24 | 0.0 |
| bunny | delete | 100MB | 1.54 s | 2.44 s | 3.18 s | – | – | 24 | 0.0 |
| tigris | download | 1KB | 8 ms | 11 ms | 17 ms | 8 ms | 0.1 | 180 | 0.0 |
| railway | download | 1KB | 12 ms | 21 ms | 30 ms | 12 ms | 0.1 | 180 | 0.0 |
| b2 | download | 1KB | 13 ms | 24 ms | 52 ms | 13 ms | 0.1 | 180 | 0.0 |
| aws-s3 | download | 1KB | 40 ms | 67 ms | 94 ms | 40 ms | 0.0 | 180 | 0.0 |
| neon | download | 1KB | 42 ms | 65 ms | 105 ms | 42 ms | 0.0 | 180 | 0.0 |
| bunny | download | 1KB | 47 ms | 141 ms | 189 ms | 47 ms | 0.0 | 180 | 0.0 |
| convex | download | 1KB | 86 ms | 226 ms | 527 ms | 86 ms | 0.0 | 180 | 0.0 |
| r2 | download | 1KB | 111 ms | 182 ms | 247 ms | 111 ms | 0.0 | 180 | 0.0 |
| appwrite | download | 1KB | 116 ms | 196 ms | 433 ms | 116 ms | 0.0 | 180 | 0.0 |
| upstash | download | 1KB | 127 ms | 221 ms | 277 ms | 127 ms | 0.0 | 180 | 0.0 |
| b2 | download | 1MB | 29 ms | 48 ms | 56 ms | 23 ms | 36.3 | 90 | 0.0 |
| tigris | download | 1MB | 50 ms | 267 ms | 352 ms | 33 ms | 20.9 | 90 | 0.0 |
| neon | download | 1MB | 50 ms | 80 ms | 95 ms | 43 ms | 20.9 | 90 | 0.0 |
| aws-s3 | download | 1MB | 51 ms | 138 ms | 165 ms | 42 ms | 20.5 | 90 | 0.0 |
| railway | download | 1MB | 56 ms | 147 ms | 356 ms | 33 ms | 18.7 | 90 | 0.0 |
| bunny | download | 1MB | 81 ms | 195 ms | 230 ms | 65 ms | 12.9 | 90 | 0.0 |
| convex | download | 1MB | 115 ms | 230 ms | 420 ms | 90 ms | 9.1 | 90 | 0.0 |
| appwrite | download | 1MB | 180 ms | 411 ms | 554 ms | 179 ms | 5.8 | 90 | 0.0 |
| r2 | download | 1MB | 207 ms | 417 ms | 639 ms | 124 ms | 5.1 | 90 | 0.0 |
| upstash | download | 1MB | 252 ms | 409 ms | 502 ms | 148 ms | 4.2 | 90 | 0.0 |
| b2 | download | 10MB | 113 ms | 159 ms | 6.48 s | 31 ms | 92.4 | 60 | 0.0 |
| aws-s3 | download | 10MB | 136 ms | 163 ms | 223 ms | 40 ms | 77.3 | 60 | 0.0 |
| neon | download | 10MB | 136 ms | 220 ms | 235 ms | 45 ms | 77.3 | 60 | 0.0 |
| railway | download | 10MB | 165 ms | 416 ms | 479 ms | 50 ms | 63.4 | 60 | 0.0 |
| bunny | download | 10MB | 168 ms | 382 ms | 614 ms | 66 ms | 62.5 | 60 | 0.0 |
| tigris | download | 10MB | 213 ms | 484 ms | 689 ms | 54 ms | 49.3 | 60 | 0.0 |
| convex | download | 10MB | 237 ms | 382 ms | 479 ms | 94 ms | 44.2 | 60 | 0.0 |
| appwrite | download | 10MB | 491 ms | 877 ms | 1.02 s | 474 ms | 21.4 | 60 | 0.0 |
| upstash | download | 10MB | 591 ms | 1.15 s | 1.91 s | 158 ms | 17.8 | 60 | 0.0 |
| r2 | download | 10MB | 598 ms | 1.00 s | 1.06 s | 127 ms | 17.5 | 60 | 0.0 |
| tigris | download | 100KB | 10 ms | 16 ms | 27 ms | 10 ms | 9.8 | 180 | 0.0 |
| b2 | download | 100KB | 15 ms | 28 ms | 34 ms | 14 ms | 7.0 | 180 | 0.0 |
| railway | download | 100KB | 33 ms | 80 ms | 132 ms | 26 ms | 3.1 | 180 | 0.0 |
| aws-s3 | download | 100KB | 42 ms | 80 ms | 109 ms | 41 ms | 2.5 | 180 | 0.0 |
| neon | download | 100KB | 44 ms | 86 ms | 232 ms | 43 ms | 2.3 | 180 | 0.0 |
| bunny | download | 100KB | 63 ms | 164 ms | 247 ms | 60 ms | 1.6 | 180 | 0.0 |
| convex | download | 100KB | 94 ms | 208 ms | 370 ms | 88 ms | 1.1 | 180 | 0.0 |
| r2 | download | 100KB | 107 ms | 208 ms | 343 ms | 105 ms | 1.0 | 180 | 0.0 |
| appwrite | download | 100KB | 134 ms | 233 ms | 403 ms | 134 ms | 0.8 | 180 | 0.0 |
| upstash | download | 100KB | 137 ms | 245 ms | 336 ms | 135 ms | 0.7 | 180 | 0.0 |
| convex | download | 100MB | 985 ms | 1.42 s | 1.97 s | 90 ms | 106.5 | 24 | 0.0 |
| b2 | download | 100MB | 1.13 s | 3.63 s | 3.82 s | 32 ms | 93.0 | 24 | 0.0 |
| neon | download | 100MB | 1.23 s | 1.40 s | 1.55 s | 44 ms | 85.2 | 24 | 0.0 |
| aws-s3 | download | 100MB | 1.23 s | 1.28 s | 1.50 s | 47 ms | 85.1 | 24 | 0.0 |
| railway | download | 100MB | 1.26 s | 2.26 s | 4.80 s | 34 ms | 82.9 | 24 | 0.0 |
| tigris | download | 100MB | 1.64 s | 5.67 s | 8.19 s | 31 ms | 64.1 | 23 | 0.0 |
| bunny | download | 100MB | 2.48 s | 6.17 s | 9.12 s | 199 ms | 42.3 | 24 | 0.0 |
| appwrite | download | 100MB | 2.68 s | 3.07 s | 3.19 s | 2.52 s | 39.1 | 24 | 0.0 |
| upstash | download | 100MB | 5.75 s | 10.58 s | 56.81 s | 245 ms | 18.2 | 24 | 0.0 |
| r2 | download | 100MB | 6.33 s | 10.17 s | 15.15 s | 215 ms | 16.6 | 24 | 0.0 |
| b2 | first-request | 1KB | 16 ms | 78 ms | 93 ms | – | – | 60 | 0.0 |
| tigris | first-request | 1KB | 24 ms | 72 ms | 170 ms | – | – | 60 | 0.0 |
| railway | first-request | 1KB | 27 ms | 52 ms | 119 ms | – | – | 60 | 0.0 |
| neon | first-request | 1KB | 28 ms | 45 ms | 140 ms | – | – | 60 | 0.0 |
| convex | first-request | 1KB | 44 ms | 147 ms | 194 ms | – | – | 60 | 0.0 |
| appwrite | first-request | 1KB | 50 ms | 77 ms | 102 ms | – | – | 60 | 0.0 |
| bunny | first-request | 1KB | 53 ms | 169 ms | 198 ms | – | – | 60 | 0.0 |
| aws-s3 | first-request | 1KB | 68 ms | 91 ms | 95 ms | – | – | 60 | 0.0 |
| r2 | first-request | 1KB | 88 ms | 160 ms | 209 ms | – | – | 60 | 0.0 |
| upstash | first-request | 1KB | 95 ms | 165 ms | 389 ms | – | – | 60 | 0.0 |
| b2 | head | 1KB | 6 ms | 17 ms | 37 ms | – | – | 180 | 0.0 |
| tigris | head | 1KB | 6 ms | 10 ms | 16 ms | – | – | 180 | 0.0 |
| railway | head | 1KB | 13 ms | 22 ms | 46 ms | – | – | 180 | 0.0 |
| neon | head | 1KB | 15 ms | 32 ms | 84 ms | – | – | 180 | 0.0 |
| aws-s3 | head | 1KB | 26 ms | 38 ms | 56 ms | – | – | 180 | 0.0 |
| bunny | head | 1KB | 27 ms | 84 ms | 138 ms | – | – | 180 | 0.0 |
| appwrite | head | 1KB | 33 ms | 75 ms | 186 ms | – | – | 180 | 0.0 |
| convex | head | 1KB | 34 ms | 79 ms | 424 ms | – | – | 180 | 0.0 |
| r2 | head | 1KB | 63 ms | 142 ms | 210 ms | – | – | 180 | 0.0 |
| upstash | head | 1KB | 76 ms | 152 ms | 212 ms | – | – | 180 | 0.0 |
| b2 | head | 1MB | 6 ms | 14 ms | 34 ms | – | – | 90 | 0.0 |
| tigris | head | 1MB | 6 ms | 10 ms | 12 ms | – | – | 90 | 0.0 |
| railway | head | 1MB | 13 ms | 20 ms | 40 ms | – | – | 90 | 0.0 |
| neon | head | 1MB | 16 ms | 42 ms | 53 ms | – | – | 90 | 0.0 |
| bunny | head | 1MB | 23 ms | 96 ms | 172 ms | – | – | 90 | 0.0 |
| aws-s3 | head | 1MB | 27 ms | 41 ms | 52 ms | – | – | 90 | 0.0 |
| appwrite | head | 1MB | 32 ms | 81 ms | 133 ms | – | – | 90 | 0.0 |
| convex | head | 1MB | 34 ms | 116 ms | 204 ms | – | – | 90 | 0.0 |
| r2 | head | 1MB | 71 ms | 194 ms | 268 ms | – | – | 90 | 0.0 |
| upstash | head | 1MB | 79 ms | 235 ms | 347 ms | – | – | 90 | 0.0 |
| tigris | head | 10MB | 7 ms | 29 ms | 74 ms | – | – | 60 | 0.0 |
| railway | head | 10MB | 14 ms | 21 ms | 26 ms | – | – | 60 | 0.0 |
| b2 | head | 10MB | 16 ms | 27 ms | 47 ms | – | – | 60 | 0.0 |
| neon | head | 10MB | 16 ms | 44 ms | 90 ms | – | – | 60 | 0.0 |
| bunny | head | 10MB | 24 ms | 149 ms | 391 ms | – | – | 60 | 0.0 |
| aws-s3 | head | 10MB | 25 ms | 36 ms | 75 ms | – | – | 60 | 0.0 |
| appwrite | head | 10MB | 32 ms | 64 ms | 94 ms | – | – | 60 | 0.0 |
| convex | head | 10MB | 35 ms | 140 ms | 281 ms | – | – | 60 | 0.0 |
| r2 | head | 10MB | 68 ms | 106 ms | 180 ms | – | – | 60 | 0.0 |
| upstash | head | 10MB | 80 ms | 162 ms | 291 ms | – | – | 60 | 0.0 |
| b2 | head | 100KB | 6 ms | 12 ms | 49 ms | – | – | 180 | 0.0 |
| tigris | head | 100KB | 6 ms | 10 ms | 12 ms | – | – | 180 | 0.0 |
| railway | head | 100KB | 12 ms | 22 ms | 56 ms | – | – | 180 | 0.0 |
| neon | head | 100KB | 15 ms | 36 ms | 84 ms | – | – | 180 | 0.0 |
| bunny | head | 100KB | 26 ms | 100 ms | 164 ms | – | – | 180 | 0.0 |
| aws-s3 | head | 100KB | 26 ms | 37 ms | 45 ms | – | – | 180 | 0.0 |
| appwrite | head | 100KB | 32 ms | 89 ms | 131 ms | – | – | 180 | 0.0 |
| convex | head | 100KB | 33 ms | 106 ms | 365 ms | – | – | 180 | 0.0 |
| r2 | head | 100KB | 66 ms | 146 ms | 199 ms | – | – | 180 | 0.0 |
| upstash | head | 100KB | 78 ms | 156 ms | 255 ms | – | – | 180 | 0.0 |
| b2 | head | 100MB | 7 ms | 19 ms | 65 ms | – | – | 24 | 0.0 |
| railway | head | 100MB | 10 ms | 19 ms | 21 ms | – | – | 24 | 0.0 |
| tigris | head | 100MB | 19 ms | 32 ms | 37 ms | – | – | 23 | 0.0 |
| neon | head | 100MB | 20 ms | 21 ms | 21 ms | – | – | 24 | 0.0 |
| aws-s3 | head | 100MB | 26 ms | 37 ms | 62 ms | – | – | 24 | 0.0 |
| bunny | head | 100MB | 32 ms | 109 ms | 117 ms | – | – | 24 | 0.0 |
| appwrite | head | 100MB | 33 ms | 75 ms | 162 ms | – | – | 24 | 0.0 |
| convex | head | 100MB | 39 ms | 171 ms | 292 ms | – | – | 24 | 0.0 |
| r2 | head | 100MB | 65 ms | 167 ms | 215 ms | – | – | 24 | 0.0 |
| upstash | head | 100MB | 72 ms | 158 ms | 317 ms | – | – | 24 | 0.0 |
| neon | list-all | 1000 objects | 43 ms | – | – | – | – | 18 | 0.0 |
| railway | list-all | 1000 objects | 54 ms | – | – | – | – | 18 | 0.0 |
| tigris | list-all | 1000 objects | 69 ms | – | – | – | – | 18 | 0.0 |
| aws-s3 | list-all | 1000 objects | 90 ms | – | – | – | – | 18 | 0.0 |
| b2 | list-all | 1000 objects | 95 ms | – | – | – | – | 18 | 0.0 |
| bunny | list-all | 1000 objects | 370 ms | – | – | – | – | 18 | 0.0 |
| r2 | list-all | 1000 objects | 480 ms | – | – | – | – | 18 | 0.0 |
| upstash | list-all | 1000 objects | 522 ms | – | – | – | – | 18 | 0.0 |
| appwrite | list-all | 1000 objects | 533 ms | – | – | – | – | 18 | 0.0 |
| b2 | range-get | 256KB of 10MB | 30 ms | 60 ms | 96 ms | 26 ms | – | 60 | 0.0 |
| aws-s3 | range-get | 256KB of 10MB | 44 ms | 84 ms | 95 ms | 40 ms | – | 60 | 0.0 |
| tigris | range-get | 256KB of 10MB | 47 ms | 338 ms | 351 ms | 42 ms | – | 60 | 0.0 |
| neon | range-get | 256KB of 10MB | 50 ms | 103 ms | 182 ms | 43 ms | – | 60 | 0.0 |
| railway | range-get | 256KB of 10MB | 65 ms | 338 ms | 344 ms | 56 ms | – | 60 | 0.0 |
| convex | range-get | 256KB of 10MB | 108 ms | 389 ms | 486 ms | 95 ms | – | 60 | 0.0 |
| bunny | range-get | 256KB of 10MB | 119 ms | 303 ms | 770 ms | 116 ms | – | 60 | 0.0 |
| r2 | range-get | 256KB of 10MB | 225 ms | 345 ms | 411 ms | 191 ms | – | 60 | 0.0 |
| b2 | signed-upload | 1MB | 75 ms | 494 ms | 617 ms | – | – | 60 | 0.0 |
| tigris | signed-upload | 1MB | 138 ms | 685 ms | 3.07 s | – | – | 60 | 0.0 |
| railway | signed-upload | 1MB | 147 ms | 242 ms | 1.03 s | – | – | 60 | 0.0 |
| neon | signed-upload | 1MB | 158 ms | 235 ms | 278 ms | – | – | 60 | 0.0 |
| aws-s3 | signed-upload | 1MB | 197 ms | 260 ms | 1.04 s | – | – | 60 | 0.0 |
| r2 | signed-upload | 1MB | 269 ms | 489 ms | 656 ms | – | – | 60 | 0.0 |
| upstash | signed-upload | 1MB | 282 ms | 607 ms | 5.52 s | – | – | 60 | 0.0 |
| bunny | signed-upload | 1MB | 323 ms | 1.69 s | 3.34 s | – | – | 60 | 0.0 |
| railway | upload | 1KB | 24 ms | 51 ms | 127 ms | – | 0.0 | 180 | 0.0 |
| tigris | upload | 1KB | 29 ms | 54 ms | 76 ms | – | 0.0 | 180 | 0.0 |
| aws-s3 | upload | 1KB | 40 ms | 53 ms | 62 ms | – | 0.0 | 180 | 0.0 |
| neon | upload | 1KB | 77 ms | 144 ms | 309 ms | – | 0.0 | 180 | 0.0 |
| r2 | upload | 1KB | 176 ms | 283 ms | 428 ms | – | 0.0 | 180 | 0.0 |
| upstash | upload | 1KB | 193 ms | 575 ms | 1.88 s | – | 0.0 | 180 | 0.0 |
| bunny | upload | 1KB | 265 ms | 1.18 s | 3.79 s | – | 0.0 | 180 | 0.0 |
| convex | upload | 1KB | 281 ms | 411 ms | 649 ms | – | 0.0 | 180 | 0.0 |
| b2 | upload | 1KB | 301 ms | 754 ms | 942 ms | – | 0.0 | 180 | 0.0 |
| appwrite | upload | 1KB | 369 ms | 685 ms | 1.44 s | – | 0.0 | 180 | 0.0 |
| b2 | upload | 1MB | 64 ms | 168 ms | 485 ms | – | 16.3 | 90 | 0.0 |
| tigris | upload | 1MB | 110 ms | 199 ms | 261 ms | – | 9.5 | 90 | 0.0 |
| railway | upload | 1MB | 112 ms | 192 ms | 232 ms | – | 9.3 | 90 | 0.0 |
| neon | upload | 1MB | 124 ms | 180 ms | 227 ms | – | 8.4 | 90 | 0.0 |
| aws-s3 | upload | 1MB | 137 ms | 186 ms | 221 ms | – | 7.6 | 90 | 0.0 |
| r2 | upload | 1MB | 266 ms | 441 ms | 547 ms | – | 3.9 | 90 | 0.0 |
| upstash | upload | 1MB | 281 ms | 578 ms | 1.20 s | – | 3.7 | 90 | 0.0 |
| bunny | upload | 1MB | 285 ms | 1.25 s | 3.84 s | – | 3.7 | 90 | 0.0 |
| convex | upload | 1MB | 355 ms | 621 ms | 778 ms | – | 3.0 | 90 | 0.0 |
| appwrite | upload | 1MB | 519 ms | 915 ms | 1.42 s | – | 2.0 | 90 | 0.0 |
| neon | upload | 10MB | 233 ms | 330 ms | 439 ms | – | 45.0 | 60 | 0.0 |
| tigris | upload | 10MB | 287 ms | 413 ms | 502 ms | – | 36.5 | 60 | 0.0 |
| railway | upload | 10MB | 293 ms | 465 ms | 519 ms | – | 35.8 | 60 | 0.0 |
| aws-s3 | upload | 10MB | 324 ms | 391 ms | 411 ms | – | 32.3 | 60 | 0.0 |
| bunny | upload | 10MB | 474 ms | 2.37 s | 3.79 s | – | 22.1 | 60 | 0.0 |
| b2 | upload | 10MB | 606 ms | 1.54 s | 1.83 s | – | 17.3 | 60 | 0.0 |
| convex | upload | 10MB | 616 ms | 785 ms | 831 ms | – | 17.0 | 60 | 0.0 |
| upstash | upload | 10MB | 750 ms | 1.72 s | 27.69 s | – | 14.0 | 60 | 0.0 |
| r2 | upload | 10MB | 770 ms | 1.35 s | 1.88 s | – | 13.6 | 60 | 0.0 |
| appwrite | upload | 10MB | 1.91 s | 2.53 s | 3.03 s | – | 5.5 | 60 | 0.0 |
| railway | upload | 100KB | 64 ms | 129 ms | 195 ms | – | 1.6 | 180 | 0.0 |
| tigris | upload | 100KB | 70 ms | 126 ms | 212 ms | – | 1.5 | 180 | 0.0 |
| aws-s3 | upload | 100KB | 86 ms | 109 ms | 132 ms | – | 1.2 | 180 | 0.0 |
| neon | upload | 100KB | 95 ms | 159 ms | 214 ms | – | 1.1 | 180 | 0.0 |
| r2 | upload | 100KB | 197 ms | 328 ms | 428 ms | – | 0.5 | 180 | 0.0 |
| upstash | upload | 100KB | 210 ms | 371 ms | 907 ms | – | 0.5 | 180 | 0.0 |
| b2 | upload | 100KB | 248 ms | 705 ms | 1.06 s | – | 0.4 | 180 | 0.0 |
| bunny | upload | 100KB | 269 ms | 1.81 s | 5.46 s | – | 0.4 | 180 | 0.0 |
| convex | upload | 100KB | 303 ms | 492 ms | 692 ms | – | 0.3 | 180 | 0.0 |
| appwrite | upload | 100KB | 401 ms | 566 ms | 1.35 s | – | 0.3 | 180 | 0.0 |
| railway | upload | 100MB | 1.57 s | 1.75 s | 1.86 s | – | 66.7 | 24 | 0.0 |
| tigris | upload | 100MB | 1.60 s | 4.83 s | 15.73 s | – | 65.5 | 24 | 4.2 |
| aws-s3 | upload | 100MB | 1.89 s | 2.11 s | 2.12 s | – | 55.5 | 24 | 0.0 |
| convex | upload | 100MB | 2.31 s | 2.90 s | 3.12 s | – | 45.4 | 24 | 0.0 |
| neon | upload | 100MB | 3.02 s | 3.63 s | 3.90 s | – | 34.7 | 24 | 0.0 |
| r2 | upload | 100MB | 3.05 s | 4.28 s | 29.11 s | – | 34.4 | 24 | 0.0 |
| b2 | upload | 100MB | 3.31 s | 5.81 s | 8.44 s | – | 31.7 | 24 | 0.0 |
| bunny | upload | 100MB | 5.63 s | 11.78 s | 21.09 s | – | 18.6 | 24 | 0.0 |
| appwrite | upload | 100MB | 7.52 s | 9.03 s | 10.73 s | – | 13.9 | 24 | 0.0 |
| upstash | upload | 100MB | 9.48 s | 14.29 s | 209.44 s | – | 11.1 | 24 | 0.0 |
| tigris | url-get | 1KB | 20 ms | 104 ms | 1.27 s | 20 ms | 0.1 | 180 | 0.0 |
| b2 | url-get | 1KB | 21 ms | 49 ms | 146 ms | 21 ms | 0.0 | 180 | 0.0 |
| railway | url-get | 1KB | 27 ms | 68 ms | 128 ms | 26 ms | 0.0 | 180 | 0.0 |
| convex | url-get | 1KB | 50 ms | 108 ms | 258 ms | 50 ms | 0.0 | 180 | 0.0 |
| neon | url-get | 1KB | 51 ms | 75 ms | 149 ms | 51 ms | 0.0 | 180 | 0.0 |
| aws-s3 | url-get | 1KB | 66 ms | 87 ms | 97 ms | 66 ms | 0.0 | 180 | 0.0 |
| upstash | url-get | 1KB | 94 ms | 169 ms | 226 ms | 94 ms | 0.0 | 180 | 0.0 |
| bunny | url-get | 1KB | 98 ms | 240 ms | 339 ms | 98 ms | 0.0 | 180 | 0.0 |
| r2 | url-get | 1KB | 101 ms | 187 ms | 264 ms | 101 ms | 0.0 | 180 | 0.0 |
| appwrite | url-get | 1KB | 105 ms | 186 ms | 320 ms | 104 ms | 0.0 | 180 | 0.0 |
| b2 | url-get | 1MB | 38 ms | 62 ms | 87 ms | 32 ms | 27.6 | 90 | 0.0 |
| convex | url-get | 1MB | 68 ms | 100 ms | 170 ms | 50 ms | 15.4 | 90 | 0.0 |
| railway | url-get | 1MB | 70 ms | 166 ms | 383 ms | 53 ms | 15.0 | 90 | 0.0 |
| tigris | url-get | 1MB | 77 ms | 198 ms | 1.92 s | 53 ms | 13.6 | 90 | 0.0 |
| neon | url-get | 1MB | 80 ms | 111 ms | 168 ms | 56 ms | 13.1 | 90 | 0.0 |
| aws-s3 | url-get | 1MB | 138 ms | 200 ms | 215 ms | 69 ms | 7.6 | 90 | 0.0 |
| bunny | url-get | 1MB | 166 ms | 333 ms | 403 ms | 123 ms | 6.3 | 90 | 0.0 |
| upstash | url-get | 1MB | 167 ms | 271 ms | 331 ms | 143 ms | 6.3 | 90 | 0.0 |
| r2 | url-get | 1MB | 169 ms | 326 ms | 370 ms | 149 ms | 6.2 | 90 | 0.0 |
| appwrite | url-get | 1MB | 170 ms | 325 ms | 448 ms | 133 ms | 6.2 | 90 | 0.0 |
| b2 | url-get | 10MB | 130 ms | 210 ms | 270 ms | 42 ms | 80.5 | 60 | 0.0 |
| railway | url-get | 10MB | 144 ms | 223 ms | 307 ms | 53 ms | 72.9 | 60 | 0.0 |
| neon | url-get | 10MB | 161 ms | 329 ms | 455 ms | 58 ms | 65.1 | 60 | 0.0 |
| convex | url-get | 10MB | 186 ms | 317 ms | 640 ms | 55 ms | 56.5 | 60 | 0.0 |
| aws-s3 | url-get | 10MB | 210 ms | 285 ms | 329 ms | 72 ms | 49.8 | 60 | 0.0 |
| bunny | url-get | 10MB | 211 ms | 442 ms | 593 ms | 114 ms | 49.7 | 60 | 0.0 |
| tigris | url-get | 10MB | 231 ms | 359 ms | 6.31 s | 67 ms | 45.5 | 60 | 0.0 |
| appwrite | url-get | 10MB | 672 ms | 1.05 s | 1.57 s | 511 ms | 15.6 | 60 | 0.0 |
| r2 | url-get | 10MB | 738 ms | 1.58 s | 2.03 s | 201 ms | 14.2 | 60 | 0.0 |
| upstash | url-get | 10MB | 771 ms | 1.54 s | 2.22 s | 188 ms | 13.6 | 60 | 0.0 |
| b2 | url-get | 100KB | 23 ms | 48 ms | 68 ms | 22 ms | 4.5 | 180 | 0.0 |
| tigris | url-get | 100KB | 25 ms | 89 ms | 311 ms | 23 ms | 4.0 | 180 | 0.0 |
| railway | url-get | 100KB | 46 ms | 101 ms | 158 ms | 39 ms | 2.2 | 180 | 0.0 |
| convex | url-get | 100KB | 56 ms | 111 ms | 213 ms | 52 ms | 1.8 | 180 | 0.0 |
| neon | url-get | 100KB | 59 ms | 106 ms | 175 ms | 54 ms | 1.7 | 180 | 0.0 |
| aws-s3 | url-get | 100KB | 95 ms | 135 ms | 154 ms | 70 ms | 1.1 | 180 | 0.0 |
| upstash | url-get | 100KB | 107 ms | 203 ms | 352 ms | 105 ms | 1.0 | 180 | 0.0 |
| bunny | url-get | 100KB | 114 ms | 235 ms | 323 ms | 100 ms | 0.9 | 180 | 0.0 |
| r2 | url-get | 100KB | 116 ms | 187 ms | 248 ms | 114 ms | 0.9 | 180 | 0.0 |
| appwrite | url-get | 100KB | 125 ms | 203 ms | 252 ms | 110 ms | 0.8 | 180 | 0.0 |
| convex | url-get | 100MB | 873 ms | 1.33 s | 1.38 s | 55 ms | 120.2 | 24 | 0.0 |
| railway | url-get | 100MB | 1.10 s | 1.88 s | 2.09 s | 49 ms | 94.9 | 24 | 0.0 |
| neon | url-get | 100MB | 1.25 s | 1.45 s | 1.50 s | 56 ms | 84.2 | 24 | 0.0 |
| aws-s3 | url-get | 100MB | 1.26 s | 1.33 s | 1.34 s | 75 ms | 83.3 | 24 | 0.0 |
| b2 | url-get | 100MB | 1.28 s | 2.59 s | 3.26 s | 51 ms | 81.8 | 24 | 0.0 |
| tigris | url-get | 100MB | 1.67 s | 2.17 s | 2.69 s | 66 ms | 62.9 | 23 | 0.0 |
| r2 | url-get | 100MB | 2.02 s | 7.09 s | 14.64 s | 92 ms | 51.9 | 24 | 0.0 |
| upstash | url-get | 100MB | 2.14 s | 3.87 s | 4.65 s | 89 ms | 49.0 | 24 | 0.0 |
| bunny | url-get | 100MB | 2.15 s | 7.07 s | 9.30 s | 208 ms | 48.9 | 24 | 0.0 |
| appwrite | url-get | 100MB | 2.48 s | 3.22 s | 3.32 s | 336 ms | 42.3 | 24 | 0.0 |

## From railway-amsterdam

| Provider | Op | Size | p50 | p95 | p99 | TTFB p50 | MB/s p50 | n | fail % |
|---|---|---|---|---|---|---|---|---|---|
| tigris | burst-upload | 32x100KB | 209 ms | 1.05 s | 1.37 s | – | 15.7 | 30 | 3.3 |
| railway | burst-upload | 32x100KB | 436 ms | 677 ms | 703 ms | – | 7.5 | 30 | 0.0 |
| aws-s3 | burst-upload | 32x100KB | 471 ms | 679 ms | 687 ms | – | 7.0 | 30 | 0.0 |
| neon | burst-upload | 32x100KB | 538 ms | 768 ms | 1.03 s | – | 6.1 | 30 | 0.0 |
| r2 | burst-upload | 32x100KB | 843 ms | 1.38 s | 1.43 s | – | 3.9 | 30 | 0.0 |
| convex | burst-upload | 32x100KB | 898 ms | 1.11 s | 1.16 s | – | 3.6 | 30 | 0.0 |
| upstash | burst-upload | 32x100KB | 920 ms | 1.14 s | 1.24 s | – | 3.6 | 30 | 0.0 |
| appwrite | burst-upload | 32x100KB | 1.26 s | 1.88 s | 2.28 s | – | 2.6 | 30 | 0.0 |
| b2 | burst-upload | 32x100KB | 1.53 s | 2.31 s | 2.59 s | – | 2.1 | 30 | 6.7 |
| bunny | burst-upload | 32x100KB | 2.05 s | 6.95 s | 11.05 s | – | 1.6 | 30 | 0.0 |
| tigris | concurrent-download | 16x100KB | 40 ms | 170 ms | 184 ms | – | 40.9 | 30 | 0.0 |
| aws-s3 | concurrent-download | 16x100KB | 181 ms | 389 ms | 534 ms | – | 9.0 | 30 | 0.0 |
| neon | concurrent-download | 16x100KB | 216 ms | 426 ms | 489 ms | – | 7.6 | 30 | 0.0 |
| bunny | concurrent-download | 16x100KB | 313 ms | 583 ms | 770 ms | – | 5.2 | 30 | 0.0 |
| b2 | concurrent-download | 16x100KB | 380 ms | 902 ms | 1.70 s | – | 4.3 | 30 | 0.0 |
| r2 | concurrent-download | 16x100KB | 454 ms | 720 ms | 1.02 s | – | 3.6 | 30 | 0.0 |
| railway | concurrent-download | 16x100KB | 467 ms | 554 ms | 625 ms | – | 3.5 | 29 | 0.0 |
| upstash | concurrent-download | 16x100KB | 499 ms | 1.40 s | 3.89 s | – | 3.3 | 30 | 0.0 |
| convex | concurrent-download | 16x100KB | 666 ms | 802 ms | 921 ms | – | 2.5 | 30 | 0.0 |
| appwrite | concurrent-download | 16x100KB | 708 ms | 1.02 s | 1.19 s | – | 2.3 | 30 | 0.0 |
| tigris | concurrent-upload | 16x100KB | 173 ms | 769 ms | 1.21 s | – | 9.5 | 30 | 0.0 |
| railway | concurrent-upload | 16x100KB | 435 ms | 648 ms | 666 ms | – | 3.8 | 30 | 3.3 |
| aws-s3 | concurrent-upload | 16x100KB | 468 ms | 702 ms | 716 ms | – | 3.5 | 30 | 0.0 |
| neon | concurrent-upload | 16x100KB | 471 ms | 742 ms | 860 ms | – | 3.5 | 30 | 0.0 |
| r2 | concurrent-upload | 16x100KB | 691 ms | 953 ms | 1.03 s | – | 2.4 | 30 | 0.0 |
| upstash | concurrent-upload | 16x100KB | 733 ms | 990 ms | 1.03 s | – | 2.2 | 30 | 0.0 |
| convex | concurrent-upload | 16x100KB | 822 ms | 1.03 s | 1.05 s | – | 2.0 | 30 | 0.0 |
| appwrite | concurrent-upload | 16x100KB | 1.07 s | 1.80 s | 1.94 s | – | 1.5 | 30 | 0.0 |
| bunny | concurrent-upload | 16x100KB | 1.12 s | 4.92 s | 7.99 s | – | 1.5 | 30 | 0.0 |
| b2 | concurrent-upload | 16x100KB | 1.55 s | 2.34 s | 5.33 s | – | 1.1 | 30 | 0.0 |
| tigris | copy | 10MB | 235 ms | 360 ms | 1.12 s | – | – | 60 | 0.0 |
| aws-s3 | copy | 10MB | 240 ms | 298 ms | 324 ms | – | – | 60 | 0.0 |
| neon | copy | 10MB | 319 ms | 393 ms | 497 ms | – | – | 60 | 0.0 |
| bunny | copy | 10MB | 499 ms | 2.27 s | 4.90 s | – | – | 60 | 0.0 |
| railway | copy | 10MB | 535 ms | 756 ms | 939 ms | – | – | 60 | 0.0 |
| b2 | copy | 10MB | 607 ms | 1.32 s | 1.79 s | – | – | 60 | 0.0 |
| r2 | copy | 10MB | 1.56 s | 2.72 s | 4.62 s | – | – | 60 | 0.0 |
| upstash | copy | 10MB | 1.81 s | 3.22 s | 4.98 s | – | – | 60 | 0.0 |
| tigris | delete | 1KB | 33 ms | 49 ms | 589 ms | – | – | 180 | 0.0 |
| b2 | delete | 1KB | 98 ms | 113 ms | 218 ms | – | – | 179 | 0.0 |
| neon | delete | 1KB | 113 ms | 158 ms | 338 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 1KB | 117 ms | 126 ms | 136 ms | – | – | 180 | 0.0 |
| railway | delete | 1KB | 119 ms | 227 ms | 285 ms | – | – | 156 | 0.0 |
| convex | delete | 1KB | 126 ms | 215 ms | 466 ms | – | – | 180 | 0.0 |
| bunny | delete | 1KB | 172 ms | 356 ms | 1.55 s | – | – | 180 | 0.0 |
| r2 | delete | 1KB | 176 ms | 227 ms | 350 ms | – | – | 180 | 0.0 |
| appwrite | delete | 1KB | 188 ms | 244 ms | 609 ms | – | – | 180 | 0.0 |
| upstash | delete | 1KB | 207 ms | 323 ms | 453 ms | – | – | 180 | 0.0 |
| tigris | delete | 1MB | 34 ms | 89 ms | 889 ms | – | – | 90 | 0.0 |
| b2 | delete | 1MB | 98 ms | 107 ms | 137 ms | – | – | 90 | 0.0 |
| aws-s3 | delete | 1MB | 116 ms | 127 ms | 130 ms | – | – | 89 | 0.0 |
| neon | delete | 1MB | 117 ms | 245 ms | 319 ms | – | – | 90 | 0.0 |
| railway | delete | 1MB | 118 ms | 232 ms | 249 ms | – | – | 90 | 0.0 |
| convex | delete | 1MB | 128 ms | 257 ms | 361 ms | – | – | 90 | 0.0 |
| bunny | delete | 1MB | 175 ms | 867 ms | 4.61 s | – | – | 90 | 0.0 |
| r2 | delete | 1MB | 177 ms | 309 ms | 421 ms | – | – | 90 | 0.0 |
| appwrite | delete | 1MB | 177 ms | 252 ms | 644 ms | – | – | 90 | 0.0 |
| upstash | delete | 1MB | 209 ms | 292 ms | 403 ms | – | – | 90 | 0.0 |
| tigris | delete | 10MB | 42 ms | 62 ms | 581 ms | – | – | 60 | 0.0 |
| b2 | delete | 10MB | 99 ms | 114 ms | 141 ms | – | – | 60 | 0.0 |
| neon | delete | 10MB | 114 ms | 132 ms | 180 ms | – | – | 60 | 0.0 |
| aws-s3 | delete | 10MB | 117 ms | 126 ms | 133 ms | – | – | 60 | 0.0 |
| railway | delete | 10MB | 118 ms | 221 ms | 242 ms | – | – | 60 | 0.0 |
| convex | delete | 10MB | 131 ms | 227 ms | 421 ms | – | – | 60 | 0.0 |
| r2 | delete | 10MB | 180 ms | 338 ms | 459 ms | – | – | 60 | 0.0 |
| bunny | delete | 10MB | 182 ms | 544 ms | 3.25 s | – | – | 60 | 0.0 |
| appwrite | delete | 10MB | 185 ms | 268 ms | 549 ms | – | – | 60 | 0.0 |
| upstash | delete | 10MB | 203 ms | 343 ms | 421 ms | – | – | 60 | 0.0 |
| tigris | delete | 100KB | 33 ms | 84 ms | 914 ms | – | – | 180 | 0.0 |
| b2 | delete | 100KB | 98 ms | 118 ms | 169 ms | – | – | 179 | 0.0 |
| neon | delete | 100KB | 114 ms | 146 ms | 259 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 100KB | 117 ms | 126 ms | 137 ms | – | – | 180 | 0.0 |
| railway | delete | 100KB | 120 ms | 229 ms | 281 ms | – | – | 180 | 0.0 |
| convex | delete | 100KB | 124 ms | 242 ms | 388 ms | – | – | 180 | 0.0 |
| r2 | delete | 100KB | 169 ms | 273 ms | 340 ms | – | – | 180 | 0.0 |
| bunny | delete | 100KB | 174 ms | 656 ms | 3.17 s | – | – | 180 | 0.0 |
| appwrite | delete | 100KB | 179 ms | 242 ms | 322 ms | – | – | 180 | 0.0 |
| upstash | delete | 100KB | 205 ms | 312 ms | 406 ms | – | – | 180 | 0.0 |
| tigris | delete | 100MB | 40 ms | 54 ms | 665 ms | – | – | 21 | 0.0 |
| b2 | delete | 100MB | 101 ms | 130 ms | 270 ms | – | – | 23 | 0.0 |
| neon | delete | 100MB | 119 ms | 145 ms | 203 ms | – | – | 24 | 0.0 |
| railway | delete | 100MB | 123 ms | 145 ms | 206 ms | – | – | 24 | 0.0 |
| aws-s3 | delete | 100MB | 124 ms | 132 ms | 135 ms | – | – | 24 | 0.0 |
| convex | delete | 100MB | 132 ms | 220 ms | 290 ms | – | – | 24 | 0.0 |
| r2 | delete | 100MB | 178 ms | 277 ms | 285 ms | – | – | 23 | 0.0 |
| appwrite | delete | 100MB | 198 ms | 535 ms | 1.41 s | – | – | 24 | 0.0 |
| upstash | delete | 100MB | 212 ms | 282 ms | 425 ms | – | – | 24 | 0.0 |
| bunny | delete | 100MB | 1.55 s | 3.86 s | 8.07 s | – | – | 24 | 0.0 |
| tigris | download | 1KB | 9 ms | 11 ms | 14 ms | 9 ms | 0.1 | 180 | 0.0 |
| b2 | download | 1KB | 102 ms | 125 ms | 187 ms | 102 ms | 0.0 | 179 | 0.0 |
| railway | download | 1KB | 103 ms | 217 ms | 244 ms | 103 ms | 0.0 | 156 | 0.0 |
| aws-s3 | download | 1KB | 122 ms | 134 ms | 155 ms | 122 ms | 0.0 | 180 | 0.0 |
| neon | download | 1KB | 125 ms | 162 ms | 295 ms | 125 ms | 0.0 | 180 | 0.0 |
| bunny | download | 1KB | 125 ms | 253 ms | 321 ms | 125 ms | 0.0 | 180 | 0.0 |
| appwrite | download | 1KB | 214 ms | 559 ms | 605 ms | 214 ms | 0.0 | 180 | 0.0 |
| convex | download | 1KB | 267 ms | 439 ms | 568 ms | 267 ms | 0.0 | 180 | 0.0 |
| r2 | download | 1KB | 274 ms | 384 ms | 546 ms | 274 ms | 0.0 | 180 | 0.0 |
| upstash | download | 1KB | 327 ms | 472 ms | 565 ms | 327 ms | 0.0 | 180 | 0.0 |
| tigris | download | 1MB | 45 ms | 258 ms | 805 ms | 30 ms | 23.5 | 90 | 0.0 |
| aws-s3 | download | 1MB | 127 ms | 688 ms | 731 ms | 121 ms | 8.2 | 89 | 0.0 |
| neon | download | 1MB | 136 ms | 245 ms | 343 ms | 127 ms | 7.7 | 90 | 0.0 |
| bunny | download | 1MB | 208 ms | 791 ms | 960 ms | 158 ms | 5.0 | 90 | 0.0 |
| railway | download | 1MB | 228 ms | 640 ms | 792 ms | 218 ms | 4.6 | 90 | 0.0 |
| r2 | download | 1MB | 393 ms | 589 ms | 985 ms | 299 ms | 2.7 | 90 | 0.0 |
| upstash | download | 1MB | 446 ms | 668 ms | 769 ms | 346 ms | 2.3 | 90 | 0.0 |
| b2 | download | 1MB | 643 ms | 701 ms | 1.26 s | 146 ms | 1.6 | 90 | 0.0 |
| convex | download | 1MB | 744 ms | 936 ms | 1.14 s | 271 ms | 1.4 | 90 | 0.0 |
| appwrite | download | 1MB | 868 ms | 1.25 s | 1.40 s | 868 ms | 1.2 | 90 | 0.0 |
| tigris | download | 10MB | 214 ms | 486 ms | 1.07 s | 58 ms | 49.1 | 60 | 0.0 |
| neon | download | 10MB | 236 ms | 366 ms | 905 ms | 128 ms | 44.3 | 60 | 0.0 |
| bunny | download | 10MB | 285 ms | 639 ms | 1.43 s | 162 ms | 36.8 | 60 | 0.0 |
| railway | download | 10MB | 370 ms | 1.04 s | 1.13 s | 232 ms | 28.3 | 60 | 0.0 |
| r2 | download | 10MB | 803 ms | 1.20 s | 1.56 s | 312 ms | 13.1 | 60 | 0.0 |
| convex | download | 10MB | 862 ms | 1.27 s | 1.96 s | 272 ms | 12.2 | 60 | 0.0 |
| upstash | download | 10MB | 892 ms | 1.38 s | 2.10 s | 348 ms | 11.8 | 60 | 0.0 |
| aws-s3 | download | 10MB | 974 ms | 1.09 s | 1.11 s | 124 ms | 10.8 | 60 | 0.0 |
| b2 | download | 10MB | 1.03 s | 1.12 s | 1.83 s | 157 ms | 10.1 | 60 | 0.0 |
| appwrite | download | 10MB | 1.52 s | 2.08 s | 2.30 s | 1.52 s | 6.9 | 60 | 0.0 |
| tigris | download | 100KB | 12 ms | 16 ms | 19 ms | 11 ms | 8.8 | 180 | 0.0 |
| aws-s3 | download | 100KB | 126 ms | 324 ms | 369 ms | 124 ms | 0.8 | 180 | 0.0 |
| neon | download | 100KB | 127 ms | 240 ms | 375 ms | 126 ms | 0.8 | 180 | 0.0 |
| bunny | download | 100KB | 168 ms | 302 ms | 528 ms | 135 ms | 0.6 | 180 | 0.0 |
| railway | download | 100KB | 206 ms | 434 ms | 523 ms | 204 ms | 0.5 | 180 | 0.0 |
| r2 | download | 100KB | 282 ms | 399 ms | 724 ms | 275 ms | 0.4 | 180 | 0.0 |
| upstash | download | 100KB | 329 ms | 489 ms | 563 ms | 324 ms | 0.3 | 180 | 0.0 |
| b2 | download | 100KB | 333 ms | 370 ms | 1.34 s | 137 ms | 0.3 | 179 | 0.0 |
| appwrite | download | 100KB | 471 ms | 838 ms | 920 ms | 471 ms | 0.2 | 180 | 0.0 |
| convex | download | 100KB | 507 ms | 756 ms | 956 ms | 280 ms | 0.2 | 180 | 0.0 |
| tigris | download | 100MB | 1.71 s | 2.80 s | 3.12 s | 35 ms | 61.4 | 21 | 0.0 |
| neon | download | 100MB | 1.99 s | 2.26 s | 2.38 s | 128 ms | 52.7 | 24 | 0.0 |
| bunny | download | 100MB | 2.04 s | 5.52 s | 7.11 s | 232 ms | 51.4 | 24 | 0.0 |
| railway | download | 100MB | 2.07 s | 3.08 s | 5.67 s | 238 ms | 50.6 | 24 | 0.0 |
| convex | download | 100MB | 2.43 s | 5.70 s | 9.72 s | 316 ms | 43.2 | 24 | 0.0 |
| aws-s3 | download | 100MB | 3.56 s | 3.81 s | 3.88 s | 150 ms | 29.5 | 24 | 0.0 |
| b2 | download | 100MB | 3.79 s | 5.27 s | 5.38 s | 160 ms | 27.7 | 23 | 0.0 |
| appwrite | download | 100MB | 4.34 s | 6.55 s | 9.26 s | 4.28 s | 24.1 | 24 | 0.0 |
| r2 | download | 100MB | 7.06 s | 11.93 s | 13.89 s | 409 ms | 14.9 | 23 | 0.0 |
| upstash | download | 100MB | 7.07 s | 12.74 s | 13.35 s | 510 ms | 14.8 | 24 | 0.0 |
| tigris | first-request | 1KB | 22 ms | 229 ms | 625 ms | – | – | 60 | 0.0 |
| appwrite | first-request | 1KB | 105 ms | 131 ms | 160 ms | – | – | 60 | 0.0 |
| railway | first-request | 1KB | 128 ms | 253 ms | 343 ms | – | – | 60 | 0.0 |
| convex | first-request | 1KB | 136 ms | 177 ms | 233 ms | – | – | 60 | 0.0 |
| r2 | first-request | 1KB | 158 ms | 298 ms | 459 ms | – | – | 60 | 0.0 |
| upstash | first-request | 1KB | 188 ms | 251 ms | 343 ms | – | – | 60 | 0.0 |
| bunny | first-request | 1KB | 260 ms | 334 ms | 405 ms | – | – | 60 | 0.0 |
| b2 | first-request | 1KB | 287 ms | 337 ms | 357 ms | – | – | 60 | 0.0 |
| aws-s3 | first-request | 1KB | 316 ms | 345 ms | 347 ms | – | – | 60 | 0.0 |
| neon | first-request | 1KB | 356 ms | 389 ms | 410 ms | – | – | 60 | 0.0 |
| tigris | head | 1KB | 7 ms | 9 ms | 13 ms | – | – | 180 | 0.0 |
| b2 | head | 1KB | 97 ms | 111 ms | 205 ms | – | – | 179 | 0.0 |
| bunny | head | 1KB | 99 ms | 160 ms | 210 ms | – | – | 180 | 0.0 |
| neon | head | 1KB | 101 ms | 126 ms | 181 ms | – | – | 180 | 0.0 |
| railway | head | 1KB | 102 ms | 214 ms | 261 ms | – | – | 156 | 0.0 |
| aws-s3 | head | 1KB | 110 ms | 126 ms | 325 ms | – | – | 180 | 0.0 |
| convex | head | 1KB | 125 ms | 249 ms | 378 ms | – | – | 180 | 0.0 |
| appwrite | head | 1KB | 131 ms | 484 ms | 600 ms | – | – | 180 | 0.0 |
| r2 | head | 1KB | 137 ms | 220 ms | 320 ms | – | – | 180 | 0.0 |
| upstash | head | 1KB | 173 ms | 304 ms | 383 ms | – | – | 180 | 0.0 |
| tigris | head | 1MB | 8 ms | 10 ms | 12 ms | – | – | 90 | 0.0 |
| b2 | head | 1MB | 97 ms | 118 ms | 133 ms | – | – | 90 | 0.0 |
| railway | head | 1MB | 102 ms | 217 ms | 399 ms | – | – | 90 | 0.0 |
| bunny | head | 1MB | 103 ms | 180 ms | 242 ms | – | – | 90 | 0.0 |
| neon | head | 1MB | 103 ms | 131 ms | 336 ms | – | – | 90 | 0.0 |
| aws-s3 | head | 1MB | 109 ms | 116 ms | 326 ms | – | – | 89 | 0.0 |
| convex | head | 1MB | 125 ms | 237 ms | 337 ms | – | – | 90 | 0.0 |
| appwrite | head | 1MB | 128 ms | 478 ms | 497 ms | – | – | 90 | 0.0 |
| r2 | head | 1MB | 134 ms | 193 ms | 250 ms | – | – | 90 | 0.0 |
| upstash | head | 1MB | 175 ms | 280 ms | 329 ms | – | – | 90 | 0.0 |
| tigris | head | 10MB | 8 ms | 101 ms | 122 ms | – | – | 60 | 0.0 |
| neon | head | 10MB | 100 ms | 139 ms | 359 ms | – | – | 60 | 0.0 |
| bunny | head | 10MB | 101 ms | 171 ms | 227 ms | – | – | 60 | 0.0 |
| railway | head | 10MB | 107 ms | 234 ms | 247 ms | – | – | 60 | 0.0 |
| convex | head | 10MB | 132 ms | 316 ms | 377 ms | – | – | 60 | 0.0 |
| appwrite | head | 10MB | 133 ms | 475 ms | 489 ms | – | – | 60 | 0.0 |
| r2 | head | 10MB | 142 ms | 191 ms | 227 ms | – | – | 60 | 0.0 |
| upstash | head | 10MB | 177 ms | 266 ms | 293 ms | – | – | 60 | 0.0 |
| b2 | head | 10MB | 289 ms | 344 ms | 371 ms | – | – | 60 | 0.0 |
| aws-s3 | head | 10MB | 306 ms | 341 ms | 345 ms | – | – | 60 | 0.0 |
| tigris | head | 100KB | 8 ms | 10 ms | 14 ms | – | – | 180 | 0.0 |
| b2 | head | 100KB | 96 ms | 111 ms | 171 ms | – | – | 179 | 0.0 |
| bunny | head | 100KB | 97 ms | 180 ms | 228 ms | – | – | 180 | 0.0 |
| neon | head | 100KB | 102 ms | 130 ms | 163 ms | – | – | 180 | 0.0 |
| railway | head | 100KB | 102 ms | 225 ms | 359 ms | – | – | 180 | 0.0 |
| aws-s3 | head | 100KB | 110 ms | 314 ms | 333 ms | – | – | 180 | 0.0 |
| convex | head | 100KB | 126 ms | 290 ms | 387 ms | – | – | 180 | 0.0 |
| r2 | head | 100KB | 133 ms | 197 ms | 269 ms | – | – | 180 | 0.0 |
| appwrite | head | 100KB | 133 ms | 474 ms | 561 ms | – | – | 180 | 0.0 |
| upstash | head | 100KB | 172 ms | 262 ms | 449 ms | – | – | 180 | 0.0 |
| tigris | head | 100MB | 18 ms | 22 ms | 24 ms | – | – | 21 | 0.0 |
| bunny | head | 100MB | 98 ms | 190 ms | 197 ms | – | – | 24 | 0.0 |
| neon | head | 100MB | 101 ms | 148 ms | 177 ms | – | – | 24 | 0.0 |
| b2 | head | 100MB | 101 ms | 130 ms | 156 ms | – | – | 23 | 0.0 |
| railway | head | 100MB | 102 ms | 107 ms | 193 ms | – | – | 24 | 0.0 |
| aws-s3 | head | 100MB | 110 ms | 117 ms | 128 ms | – | – | 24 | 0.0 |
| r2 | head | 100MB | 135 ms | 184 ms | 269 ms | – | – | 23 | 0.0 |
| upstash | head | 100MB | 166 ms | 265 ms | 298 ms | – | – | 24 | 0.0 |
| convex | head | 100MB | 174 ms | 350 ms | 509 ms | – | – | 24 | 0.0 |
| appwrite | head | 100MB | 337 ms | 502 ms | 508 ms | – | – | 24 | 0.0 |
| tigris | list-all | 1000 objects | 48 ms | – | – | – | – | 18 | 0.0 |
| neon | list-all | 1000 objects | 119 ms | – | – | – | – | 18 | 0.0 |
| railway | list-all | 1000 objects | 138 ms | – | – | – | – | 18 | 0.0 |
| aws-s3 | list-all | 1000 objects | 179 ms | – | – | – | – | 18 | 0.0 |
| b2 | list-all | 1000 objects | 339 ms | – | – | – | – | 18 | 0.0 |
| bunny | list-all | 1000 objects | 539 ms | – | – | – | – | 18 | 0.0 |
| r2 | list-all | 1000 objects | 795 ms | – | – | – | – | 18 | 0.0 |
| upstash | list-all | 1000 objects | 935 ms | – | – | – | – | 18 | 0.0 |
| appwrite | list-all | 1000 objects | 1.40 s | – | – | – | – | 18 | 0.0 |
| tigris | range-get | 256KB of 10MB | 97 ms | 334 ms | 1.08 s | 83 ms | – | 60 | 0.0 |
| neon | range-get | 256KB of 10MB | 128 ms | 459 ms | 476 ms | 123 ms | – | 60 | 0.0 |
| bunny | range-get | 256KB of 10MB | 233 ms | 462 ms | 898 ms | 186 ms | – | 60 | 0.0 |
| railway | range-get | 256KB of 10MB | 235 ms | 562 ms | 753 ms | 222 ms | – | 60 | 0.0 |
| aws-s3 | range-get | 256KB of 10MB | 400 ms | 498 ms | 546 ms | 122 ms | – | 60 | 0.0 |
| r2 | range-get | 256KB of 10MB | 403 ms | 738 ms | 1.21 s | 368 ms | – | 60 | 0.0 |
| b2 | range-get | 256KB of 10MB | 470 ms | 750 ms | 1.16 s | 151 ms | – | 60 | 0.0 |
| convex | range-get | 256KB of 10MB | 518 ms | 799 ms | 899 ms | 301 ms | – | 60 | 0.0 |
| tigris | signed-upload | 1MB | 174 ms | 376 ms | 482 ms | – | – | 60 | 0.0 |
| r2 | signed-upload | 1MB | 550 ms | 1.04 s | 1.28 s | – | – | 60 | 0.0 |
| upstash | signed-upload | 1MB | 605 ms | 981 ms | 1.26 s | – | – | 60 | 0.0 |
| railway | signed-upload | 1MB | 615 ms | 776 ms | 810 ms | – | – | 60 | 0.0 |
| b2 | signed-upload | 1MB | 860 ms | 995 ms | 2.20 s | – | – | 60 | 0.0 |
| neon | signed-upload | 1MB | 938 ms | 1.03 s | 1.13 s | – | – | 60 | 0.0 |
| bunny | signed-upload | 1MB | 944 ms | 3.58 s | 5.58 s | – | – | 60 | 0.0 |
| aws-s3 | signed-upload | 1MB | 1.10 s | 1.35 s | 1.37 s | – | – | 60 | 0.0 |
| tigris | upload | 1KB | 25 ms | 256 ms | 1.85 s | – | 0.0 | 180 | 0.0 |
| railway | upload | 1KB | 116 ms | 223 ms | 252 ms | – | 0.0 | 156 | 0.0 |
| aws-s3 | upload | 1KB | 124 ms | 138 ms | 151 ms | – | 0.0 | 180 | 0.0 |
| neon | upload | 1KB | 167 ms | 226 ms | 346 ms | – | 0.0 | 180 | 0.0 |
| bunny | upload | 1KB | 299 ms | 690 ms | 1.99 s | – | 0.0 | 180 | 0.0 |
| r2 | upload | 1KB | 411 ms | 567 ms | 642 ms | – | 0.0 | 180 | 0.0 |
| appwrite | upload | 1KB | 477 ms | 824 ms | 1.27 s | – | 0.0 | 180 | 0.0 |
| convex | upload | 1KB | 480 ms | 808 ms | 909 ms | – | 0.0 | 180 | 0.0 |
| upstash | upload | 1KB | 490 ms | 659 ms | 838 ms | – | 0.0 | 180 | 0.0 |
| b2 | upload | 1KB | 531 ms | 1.18 s | 1.90 s | – | 0.0 | 180 | 0.6 |
| tigris | upload | 1MB | 90 ms | 313 ms | 1.03 s | – | 11.7 | 90 | 0.0 |
| r2 | upload | 1MB | 519 ms | 905 ms | 1.07 s | – | 2.0 | 90 | 0.0 |
| railway | upload | 1MB | 529 ms | 702 ms | 810 ms | – | 2.0 | 90 | 0.0 |
| upstash | upload | 1MB | 584 ms | 1.01 s | 1.23 s | – | 1.8 | 90 | 0.0 |
| neon | upload | 1MB | 694 ms | 811 ms | 844 ms | – | 1.5 | 90 | 0.0 |
| aws-s3 | upload | 1MB | 727 ms | 1.00 s | 1.16 s | – | 1.4 | 90 | 1.1 |
| bunny | upload | 1MB | 768 ms | 1.18 s | 2.02 s | – | 1.4 | 90 | 0.0 |
| convex | upload | 1MB | 804 ms | 1.16 s | 1.35 s | – | 1.3 | 90 | 0.0 |
| b2 | upload | 1MB | 859 ms | 961 ms | 1.11 s | – | 1.2 | 90 | 0.0 |
| appwrite | upload | 1MB | 1.08 s | 1.82 s | 2.38 s | – | 1.0 | 90 | 0.0 |
| tigris | upload | 10MB | 384 ms | 808 ms | 1.04 s | – | 27.3 | 60 | 0.0 |
| railway | upload | 10MB | 1.03 s | 2.06 s | 5.65 s | – | 10.2 | 60 | 0.0 |
| upstash | upload | 10MB | 1.11 s | 2.21 s | 2.35 s | – | 9.5 | 60 | 0.0 |
| r2 | upload | 10MB | 1.11 s | 1.84 s | 2.08 s | – | 9.4 | 60 | 0.0 |
| neon | upload | 10MB | 1.29 s | 1.38 s | 1.40 s | – | 8.1 | 60 | 0.0 |
| bunny | upload | 10MB | 1.40 s | 3.54 s | 4.46 s | – | 7.5 | 60 | 0.0 |
| aws-s3 | upload | 10MB | 1.69 s | 2.16 s | 2.58 s | – | 6.2 | 60 | 0.0 |
| b2 | upload | 10MB | 1.69 s | 2.57 s | 3.78 s | – | 6.2 | 60 | 0.0 |
| convex | upload | 10MB | 1.71 s | 2.14 s | 3.06 s | – | 6.1 | 60 | 0.0 |
| appwrite | upload | 10MB | 3.66 s | 8.09 s | 12.33 s | – | 2.9 | 60 | 0.0 |
| tigris | upload | 100KB | 60 ms | 229 ms | 764 ms | – | 1.7 | 180 | 0.0 |
| railway | upload | 100KB | 315 ms | 427 ms | 465 ms | – | 0.3 | 180 | 0.0 |
| neon | upload | 100KB | 409 ms | 473 ms | 541 ms | – | 0.3 | 180 | 0.0 |
| aws-s3 | upload | 100KB | 425 ms | 453 ms | 640 ms | – | 0.2 | 180 | 0.0 |
| r2 | upload | 100KB | 426 ms | 628 ms | 869 ms | – | 0.2 | 180 | 0.0 |
| bunny | upload | 100KB | 495 ms | 2.16 s | 5.97 s | – | 0.2 | 180 | 0.0 |
| upstash | upload | 100KB | 514 ms | 700 ms | 991 ms | – | 0.2 | 180 | 0.0 |
| convex | upload | 100KB | 566 ms | 943 ms | 1.15 s | – | 0.2 | 180 | 0.0 |
| appwrite | upload | 100KB | 681 ms | 982 ms | 1.06 s | – | 0.2 | 180 | 0.0 |
| b2 | upload | 100KB | 785 ms | 1.46 s | 1.71 s | – | 0.1 | 180 | 0.6 |
| tigris | upload | 100MB | 1.77 s | 3.25 s | 8.51 s | – | 59.4 | 24 | 12.5 |
| r2 | upload | 100MB | 4.99 s | 5.71 s | 9.99 s | – | 21.0 | 24 | 4.2 |
| convex | upload | 100MB | 6.41 s | 10.61 s | 11.00 s | – | 16.4 | 24 | 0.0 |
| railway | upload | 100MB | 7.97 s | 9.21 s | 10.17 s | – | 13.2 | 24 | 0.0 |
| neon | upload | 100MB | 8.31 s | 9.20 s | 9.64 s | – | 12.6 | 24 | 0.0 |
| aws-s3 | upload | 100MB | 8.58 s | 9.73 s | 10.69 s | – | 12.2 | 24 | 0.0 |
| b2 | upload | 100MB | 9.19 s | 11.74 s | 12.48 s | – | 11.4 | 24 | 4.2 |
| bunny | upload | 100MB | 9.21 s | 17.77 s | 19.77 s | – | 11.4 | 24 | 0.0 |
| appwrite | upload | 100MB | 9.46 s | 16.81 s | 23.17 s | – | 11.1 | 24 | 0.0 |
| upstash | upload | 100MB | 16.52 s | 19.64 s | 21.80 s | – | 6.3 | 24 | 0.0 |
| tigris | url-get | 1KB | 26 ms | 245 ms | 520 ms | 26 ms | 0.0 | 180 | 0.0 |
| convex | url-get | 1KB | 141 ms | 313 ms | 526 ms | 141 ms | 0.0 | 180 | 0.0 |
| r2 | url-get | 1KB | 200 ms | 325 ms | 420 ms | 200 ms | 0.0 | 180 | 0.0 |
| appwrite | url-get | 1KB | 206 ms | 544 ms | 573 ms | 206 ms | 0.0 | 180 | 0.0 |
| railway | url-get | 1KB | 220 ms | 255 ms | 386 ms | 220 ms | 0.0 | 156 | 0.0 |
| upstash | url-get | 1KB | 232 ms | 408 ms | 590 ms | 231 ms | 0.0 | 180 | 0.0 |
| b2 | url-get | 1KB | 294 ms | 381 ms | 744 ms | 294 ms | 0.0 | 179 | 0.0 |
| neon | url-get | 1KB | 309 ms | 414 ms | 461 ms | 309 ms | 0.0 | 180 | 0.0 |
| bunny | url-get | 1KB | 312 ms | 421 ms | 526 ms | 312 ms | 0.0 | 180 | 0.0 |
| aws-s3 | url-get | 1KB | 321 ms | 347 ms | 354 ms | 321 ms | 0.0 | 180 | 0.0 |
| tigris | url-get | 1MB | 153 ms | 364 ms | 428 ms | 136 ms | 6.9 | 90 | 0.0 |
| convex | url-get | 1MB | 252 ms | 759 ms | 822 ms | 137 ms | 4.2 | 90 | 0.0 |
| r2 | url-get | 1MB | 275 ms | 509 ms | 1.14 s | 248 ms | 3.8 | 90 | 0.0 |
| upstash | url-get | 1MB | 284 ms | 541 ms | 643 ms | 259 ms | 3.7 | 90 | 0.0 |
| railway | url-get | 1MB | 386 ms | 819 ms | 926 ms | 339 ms | 2.7 | 90 | 0.0 |
| bunny | url-get | 1MB | 813 ms | 951 ms | 1.05 s | 370 ms | 1.3 | 90 | 0.0 |
| b2 | url-get | 1MB | 863 ms | 940 ms | 1.16 s | 336 ms | 1.2 | 90 | 0.0 |
| aws-s3 | url-get | 1MB | 872 ms | 982 ms | 1.15 s | 323 ms | 1.2 | 89 | 0.0 |
| neon | url-get | 1MB | 891 ms | 980 ms | 1.04 s | 398 ms | 1.2 | 90 | 0.0 |
| appwrite | url-get | 1MB | 904 ms | 1.28 s | 1.33 s | 334 ms | 1.2 | 90 | 0.0 |
| tigris | url-get | 10MB | 288 ms | 427 ms | 524 ms | 135 ms | 36.4 | 60 | 0.0 |
| convex | url-get | 10MB | 471 ms | 1.10 s | 1.69 s | 139 ms | 22.3 | 60 | 0.0 |
| railway | url-get | 10MB | 498 ms | 1.22 s | 1.49 s | 346 ms | 21.1 | 60 | 0.0 |
| r2 | url-get | 10MB | 863 ms | 1.80 s | 2.12 s | 315 ms | 12.1 | 60 | 0.0 |
| upstash | url-get | 10MB | 967 ms | 2.33 s | 2.74 s | 332 ms | 10.8 | 60 | 0.0 |
| bunny | url-get | 10MB | 1.09 s | 1.33 s | 1.37 s | 374 ms | 9.6 | 60 | 0.0 |
| neon | url-get | 10MB | 1.16 s | 1.25 s | 1.29 s | 401 ms | 9.1 | 60 | 0.0 |
| aws-s3 | url-get | 10MB | 1.23 s | 1.35 s | 1.37 s | 326 ms | 8.5 | 60 | 0.0 |
| b2 | url-get | 10MB | 1.25 s | 1.35 s | 1.36 s | 354 ms | 8.4 | 60 | 0.0 |
| appwrite | url-get | 10MB | 1.66 s | 2.31 s | 2.42 s | 688 ms | 6.3 | 60 | 0.0 |
| tigris | url-get | 100KB | 117 ms | 249 ms | 314 ms | 112 ms | 0.9 | 180 | 0.0 |
| convex | url-get | 100KB | 214 ms | 477 ms | 557 ms | 144 ms | 0.5 | 180 | 0.0 |
| upstash | url-get | 100KB | 228 ms | 389 ms | 472 ms | 226 ms | 0.4 | 180 | 0.0 |
| r2 | url-get | 100KB | 232 ms | 359 ms | 523 ms | 227 ms | 0.4 | 180 | 0.0 |
| railway | url-get | 100KB | 362 ms | 564 ms | 639 ms | 338 ms | 0.3 | 180 | 0.0 |
| appwrite | url-get | 100KB | 480 ms | 822 ms | 883 ms | 211 ms | 0.2 | 180 | 0.0 |
| aws-s3 | url-get | 100KB | 515 ms | 589 ms | 614 ms | 321 ms | 0.2 | 180 | 0.0 |
| bunny | url-get | 100KB | 542 ms | 657 ms | 779 ms | 372 ms | 0.2 | 180 | 0.0 |
| b2 | url-get | 100KB | 548 ms | 610 ms | 985 ms | 325 ms | 0.2 | 179 | 0.0 |
| neon | url-get | 100KB | 589 ms | 698 ms | 727 ms | 376 ms | 0.2 | 180 | 0.0 |
| tigris | url-get | 100MB | 1.43 s | 2.45 s | 2.99 s | 61 ms | 73.5 | 21 | 4.8 |
| convex | url-get | 100MB | 1.78 s | 4.39 s | 5.07 s | 149 ms | 59.0 | 24 | 0.0 |
| railway | url-get | 100MB | 1.85 s | 2.38 s | 2.64 s | 321 ms | 56.7 | 24 | 0.0 |
| neon | url-get | 100MB | 2.27 s | 2.42 s | 2.45 s | 386 ms | 46.2 | 24 | 0.0 |
| bunny | url-get | 100MB | 2.50 s | 4.80 s | 5.45 s | 417 ms | 42.0 | 24 | 0.0 |
| aws-s3 | url-get | 100MB | 3.75 s | 4.13 s | 7.39 s | 347 ms | 28.0 | 24 | 0.0 |
| b2 | url-get | 100MB | 4.00 s | 5.14 s | 5.45 s | 360 ms | 26.2 | 23 | 0.0 |
| appwrite | url-get | 100MB | 4.25 s | 6.19 s | 6.62 s | 499 ms | 24.7 | 24 | 0.0 |
| upstash | url-get | 100MB | 5.56 s | 13.51 s | 14.42 s | 273 ms | 18.9 | 24 | 0.0 |
| r2 | url-get | 100MB | 5.56 s | 8.94 s | 10.24 s | 328 ms | 18.8 | 23 | 0.0 |

## From boat-lille

| Provider | Op | Size | p50 | p95 | p99 | TTFB p50 | MB/s p50 | n | fail % |
|---|---|---|---|---|---|---|---|---|---|
| tigris | burst-upload | 32x100KB | 238 ms | 596 ms | 637 ms | – | 13.8 | 30 | 3.3 |
| railway | burst-upload | 32x100KB | 430 ms | – | – | – | 7.6 | 20 | 5.0 |
| aws-s3 | burst-upload | 32x100KB | 447 ms | 679 ms | 973 ms | – | 7.3 | 30 | 0.0 |
| neon | burst-upload | 32x100KB | 510 ms | 736 ms | 1.02 s | – | 6.4 | 30 | 3.3 |
| r2 | burst-upload | 32x100KB | 806 ms | 1.00 s | 1.05 s | – | 4.1 | 30 | 3.3 |
| upstash | burst-upload | 32x100KB | 869 ms | 1.22 s | 1.31 s | – | 3.8 | 30 | 0.0 |
| convex | burst-upload | 32x100KB | 871 ms | 1.21 s | 1.39 s | – | 3.8 | 30 | 0.0 |
| appwrite | burst-upload | 32x100KB | 1.25 s | 1.74 s | 2.14 s | – | 2.6 | 30 | 0.0 |
| bunny | burst-upload | 32x100KB | 1.51 s | 5.98 s | 7.12 s | – | 2.2 | 30 | 0.0 |
| b2 | burst-upload | 32x100KB | 1.61 s | 2.26 s | 2.64 s | – | 2.0 | 30 | 0.0 |
| tigris | concurrent-download | 16x100KB | 53 ms | 190 ms | 246 ms | – | 31.1 | 30 | 0.0 |
| bunny | concurrent-download | 16x100KB | 266 ms | 479 ms | 635 ms | – | 6.2 | 30 | 0.0 |
| b2 | concurrent-download | 16x100KB | 347 ms | 542 ms | 4.09 s | – | 4.7 | 30 | 6.7 |
| neon | concurrent-download | 16x100KB | 360 ms | 516 ms | 538 ms | – | 4.6 | 30 | 0.0 |
| r2 | concurrent-download | 16x100KB | 414 ms | 654 ms | 783 ms | – | 4.0 | 30 | 0.0 |
| aws-s3 | concurrent-download | 16x100KB | 454 ms | 663 ms | 739 ms | – | 3.6 | 29 | 0.0 |
| upstash | concurrent-download | 16x100KB | 474 ms | 748 ms | 778 ms | – | 3.5 | 30 | 0.0 |
| railway | concurrent-download | 16x100KB | 475 ms | 600 ms | 674 ms | – | 3.4 | 20 | 0.0 |
| appwrite | concurrent-download | 16x100KB | 693 ms | 1.01 s | 1.32 s | – | 2.4 | 30 | 0.0 |
| convex | concurrent-download | 16x100KB | 722 ms | 1.38 s | 10.07 s | – | 2.3 | 30 | 0.0 |
| tigris | concurrent-upload | 16x100KB | 209 ms | 939 ms | 11.88 s | – | 7.8 | 30 | 0.0 |
| railway | concurrent-upload | 16x100KB | 446 ms | 671 ms | 685 ms | – | 3.7 | 20 | 0.0 |
| aws-s3 | concurrent-upload | 16x100KB | 449 ms | 668 ms | 681 ms | – | 3.6 | 30 | 3.3 |
| neon | concurrent-upload | 16x100KB | 464 ms | 700 ms | 724 ms | – | 3.5 | 30 | 0.0 |
| r2 | concurrent-upload | 16x100KB | 776 ms | 1.27 s | 1.71 s | – | 2.1 | 30 | 0.0 |
| upstash | concurrent-upload | 16x100KB | 813 ms | 1.04 s | 1.13 s | – | 2.0 | 30 | 0.0 |
| convex | concurrent-upload | 16x100KB | 860 ms | 1.07 s | 1.77 s | – | 1.9 | 30 | 0.0 |
| appwrite | concurrent-upload | 16x100KB | 1.03 s | 1.85 s | 4.88 s | – | 1.6 | 30 | 0.0 |
| b2 | concurrent-upload | 16x100KB | 1.46 s | 5.20 s | 6.24 s | – | 1.1 | 30 | 0.0 |
| bunny | concurrent-upload | 16x100KB | 1.67 s | 6.84 s | 8.39 s | – | 1.0 | 30 | 0.0 |
| aws-s3 | copy | 10MB | 244 ms | 291 ms | 316 ms | – | – | 60 | 0.0 |
| tigris | copy | 10MB | 268 ms | 558 ms | 1.46 s | – | – | 59 | 0.0 |
| neon | copy | 10MB | 317 ms | 391 ms | 423 ms | – | – | 60 | 0.0 |
| bunny | copy | 10MB | 504 ms | 949 ms | 1.25 s | – | – | 60 | 0.0 |
| railway | copy | 10MB | 544 ms | 713 ms | 835 ms | – | – | 40 | 0.0 |
| b2 | copy | 10MB | 835 ms | 2.31 s | 3.01 s | – | – | 60 | 0.0 |
| r2 | copy | 10MB | 1.35 s | 2.25 s | 4.90 s | – | – | 60 | 0.0 |
| upstash | copy | 10MB | 1.76 s | 2.34 s | 2.85 s | – | – | 60 | 0.0 |
| tigris | delete | 1KB | 40 ms | 54 ms | 66 ms | – | – | 180 | 0.0 |
| b2 | delete | 1KB | 92 ms | 113 ms | 133 ms | – | – | 180 | 0.0 |
| neon | delete | 1KB | 108 ms | 142 ms | 260 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 1KB | 111 ms | 121 ms | 129 ms | – | – | 180 | 0.0 |
| railway | delete | 1KB | 118 ms | 213 ms | 248 ms | – | – | 149 | 0.0 |
| convex | delete | 1KB | 127 ms | 243 ms | 453 ms | – | – | 180 | 0.0 |
| r2 | delete | 1KB | 174 ms | 242 ms | 398 ms | – | – | 180 | 0.0 |
| appwrite | delete | 1KB | 177 ms | 258 ms | 414 ms | – | – | 180 | 0.0 |
| bunny | delete | 1KB | 179 ms | 384 ms | 826 ms | – | – | 180 | 0.0 |
| upstash | delete | 1KB | 202 ms | 300 ms | 355 ms | – | – | 180 | 0.0 |
| tigris | delete | 1MB | 40 ms | 57 ms | 69 ms | – | – | 90 | 0.0 |
| b2 | delete | 1MB | 93 ms | 107 ms | 150 ms | – | – | 90 | 0.0 |
| neon | delete | 1MB | 109 ms | 203 ms | 249 ms | – | – | 90 | 0.0 |
| aws-s3 | delete | 1MB | 111 ms | 118 ms | 129 ms | – | – | 90 | 0.0 |
| railway | delete | 1MB | 118 ms | 138 ms | 173 ms | – | – | 60 | 0.0 |
| convex | delete | 1MB | 123 ms | 157 ms | 364 ms | – | – | 90 | 0.0 |
| bunny | delete | 1MB | 175 ms | 323 ms | 858 ms | – | – | 90 | 0.0 |
| r2 | delete | 1MB | 176 ms | 248 ms | 335 ms | – | – | 90 | 0.0 |
| appwrite | delete | 1MB | 179 ms | 312 ms | 934 ms | – | – | 90 | 0.0 |
| upstash | delete | 1MB | 210 ms | 353 ms | 482 ms | – | – | 90 | 0.0 |
| tigris | delete | 10MB | 45 ms | 70 ms | 109 ms | – | – | 60 | 0.0 |
| b2 | delete | 10MB | 95 ms | 153 ms | 170 ms | – | – | 60 | 0.0 |
| aws-s3 | delete | 10MB | 112 ms | 122 ms | 129 ms | – | – | 60 | 0.0 |
| neon | delete | 10MB | 113 ms | 167 ms | 282 ms | – | – | 60 | 0.0 |
| railway | delete | 10MB | 120 ms | 229 ms | 339 ms | – | – | 40 | 0.0 |
| convex | delete | 10MB | 125 ms | 162 ms | 305 ms | – | – | 60 | 0.0 |
| r2 | delete | 10MB | 177 ms | 248 ms | 357 ms | – | – | 60 | 0.0 |
| appwrite | delete | 10MB | 179 ms | 301 ms | 835 ms | – | – | 60 | 0.0 |
| bunny | delete | 10MB | 191 ms | 1.02 s | 4.30 s | – | – | 60 | 0.0 |
| upstash | delete | 10MB | 205 ms | 317 ms | 535 ms | – | – | 60 | 0.0 |
| tigris | delete | 100KB | 41 ms | 59 ms | 94 ms | – | – | 180 | 0.0 |
| b2 | delete | 100KB | 95 ms | 107 ms | 161 ms | – | – | 179 | 0.0 |
| neon | delete | 100KB | 109 ms | 144 ms | 252 ms | – | – | 180 | 0.0 |
| aws-s3 | delete | 100KB | 112 ms | 121 ms | 131 ms | – | – | 180 | 0.0 |
| railway | delete | 100KB | 120 ms | 152 ms | 224 ms | – | – | 120 | 0.0 |
| convex | delete | 100KB | 124 ms | 241 ms | 526 ms | – | – | 179 | 0.0 |
| r2 | delete | 100KB | 171 ms | 236 ms | 403 ms | – | – | 180 | 0.0 |
| appwrite | delete | 100KB | 177 ms | 229 ms | 471 ms | – | – | 180 | 0.0 |
| bunny | delete | 100KB | 179 ms | 521 ms | 3.03 s | – | – | 180 | 0.0 |
| upstash | delete | 100KB | 203 ms | 323 ms | 544 ms | – | – | 180 | 0.0 |
| tigris | delete | 100MB | 41 ms | – | – | – | – | 18 | 0.0 |
| neon | delete | 100MB | 114 ms | 128 ms | 132 ms | – | – | 24 | 0.0 |
| aws-s3 | delete | 100MB | 122 ms | 338 ms | 343 ms | – | – | 24 | 0.0 |
| convex | delete | 100MB | 132 ms | 312 ms | 338 ms | – | – | 24 | 0.0 |
| railway | delete | 100MB | 132 ms | – | – | – | – | 16 | 0.0 |
| r2 | delete | 100MB | 175 ms | 214 ms | 260 ms | – | – | 24 | 0.0 |
| appwrite | delete | 100MB | 197 ms | 389 ms | 486 ms | – | – | 23 | 0.0 |
| upstash | delete | 100MB | 200 ms | 330 ms | 339 ms | – | – | 24 | 0.0 |
| b2 | delete | 100MB | 273 ms | 299 ms | 326 ms | – | – | 24 | 0.0 |
| bunny | delete | 100MB | 1.61 s | 2.76 s | 3.85 s | – | – | 24 | 0.0 |
| tigris | download | 1KB | 14 ms | 18 ms | 25 ms | 14 ms | 0.1 | 180 | 0.0 |
| b2 | download | 1KB | 97 ms | 121 ms | 163 ms | 97 ms | 0.0 | 180 | 0.0 |
| railway | download | 1KB | 102 ms | 198 ms | 221 ms | 102 ms | 0.0 | 149 | 0.0 |
| aws-s3 | download | 1KB | 116 ms | 125 ms | 138 ms | 116 ms | 0.0 | 180 | 0.0 |
| neon | download | 1KB | 121 ms | 141 ms | 177 ms | 120 ms | 0.0 | 180 | 0.0 |
| bunny | download | 1KB | 122 ms | 240 ms | 278 ms | 122 ms | 0.0 | 180 | 0.0 |
| appwrite | download | 1KB | 199 ms | 449 ms | 534 ms | 199 ms | 0.0 | 180 | 0.0 |
| convex | download | 1KB | 269 ms | 463 ms | 560 ms | 269 ms | 0.0 | 180 | 0.0 |
| r2 | download | 1KB | 272 ms | 349 ms | 447 ms | 272 ms | 0.0 | 180 | 0.0 |
| upstash | download | 1KB | 340 ms | 438 ms | 527 ms | 340 ms | 0.0 | 180 | 0.0 |
| tigris | download | 1MB | 60 ms | 350 ms | 820 ms | 41 ms | 17.4 | 90 | 0.0 |
| bunny | download | 1MB | 185 ms | 744 ms | 830 ms | 137 ms | 5.7 | 90 | 0.0 |
| railway | download | 1MB | 326 ms | 759 ms | 936 ms | 207 ms | 3.2 | 60 | 0.0 |
| aws-s3 | download | 1MB | 384 ms | 1.07 s | 4.00 s | 117 ms | 2.7 | 90 | 0.0 |
| r2 | download | 1MB | 421 ms | 681 ms | 1.05 s | 312 ms | 2.5 | 90 | 0.0 |
| upstash | download | 1MB | 439 ms | 639 ms | 891 ms | 351 ms | 2.4 | 90 | 0.0 |
| neon | download | 1MB | 441 ms | 1.32 s | 1.94 s | 122 ms | 2.4 | 90 | 0.0 |
| b2 | download | 1MB | 610 ms | 662 ms | 696 ms | 141 ms | 1.7 | 90 | 0.0 |
| appwrite | download | 1MB | 647 ms | 1.10 s | 1.31 s | 647 ms | 1.6 | 90 | 0.0 |
| convex | download | 1MB | 659 ms | 997 ms | 1.08 s | 272 ms | 1.6 | 90 | 0.0 |
| tigris | download | 10MB | 234 ms | 510 ms | 595 ms | 64 ms | 44.8 | 60 | 0.0 |
| bunny | download | 10MB | 545 ms | 771 ms | 1.61 s | 137 ms | 19.2 | 60 | 0.0 |
| r2 | download | 10MB | 856 ms | 1.21 s | 1.40 s | 303 ms | 12.3 | 60 | 0.0 |
| railway | download | 10MB | 882 ms | 1.80 s | 3.65 s | 224 ms | 11.9 | 40 | 0.0 |
| convex | download | 10MB | 899 ms | 1.50 s | 2.47 s | 290 ms | 11.7 | 60 | 0.0 |
| upstash | download | 10MB | 900 ms | 1.26 s | 1.62 s | 376 ms | 11.7 | 60 | 0.0 |
| b2 | download | 10MB | 999 ms | 1.16 s | 1.19 s | 152 ms | 10.5 | 60 | 0.0 |
| appwrite | download | 10MB | 1.39 s | 1.86 s | 4.56 s | 1.39 s | 7.5 | 60 | 0.0 |
| neon | download | 10MB | 2.73 s | 3.84 s | 21.70 s | 129 ms | 3.8 | 60 | 0.0 |
| aws-s3 | download | 10MB | 3.34 s | 11.98 s | 33.35 s | 118 ms | 3.1 | 60 | 0.0 |
| tigris | download | 100KB | 20 ms | 32 ms | 39 ms | 17 ms | 5.2 | 180 | 0.0 |
| aws-s3 | download | 100KB | 121 ms | 320 ms | 757 ms | 119 ms | 0.8 | 180 | 0.0 |
| neon | download | 100KB | 126 ms | 322 ms | 378 ms | 122 ms | 0.8 | 180 | 0.0 |
| bunny | download | 100KB | 163 ms | 427 ms | 544 ms | 130 ms | 0.6 | 180 | 0.0 |
| railway | download | 100KB | 210 ms | 459 ms | 488 ms | 201 ms | 0.5 | 120 | 0.0 |
| r2 | download | 100KB | 283 ms | 423 ms | 520 ms | 277 ms | 0.4 | 180 | 0.0 |
| b2 | download | 100KB | 313 ms | 345 ms | 417 ms | 133 ms | 0.3 | 179 | 0.0 |
| upstash | download | 100KB | 352 ms | 495 ms | 581 ms | 342 ms | 0.3 | 180 | 0.0 |
| appwrite | download | 100KB | 379 ms | 725 ms | 875 ms | 379 ms | 0.3 | 180 | 0.0 |
| convex | download | 100KB | 493 ms | 675 ms | 792 ms | 277 ms | 0.2 | 179 | 0.0 |
| tigris | download | 100MB | 1.71 s | – | – | 42 ms | 61.3 | 18 | 0.0 |
| convex | download | 100MB | 2.44 s | 5.39 s | 5.87 s | 315 ms | 42.9 | 24 | 0.0 |
| railway | download | 100MB | 3.42 s | – | – | 249 ms | 30.7 | 16 | 0.0 |
| appwrite | download | 100MB | 3.98 s | 6.74 s | 20.09 s | 3.90 s | 26.4 | 23 | 0.0 |
| b2 | download | 100MB | 4.54 s | 8.38 s | 8.77 s | 153 ms | 23.1 | 24 | 0.0 |
| bunny | download | 100MB | 4.89 s | 6.85 s | 8.16 s | 248 ms | 21.4 | 24 | 0.0 |
| upstash | download | 100MB | 6.17 s | 9.46 s | 10.22 s | 463 ms | 17.0 | 24 | 0.0 |
| r2 | download | 100MB | 6.40 s | 8.24 s | 9.66 s | 369 ms | 16.4 | 24 | 0.0 |
| aws-s3 | download | 100MB | 22.86 s | 61.38 s | 81.93 s | 136 ms | 4.6 | 24 | 0.0 |
| neon | download | 100MB | 24.43 s | 54.36 s | 73.77 s | 125 ms | 4.3 | 24 | 0.0 |
| tigris | first-request | 1KB | 37 ms | 241 ms | 256 ms | – | – | 60 | 1.7 |
| appwrite | first-request | 1KB | 117 ms | 176 ms | 193 ms | – | – | 60 | 0.0 |
| railway | first-request | 1KB | 129 ms | 235 ms | 281 ms | – | – | 40 | 0.0 |
| convex | first-request | 1KB | 138 ms | 185 ms | 378 ms | – | – | 60 | 0.0 |
| r2 | first-request | 1KB | 165 ms | 222 ms | 300 ms | – | – | 60 | 0.0 |
| upstash | first-request | 1KB | 189 ms | 308 ms | 328 ms | – | – | 60 | 0.0 |
| bunny | first-request | 1KB | 249 ms | 311 ms | 408 ms | – | – | 60 | 0.0 |
| b2 | first-request | 1KB | 275 ms | 383 ms | 398 ms | – | – | 60 | 0.0 |
| aws-s3 | first-request | 1KB | 305 ms | 332 ms | 346 ms | – | – | 60 | 0.0 |
| neon | first-request | 1KB | 345 ms | 375 ms | 389 ms | – | – | 60 | 0.0 |
| tigris | head | 1KB | 13 ms | 16 ms | 18 ms | – | – | 180 | 0.0 |
| b2 | head | 1KB | 91 ms | 115 ms | 140 ms | – | – | 180 | 0.0 |
| neon | head | 1KB | 94 ms | 119 ms | 192 ms | – | – | 180 | 0.0 |
| bunny | head | 1KB | 98 ms | 174 ms | 198 ms | – | – | 180 | 0.0 |
| railway | head | 1KB | 102 ms | 222 ms | 361 ms | – | – | 149 | 0.0 |
| aws-s3 | head | 1KB | 104 ms | 117 ms | 319 ms | – | – | 180 | 0.0 |
| appwrite | head | 1KB | 110 ms | 401 ms | 525 ms | – | – | 180 | 0.0 |
| convex | head | 1KB | 126 ms | 278 ms | 508 ms | – | – | 180 | 0.0 |
| r2 | head | 1KB | 135 ms | 201 ms | 238 ms | – | – | 180 | 0.0 |
| upstash | head | 1KB | 166 ms | 317 ms | 435 ms | – | – | 180 | 0.0 |
| tigris | head | 1MB | 13 ms | 15 ms | 16 ms | – | – | 90 | 0.0 |
| b2 | head | 1MB | 93 ms | 118 ms | 147 ms | – | – | 90 | 0.0 |
| bunny | head | 1MB | 95 ms | 170 ms | 217 ms | – | – | 90 | 0.0 |
| neon | head | 1MB | 95 ms | 128 ms | 292 ms | – | – | 90 | 0.0 |
| railway | head | 1MB | 103 ms | 119 ms | 129 ms | – | – | 60 | 0.0 |
| aws-s3 | head | 1MB | 103 ms | 242 ms | 322 ms | – | – | 90 | 0.0 |
| appwrite | head | 1MB | 109 ms | 406 ms | 513 ms | – | – | 90 | 0.0 |
| convex | head | 1MB | 126 ms | 301 ms | 331 ms | – | – | 90 | 0.0 |
| r2 | head | 1MB | 134 ms | 192 ms | 230 ms | – | – | 90 | 0.0 |
| upstash | head | 1MB | 166 ms | 291 ms | 352 ms | – | – | 90 | 0.0 |
| tigris | head | 10MB | 14 ms | 113 ms | 166 ms | – | – | 60 | 0.0 |
| bunny | head | 10MB | 94 ms | 181 ms | 215 ms | – | – | 60 | 0.0 |
| neon | head | 10MB | 98 ms | 351 ms | 367 ms | – | – | 60 | 0.0 |
| railway | head | 10MB | 117 ms | 271 ms | 488 ms | – | – | 40 | 0.0 |
| appwrite | head | 10MB | 122 ms | 447 ms | 740 ms | – | – | 60 | 0.0 |
| convex | head | 10MB | 128 ms | 305 ms | 317 ms | – | – | 60 | 0.0 |
| r2 | head | 10MB | 135 ms | 175 ms | 233 ms | – | – | 60 | 0.0 |
| upstash | head | 10MB | 174 ms | 320 ms | 541 ms | – | – | 60 | 0.0 |
| b2 | head | 10MB | 276 ms | 320 ms | 324 ms | – | – | 60 | 0.0 |
| aws-s3 | head | 10MB | 298 ms | 324 ms | 336 ms | – | – | 60 | 0.0 |
| tigris | head | 100KB | 13 ms | 16 ms | 20 ms | – | – | 180 | 0.0 |
| bunny | head | 100KB | 92 ms | 177 ms | 221 ms | – | – | 180 | 0.0 |
| b2 | head | 100KB | 93 ms | 126 ms | 157 ms | – | – | 179 | 0.0 |
| neon | head | 100KB | 95 ms | 121 ms | 209 ms | – | – | 180 | 0.0 |
| railway | head | 100KB | 103 ms | 109 ms | 134 ms | – | – | 120 | 0.0 |
| aws-s3 | head | 100KB | 106 ms | 296 ms | 335 ms | – | – | 180 | 0.0 |
| appwrite | head | 100KB | 110 ms | 380 ms | 575 ms | – | – | 180 | 0.0 |
| convex | head | 100KB | 125 ms | 301 ms | 444 ms | – | – | 179 | 0.0 |
| r2 | head | 100KB | 134 ms | 188 ms | 246 ms | – | – | 180 | 0.0 |
| upstash | head | 100KB | 168 ms | 320 ms | 407 ms | – | – | 180 | 0.0 |
| tigris | head | 100MB | 23 ms | – | – | – | – | 18 | 0.0 |
| bunny | head | 100MB | 91 ms | 139 ms | 155 ms | – | – | 24 | 0.0 |
| b2 | head | 100MB | 97 ms | 125 ms | 129 ms | – | – | 24 | 0.0 |
| neon | head | 100MB | 98 ms | 110 ms | 120 ms | – | – | 24 | 0.0 |
| railway | head | 100MB | 102 ms | – | – | – | – | 16 | 0.0 |
| aws-s3 | head | 100MB | 104 ms | 123 ms | 131 ms | – | – | 24 | 0.0 |
| appwrite | head | 100MB | 119 ms | 418 ms | 453 ms | – | – | 23 | 0.0 |
| r2 | head | 100MB | 136 ms | 208 ms | 233 ms | – | – | 24 | 0.0 |
| convex | head | 100MB | 150 ms | 377 ms | 414 ms | – | – | 24 | 0.0 |
| upstash | head | 100MB | 153 ms | 196 ms | 209 ms | – | – | 24 | 0.0 |
| tigris | list-all | 1000 objects | 53 ms | – | – | – | – | 18 | 0.0 |
| neon | list-all | 1000 objects | 112 ms | – | – | – | – | 18 | 0.0 |
| railway | list-all | 1000 objects | 194 ms | – | – | – | – | 12 | 0.0 |
| aws-s3 | list-all | 1000 objects | 349 ms | – | – | – | – | 18 | 0.0 |
| b2 | list-all | 1000 objects | 411 ms | – | – | – | – | 18 | 0.0 |
| bunny | list-all | 1000 objects | 630 ms | – | – | – | – | 18 | 0.0 |
| r2 | list-all | 1000 objects | 810 ms | – | – | – | – | 18 | 0.0 |
| upstash | list-all | 1000 objects | 928 ms | – | – | – | – | 18 | 0.0 |
| appwrite | list-all | 1000 objects | 1.37 s | – | – | – | – | 18 | 0.0 |
| tigris | range-get | 256KB of 10MB | 80 ms | 366 ms | 885 ms | 77 ms | – | 59 | 0.0 |
| bunny | range-get | 256KB of 10MB | 237 ms | 455 ms | 682 ms | 190 ms | – | 60 | 0.0 |
| railway | range-get | 256KB of 10MB | 251 ms | 603 ms | 645 ms | 215 ms | – | 40 | 0.0 |
| neon | range-get | 256KB of 10MB | 282 ms | 463 ms | 526 ms | 121 ms | – | 60 | 0.0 |
| r2 | range-get | 256KB of 10MB | 370 ms | 748 ms | 916 ms | 331 ms | – | 60 | 0.0 |
| aws-s3 | range-get | 256KB of 10MB | 386 ms | 431 ms | 1.58 s | 117 ms | – | 60 | 0.0 |
| b2 | range-get | 256KB of 10MB | 442 ms | 517 ms | 655 ms | 146 ms | – | 60 | 0.0 |
| convex | range-get | 256KB of 10MB | 562 ms | 777 ms | 896 ms | 274 ms | – | 60 | 0.0 |
| tigris | signed-upload | 1MB | 169 ms | 391 ms | 995 ms | – | – | 60 | 0.0 |
| railway | signed-upload | 1MB | 555 ms | 689 ms | 1.25 s | – | – | 40 | 0.0 |
| r2 | signed-upload | 1MB | 565 ms | 1.08 s | 1.18 s | – | – | 60 | 0.0 |
| upstash | signed-upload | 1MB | 665 ms | 1.05 s | 1.18 s | – | – | 60 | 0.0 |
| bunny | signed-upload | 1MB | 851 ms | 2.75 s | 5.33 s | – | – | 60 | 0.0 |
| b2 | signed-upload | 1MB | 858 ms | 975 ms | 1.03 s | – | – | 60 | 0.0 |
| neon | signed-upload | 1MB | 913 ms | 982 ms | 1.10 s | – | – | 60 | 0.0 |
| aws-s3 | signed-upload | 1MB | 954 ms | 1.37 s | 1.83 s | – | – | 60 | 0.0 |
| tigris | upload | 1KB | 31 ms | 56 ms | 185 ms | – | 0.0 | 180 | 0.0 |
| railway | upload | 1KB | 116 ms | 222 ms | 251 ms | – | 0.0 | 149 | 0.0 |
| aws-s3 | upload | 1KB | 118 ms | 127 ms | 135 ms | – | 0.0 | 180 | 0.0 |
| neon | upload | 1KB | 158 ms | 227 ms | 375 ms | – | 0.0 | 180 | 0.0 |
| bunny | upload | 1KB | 346 ms | 1.19 s | 3.89 s | – | 0.0 | 180 | 0.0 |
| r2 | upload | 1KB | 412 ms | 678 ms | 787 ms | – | 0.0 | 180 | 0.0 |
| appwrite | upload | 1KB | 452 ms | 771 ms | 1.09 s | – | 0.0 | 180 | 0.0 |
| upstash | upload | 1KB | 488 ms | 790 ms | 974 ms | – | 0.0 | 180 | 0.0 |
| b2 | upload | 1KB | 502 ms | 981 ms | 1.32 s | – | 0.0 | 180 | 0.0 |
| convex | upload | 1KB | 575 ms | 861 ms | 930 ms | – | 0.0 | 180 | 0.0 |
| tigris | upload | 1MB | 121 ms | 262 ms | 341 ms | – | 8.6 | 90 | 0.0 |
| railway | upload | 1MB | 509 ms | 669 ms | 694 ms | – | 2.1 | 60 | 0.0 |
| r2 | upload | 1MB | 509 ms | 874 ms | 1.19 s | – | 2.1 | 90 | 0.0 |
| upstash | upload | 1MB | 625 ms | 1.21 s | 1.66 s | – | 1.7 | 90 | 0.0 |
| neon | upload | 1MB | 668 ms | 738 ms | 774 ms | – | 1.6 | 90 | 0.0 |
| aws-s3 | upload | 1MB | 685 ms | 935 ms | 1.08 s | – | 1.5 | 90 | 0.0 |
| bunny | upload | 1MB | 733 ms | 1.50 s | 2.91 s | – | 1.4 | 90 | 0.0 |
| b2 | upload | 1MB | 830 ms | 950 ms | 1.13 s | – | 1.3 | 90 | 0.0 |
| appwrite | upload | 1MB | 919 ms | 1.58 s | 2.57 s | – | 1.1 | 90 | 0.0 |
| convex | upload | 1MB | 1.05 s | 1.37 s | 1.47 s | – | 1.0 | 90 | 0.0 |
| tigris | upload | 10MB | 413 ms | 1.30 s | 6.47 s | – | 25.4 | 60 | 0.0 |
| railway | upload | 10MB | 998 ms | 1.52 s | 4.96 s | – | 10.5 | 40 | 0.0 |
| r2 | upload | 10MB | 1.11 s | 1.88 s | 2.30 s | – | 9.5 | 60 | 0.0 |
| upstash | upload | 10MB | 1.16 s | 2.53 s | 7.84 s | – | 9.0 | 60 | 0.0 |
| neon | upload | 10MB | 1.31 s | 1.39 s | 3.94 s | – | 8.0 | 60 | 0.0 |
| bunny | upload | 10MB | 1.33 s | 3.12 s | 6.26 s | – | 7.9 | 60 | 0.0 |
| aws-s3 | upload | 10MB | 1.64 s | 1.98 s | 6.50 s | – | 6.4 | 60 | 0.0 |
| b2 | upload | 10MB | 1.67 s | 2.36 s | 2.57 s | – | 6.3 | 60 | 0.0 |
| convex | upload | 10MB | 1.70 s | 2.14 s | 2.24 s | – | 6.2 | 60 | 0.0 |
| appwrite | upload | 10MB | 3.52 s | 11.21 s | 13.18 s | – | 3.0 | 60 | 0.0 |
| tigris | upload | 100KB | 79 ms | 189 ms | 239 ms | – | 1.3 | 180 | 0.0 |
| railway | upload | 100KB | 309 ms | 406 ms | 485 ms | – | 0.3 | 120 | 0.0 |
| neon | upload | 100KB | 389 ms | 440 ms | 453 ms | – | 0.3 | 180 | 0.0 |
| aws-s3 | upload | 100KB | 403 ms | 432 ms | 504 ms | – | 0.3 | 180 | 0.0 |
| r2 | upload | 100KB | 428 ms | 586 ms | 955 ms | – | 0.2 | 180 | 0.0 |
| bunny | upload | 100KB | 474 ms | 1.05 s | 3.30 s | – | 0.2 | 180 | 0.0 |
| upstash | upload | 100KB | 528 ms | 822 ms | 1.01 s | – | 0.2 | 180 | 0.0 |
| appwrite | upload | 100KB | 590 ms | 986 ms | 1.18 s | – | 0.2 | 180 | 0.0 |
| convex | upload | 100KB | 691 ms | 964 ms | 1.23 s | – | 0.1 | 180 | 0.6 |
| b2 | upload | 100KB | 751 ms | 1.40 s | 2.07 s | – | 0.1 | 180 | 0.6 |
| tigris | upload | 100MB | 2.01 s | – | – | – | 52.1 | 24 | 25.0 |
| r2 | upload | 100MB | 4.71 s | 5.57 s | 5.61 s | – | 22.2 | 24 | 0.0 |
| railway | upload | 100MB | 7.72 s | – | – | – | 13.6 | 16 | 0.0 |
| aws-s3 | upload | 100MB | 7.98 s | 14.18 s | 22.16 s | – | 13.1 | 24 | 0.0 |
| neon | upload | 100MB | 8.03 s | 8.55 s | 14.72 s | – | 13.1 | 24 | 0.0 |
| appwrite | upload | 100MB | 8.66 s | 20.14 s | 21.75 s | – | 12.1 | 24 | 4.2 |
| b2 | upload | 100MB | 8.88 s | 10.65 s | 10.79 s | – | 11.8 | 24 | 0.0 |
| bunny | upload | 100MB | 9.89 s | 17.19 s | 20.65 s | – | 10.6 | 24 | 0.0 |
| convex | upload | 100MB | 9.90 s | 11.25 s | 11.57 s | – | 10.6 | 24 | 0.0 |
| upstash | upload | 100MB | 15.10 s | 19.28 s | 19.46 s | – | 6.9 | 24 | 0.0 |
| tigris | url-get | 1KB | 40 ms | 233 ms | 568 ms | 40 ms | 0.0 | 180 | 0.0 |
| convex | url-get | 1KB | 142 ms | 226 ms | 306 ms | 142 ms | 0.0 | 180 | 0.0 |
| appwrite | url-get | 1KB | 189 ms | 484 ms | 681 ms | 189 ms | 0.0 | 180 | 0.0 |
| upstash | url-get | 1KB | 210 ms | 342 ms | 491 ms | 210 ms | 0.0 | 180 | 0.0 |
| railway | url-get | 1KB | 216 ms | 252 ms | 378 ms | 216 ms | 0.0 | 149 | 0.0 |
| r2 | url-get | 1KB | 219 ms | 376 ms | 398 ms | 219 ms | 0.0 | 180 | 0.0 |
| b2 | url-get | 1KB | 277 ms | 308 ms | 363 ms | 277 ms | 0.0 | 180 | 0.0 |
| bunny | url-get | 1KB | 306 ms | 417 ms | 495 ms | 306 ms | 0.0 | 180 | 0.0 |
| aws-s3 | url-get | 1KB | 311 ms | 331 ms | 344 ms | 311 ms | 0.0 | 180 | 0.0 |
| neon | url-get | 1KB | 371 ms | 409 ms | 453 ms | 370 ms | 0.0 | 180 | 0.0 |
| tigris | url-get | 1MB | 201 ms | 381 ms | 466 ms | 155 ms | 5.2 | 90 | 1.1 |
| r2 | url-get | 1MB | 280 ms | 683 ms | 732 ms | 239 ms | 3.7 | 90 | 0.0 |
| convex | url-get | 1MB | 288 ms | 753 ms | 822 ms | 144 ms | 3.6 | 90 | 0.0 |
| upstash | url-get | 1MB | 292 ms | 608 ms | 1.05 s | 258 ms | 3.6 | 90 | 0.0 |
| railway | url-get | 1MB | 429 ms | 890 ms | 1.02 s | 343 ms | 2.4 | 60 | 0.0 |
| appwrite | url-get | 1MB | 639 ms | 1.02 s | 1.26 s | 213 ms | 1.6 | 90 | 0.0 |
| bunny | url-get | 1MB | 784 ms | 984 ms | 1.23 s | 343 ms | 1.3 | 90 | 0.0 |
| b2 | url-get | 1MB | 810 ms | 908 ms | 1.45 s | 321 ms | 1.3 | 90 | 0.0 |
| aws-s3 | url-get | 1MB | 884 ms | 1.54 s | 1.91 s | 314 ms | 1.2 | 90 | 0.0 |
| neon | url-get | 1MB | 966 ms | 1.44 s | 1.58 s | 386 ms | 1.1 | 90 | 0.0 |
| tigris | url-get | 10MB | 336 ms | 528 ms | 2.06 s | 163 ms | 31.2 | 60 | 0.0 |
| r2 | url-get | 10MB | 647 ms | 1.21 s | 1.57 s | 267 ms | 16.2 | 60 | 0.0 |
| convex | url-get | 10MB | 691 ms | 1.27 s | 2.44 s | 141 ms | 15.2 | 60 | 0.0 |
| upstash | url-get | 10MB | 712 ms | 1.59 s | 1.80 s | 299 ms | 14.7 | 60 | 0.0 |
| railway | url-get | 10MB | 938 ms | 1.47 s | 3.07 s | 339 ms | 11.2 | 40 | 0.0 |
| bunny | url-get | 10MB | 1.17 s | 1.56 s | 2.98 s | 345 ms | 8.9 | 60 | 0.0 |
| b2 | url-get | 10MB | 1.27 s | 1.41 s | 1.49 s | 337 ms | 8.3 | 60 | 0.0 |
| appwrite | url-get | 10MB | 1.36 s | 2.00 s | 3.81 s | 592 ms | 7.7 | 60 | 0.0 |
| neon | url-get | 10MB | 2.99 s | 6.15 s | 25.33 s | 380 ms | 3.5 | 60 | 0.0 |
| aws-s3 | url-get | 10MB | 3.38 s | 6.38 s | 11.23 s | 320 ms | 3.1 | 60 | 0.0 |
| tigris | url-get | 100KB | 88 ms | 268 ms | 676 ms | 62 ms | 1.2 | 180 | 0.0 |
| r2 | url-get | 100KB | 218 ms | 382 ms | 432 ms | 211 ms | 0.5 | 180 | 0.0 |
| convex | url-get | 100KB | 224 ms | 502 ms | 598 ms | 143 ms | 0.5 | 179 | 0.0 |
| upstash | url-get | 100KB | 231 ms | 410 ms | 506 ms | 228 ms | 0.4 | 180 | 0.0 |
| railway | url-get | 100KB | 362 ms | 582 ms | 609 ms | 330 ms | 0.3 | 120 | 0.0 |
| appwrite | url-get | 100KB | 363 ms | 730 ms | 831 ms | 188 ms | 0.3 | 180 | 0.0 |
| aws-s3 | url-get | 100KB | 498 ms | 532 ms | 565 ms | 314 ms | 0.2 | 180 | 0.0 |
| bunny | url-get | 100KB | 505 ms | 612 ms | 690 ms | 329 ms | 0.2 | 180 | 0.0 |
| b2 | url-get | 100KB | 518 ms | 576 ms | 1.86 s | 314 ms | 0.2 | 179 | 0.0 |
| neon | url-get | 100KB | 616 ms | 662 ms | 700 ms | 374 ms | 0.2 | 180 | 0.0 |
| tigris | url-get | 100MB | 1.68 s | – | – | 72 ms | 62.3 | 18 | 0.0 |
| convex | url-get | 100MB | 1.94 s | 3.72 s | 5.37 s | 149 ms | 54.0 | 24 | 0.0 |
| railway | url-get | 100MB | 3.33 s | – | – | 334 ms | 31.5 | 16 | 0.0 |
| r2 | url-get | 100MB | 4.11 s | 9.81 s | 12.25 s | 264 ms | 25.5 | 24 | 0.0 |
| upstash | url-get | 100MB | 4.13 s | 10.90 s | 20.12 s | 275 ms | 25.4 | 24 | 0.0 |
| appwrite | url-get | 100MB | 4.47 s | 6.42 s | 6.47 s | 409 ms | 23.5 | 23 | 0.0 |
| bunny | url-get | 100MB | 5.18 s | 7.57 s | 9.57 s | 438 ms | 20.2 | 24 | 0.0 |
| b2 | url-get | 100MB | 5.61 s | 6.30 s | 6.93 s | 338 ms | 18.7 | 24 | 0.0 |
| aws-s3 | url-get | 100MB | 21.50 s | 65.55 s | 77.26 s | 389 ms | 4.9 | 24 | 0.0 |
| neon | url-get | 100MB | 25.22 s | 27.81 s | 51.88 s | 470 ms | 4.2 | 24 | 0.0 |

## Errors

- 2× r2: TypeError: fetch failed
- 3× neon: TypeError: fetch failed
- 4× upstash: FilesError: upstash-blob: fetch failed
- 6× b2: FilesError: internal incident
- 3× b2: FilesError: read ETIMEDOUT
- 2× b2: Error: HTTP 503
- 16× b2: FilesError: socket hang up
- 7× aws-s3: FilesError: socket hang up
- 2× railway: TypeError: fetch failed
- 4× upstash: url: FilesError: upstash-blob: Could not reach the signing service
- 2× b2: FilesError: The server encountered an unexpected condition that prevented it from fulfilling the request
- 6× convex: FilesError: convex-http: request failed
- 3× r2: FilesError: We encountered an internal error. Please try again.
- 21× tigris: TypeError: fetch failed
- 3× tigris: seed failed: setup: FilesError: The specified key does not exist.
- 3× neon: FilesError: We encountered an internal error. Please try again.
- 1× r2: FilesError: We encountered an internal connectivity issue. Please try again.
- 21× tigris: FilesError: socket hang up
- 2× railway: FilesError: Request body is not seekable, cannot retry
- 1× bunny: TypeError: fetch failed
- 1× railway: FilesError: read ETIMEDOUT
- 1× aws-s3: FilesError: read ETIMEDOUT
- 1× tigris: FilesError: We encountered an internal error, please try again.
- 1× b2: FilesError: Backblaze B2 error
- 2× railway: FilesError: socket hang up
- 2× upstash: FilesError: upstash-blob: Storage responded 500 InternalError
- 1× r2: FilesError: read ETIMEDOUT
- 2× tigris: FilesError: read ETIMEDOUT
- 2× upstash: FilesError: upstash-blob: The operation was aborted due to timeout
- 1× b2: TypeError: terminated
- 1× r2: Error: aborted
- 3× appwrite: FilesError: Appwrite error
- 1× b2: FilesError: incident id 588dc5cf001c-5ce9be21ca78715d
- 2× aws-s3: FilesError: S3 error
- 132× railway: FilesError: Access Denied.
- 2× railway: seed failed: FilesError: Access Denied.
- 20× railway: Error: HTTP 403: <?xml version="1.0" encoding="UTF-8"?>
<Error><Code>AccessDenied</Code><Message>Access Denied.</Message><Resource>/b85a6
- 20× railway: seed failed: setup: FilesError: Unauthorized
- 1× b2: seed failed: setup: FilesError: socket hang up
- 1× railway: FilesError: getaddrinfo EAI_AGAIN bench-i28kqy0zhiq-0rb2tup.t3.storageapi.dev
- 1× tigris: FilesError: read ECONNRESET
