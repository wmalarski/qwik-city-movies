import { component$ } from "@builder.io/qwik";
import type { MovieMedia } from "~/services/types";

type Props = {
  media: MovieMedia;
};

export const MovieHero = component$((props: Props) => {
  return (
    <section class="bg-black">
      <div class="relative aspect-square md:aspect-[3/2] lg:aspect-[25/9]">
        <div class="absolute top-0 bottom-0 right-0 lg:left-1/3">
          <img
            // src={"https://image.tmdb.org/t/p/original" + props.item.backdrop_path}
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.media.backdrop_path}`}
            alt={props.media.title || props.media.original_title}
            class="h-full w-full max-w-full object-cover"
            height={255}
          />
        </div>
        <div class="absolute bottom-0 left-0 flex flex-col gap-2 bg-gradient-to-t from-black via-black to-transparent p-9 lg:w-2/3 lg:bg-gradient-to-r lg:px-24">
          <h1 class="mt-2 text-4xl lg:text-5xl">
            {props.media.title || props.media.original_title}
          </h1>
          <div>
            <div class="flex flex-row gap-4 opacity-50">
              <div>
                <div
                  style={{
                    width: `${(props.media.vote_average || 0) * 100}%`,
                  }}
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
