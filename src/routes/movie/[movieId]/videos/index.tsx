import { component$, Resource, useContext } from "@builder.io/qwik";
import { MovieResourceContext } from "../context";

export default component$(() => {
  const resource = useContext(MovieResourceContext);

  return (
    <section>
      <h2>VIDEOS</h2>
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Rejected</div>}
        onResolved={(data) => (
          <section>
            <h2>PHOTOS</h2>
            <pre>{JSON.stringify(data.videos?.results, null, 2)}</pre>
          </section>
        )}
      />
    </section>
  );
});
