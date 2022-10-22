import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint, type DocumentHead } from "@builder.io/qwik-city";
import { Carousel } from "~/modules/Carousel/Carousel";
import Hero from "~/modules/Hero/Hero";
import type { inferPromise } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const onGet = async () => {
  const { getTrending, getMovie, getTvShow } = await import("~/services/tmdb");

  const [movies, tv] = await Promise.all([
    getTrending({ mediaType: "movie", page: 1 }),
    getTrending({ mediaType: "tv", page: 1 }),
  ]);

  const items = [...(movies.results || []), ...(tv.results || [])];
  const randomItem = items[Math.floor(Math.random() * items.length)];

  const featured =
    randomItem.media_type === "movie"
      ? await getMovie({ id: randomItem.id })
      : await getTvShow({ id: randomItem.id });

  return { featured, movies, tv };
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
            media={data.movies.results || []}
            title={getListItem({ query: "trending", type: "movie" })}
            viewAllHref={paths.movieCategory("trending")}
          />
          <Carousel
            media={data.tv.results || []}
            title={getListItem({ query: "trending", type: "tv" })}
            viewAllHref={paths.movieCategory("trending")}
          />
        </div>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
