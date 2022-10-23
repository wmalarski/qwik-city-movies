import { component$, useContext } from "@builder.io/qwik";
import { MovieDetails } from "~/modules/MovieDetails/MovieDetails";
import { MovieContext } from "./movieContext";

export default component$(() => {
  const data = useContext(MovieContext);

  if (!data.media) {
    return null;
  }

  return <MovieDetails media={data.media} />;
});
