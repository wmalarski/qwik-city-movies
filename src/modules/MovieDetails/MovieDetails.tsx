import { component$ } from "@builder.io/qwik";
import { Carousel } from "~/modules/Carousel/Carousel";
import { MediaDetails } from "~/services/types";
import { MovieInfoCard } from "./MovieInfoCard/MovieInfoCard";

type Props = {
  media: MediaDetails;
};

export const MovieDetails = component$((props: Props) => {
  return (
    <flex class="flex flex-col">
      <MovieInfoCard media={props.media} />
      <Carousel
        collection={props.media.credits?.cast || []}
        mediaType="person"
        title="Cast"
      />
    </flex>
  );
});
