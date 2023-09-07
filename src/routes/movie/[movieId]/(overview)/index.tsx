import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { MovieInfoCard } from "~/modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "~/modules/PersonCarousel/PersonCarousel";
import { useMovieLoader } from "../layout";

export default component$(() => {
  const resource = useMovieLoader();

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
