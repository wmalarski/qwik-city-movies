import type { MediaType } from "~/services/types";

export const paths = {
  index: "/",
  media: (mediaType: MediaType, id: number) => `/${mediaType}/${id}`,
  movies: "/movie",
  tv: "/tv",
};
