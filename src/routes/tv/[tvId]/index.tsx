import { component$, Resource } from "@builder.io/qwik";
import { DocumentHead, loader$ } from "@builder.io/qwik-city";
import { z } from "zod";
import { MovieInfoCard } from "~/modules/MovieInfoCard/MovieInfoCard";
import { PersonCarousel } from "~/modules/PersonCarousel/PersonCarousel";
import { TvHero } from "~/modules/TvHero/TvHero";
import { paths } from "~/utils/paths";

export const getContent = loader$(async (event) => {
  const parseResult = z
    .object({ tvId: z.number().min(0).step(1) })
    .safeParse({ tvId: +event.params.tvId });

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const { getTvShow } = await import("~/services/tmdb");

  try {
    const movie = await getTvShow({ id: parseResult.data.tvId });
    return movie;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = getContent.use();

  return (
    <Resource
      value={resource}
      onPending={() => <div class="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <flex class="flex flex-col">
          <TvHero media={data} />
          <MovieInfoCard media={data} />
          <PersonCarousel collection={data?.credits?.cast || []} title="Cast" />
        </flex>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
