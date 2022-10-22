// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type inferPromise<T> = T extends (...args: any) => Promise<infer A>
  ? A
  : never;

export type TvMedia = {
  backdrop_path?: string | null;
  first_air_date?: string[];
  genre_ids?: number[];
  id: number;
  media_type: "tv";
  name?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string[];
  popularity?: number;
  poster_path?: string | null;
  vote_average?: number;
  vote_count?: number;
};

export type MovieMedia = {
  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  id: number;
  media_type: "movie";
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

export type PeopleMedia = {
  profile_path?: string;
  adult?: boolean;
  id: number;
  known_for?: (TvMedia | MovieMedia)[];
  name?: string;
  popularity?: number;
  media_type: "people";
};

export type Media = MovieMedia | TvMedia | PeopleMedia;

export type MediaType = Media["media_type"];

export type MediaTypeArg = "all" | MediaType;

export type Collection<T> = {
  page?: number;
  results?: T[];
  total_pages?: number;
  total_results?: number;
};
