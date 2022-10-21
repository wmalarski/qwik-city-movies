import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint, type DocumentHead } from "@builder.io/qwik-city";
import type { inferPromise } from "~/services/types";

export const onGet = async () => {
  const { getTrending } = await import("~/services/tmdb");
  return getTrending();
};

const Index = component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <div class="bg-qwik-dark-blue">
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Rejected</div>}
        onResolved={(data) => (
          <section>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </section>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};

export default Index;
