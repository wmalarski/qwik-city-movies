import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Footer } from "~/modules/Footer/Footer";
import { MediaCarousel } from "~/modules/MediaGrid/MediaGrid";
import { MovieHero } from "~/modules/MovieHero/MovieHero";
import { TvHero } from "~/modules/TvHero/TvHero";
import {
  getRandomMedia,
  getTMDBContext,
  getTrendingMovie,
  getTrendingTv,
} from "~/services/tmdb";
import { MovieBase, TvBase } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const useContentLoader = routeLoader$(async (event) => {
  const context = getTMDBContext(event);

  try {
    const [movies, tv] = await Promise.all([
      getTrendingMovie({ context, page: 1 }),
      getTrendingTv({ context, page: 1 }),
    ]);

    const random = getRandomMedia<MovieBase | TvBase>({
      collections: [tv, movies],
    });

    return { movies, random, tv };
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = useContentLoader();

  return (
    <div class="flex max-h-screen flex-col gap-4 overflow-y-scroll">
      {resource.value.random.media_type === "tv" ? (
        <a href={paths.media("tv", resource.value.random.id)}>
          <TvHero media={resource.value.random} />
        </a>
      ) : null}
      {resource.value.random.media_type === "movie" ? (
        <a href={paths.media("movie", resource.value.random.id)}>
          <MovieHero media={resource.value.random} />
        </a>
      ) : null}
      <MediaCarousel
        collection={resource.value.movies?.results || []}
        title={getListItem({ query: "trending", type: "movie" })}
        viewAllHref={paths.movieCategory("trending")}
      />
      <MediaCarousel
        collection={resource.value.tv?.results || []}
        title={getListItem({ query: "trending", type: "tv" })}
        viewAllHref={paths.tvCategory("trending")}
      />
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      content: "Qwik City Movies - real app example using Qwik-City",
      name: "description",
    },
  ],
  title: "Qwik City Movies",
};
