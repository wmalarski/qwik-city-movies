import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { MovieInfoCard } from "~/modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "~/modules/PersonCarousel/PersonCarousel";
import { movieLoader } from "../layout";

export default component$(() => {
  const resource = movieLoader.use();

  return (
    <flex class="flex flex-col">
      <MovieInfoCard media={resource.value} />
      <PersonCarousel
        collection={resource.value.credits?.cast || []}
        title="Cast"
      />
    </flex>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
