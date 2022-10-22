import { component$ } from "@builder.io/qwik";
import type { Media } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  media: Media[];
};

export const Carousel = component$((props: Props) => {
  return (
    <ul class="flex flex-row gap-2 p-2">
      {props.media.map((movie) => (
        <li key={movie.id}>
          <MediaCard media={movie} />
        </li>
      ))}
    </ul>
  );
});
