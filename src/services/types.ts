type TvMedia = {
  backdrop_path?: string | null;
  first_air_date?: string[];
  genre_ids?: number[];
  id: number;
  media_type?: "tv";
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

type MovieMedia = {
  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  id: number;
  media_type?: "movie";
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

type ProductionMedia = TvMedia | MovieMedia;

export type PersonMedia = {
  profile_path?: string;
  adult?: boolean;
  id: number;
  known_for?: ProductionMedia[];
  name?: string;
  popularity?: number;
  media_type?: "person";
  job?: string;
};

export type PersonMediaDetails = PersonMedia & {
  external_ids?: Record<string, string>;
  homepage?: string;
  biography?: string;
  known_for_department?: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  combined_credits?: {
    cast: ProductionMedia[];
    crew: ProductionMedia[];
  };
};

export type MediaType = "movie" | "tv" | "person";

export type Collection<T> = {
  page?: number;
  results?: T[];
  total_pages?: number;
  total_results?: number;
};
