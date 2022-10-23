import { createContext, ResourceReturn } from "@builder.io/qwik";
import { MovieMediaDetails } from "~/services/types";

export const MovieResourceContext = createContext<
  ResourceReturn<MovieMediaDetails>
>("movie-resource-context");
