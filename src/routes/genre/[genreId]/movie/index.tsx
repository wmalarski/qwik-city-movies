import { component$, Resource } from "@builder.io/qwik";
import { RequestEvent, useEndpoint } from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import type { inferPromise } from "~/services/types";
import { paths } from "~/utils/paths";

export const onGet = async (event: RequestEvent) => {
  const parseResult = z
    .object({ genreId: z.number().min(0).step(1) })
    .safeParse({ genreId: +event.params.genreId });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getMediaByGenre, getGenreList } = await import("~/services/tmdb");

  const [movies, genres] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "movie",
      page: 1,
    }),
    getGenreList({ media: "movie" }),
  ]);

  const genre = genres.find((genre) => genre.id === parseResult.data.genreId);

  return { genre, movies };
};

export default component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div style="flex flex-col gap-4">
          <h1 class="px-8 pt-4 text-4xl">{`Movie Genre: ${data.genre?.name}`}</h1>
          <MediaGrid collection={data.movies?.results} />
        </div>
      )}
    />
  );
});
