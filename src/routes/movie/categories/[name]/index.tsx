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
import type { inferPromise, Media } from "~/services/types";
import { getListItem } from "~/utils/format";
import type { onGet } from "./api";

export default component$(() => {
  const location = useLocation();

  const container = useContext(ContainerContext);

  const fetcher$ = $(
    async (page: number): Promise<inferPromise<typeof onGet>> => {
      const params = new URLSearchParams({ page: String(page) });
      const url = `${location.href}/api?${params}`;
      try {
        const response = await fetch(url);
        return response.json();
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  );

  const resource = useResource$(() => fetcher$(1));

  const store = useStore({
    currentPage: 1,
    results: [] as Media[],
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
