import { component$, useContext, useStore } from "@builder.io/qwik";
import { DocumentHead, loader$ } from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { ContainerContext } from "~/routes/context";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";

export const getGenre = loader$(async (event) => {
  const parseResult = z.coerce
    .number()
    .min(0)
    .step(1)
    .safeParse(event.params.genreId);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const { getGenreList } = await import("~/services/tmdb");

  const genres = await getGenreList({ media: "tv" });

  const genre = genres.find((genre) => genre.id === parseResult.data);

  if (!genre) {
    throw event.redirect(302, paths.notFound);
  }

  return genre;
});

export const getTvShows = loader$(async (event) => {
  const parseResult = z
    .object({
      genreId: z.coerce.number().min(0).step(1),
      page: z.coerce.number().min(1).step(1),
    })
    .safeParse({
      genreId: event.params.genreId,
      page: event.url.searchParams.get("page"),
    });

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const { getMediaByGenre } = await import("~/services/tmdb");

  const tvShows = await getMediaByGenre({
    genre: parseResult.data.genreId,
    media: "tv",
    page: parseResult.data.page,
  });

  return tvShows;
});

export default component$(() => {
  // const location = useLocation();

  const genre = getGenre.use();

  const container = useContext(ContainerContext);

  const tvShows = getTvShows.use();

  // const fetcher$ = $(async (page: number): Promise<typeof onGet> => {
  //   const params = new URLSearchParams({ page: String(page) });
  //   const url = `${location.href}/api?${params}`;
  //   const response = await fetch(url);
  //   return response.json();
  // });

  // const resource = useResource$(() => fetcher$(1));

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div style="flex flex-col gap-4">
      <h1 class="px-8 pt-4 text-4xl">{`Tv Show Genre: ${genre?.value.name}`}</h1>
      <MediaGrid
        collection={[...(tvShows.value.results || []), ...store.results]}
        currentPage={store.currentPage}
        pageCount={tvShows.value?.total_pages || 1}
        parentContainer={container.value}
        onMore$={async () => {
          // const newResult = await fetcher$(store.currentPage + 1);
          // const newMedia = newResult.results || [];
          // store.currentPage = newResult.page || store.currentPage;
          // store.results = [...store.results, ...newMedia];
        }}
      />
    </div>
  );
});

export const head: DocumentHead = (event) => {
  const genre = event.getData(getGenre);
  return {
    title: `${genre} Tv Shows - Qwik City Movies`,
  };
};
