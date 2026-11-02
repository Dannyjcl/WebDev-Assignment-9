console.log("script.js loaded");

// Giphy API key (normally this would live in .env, but the course allows it here for now)
const API_KEY = "pOPVojkSgw1YmH1WK7LUnjkm9mhm5LDu";

// Giphy Search endpoint: 12 G-rated results for the search term
const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=funny&limit=12&offset=0&rating=g&lang=en`;

// Request GIFs from Giphy and return the parsed JSON
async function fetchGifs() {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

// Pull the original-size image URL out of each GIF in the response
function extractImageUrls(data) {
  return data.data.map((gif) => gif.images.original.url);
}

async function getImages() {
  const data = await fetchGifs();
  const images = extractImageUrls(data);
  console.log(images);
  return images;
}

getImages();
