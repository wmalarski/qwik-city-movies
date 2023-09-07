import { component$, useSignal } from "@builder.io/qwik";
import {
  DocumentHead,
  routeLoader$,
  server$,
  useLocation,
  z,
} from "@builder.io/qwik-city";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { getTMDBContext, getTrendingTv, getTvShows } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const useTvShowCategoryLoader = routeLoader$(async (event) => {
  const parseResult = z
    .object({ name: z.string().min(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const context = getTMDBContext(event);

  try {
    const name = parseResult.data.name;
    const movies =
      name === "trending"
        ? await getTrendingTv({ context, page: 1 })
        : await getTvShows({ context, page: 1, query: name });
    return movies;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export const getMore = server$(async function (page: number) {
  const parseResult = z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      query: z.string().min(1),
    })
    .parse({ page, query: this.params.name });

  const context = getTMDBContext(this);

  const movies =
    parseResult.query === "trending"
      ? await getTrendingTv({ context, page: parseResult.page })
      : await getTvShows({ context, ...parseResult });

  return movies;
});

export default component$(() => {
  const location = useLocation();

  const containerRef = useSignal<Element | null>(null);

  const tvShowCategory = useTvShowCategoryLoader();

  const currentPage = useSignal(1);
  const collection = useSignal<ProductionMedia[]>(
    tvShowCategory.value.results || [],
  );

  return (
    <div
      class="flex max-h-screen w-full flex-col overflow-y-scroll"
      ref={(e) => (containerRef.value = e)}
    >
      <h1 class="px-8 pt-4 text-4xl">
        {getListItem({ query: location.params.name, type: "tv" })}
      </h1>
      <div>
        <MediaGrid
          collection={collection.value}
          currentPage={currentPage.value}
          pageCount={tvShowCategory.value.total_pages || 1}
          parentContainer={containerRef.value}
          onMore$={async () => {
            const data = await getMore(currentPage.value + 1);
            const newMedia = data.results || [];
            collection.value = [...collection.value, ...newMedia];
            currentPage.value += 1;
          }}
        />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
