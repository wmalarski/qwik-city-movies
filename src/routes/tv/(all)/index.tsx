import { component$, Resource } from "@builder.io/qwik";
import { Link, useEndpoint, type DocumentHead } from "@builder.io/qwik-city";
import { Carousel } from "~/modules/Carousel/Carousel";
import { TvHero } from "~/modules/TvHero/TvHero";
import type { inferPromise } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const onGet = async () => {
  const { getTvShows, getTvShow, getRandomMedia } = await import(
    "~/services/tmdb"
  );

  const [popular, topRated, onTheAir, airingToday] = await Promise.all([
    getTvShows({ page: 1, query: "popular" }),
    getTvShows({ page: 1, query: "top_rated" }),
    getTvShows({ page: 1, query: "on_the_air" }),
    getTvShows({ page: 1, query: "airing_today" }),
  ]);

  const random = getRandomMedia({
    collections: [popular, topRated, onTheAir, airingToday],
  });

  const featured = await getTvShow({ id: random.id });

  return { airingToday, featured, onTheAir, popular, topRated };
};

export default component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div class="flex flex-col gap-4">
          <Link href={paths.media("tv", data.featured.id)}>
            <TvHero media={data.featured} />
          </Link>
          <Carousel
            collection={data.popular.results || []}
            title={getListItem({ query: "popular", type: "tv" })}
            viewAllHref={paths.tvCategory("popular")}
          />
          <Carousel
            collection={data.topRated.results || []}
            title={getListItem({ query: "top_rated", type: "tv" })}
            viewAllHref={paths.tvCategory("top_rated")}
          />
          <Carousel
            collection={data.onTheAir.results || []}
            title={getListItem({ query: "on_the_air", type: "tv" })}
            viewAllHref={paths.tvCategory("on_the_air")}
          />
          <Carousel
            collection={data.airingToday.results || []}
            title={getListItem({ query: "airing_today", type: "tv" })}
            viewAllHref={paths.tvCategory("airing_today")}
          />
        </div>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "TV",
};
