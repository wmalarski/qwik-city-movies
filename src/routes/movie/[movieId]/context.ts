import { createContext, ResourceReturn } from "@builder.io/qwik";
import { MediaDetails } from "~/services/types";

export const MovieResourceContext = createContext<ResourceReturn<MediaDetails>>(
  "movie-resource-context"
);
