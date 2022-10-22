import { component$ } from "@builder.io/qwik";
import type { Media, MediaType } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: Media[];
  mediaType?: MediaType;
};

export const MediaGrid = component$((props: Props) => {
  return (
    <section>
      <ul class="flex flex-row flex-wrap gap-2 p-2">
        {props.collection.map((media) => (
          <li key={media.id}>
            <MediaCard
              mediaType={props.mediaType || media.media_type}
              media={media}
            />
          </li>
        ))}
      </ul>
    </section>
  );
});
