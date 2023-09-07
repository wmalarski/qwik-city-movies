import { $, component$, QRL, useSignal } from "@builder.io/qwik";
import { getProfile, getProfileSet } from "~/services/images";
import { Cast, Person } from "~/services/types";
import { paths } from "~/utils/paths";

type PersonCarouselItemProps = {
  media: Person | Cast;
};

export const PersonCarouselItem = component$(
  (props: PersonCarouselItemProps) => {
    return (
      <a href={paths.person(props.media.id)} class="w-48">
        <div class="transition-scale scale-95 duration-300 ease-in-out hover:scale-100">
          <picture>
            <img
              alt={props.media.name}
              class="max-w-full border-4 border-base-300 object-cover text-black"
              height={270}
              src={getProfile(props.media, "w45")}
              srcSet={getProfileSet(props.media)}
              width={185}
            />
          </picture>
        </div>
        <span>{props.media.name}</span>
      </a>
    );
  },
);

type PersonCarouselProps = {
  collection: Cast[];
  title: string;
};

export const PersonCarousel = component$((props: PersonCarouselProps) => {
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

type PersonGridProps = {
  collection: Person[];
  currentPage: number;
  onMore$?: QRL<() => void>;
  pageCount: number;
  parentContainer?: Element | null;
};

export const PersonGrid = component$((props: PersonGridProps) => {
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
          <PersonCarouselItem key={media.id} media={media} />
        ))}
      </div>
    </section>
  );
});
