import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Media, MediaType } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: Media[];
  mediaType: MediaType;
  title: string;
  viewAllHref?: string;
};

export const Carousel = component$((props: Props) => {
  return (
    <section>
      <div>
        <h2>{props.title}</h2>
        {props.viewAllHref ? (
          <Link href={props.viewAllHref}>
            <span>Explore All</span>
          </Link>
        ) : null}
      </div>
      <ul class="flex flex-row gap-2 p-2">
        {props.collection.map((media) => (
          <li key={media.id}>
            <MediaCard
              mediaType={props.mediaType || media.media_type}
              media={media}
            />
          </li>
        ))}
        {props.viewAllHref ? (
          <li>
            <Link href={props.viewAllHref}>
              <span>Explore All</span>
            </Link>
          </li>
        ) : null}
      </ul>
    </section>
  );
});
