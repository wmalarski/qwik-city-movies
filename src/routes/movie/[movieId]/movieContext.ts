import { createContext } from "@builder.io/qwik";
import { MovieMedia } from "~/services/types";

export type MovieContextState = {
  media?: MovieMedia;
};

export const MovieContext = createContext<MovieContextState>("movie-context");
