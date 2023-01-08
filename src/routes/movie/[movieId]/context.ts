import { createContext, Signal } from "@builder.io/qwik";
import { MovieMediaDetails } from "~/services/types";

export const MovieResourceContext = createContext<Signal<MovieMediaDetails>>(
  "movie-resource-context"
);
