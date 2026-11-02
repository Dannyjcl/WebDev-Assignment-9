# Assignment #9 - Giphy API

A small web page that fetches GIFs from the [Giphy Search API](https://developers.giphy.com/docs/api/endpoint#search) and displays them in a Bootstrap grid.

## Features

- Click **Fetch a GIF** to load 12 GIFs (each using its original-size image URL).
- **Search (extra credit):** type a keyword in the search box and click the button or press Enter. An empty search falls back to "funny".
- The button shows "Loading..." and is disabled while a request is running.
- Friendly Bootstrap alerts when a search has no results or the request fails.

## How to run

1. Open the project folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server** (or run `npx serve .`).
3. Click **Fetch a GIF**, or type a search term first.

## Code overview (`js/script.js`)

| Function | Job |
| --- | --- |
| `buildEndpoint(term)` | Builds the Giphy Search URL for a term |
| `fetchGifs(term)` | Calls the API with `fetch` + `async/await` and returns the JSON |
| `extractImageUrls(data)` | Collects each GIF's original image URL and title |
| `renderGifs(images)` | Clears the grid and adds an `<img>` per GIF |
| `showMessage(text, type)` | Shows a Bootstrap alert in the grid |
| `searchGifs()` | Runs the whole flow with loading state and error handling |

## API key

For this assignment the Giphy API key sits directly in `script.js`, which the course allows for now. In a real project it would live in a `.env` file (already listed in `.gitignore`) and be loaded by a server or build step, never committed to the repo.
