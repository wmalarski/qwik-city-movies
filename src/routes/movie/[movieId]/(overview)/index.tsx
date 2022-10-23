import { component$, Resource, useContext } from "@builder.io/qwik";
import { Carousel } from "~/modules/Carousel/Carousel";
import { MovieInfoCard } from "~/modules/MovieInfoCard/MovieInfoCard";
import { MovieResourceContext } from "../context";

export default component$(() => {
  const resource = useContext(MovieResourceContext);

  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <flex class="flex flex-col">
          <MovieInfoCard media={data} />
          <Carousel collection={data.credits?.cast || []} title="Cast" />
        </flex>
      )}
    />
  );
});
