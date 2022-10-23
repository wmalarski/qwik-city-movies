import { component$, Resource, useContext } from "@builder.io/qwik";
import { MovieDetails } from "~/modules/MovieDetails/MovieDetails";
import { MovieResourceContext } from "../context";

export default component$(() => {
  const resource = useContext(MovieResourceContext);

  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => <MovieDetails media={data} />}
    />
  );
});
