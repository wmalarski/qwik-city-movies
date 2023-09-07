/* eslint-disable @typescript-eslint/no-explicit-any */
export type Genre = {
  id: number;
  name: string;
};

export type MovieListItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type Language = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany;
  production_countries: ProductionCountry;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type Creator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type TvDetails = {
  adult: boolean;
  backdrop_path: string;
  created_by: Creator;
  episode_run_time: number;
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string;
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: any;
  networks: ProductionCompany;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany;
  production_countries: ProductionCountry;
  seasons: Season;
  spoken_languages: Language;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type SearchResult = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvListResult = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number;
  id: number;
  name: string;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type TrendingMovieResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TrendingTvResult = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string;
};

export type PersonDetails = {
  adult: boolean;
  also_known_as: string;
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage: any;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};
