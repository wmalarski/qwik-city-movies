import { $, component$, PropFunction, useSignal } from "@builder.io/qwik";
import type { MovieMedia, TvMedia } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: (TvMedia | MovieMedia)[];
  currentPage: number;
  pageCount: number;
  onMore$?: PropFunction<() => void>;
  parentContainer?: Element | null;
};

export const MediaGrid = component$((props: Props) => {
  const throttleTimer = useSignal(false);
  const scrollEnabled = useSignal(props.currentPage < props.pageCount);

  const handleScroll$ = $(() => {
    if (!props.parentContainer) {
      return;
    }

    const endOfPage =
      props.parentContainer.clientHeight + props.parentContainer.scrollTop >=
      props.parentContainer.scrollHeight;

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
        class="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4 p-8"
      >
        {props.collection?.map((media) => (
          <MediaCard media={media} />
        ))}
      </div>
    </section>
  );
});
