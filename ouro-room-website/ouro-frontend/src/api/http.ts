// src/api/http.ts
import axios from "axios";
import { API } from "./config";

export const http = axios.create({
  baseURL: API,
  headers: { "Cache-Control": "no-cache" },
});