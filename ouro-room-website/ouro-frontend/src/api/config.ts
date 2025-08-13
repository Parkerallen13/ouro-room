// src/api/config.ts
export const API_LOCAL = "http://localhost:8002";
export const API_PROD  = "https://ouroroomcollective.com";

export const API =
  window.location.hostname.includes("ouroroomcollective.com")
    ? "https://ouroroomcollective.com"
    : "http://localhost:8002";