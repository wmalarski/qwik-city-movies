import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Media } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  media: Media[];
  title: string;
  viewAllHref: string;
};

export const Carousel = component$((props: Props) => {
  return (
    <section>
      <div>
        <h2>{props.title}</h2>
        <Link href={props.viewAllHref}>
          <span>Explore All</span>
        </Link>
      </div>
      <ul class="flex flex-row gap-2 p-2">
        {props.media.map((movie) => (
          <li key={movie.id}>
            <MediaCard media={movie} />
          </li>
        ))}
        <li>
          <Link href={props.viewAllHref}>
            <span>Explore All</span>
          </Link>
        </li>
      </ul>
    </section>
  );
});
