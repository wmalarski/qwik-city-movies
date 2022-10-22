import fetch from "node-fetch";
import { serverEnv } from "~/env/server";
import { Collection, Media, MediaTypeArg } from "./types";

const baseURL = "https://api.themoviedb.org/3";

const fetchTMDB = async <T = unknown>(
  path: string,
  search: Record<string, string> = {}
): Promise<T> => {
  const params = new URLSearchParams({
    ...search,
    api_key: serverEnv.VITE_TMDB_API_KEY,
  });
  const url = `${baseURL}/${path}?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(url);
    throw new Error(response.statusText);
  }

  return response.json() as T;
};

type GetTrending = {
  mediaType: MediaTypeArg;
  page: number;
};

export const getTrending = ({ mediaType, page }: GetTrending) => {
  return fetchTMDB<Collection<Media>>(`trending/${mediaType}/week`, {
    page: String(page),
  });
};
