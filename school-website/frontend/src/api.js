// Local: http://localhost:5000
 // Online: set VITE_API_URL to your API URL, or leave empty to use same domain /api
export const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "http://localhost:5000" : "");
