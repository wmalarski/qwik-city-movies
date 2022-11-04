import {
  $,
  component$,
  Resource,
  useContext,
  useResource$,
  useStore,
} from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { ContainerContext } from "~/routes/context";
import type { inferPromise, ProductionMedia } from "~/services/types";
import type { onGet } from "./api";

export default component$(() => {
  const location = useLocation();

  const container = useContext(ContainerContext);

  const fetcher$ = $(
    async (page: number): Promise<inferPromise<typeof onGet>> => {
      const params = new URLSearchParams({ page: String(page) });
      const url = `${location.href}/api?${params}`;
      const response = await fetch(url);
      return response.json();
    }
  );

  const resource = useResource$(() => fetcher$(1));

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <Resource
      value={resource}
      onPending={() => <div class="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div style="flex flex-col gap-4">
          <h1 class="px-8 pt-4 text-4xl">{`Tv Show Genre: ${data.genre?.name}`}</h1>
          <MediaGrid
            collection={[...(data.tvShows.results || []), ...store.results]}
            currentPage={store.currentPage}
            pageCount={data.tvShows?.total_pages || 1}
            parentContainer={container.value}
            onMore$={async () => {
              const newResult = await fetcher$(store.currentPage + 1);
              const newMedia = newResult.tvShows.results || [];
              store.currentPage = newResult.tvShows.page || store.currentPage;
              store.results = [...store.results, ...newMedia];
            }}
          />
        </div>
      )}
    />
  );
});

export const head: DocumentHead<inferPromise<typeof onGet>> = (event) => {
  const name = event.data?.genre?.name;
  return {
    title: `${name} Tv Shows - Qwik City Movies`,
  };
};
