import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint, type DocumentHead } from "@builder.io/qwik-city";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import type { inferPromise } from "~/services/types";

export const onGet = async () => {
  const { search } = await import("~/services/tmdb");
  return search({ page: 1, query: "popular" });
};

export default component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <div>
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Rejected</div>}
        onResolved={(data) => <MediaGrid collection={data.results || []} />}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Search",
};
