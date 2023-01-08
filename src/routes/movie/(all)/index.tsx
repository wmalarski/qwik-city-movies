import { component$, Resource } from "@builder.io/qwik";
import { loader$, type DocumentHead } from "@builder.io/qwik-city";
import { MediaCarousel } from "~/modules/MediaCarousel/MediaCarousel";
import { MovieHero } from "~/modules/MovieHero/MovieHero";
import { getMovie, getMovies, getRandomMedia } from "~/services/tmdb";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const getContent = loader$(async () => {
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
  const resource = getContent.use();

  return (
    <Resource
      value={resource}
      onPending={() => <div class="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div class="flex flex-col gap-4">
          {data.featured ? (
            <a href={paths.media("movie", data.featured?.id)}>
              <MovieHero media={data.featured} />
            </a>
          ) : null}
          <MediaCarousel
            collection={data.popular?.results || []}
            title={getListItem({ query: "popular", type: "movie" })}
            viewAllHref={paths.movieCategory("popular")}
          />
          <MediaCarousel
            collection={data.topRated?.results || []}
            title={getListItem({ query: "top_rated", type: "movie" })}
            viewAllHref={paths.movieCategory("top_rated")}
          />
          <MediaCarousel
            collection={data.nowPlaying?.results || []}
            title={getListItem({ query: "now_playing", type: "movie" })}
            viewAllHref={paths.movieCategory("now_playing")}
          />
        </div>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
