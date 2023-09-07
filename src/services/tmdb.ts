import { RequestEventBase } from "@builder.io/qwik-city";
import { buildSearchParams } from "~/utils/searchParams";
import type {
  Collection,
  Genre,
  MediaDetails,
  MediaType,
  MovieMedia,
  MovieMediaDetails,
  PersonMediaDetails,
  ProductionMedia,
  TvMedia,
  TvMediaDetails,
} from "./types";

export const getTMDBContext = (event: RequestEventBase) => {
  return {
    apiKey: event.env.get("VITE_TMDB_API_KEY"),
    baseURL: "https://api.themoviedb.org/3",
  };
};

type TMDBContext = ReturnType<typeof getTMDBContext>;

type FetchTMDBArgs = {
  context: TMDBContext;
  path: string;
  query?: Record<string, unknown>;
};

const fetchTMDB = async <T = unknown>({
  context,
  path,
  query,
}: FetchTMDBArgs): Promise<T> => {
  const params = buildSearchParams({
    api_key: context.apiKey,
    ...query,
  });

  const url = `${context.baseURL}/${path}?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(url);
    throw new Error(response.statusText);
  }

  return response.json() as T;
};

type GetTrendingTvArgs = {
  context: TMDBContext;
  page: number;
};

export const getTrendingTv = ({ context, page }: GetTrendingTvArgs) => {
  return fetchTMDB<Collection<TvMedia>>({
    context,
    path: "trending/tv/week",
    query: { page },
  });
};

type GetTrendingMovieArgs = {
  context: TMDBContext;
  page: number;
};

export const getTrendingMovie = ({ context, page }: GetTrendingMovieArgs) => {
  return fetchTMDB<Collection<MovieMedia>>({
    context,
    path: "trending/movie/week",
    query: { page },
  });
};

type GetMovieArgs = {
  context: TMDBContext;
  id: number;
};

export const getMovie = async ({ context, id }: GetMovieArgs) => {
  const result = await fetchTMDB<MovieMediaDetails>({
    context,
    path: `movie/${id}`,
    query: {
      append_to_response: "videos,credits,images,external_ids,release_dates",
      include_image_language: "en",
    },
  });
  return { ...result, media_type: "movie" as const };
};

type GetMoviesArgs = {
  context: TMDBContext;
  query: string;
  page: number;
};

export const getMovies = async ({ context, query, page }: GetMoviesArgs) => {
  const result = await fetchTMDB<Collection<MovieMedia>>({
    context,
    path: `movie/${query}`,
    query: { page },
  });
  const results = result.results?.map((item) => ({
    ...item,
    media_type: "movie" as const,
  }));
  return { ...result, results };
};

type GetTvShowArgs = {
  context: TMDBContext;
  id: number;
};

export const getTvShow = async ({ context, id }: GetTvShowArgs) => {
  const result = await fetchTMDB<TvMediaDetails>({
    context,
    path: `tv/${id}`,
    query: {
      append_to_response: "videos,credits,images,external_ids,content_ratings",
      include_image_language: "en",
    },
  });
  return { ...result, media_type: "tv" as const };
};

type GetTvShowsArgs = {
  context: TMDBContext;
  query: string;
  page: number;
};

export const getTvShows = async ({ context, query, page }: GetTvShowsArgs) => {
  const result = await fetchTMDB<Collection<TvMedia>>({
    context,
    path: `tv/${query}`,
    query: { page },
  });
  const results = result.results?.map((item) => ({
    ...item,
    media_type: "tv" as const,
  }));
  return { ...result, results };
};

type GetPersonArgs = {
  context: TMDBContext;
  id: number;
};

export const getPerson = async ({ context, id }: GetPersonArgs) => {
  const result = await fetchTMDB<PersonMediaDetails>({
    context,
    path: `person/${id}`,
    query: {
      append_to_response: "images,combined_credits,external_ids",
      include_image_language: "en",
    },
  });
  return { ...result, media_type: "person" as const };
};

type SearchArgs = {
  context: TMDBContext;
  query: string;
  page: number;
};

export const search = ({ context, query, page }: SearchArgs) => {
  return fetchTMDB<Collection<ProductionMedia>>({
    context,
    path: "search/multi",
    query: { page, query },
  });
};

type GetRandomMediaArgs<T> = {
  collections: Collection<T>[];
};

export const getRandomMedia = <T>({ collections }: GetRandomMediaArgs<T>) => {
  const items = collections.flatMap((collection) => collection.results || []);
  const randomItem = items[Math.floor(Math.random() * items.length)];
  return randomItem;
};

type GetMediaByGenreArgs = {
  context: TMDBContext;
  media: MediaType;
  genre: number;
  page: number;
};

export const getMediaByGenre = async ({
  context,
  media,
  genre,
  page,
}: GetMediaByGenreArgs) => {
  const result = await fetchTMDB<Collection<ProductionMedia>>({
    context,
    path: `discover/${media}`,
    query: { append_to_response: "genres", page, with_genres: genre },
  });

  const results = result.results?.map((item) => ({
    ...item,
    media_type: media,
  })) as (TvMedia | MovieMedia)[];

  const firstId = results[0].id;

  const first = await fetchTMDB<MediaDetails>({
    context,
    path: `${media}/${firstId}`,
  });

  const found = first.genres?.find((entry) => entry.id === genre);

  return { ...result, genre: found, results };
};

type GetGenreListArgs = {
  context: TMDBContext;
  media: MediaType;
};

export const getGenreList = async ({ context, media }: GetGenreListArgs) => {
  const res = await fetchTMDB<{ genres: Genre[] }>({
    context,
    path: `genre/${media}/list`,
  });

  return res.genres;
};
