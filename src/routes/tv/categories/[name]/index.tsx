import { component$, Resource } from "@builder.io/qwik";
import { RequestEvent, useEndpoint, useLocation } from "@builder.io/qwik-city";
import { z } from "zod";
import { Carousel } from "~/modules/Carousel/Carousel";
import { inferPromise } from "~/services/types";
import { paths } from "~/utils/paths";

export const onGet = async (event: RequestEvent) => {
  const parseResult = z
    .object({ name: z.string().min(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getTvShows, getTrending } = await import("~/services/tmdb");
  const name = parseResult.data.name;

  try {
    const movies =
      name === "trending"
        ? await getTrending({ mediaType: "tv", page: 1 })
        : await getTvShows({ page: 1, query: name });
    return movies;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};

export default component$(() => {
  const location = useLocation();

  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <main>
      <div>
        <div>
          <h2>{location.params.name}</h2>
        </div>
        <div>
          <Resource
            value={resource}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Rejected</div>}
            onResolved={(data) => (
              <Carousel
                media={data.results || []}
                title={location.params.name}
                viewAllHref={paths.tvCategory(location.params.name)}
              />
            )}
          />
        </div>
      </div>
    </main>
  );
});
