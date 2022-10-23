import { component$ } from "@builder.io/qwik";
import { MediaDetails } from "~/services/types";
import { MovieInfoCard } from "./MovieInfoCard/MovieInfoCard";

type Props = {
  media: MediaDetails;
};

export const MovieDetails = component$((props: Props) => {
  return (
    <flex class="flex flex-col">
      <MovieInfoCard media={props.media} />
    </flex>
  );
});
