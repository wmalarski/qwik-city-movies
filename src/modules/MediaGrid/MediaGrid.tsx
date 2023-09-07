import { $, component$, QRL, useComputed$, useSignal } from "@builder.io/qwik";
import { Stars } from "~/components/Stars/Stars";
import { getPoster, getPosterSet } from "~/services/images";
import { MediaBase } from "~/services/types";
import { paths } from "~/utils/paths";
import { getHeading } from "./MediaCard.utils";

type MediaCardProps = {
  media: MediaBase;
};

export const MediaCard = component$((props: MediaCardProps) => {
  const heading = useComputed$(() => {
    return getHeading(props.media);
  });

  return (
    <a href={paths.media(props.media.media_type, props.media.id)} class="w-48">
      <div class="transition-scale scale-95 duration-300 ease-in-out hover:scale-100">
        <picture>
          <img
            alt={heading.value}
            class="max-w-full border-4 border-base-300 object-cover text-black"
            height={270}
            src={getPoster(props.media, "92")}
            srcSet={getPosterSet(props.media, "185")}
            width={185}
          />
        </picture>
      </div>
      <span>{heading.value}</span>
      <Stars rating={props.media.vote_average} />
    </a>
  );
});

type MediaCarouselProps = {
  collection: MediaBase[];
  title: string;
  viewAllHref: string;
};

export const MediaCarousel = component$((props: MediaCarouselProps) => {
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
      </div>
    </section>
  );
});

type MediaGridProps = {
  collection: MediaBase[];
  currentPage: number;
  onMore$?: QRL<() => void>;
  pageCount: number;
  parentContainer?: Element | null;
};

export const MediaGrid = component$((props: MediaGridProps) => {
  const throttleTimer = useSignal(false);
  const scrollEnabled = useSignal(props.currentPage < props.pageCount);

  const handleScroll$ = $(() => {
    if (!props.parentContainer) {
      return;
    }

    const endOfPage =
      props.parentContainer.clientHeight + props.parentContainer.scrollTop >=
      props.parentContainer.scrollHeight - 100;

    if (endOfPage) {
      props.onMore$?.();
    }

    if (props.currentPage === props.pageCount) {
      scrollEnabled.value = false;
    }
  });

  return (
    <section>
      <div
        document:onScroll$={() => {
          if (throttleTimer.value || !scrollEnabled.value) {
            return;
          }
          throttleTimer.value = true;
          setTimeout(() => {
            handleScroll$();
            throttleTimer.value = false;
          }, 1000);
        }}
        class="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 p-8"
      >
        {props.collection?.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
    </section>
  );
});
