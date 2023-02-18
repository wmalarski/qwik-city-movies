import { component$, useSignal, useStore } from "@builder.io/qwik";
import { DocumentHead, loader$, useLocation } from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { getMediaByGenre } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";

export const useGenreTvShowsLoader = loader$((event) => {
  const parseResult = z
    .object({ genreId: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  return getMediaByGenre({
    genre: parseResult.data.genreId,
    media: "tv",
    page: 1,
  });
});

export default component$(() => {
  const location = useLocation();

  const containerRef = useSignal<Element | null>(null);

  const tvShows = useGenreTvShowsLoader();

  const store = useStore(
    {
      currentPage: 1,
      results: [] as ProductionMedia[],
    },
    { deep: true }
  );

  return (
    <div
      style="max-h-screen overflow-y-scroll flex flex-col gap-4"
      ref={(e) => (containerRef.value = e)}
    >
      <h1 class="px-8 pt-4 text-4xl">{`Tv Show Genre: ${
        tvShows?.value?.genre?.name || "Not defined"
      }`}</h1>
      <MediaGrid
        collection={[...(tvShows.value?.results || []), ...store.results]}
        currentPage={store.currentPage}
        pageCount={tvShows.value?.total_pages || 1}
        parentContainer={containerRef.value}
        onMore$={async () => {
          const url = `${location.href}api?${new URLSearchParams({
            page: `${store.currentPage + 1}`,
          })}`;
          const json = await (await fetch(url)).json();
          const newMedia = json.results || [];
          store.results.push(...newMedia);
          store.currentPage += 1;
        }}
      />
    </div>
  );
});

export const head: DocumentHead = (event) => {
  const data = event.resolveValue(useGenreTvShowsLoader);
  return data.genre
    ? { title: `${data.genre.name} Tv Shows - Qwik City Movies` }
    : {};
};
