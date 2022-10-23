import { component$, Resource } from "@builder.io/qwik";
import {
  RequestEvent,
  useEndpoint,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import type { inferPromise } from "~/services/types";

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

  const resource = useEndpoint<inferPromise<typeof onGet>>();

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
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Rejected</div>}
        onResolved={(data) =>
          data ? (
            <MediaGrid collection={data?.result.results || []} />
          ) : (
            <span class="w-full py-40 text-center text-4xl opacity-60">
              Type something to search...
            </span>
          )
        }
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Search",
};
