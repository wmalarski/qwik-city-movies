import { component$ } from "@builder.io/qwik";
import type { Media } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: Media[];
};

export const MediaGrid = component$((props: Props) => {
  return (
    <section>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4 p-8">
        {props.collection?.map((media) => (
          <MediaCard media={media} />
        ))}
      </div>
      {/* TODO: Do infinite loading  */}
    </section>
  );
});
