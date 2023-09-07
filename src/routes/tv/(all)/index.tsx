import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Footer } from "~/modules/Footer/Footer";
import { MediaCarousel } from "~/modules/MediaGrid/MediaGrid";
import { TvHero } from "~/modules/TvHero/TvHero";
import { getRandomMedia, getTMDBContext, getTvShows } from "~/services/tmdb";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const useTvShowsLoader = routeLoader$(async (event) => {
  const context = getTMDBContext(event);

  const [popular, topRated, onTheAir, airingToday] = await Promise.all([
    getTvShows({ context, page: 1, query: "popular" }),
    getTvShows({ context, page: 1, query: "top_rated" }),
    getTvShows({ context, page: 1, query: "on_the_air" }),
    getTvShows({ context, page: 1, query: "airing_today" }),
  ]);

  const random = getRandomMedia({
    collections: [popular, topRated, onTheAir, airingToday],
  });

  return { airingToday, onTheAir, popular, random, topRated };
});

export default component$(() => {
  const resource = useTvShowsLoader();

  return (
    <div class="flex max-h-screen flex-col gap-4 overflow-y-scroll">
      <a href={paths.media("tv", resource.value.random?.id)}>
        <TvHero media={resource.value.random} />
      </a>
      <MediaCarousel
        collection={resource.value.popular?.results || []}
        title={getListItem({ query: "popular", type: "tv" })}
        viewAllHref={paths.tvCategory("popular")}
      />
      <MediaCarousel
        collection={resource.value.topRated?.results || []}
        title={getListItem({ query: "top_rated", type: "tv" })}
        viewAllHref={paths.tvCategory("top_rated")}
      />
      <MediaCarousel
        collection={resource.value.onTheAir?.results || []}
        title={getListItem({ query: "on_the_air", type: "tv" })}
        viewAllHref={paths.tvCategory("on_the_air")}
      />
      <MediaCarousel
        collection={resource.value.airingToday?.results || []}
        title={getListItem({ query: "airing_today", type: "tv" })}
        viewAllHref={paths.tvCategory("airing_today")}
      />
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: "TV - Qwik City Movies",
};
