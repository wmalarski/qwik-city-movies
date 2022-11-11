import { component$ } from "@builder.io/qwik";
import type { ProductionMedia } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: ProductionMedia[];
  title: string;
  viewAllHref: string;
};

export const MediaCarousel = component$((props: Props) => {
  return (
    <section>
      <div class="flex flex-row items-center py-2 px-12">
        <h2 class="text-2xl text-white">{props.title}</h2>
        <div class="flex-auto" />
        <a
          class="transition-text opacity-80 duration-100 ease-in-out hover:text-qwik-light-blue hover:opacity-100"
          href={props.viewAllHref}
        >
          Explore All
        </a>
      </div>
      <div class="relative">
        <div class="overflow-y-auto py-4 px-8">
          <div class="carousel flex w-max flex-row gap-2">
            {props.collection?.map((media) => (
              <div class="carousel-item w-60" key={media.id}>
                <MediaCard media={media} />
              </div>
            ))}
            <a
              class="transition-text flex w-44 items-center justify-center duration-100 ease-in-out hover:text-qwik-light-blue "
              href={props.viewAllHref}
            >
              Explore All
            </a>
          </div>
        </div>
        {/* TODO: Add buttons */}
      </div>
    </section>
  );
});
