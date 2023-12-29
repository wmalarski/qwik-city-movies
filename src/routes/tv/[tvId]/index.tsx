import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, z } from "@builder.io/qwik-city";
import { Footer } from "~/modules/Footer/Footer";
import { MovieInfoCard } from "~/modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "~/modules/PersonCarousel/PersonCarousel";
import { TvHero } from "~/modules/TvHero/TvHero";
import { getTMDBContext, getTvShow } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const useTvShowLoader = routeLoader$(async (event) => {
  const parseResult = await z
    .object({ tvId: z.coerce.number().min(0).step(1) })
    .safeParseAsync(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const context = getTMDBContext(event);

  try {
    const tvShow = await getTvShow({
      context,
      id: parseResult.data.tvId,
    });
    return tvShow;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = useTvShowLoader();

  return (
    <div class="flex max-h-screen flex-col overflow-y-scroll">
      <TvHero media={resource.value} />
      <MovieInfoCard media={resource.value} />
      <PersonCarousel
        collection={resource.value?.credits?.cast || []}
        title="Cast"
      />
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
