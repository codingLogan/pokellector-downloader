# pokellector-downloader

Allows you to create CSV files of your sets on Pokellector.com

## Features

1. Downloads a CSV from pokellector.com so you can use it for whatever you wish externally.
1. Indicates when you are on the correct page by placing a "GO" badge on the extension.

# Development

## Build for production

There are two entry files that are bundled by parcel

- background-worker.js
- popup.html

To bundle the code for production (and placing it into chrome) run

- `npm run build` (only tested on Windows so far)

## Background Worker

All the background worker does is listens fomr page navigation, and places a "GO" label on the extension when you are on the correct page for downloading a CSV.

File Entrypoint (build script points here)

- background-worker.js

## Popup

This area is responsible for showing the user interface for the extension. It provides any interaction the user needs to begin the download.

File Entrypoint (build script points here)

- popup.html
