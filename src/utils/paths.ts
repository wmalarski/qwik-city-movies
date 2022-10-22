import type { MediaType } from "~/services/types";

export const paths = {
  index: "/",
  media: (mediaType: MediaType, id: number) => `/${mediaType}/${id}`,
  movieCategory: (category: string) => `/movie/categories/${category}`,
  moviePhotos: (id: number) => `/movie/${id}/photos`,
  movieVideo: (id: number) => `/movie/${id}/videos`,
  movies: "/movie",
  notFound: "/404",
  tv: "/tv",
  tvCategory: (category: string) => `/tv/categories/${category}`,
};
