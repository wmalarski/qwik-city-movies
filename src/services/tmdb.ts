import fetch from "node-fetch";
import { serverEnv } from "~/env/server";
import type {
  Collection,
  Media,
  MediaDetails,
  MediaTypeArg,
  MovieMedia,
  PersonMedia,
  TvMedia,
} from "./types";

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

type GetMovie = {
  id: number;
};

export const getMovie = ({ id }: GetMovie) => {
  return fetchTMDB<MediaDetails>(`movie/${id}`, {
    append_to_response: "videos,credits,images,external_ids,release_dates",
    include_image_language: "en",
  });
};

type GetMovies = {
  query: string;
  page: number;
};

export const getMovies = ({ query, page }: GetMovies) => {
  return fetchTMDB<Collection<MovieMedia>>(`movie/${query}`, {
    page: String(page),
  });
};

type GetTvShow = {
  id: number;
};

export const getTvShow = ({ id }: GetTvShow) => {
  return fetchTMDB<MediaDetails>(`tv/${id}`, {
    append_to_response: "videos,credits,images,external_ids,content_ratings",
    include_image_language: "en",
  });
};

type GetTvShows = {
  query: string;
  page: number;
};

export const getTvShows = ({ query, page }: GetTvShows) => {
  return fetchTMDB<Collection<TvMedia>>(`tv/${query}`, { page: String(page) });
};

type GetPerson = {
  id: number;
};

export const getPerson = ({ id }: GetPerson) => {
  return fetchTMDB<PersonMedia>(`person/${id}`, {
    append_to_response: "images,combined_credits,external_ids",
    include_image_language: "en",
  });
};

type Search = {
  query: string;
  page: number;
};

export const search = ({ query, page }: Search) => {
  return fetchTMDB<Collection<Media>>("search/multi", {
    page: String(page),
    query,
  });
};

type GetRandomMedia<T> = {
  collections: Collection<T>[];
};

export const getRandomMedia = <T>({ collections }: GetRandomMedia<T>) => {
  const items = collections.flatMap((collection) => collection.results || []);
  const randomItem = items[Math.floor(Math.random() * items.length)];
  return randomItem;
};
