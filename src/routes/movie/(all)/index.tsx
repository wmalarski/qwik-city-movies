import { component$ } from "@builder.io/qwik";
import { loader$, type DocumentHead } from "@builder.io/qwik-city";
import { Footer } from "~/modules/Footer/Footer";
import { MediaCarousel } from "~/modules/MediaCarousel/MediaCarousel";
import { MovieHero } from "~/modules/MovieHero/MovieHero";
import { getMovie, getMovies, getRandomMedia } from "~/services/tmdb";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const useAllMoviesLoader = loader$(async () => {
  const [popular, topRated, nowPlaying] = await Promise.all([
    getMovies({ page: 1, query: "popular" }),
    getMovies({ page: 1, query: "top_rated" }),
    getMovies({ page: 1, query: "now_playing" }),
  ]);

  const random = getRandomMedia({
    collections: [popular, topRated, nowPlaying],
  });

  const featured = await getMovie({ id: random.id });

  return { featured, nowPlaying, popular, topRated };
});

export default component$(() => {
  const resource = useAllMoviesLoader();

  return (
    <div class="flex max-h-screen flex-col gap-4 overflow-y-scroll">
      {resource.value.featured ? (
        <a href={paths.media("movie", resource.value.featured?.id)}>
          <MovieHero media={resource.value.featured} />
        </a>
      ) : null}
      <MediaCarousel
        collection={resource.value.popular?.results || []}
        title={getListItem({ query: "popular", type: "movie" })}
        viewAllHref={paths.movieCategory("popular")}
      />
      <MediaCarousel
        collection={resource.value.topRated?.results || []}
        title={getListItem({ query: "top_rated", type: "movie" })}
        viewAllHref={paths.movieCategory("top_rated")}
      />
      <MediaCarousel
        collection={resource.value.nowPlaying?.results || []}
        title={getListItem({ query: "now_playing", type: "movie" })}
        viewAllHref={paths.movieCategory("now_playing")}
      />
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
