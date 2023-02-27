import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import {
  DocumentHead,
  loader$,
  server$,
  useLocation,
} from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { getTrendingTv, getTvShows } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const useTvShowCategoryLoader = loader$(async (event) => {
  const parseResult = z
    .object({ name: z.string().min(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
    const name = parseResult.data.name;
    const movies =
      name === "trending"
        ? await getTrendingTv({ page: 1 })
        : await getTvShows({ page: 1, query: name });
    return movies;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export const getMore = server$(async (event, page: number) => {
  const parseResult = z
    .object({
      name: z.string().min(1),
      page: z.coerce.number().int().min(1).default(1),
    })
    .safeParse({ name: event.params.name, page });

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
    const name = parseResult.data.name;
    const page = parseResult.data.page;
    const movies =
      name === "trending"
        ? await getTrendingTv({ page })
        : await getTvShows({ page, query: name });
    return movies;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const location = useLocation();

  const containerRef = useSignal<Element | null>(null);

  const tvShowCategory = useTvShowCategoryLoader();

  const currentPage = useSignal(1);
  const store = useStore<ProductionMedia[]>([]);

  useTask$(() => {
    const results = tvShowCategory.value.results || [];
    store.push(...results);
  });

  return (
    <div
      class="flex max-h-screen w-full flex-col overflow-y-scroll"
      ref={(e) => (containerRef.value = e)}
    >
      <h1 class="px-8 pt-4 text-4xl">
        {getListItem({ query: location.params.name, type: "tv" })}
      </h1>
      <div>
        <MediaGrid
          collection={store}
          currentPage={currentPage.value}
          pageCount={tvShowCategory.value.total_pages || 1}
          parentContainer={containerRef.value}
          onMore$={async () => {
            const data = await getMore(currentPage.value + 1);
            const newMedia = data.results || [];
            store.push(...newMedia);
            currentPage.value += 1;
          }}
        />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
