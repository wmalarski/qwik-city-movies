import { component$, useSignal } from "@builder.io/qwik";
import {
  routeLoader$,
  server$,
  useLocation,
  z,
  type DocumentHead,
} from "@builder.io/qwik-city";
import ImgMagnifier from "~/media/magnifier.svg?jsx";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { getTMDBContext, search } from "~/services/tmdb";
import { MediaBase } from "~/services/types";

export const useSearchLoader = routeLoader$(async (event) => {
  const query = event.url.searchParams.get("query");

  if (!query) {
    return null;
  }

  const context = getTMDBContext(event);

  const result = await search({ context, page: 1, query });

  return { query, ...result };
});

export const getMore = server$(async function (page: number) {
  const parseResult = await z
    .object({
      page: z.coerce.number().min(1).int().default(1),
      query: z.string().optional().default(""),
    })
    .parseAsync({ page, query: this.query.get("query") });

  const context = getTMDBContext(this);

  const result = await search({ context, ...parseResult });

  return { query: parseResult.query, ...result };
});

export default component$(() => {
  const location = useLocation();

  const containerRef = useSignal<Element | null>(null);

  const resource = useSearchLoader();

  const currentPage = useSignal(1);
  const collection = useSignal<MediaBase[]>(resource.value?.results || []);

  return (
    <div
      class="flex max-h-screen flex-col overflow-y-scroll"
      ref={(e) => (containerRef.value = e)}
    >
      <form class="flex flex-row justify-start gap-4 bg-base-300 p-4">
        <ImgMagnifier aria-label="Search" class="w-6 h-6" />
        <input
          aria-label="query"
          class="input"
          id="query"
          name="query"
          value={location.url.searchParams.get("query") || ""}
        />
        <button class="btn" type="submit">
          Search
        </button>
      </form>

      {resource.value ? (
        <MediaGrid
          collection={collection.value}
          currentPage={currentPage.value}
          pageCount={resource.value.total_pages || 1}
          parentContainer={containerRef.value}
          onMore$={async () => {
            const data = await getMore(currentPage.value + 1);
            const newMedia = data.results || [];
            collection.value = [...collection.value, ...newMedia];
            currentPage.value += 1;
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
