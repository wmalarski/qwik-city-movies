import { component$ } from "@builder.io/qwik";
import { MediaBase } from "~/services/types3";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: MediaBase[];
  title: string;
  viewAllHref: string;
};

export const MediaCarousel = component$((props: Props) => {
  return (
    <section>
      <div class="flex flex-row items-center px-12 py-2">
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
        <div class="overflow-y-auto px-8 py-4">
          <div class="carousel flex w-max flex-row gap-2">
            {props.collection?.map((media) => (
              <div class="carousel-item" key={media.id}>
                <MediaCard media={media} />
              </div>
            ))}
            <a
              class="transition-text flex w-44 items-center justify-center duration-100 ease-in-out hover:text-qwik-light-blue"
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
