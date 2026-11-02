console.log("script.js loaded");

// Giphy API key (normally this would live in .env, but the course allows it here for now)
const API_KEY = "pOPVojkSgw1YmH1WK7LUnjkm9mhm5LDu";

// Giphy Search endpoint: 12 G-rated results for the search term
const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=funny&limit=12&offset=0&rating=g&lang=en`;
