#!/bin/bash
# Grizzly Fitness — start the live preview. Double-click this file in Finder.
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
clear
echo "Grizzly Fitness — live preview"
echo "--------------------------------"
if ! command -v npm >/dev/null 2>&1; then
  echo ""
  echo "Node.js is not installed on this Mac yet."
  echo "Opening nodejs.org — download the LTS installer, run it, then double-click 'Start Preview' again."
  open "https://nodejs.org/en/download"
  read -n 1 -s -r -p "Press any key to close."
  exit 1
fi
echo "Node $(node -v) found."
if [ ! -d node_modules ]; then
  echo "First run: installing dependencies (about a minute)..."
  npm install || { echo "npm install failed — copy the text above and send it to Claude."; read -n 1 -s -r; exit 1; }
fi
( for i in $(seq 1 60); do sleep 1; if curl -s -o /dev/null http://localhost:3000; then open "http://localhost:3000"; break; fi; done ) &
echo ""
echo "Starting the preview at http://localhost:3000 — leave this window open."
echo "To stop: press Control + C (or close this window)."
echo ""
npm run dev
