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

  const { getMediaByGenre } = await import("~/services/tmdb");

  const [movies, tvShows] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "movie",
      page: 1,
    }),
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "tv",
      page: 1,
    }),
  ]);

  return { movies, tvShows };
};

export default component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div style="flex flex-col">
          <MediaGrid
            collection={[
              ...(data.movies?.results || []),
              ...(data.tvShows?.results || []),
            ]}
          />
        </div>
      )}
    />
  );
});
