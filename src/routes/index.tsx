import { component$ } from "@builder.io/qwik";
import { loader$, type DocumentHead } from "@builder.io/qwik-city";
import { MediaCarousel } from "~/modules/MediaCarousel/MediaCarousel";
import { MovieHero } from "~/modules/MovieHero/MovieHero";
import { TvHero } from "~/modules/TvHero/TvHero";
import {
  getMovie,
  getRandomMedia,
  getTrendingMovie,
  getTrendingTv,
  getTvShow,
} from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const contentLoader = loader$(async (event) => {
  try {
    const [movies, tv] = await Promise.all([
      getTrendingMovie({ page: 1 }),
      getTrendingTv({ page: 1 }),
    ]);

    const random = getRandomMedia<ProductionMedia>({
      collections: [movies, tv],
    });

    const featuredTv =
      random.media_type === "tv" ? await getTvShow({ id: random.id }) : null;

    const featuredMovie =
      random.media_type === "movie" ? await getMovie({ id: random.id }) : null;

    return { featuredMovie, featuredTv, movies, tv };
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = contentLoader.use();

  return (
    <div class="flex flex-col gap-4">
      {resource.value.featuredTv ? (
        <a href={paths.media("tv", resource.value.featuredTv.id)}>
          <TvHero media={resource.value.featuredTv} />
        </a>
      ) : null}
      {resource.value.featuredMovie ? (
        <a href={paths.media("movie", resource.value.featuredMovie.id)}>
          <MovieHero media={resource.value.featuredMovie} />
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
