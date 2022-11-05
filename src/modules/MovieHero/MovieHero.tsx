import { component$ } from "@builder.io/qwik";
import { Stars } from "~/components/Stars/Stars";
import { getBackdrop } from "~/services/images";
import type { MovieMedia } from "~/services/types";

type Props = {
  media: MovieMedia;
};

export const MovieHero = component$((props: Props) => {
  return (
    <section class="bg-black">
      <div class="relative aspect-square md:aspect-[3/2] lg:aspect-[25/9]">
        <div class="absolute top-0 bottom-0 right-0 lg:left-1/3">
          <picture>
            <source
              srcSet={getBackdrop(props.media, "w1280")}
              media="(min-width: 780px)"
            />
            <source
              srcSet={getBackdrop(props.media, "w780")}
              media="(min-width: 300px)"
            />
            <img
              alt={props.media.title || props.media.original_title}
              class="h-full w-full max-w-full object-cover"
              src={getBackdrop(props.media, "w300")}
            />
          </picture>
        </div>
        <div class="absolute bottom-0 left-0 flex flex-col gap-2 bg-gradient-to-t from-black via-black to-transparent p-9 lg:w-2/3 lg:bg-gradient-to-r lg:px-24">
          <h1 class="mt-2 text-4xl text-white lg:text-5xl">
            {props.media.title || props.media.original_title}
          </h1>
          <div>
            <div class="flex flex-row gap-4">
              <Stars rating={props.media.vote_average} />
              <div class="text-sm opacity-50">{`${props.media.vote_count} Reviews`}</div>
            </div>
          </div>
          <div>{props.media.overview}</div>
        </div>
      </div>
    </section>
  );
});
