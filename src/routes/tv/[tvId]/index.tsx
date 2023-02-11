import { component$ } from "@builder.io/qwik";
import { DocumentHead, loader$ } from "@builder.io/qwik-city";
import { z } from "zod";
import { MovieInfoCard } from "~/modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "~/modules/PersonCarousel/PersonCarousel";
import { TvHero } from "~/modules/TvHero/TvHero";
import { getTvShow } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const tvShowLoader = loader$(async (event) => {
  const parseResult = z
    .object({ tvId: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
    const tvShow = await getTvShow({ id: parseResult.data.tvId });
    return tvShow;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = tvShowLoader.use();

  return (
    <flex class="flex flex-col">
      <TvHero media={resource.value} />
      <MovieInfoCard media={resource.value} />
      <PersonCarousel
        collection={resource.value?.credits?.cast || []}
        title="Cast"
      />
    </flex>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
