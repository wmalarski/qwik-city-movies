import { component$, useContext, useStore } from "@builder.io/qwik";
import { DocumentHead, loader$, useLocation } from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { ContainerContext } from "~/routes/context";
import { getMediaByGenre } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";
import { LoaderContent } from "~/utils/types";

export const getContent = loader$((event) => {
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

  const container = useContext(ContainerContext);

  const tvShows = getContent.use();

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div style="flex flex-col gap-4">
      <h1 class="px-8 pt-4 text-4xl">{`Tv Show Genre: ${
        tvShows?.value?.genre?.name || "Not defined"
      }`}</h1>
      <MediaGrid
        collection={[...(tvShows.value?.results || []), ...store.results]}
        currentPage={store.currentPage}
        pageCount={tvShows.value?.total_pages || 1}
        parentContainer={container.value}
        onMore$={async () => {
          const url = `${location.href}/api?${new URLSearchParams({
            page: `${store.currentPage + 1}`,
          })}`;
          const results = await (await fetch(url)).json();
          const newMedia = results || [];
          store.results.push(...newMedia);
          store.currentPage += 1;
        }}
      />
    </div>
  );
});

export const head: DocumentHead = (event) => {
  const data = event.getData<Awaited<LoaderContent<typeof getContent>>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getContent as any
  );
  return data.genre
    ? { title: `${data.genre.name} Tv Shows - Qwik City Movies` }
    : {};
};
