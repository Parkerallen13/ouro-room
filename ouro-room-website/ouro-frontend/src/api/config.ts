// src/api/config.ts
const raw = import.meta.env.VITE_API as string | undefined;
if (!raw) {
  throw new Error("VITE_API is not set. Define it in your .env files.");
}
export const API = raw.replace(/\/+$/, ""); // strip trailing slash