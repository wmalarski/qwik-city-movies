import { component$, Resource, useContext } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { MovieResourceContext } from "../context";

export default component$(() => {
  const resource = useContext(MovieResourceContext);

  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <section>
          <h2>PHOTOS</h2>
          <pre>{JSON.stringify(data.images, null, 2)}</pre>
        </section>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
