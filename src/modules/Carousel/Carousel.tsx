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
      <div class="flex flex-row items-center py-2 px-12">
        <h2 class="text-2xl text-white">{props.title}</h2>
        <div class="flex-auto" />
        {props.viewAllHref ? (
          <Link
            class="transition-text opacity-50 duration-100 ease-in-out hover:text-qwik-light-blue hover:opacity-100"
            href={props.viewAllHref}
          >
            Explore All
          </Link>
        ) : null}
      </div>
      <div class="relative">
        <div class="overflow-y-auto py-4 px-8">
          <div class="carousel flex w-max flex-row gap-2">
            {props.collection?.map((media) => (
              <div class="carousel-item w-60" key={media.id}>
                <MediaCard media={media} />
              </div>
            ))}
            {props.viewAllHref ? (
              <Link
                class="transition-text flex w-44 items-center justify-center duration-100 ease-in-out hover:text-qwik-light-blue "
                href={props.viewAllHref}
              >
                Explore All
              </Link>
            ) : null}
          </div>
        </div>
        {/* TODO: Add buttons */}
      </div>
    </section>
  );
});
