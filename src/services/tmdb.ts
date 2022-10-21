import fetch from "node-fetch";
import { serverEnv } from "~/env/server";

const baseURL = "https://api.themoviedb.org/3";

type Movie = {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
};

type GetTrending = {
  mediaType: "all" | "movie" | "tv" | "person";
};

type GetTrendingResult = {
  page?: number;
  total_pages?: number;
  total_results?: number;
  results?: Movie[];
};

export const getTrending = async ({
  mediaType,
}: GetTrending): Promise<GetTrendingResult> => {
  const params = new URLSearchParams({ api_key: serverEnv.VITE_TMDB_API_KEY });
  const url = `${baseURL}/trending/${mediaType}/day?${params}`;
  const response = await fetch(url);
  return response.json() as GetTrendingResult;
};
