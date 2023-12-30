import { component$ } from "@builder.io/qwik";
import { getBackdrop, getBackdropSet } from "~/services/images";
import { TvBase } from "~/services/types";

type TvHeroProps = {
  media: TvBase;
};

export const TvHero = component$((props: TvHeroProps) => {
  return (
    <section class="bg-black">
      <div class="relative aspect-square md:aspect-[3/2] lg:aspect-[25/9]">
        <div class="absolute bottom-0 right-0 top-0 lg:left-1/3">
          <picture>
            {/* eslint-disable-next-line qwik/jsx-img */}
            <img
              alt={props.media.name || props.media.original_name}
              class="h-full w-full max-w-full object-cover text-black"
              src={getBackdrop(props.media, "w300")}
              srcset={getBackdropSet(props.media)}
            />
          </picture>
        </div>
        <div class="absolute bottom-0 left-0 flex flex-col gap-2 bg-gradient-to-t from-black via-black to-transparent p-9 lg:w-2/3 lg:bg-gradient-to-r lg:px-24">
          <h1 class="mt-2 text-4xl text-white lg:text-5xl">
            {props.media.name || props.media.original_name}
          </h1>
          <div>
            <div class="flex flex-row gap-4 opacity-80">
              <div>
                <div
                  style={{ width: `${(props.media.vote_average || 0) * 100}%` }}
                >
                  {props.media.vote_average}
                </div>
              </div>
              <div>{`${props.media.vote_count} Reviews`}</div>
            </div>
          </div>
          <div>{props.media.overview}</div>
        </div>
      </div>
    </section>
  );
});
