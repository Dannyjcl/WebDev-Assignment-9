console.log("script.js loaded");

// Giphy API key (normally this would live in .env, but the course allows it here for now)
const API_KEY = "pOPVojkSgw1YmH1WK7LUnjkm9mhm5LDu";

// Giphy Search endpoint: 12 G-rated results for the search term
const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=funny&limit=12&offset=0&rating=g&lang=en`;

// DOM elements
const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");

// Request GIFs from Giphy and return the parsed JSON
async function fetchGifs() {
  const response = await fetch(endpoint);
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

fetchGifBtn.addEventListener("click", async () => {
  const data = await fetchGifs();
  const images = extractImageUrls(data);
  console.log(images);
  renderGifs(images);
});
