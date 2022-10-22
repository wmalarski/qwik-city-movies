import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint, type DocumentHead } from "@builder.io/qwik-city";
import { Carousel } from "~/modules/Carousel/Carousel";
import Hero from "~/modules/Hero/Hero";
import type { inferPromise } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const onGet = async () => {
  const { getMovies, getRandomMedia } = await import("~/services/tmdb");

  const [popular, topRated, nowPlaying] = await Promise.all([
    getMovies({ page: 1, query: "popular" }),
    getMovies({ page: 1, query: "top_rated" }),
    getMovies({ page: 1, query: "now_playing" }),
  ]);

  const featured = await getRandomMedia({
    collections: [popular, topRated, nowPlaying],
  });

  return { featured, nowPlaying, popular, topRated };
};

export default component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div class="flex flex-col gap-4 p-4">
          <Hero media={data.featured} />
          <Carousel
            media={data.popular.results || []}
            title={getListItem({ query: "popular", type: "movie" })}
            viewAllHref={paths.movieCategory("popular")}
          />
          <Carousel
            media={data.topRated.results || []}
            title={getListItem({ query: "top_rated", type: "movie" })}
            viewAllHref={paths.movieCategory("top_rated")}
          />
          <Carousel
            media={data.nowPlaying.results || []}
            title={getListItem({ query: "now_playing", type: "movie" })}
            viewAllHref={paths.movieCategory("now_playing")}
          />
        </div>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "Movies",
};
