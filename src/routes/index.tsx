import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint, type DocumentHead } from "@builder.io/qwik-city";
import { Carousel } from "~/modules/Carousel/Carousel";
import type { inferPromise } from "~/services/types";

export const onGet = async () => {
  const { getTrending } = await import("~/services/tmdb");
  return getTrending({ mediaType: "all", page: 1 });
};

export default component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <div class="bg-qwik-dark-blue">
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Rejected</div>}
        onResolved={(data) => (
          <section>
            <Carousel media={data.results || []} />
          </section>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
