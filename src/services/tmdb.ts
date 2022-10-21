import fetch from "node-fetch";
import { serverEnv } from "~/env/server";

const baseURL = "https://api.themoviedb.org/3";

export const getTrending = async () => {
  const params = new URLSearchParams({ api_key: serverEnv.VITE_TMDB_API_KEY });
  const response = await fetch(`${baseURL}/trending/all/day?${params}`);
  return response.json();
};
