#!/bin/bash
rm -rf plattar-web/README.md plattar-web/graphics plattar-web/node_modules plattar-web/build plattar-web/package-lock.json
cp README.md plattar-web/README.md
cp -R graphics plattar-web/
cd plattar-web && npm run build && npm publish --scope=public && cd ../
rm -rf plattar-web/README.md plattar-web/graphics plattar-web/node_modules plattar-web/build plattar-web/package-lock.json