import { createContext } from "@builder.io/qwik";
import { MediaDetails } from "~/services/types";

export type MovieContextState = {
  media?: MediaDetails;
};

export const MovieContext = createContext<MovieContextState>("movie-context");
