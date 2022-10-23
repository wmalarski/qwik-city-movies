import type { MediaType } from "~/services/types";

export const paths = {
  genre: (mediaType: MediaType, id: number) => `/genre/${id}/${mediaType}`,
  index: "/",
  media: (mediaType: MediaType, id: number) => `/${mediaType}/${id}`,
  movieCategory: (category: string) => `/movie/categories/${category}`,
  moviePhotos: (id: number) => `/movie/${id}/photos`,
  movieVideo: (id: number) => `/movie/${id}/videos`,
  movies: "/movie",
  notFound: "/404",
  person: (id: number) => `/person/${id}`,
  search: "/search",
  tv: "/tv",
  tvCategory: (category: string) => `/tv/categories/${category}`,
};
