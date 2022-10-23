import { component$ } from "@builder.io/qwik";
import { Carousel } from "~/modules/Carousel/Carousel";
import { MovieMediaDetails, TvMediaDetails } from "~/services/types";
import { MovieInfoCard } from "./MovieInfoCard/MovieInfoCard";

type Props = {
  media: MovieMediaDetails & TvMediaDetails;
};

export const MovieDetails = component$((props: Props) => {
  return (
    <flex class="flex flex-col">
      <MovieInfoCard media={props.media} />
      <Carousel collection={props.media.credits?.cast || []} title="Cast" />
    </flex>
  );
});
