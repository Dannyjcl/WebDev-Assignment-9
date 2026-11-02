console.log("script.js loaded");

// Giphy API key (normally this would live in .env, but the course allows it here for now)
const API_KEY = "pOPVojkSgw1YmH1WK7LUnjkm9mhm5LDu";

// Used when the search box is left empty
const DEFAULT_TERM = "funny";

// DOM elements
const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// Build the Giphy Search URL: 12 G-rated results for the search term
function buildEndpoint(term) {
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(term)}&limit=12&offset=0&rating=g&lang=en`;
  return endpoint;
}

// Request GIFs from Giphy and return the parsed JSON
async function fetchGifs(term) {
  const response = await fetch(buildEndpoint(term));
  const data = await response.json();
  return data;
}

// Pull the original-size image URL (and title, for alt text) out of each GIF
function extractImageUrls(data) {
  return data.data.map((gif) => ({
    url: gif.images.original.url,
    title: (gif.title || "GIF").replaceAll('"', "&quot;"),
  }));
}

// Clear the container, then add one Bootstrap column per GIF
function renderGifs(images) {
  gifContainer.innerHTML = "";
  for (const { url, title } of images) {
    gifContainer.innerHTML += `<img src="${url}" alt="${title}" class="col-3 mb-3">`;
  }
}

// Search for whatever is in the input (or the default term) and show the results
async function searchGifs() {
  const term = searchInput.value.trim() || DEFAULT_TERM;
  const data = await fetchGifs(term);
  const images = extractImageUrls(data);
  console.log(images);
  renderGifs(images);
}

fetchGifBtn.addEventListener("click", searchGifs);

// Pressing Enter in the search box also runs a search
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchGifs();
  }
});
