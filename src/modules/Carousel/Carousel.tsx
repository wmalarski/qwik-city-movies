import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Media } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: Media[];
  title: string;
  viewAllHref?: string;
};

export const Carousel = component$((props: Props) => {
  return (
    <section>
      <div class="flex flex-row py-2 px-12">
        <h2 class="text-2xl text-white">{props.title}</h2>
        <div class="flex-auto" />
        {props.viewAllHref ? (
          <Link class="opacity-50 hover:opacity-100" href={props.viewAllHref}>
            <span>Explore All</span>
          </Link>
        ) : null}
      </div>
      <div class="relative">
        <div class="overflow-y-auto py-4 px-8">
          <div class="flex w-max flex-row gap-2">
            {props.collection.map((media) => (
              <div class="w-60" key={media.id}>
                <MediaCard media={media} />
              </div>
            ))}
            {props.viewAllHref ? (
              <Link href={props.viewAllHref}>
                <span>Explore All</span>
              </Link>
            ) : null}
          </div>
        </div>
        {/* TODO: Add buttons */}
      </div>
    </section>
  );
});
