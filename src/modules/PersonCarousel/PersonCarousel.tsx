import { component$ } from "@builder.io/qwik";
import type { PersonMedia } from "~/services/types";
import { PersonCarouselItem } from "./PersonCarouselItem/PersonCarouselItem";

type Props = {
  collection: PersonMedia[];
  title: string;
};

export const PersonCarousel = component$((props: Props) => {
  return (
    <section>
      <div class="flex flex-row items-center px-12 py-2">
        <h2 class="text-2xl text-white">{props.title}</h2>
        <div class="flex-auto" />
      </div>
      <div class="relative">
        <div class="overflow-y-auto px-8 py-4">
          <div class="carousel flex w-max flex-row gap-2">
            {props.collection?.map((media) => (
              <div class="carousel-item" key={media.id}>
                <PersonCarouselItem media={media} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
