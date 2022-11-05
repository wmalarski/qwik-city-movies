import {
  $,
  component$,
  Resource,
  useContext,
  useStore,
} from "@builder.io/qwik";
import {
  RequestEvent,
  useEndpoint,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import type { inferPromise, ProductionMedia } from "~/services/types";
import { ContainerContext } from "../context";

export const onGet = async (event: RequestEvent) => {
  const query = event.url.searchParams.get("query");

  if (!query) {
    return null;
  }

  const { search } = await import("~/services/tmdb");
  const result = await search({ page: 1, query });

  return { query, result };
};

export default component$(() => {
  const location = useLocation();

  const container = useContext(ContainerContext);

  const fetcher$ = $(
    async (page: number): Promise<inferPromise<typeof onGet>> => {
      const currentUrl = new URL(location.href);
      const params = new URLSearchParams({
        page: String(page),
        query: currentUrl.searchParams.get("query") || "",
      });
      const url = `${currentUrl.origin}${currentUrl.pathname}/api?${params}`;
      const response = await fetch(url);
      return response.json();
    }
  );

  const resource = useEndpoint<inferPromise<typeof onGet>>();

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div class="flex flex-col">
      <form class="flex flex-row justify-start gap-4 bg-base-300 p-4">
        <img
          src="/images/magnifier.svg"
          width={24}
          height={24}
          alt="search"
          aria-label="Search"
        />
        <input
          class="input"
          name="query"
          id="query"
          aria-label="query"
          value={location.query.query}
        />
        <button class="btn" type="submit">
          Search
        </button>
      </form>
      <Resource
        value={resource}
        onPending={() => <div class="h-screen" />}
        onRejected={(e) => (
          <div>
            Rejected <pre>{JSON.stringify(e, null, 2)}</pre>
          </div>
        )}
        onResolved={(data) => (
          <>
            {data ? (
              <MediaGrid
                collection={[...(data.result.results || []), ...store.results]}
                currentPage={store.currentPage}
                pageCount={data.result?.total_pages || 1}
                parentContainer={container.value}
                onMore$={async () => {
                  const newResult = await fetcher$(store.currentPage + 1);
                  const newMedia = newResult?.result.results || [];
                  store.currentPage =
                    newResult?.result.page || store.currentPage;
                  store.results = [...store.results, ...newMedia];
                }}
              />
            ) : (
              <span class="w-full py-40 text-center text-4xl opacity-80">
                Type something to search...
              </span>
            )}
          </>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Search - Qwik City Movies",
};
