import {
  component$,
  Resource,
  Slot,
  useContextProvider,
} from "@builder.io/qwik";
import { RequestEvent, useEndpoint, useLocation } from "@builder.io/qwik-city";
import clsx from "clsx";
import { z } from "zod";
import { MovieHero } from "~/modules/MovieHero/MovieHero";
import type { inferPromise } from "~/services/types";
import { paths } from "~/utils/paths";
import { MovieResourceContext } from "./context";

export const onGet = async (event: RequestEvent) => {
  const parseResult = z
    .object({ movieId: z.number().min(0).step(1) })
    .safeParse({ movieId: +event.params.movieId });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getMovie } = await import("~/services/tmdb");

  try {
    const movie = await getMovie({ id: parseResult.data.movieId });
    return movie;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};

export default component$(() => {
  const location = useLocation();

  const resource = useEndpoint<inferPromise<typeof onGet>>();
  useContextProvider(MovieResourceContext, resource);

  const overviewHref = paths.media("movie", +location.params.movieId);
  const videoHref = paths.movieVideo(+location.params.movieId);
  const photosHref = paths.moviePhotos(+location.params.movieId);

  return (
    <div class="flex flex-col gap-4">
      <Resource
        value={resource}
        onPending={() => <div class="h-80" />}
        onRejected={() => <div>Rejected</div>}
        onResolved={(data) => <MovieHero media={data} />}
      />
      <div class="flex flex-row items-center justify-center gap-4">
        <a
          href={overviewHref}
          class={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            {
              "border-b-2 border-b-white opacity-100":
                overviewHref === location.pathname,
            }
          )}
        >
          Overview
        </a>
        <a
          href={videoHref}
          class={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            {
              "border-b-2 border-b-white opacity-100":
                videoHref === location.pathname,
            }
          )}
        >
          Videos
        </a>
        <a
          href={photosHref}
          class={clsx(
            "transition-text p-2 text-xl uppercase opacity-70 duration-100 ease-in-out hover:opacity-100",
            {
              "border-b-2 border-b-white opacity-100":
                photosHref === location.pathname,
            }
          )}
        >
          Photos
        </a>
      </div>
      <Slot />
    </div>
  );
});
