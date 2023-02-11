import { component$, useSignal, useStore } from "@builder.io/qwik";
import { loader$, useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { search } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";

export const searchLoader = loader$(async (event) => {
  const query = event.url.searchParams.get("query");

  if (!query) {
    return null;
  }

  const result = await search({ page: 1, query });

  return { query, ...result };
});

export default component$(() => {
  const location = useLocation();

  const containerRef = useSignal<Element | null>(null);

  const resource = searchLoader.use();

  const store = useStore(
    {
      currentPage: 1,
      results: [] as ProductionMedia[],
    },
    { deep: true }
  );

  return (
    <div
      class="flex max-h-screen flex-col overflow-y-scroll"
      ref={(e) => (containerRef.value = e)}
    >
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
          value={location.query.get("query") || ""}
        />
        <button class="btn" type="submit">
          Search
        </button>
      </form>

      {resource.value ? (
        <MediaGrid
          collection={[...(resource.value.results || []), ...store.results]}
          currentPage={store.currentPage}
          pageCount={resource.value.total_pages || 1}
          parentContainer={containerRef.value}
          onMore$={async () => {
            const url = `${location.href}api?${new URLSearchParams({
              page: `${store.currentPage + 1}`,
              query: location.params.query,
            })}`;
            const json = await (await fetch(url)).json();
            const newMedia = json.results || [];
            store.results.push(...newMedia);
            store.currentPage += 1;
          }}
        />
      ) : (
        <span class="w-full py-40 text-center text-4xl opacity-80">
          Type something to search...
        </span>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Search - Qwik City Movies",
};
