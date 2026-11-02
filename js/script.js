console.log("script.js loaded");

// Giphy API key (normally this would live in .env, but the course allows it here for now)
const API_KEY = "pOPVojkSgw1YmH1WK7LUnjkm9mhm5LDu";

// Used when the search box is left empty
const DEFAULT_TERM = "funny";

// DOM elements
const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// ---------- API ----------

// Build the Giphy Search URL: 12 G-rated results for the search term
function buildEndpoint(term) {
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(term)}&limit=12&offset=0&rating=g&lang=en`;
  return endpoint;
}

// Request GIFs from Giphy and return the parsed JSON.
// Throws if the server responds with an error status (bad key, rate limit, etc.).
async function fetchGifs(term) {
  const response = await fetch(buildEndpoint(term));
  if (!response.ok) {
    throw new Error(`Giphy responded with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// ---------- Processing ----------

// Pull the original-size image URL (and title, for alt text) out of each GIF
function extractImageUrls(data) {
  return data.data.map((gif) => ({
    url: gif.images.original.url,
    title: escapeHtml(gif.title || "GIF"),
  }));
}

// Make text safe to put inside HTML (titles and search terms come from outside our code)
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// ---------- DOM ----------

// Clear the container, then add one Bootstrap column per GIF
function renderGifs(images) {
  gifContainer.innerHTML = "";
  for (const { url, title } of images) {
    gifContainer.innerHTML += `<img src="${url}" alt="${title}" class="col-3 mb-3">`;
  }
}

// Replace the container contents with a Bootstrap alert (type: "warning", "danger", ...)
function showMessage(text, type) {
  gifContainer.innerHTML = `
    <div class="col-12">
      <div class="alert alert-${type} text-center" role="alert">${text}</div>
    </div>`;
}

// Disable the button and show "Loading..." while a request is in flight
function setLoading(isLoading) {
  fetchGifBtn.disabled = isLoading;
  fetchGifBtn.textContent = isLoading ? "Loading..." : "Fetch a GIF";
}

// ---------- Program flow ----------

// Search for whatever is in the input (or the default term) and show the results
async function searchGifs() {
  // Ignore extra clicks / Enter presses while a search is already running
  if (fetchGifBtn.disabled) return;

  const term = searchInput.value.trim() || DEFAULT_TERM;
  setLoading(true);

  try {
    const data = await fetchGifs(term);
    const images = extractImageUrls(data);
    console.log(images);

    if (images.length === 0) {
      showMessage(`No GIFs found for "${escapeHtml(term)}". Try a different search.`, "warning");
    } else {
      renderGifs(images);
    }
  } catch (error) {
    // Network failures (offline, blocked) and bad responses both end up here
    console.error("Failed to load GIFs:", error);
    showMessage("Sorry, we couldn't load GIFs right now. Check your connection and try again.", "danger");
  } finally {
    setLoading(false);
  }
}

fetchGifBtn.addEventListener("click", searchGifs);

// Pressing Enter in the search box also runs a search
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchGifs();
  }
});
