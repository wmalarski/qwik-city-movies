import { component$ } from "@builder.io/qwik";
import { MediaDetails } from "~/services/types";

type Props = {
  media: MediaDetails;
};

export const MovieDetails = component$((props: Props) => {
  return (
    <flex class="flex flex-col">
      {/* <MovieInfoCard media={props.media} /> */}
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </flex>
  );
});
