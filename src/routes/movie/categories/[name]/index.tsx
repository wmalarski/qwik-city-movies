import {
  $,
  component$,
  Resource,
  useContext,
  useStore,
} from "@builder.io/qwik";
import { DocumentHead, loader$, useLocation } from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { ContainerContext } from "~/routes/context";
import type { inferPromise, ProductionMedia } from "~/services/types";
import { getListItem } from "~/utils/format";
import { paths } from "~/utils/paths";

export const getContent = loader$(async (event) => {
  const parseResult = z
    .object({ name: z.string().min(1) })
    .safeParse({ ...event.params });

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const { getMovies, getTrendingMovie } = await import("~/services/tmdb");
  const name = parseResult.data.name;

  try {
    const movies =
      name === "trending"
        ? await getTrendingMovie({ page: 1 })
        : await getMovies({ page: 1, query: name });
    return movies;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const location = useLocation();

  const container = useContext(ContainerContext);

  const fetcher$ = $(
    async (page: number): Promise<inferPromise<typeof getContent>> => {
      const params = new URLSearchParams({ page: String(page) });
      const url = `${location.href}/api?${params}`;
      const response = await fetch(url);
      return response.json();
    }
  );

  const resource = getContent.use();

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div class="flex flex-col">
      <h1 class="px-8 pt-4 text-4xl">
        {getListItem({ query: location.params.name, type: "movie" })}
      </h1>
      <div>
        <Resource
          value={resource}
          onPending={() => <div class="h-screen" />}
          onRejected={(e) => (
            <div>
              Rejected <pre>{JSON.stringify(e, null, 2)}</pre>
            </div>
          )}
          onResolved={(data) => (
            <MediaGrid
              collection={[...(data.results || []), ...store.results]}
              currentPage={store.currentPage}
              pageCount={data.total_pages || 1}
              parentContainer={container.value}
              onMore$={async () => {
                const newResult = await fetcher$(store.currentPage + 1);
                const newMedia = newResult.results || [];
                store.currentPage = newResult.page || store.currentPage;
                store.results = [...store.results, ...newMedia];
              }}
            />
          )}
        />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
