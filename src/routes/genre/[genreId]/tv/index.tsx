import { component$, useSignal } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, server$, z } from "@builder.io/qwik-city";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { getMediaByGenre } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";

export const useGenreTvShowsLoader = routeLoader$((event) => {
  const parseResult = z
    .object({ genreId: z.coerce.number().min(0).int() })
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

export const getMore = server$(function (page: number) {
  const parseResult = z
    .object({
      genreId: z.coerce.number().min(0).step(1),
      page: z.coerce.number().int().min(1).default(1),
    })
    .parse({ genreId: this.params.genreId, page });

  return getMediaByGenre({
    genre: parseResult.genreId,
    media: "tv",
    page: parseResult.page,
  });
});

export default component$(() => {
  const containerRef = useSignal<Element | null>(null);

  const tvShows = useGenreTvShowsLoader();

  const currentPage = useSignal(1);
  const collection = useSignal<ProductionMedia[]>(tvShows.value.results);

  return (
    <div
      style="max-h-screen overflow-y-scroll flex flex-col gap-4"
      ref={(e) => (containerRef.value = e)}
    >
      <h1 class="px-8 pt-4 text-4xl">{`Tv Show Genre: ${
        tvShows?.value?.genre?.name || "Not defined"
      }`}</h1>
      <MediaGrid
        collection={collection.value}
        currentPage={currentPage.value}
        pageCount={tvShows.value?.total_pages || 1}
        parentContainer={containerRef.value}
        onMore$={async () => {
          const data = await getMore(currentPage.value + 1);
          const newMedia = data.results || [];
          collection.value = [...collection.value, ...newMedia];
          currentPage.value += 1;
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
