import { component$ } from "@builder.io/qwik";
import type { Media } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: Media[];
};

export const MediaGrid = component$((props: Props) => {
  return (
    <section>
      <ul class="flex flex-row flex-wrap gap-2 p-2">
        {props.collection.map((media) => (
          <li key={media.id}>
            <MediaCard media={media} />
          </li>
        ))}
      </ul>
    </section>
  );
});
