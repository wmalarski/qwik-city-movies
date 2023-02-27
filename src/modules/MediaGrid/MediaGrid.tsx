import { $, component$, QRL, useSignal } from "@builder.io/qwik";
import type { ProductionMedia } from "~/services/types";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: ProductionMedia[];
  currentPage: number;
  pageCount: number;
  onMore$?: QRL<() => void>;
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
