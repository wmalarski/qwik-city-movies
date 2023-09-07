import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, z } from "@builder.io/qwik-city";
import { Footer } from "~/modules/Footer/Footer";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { PersonHero } from "~/modules/PersonHero/PersonHero";
import { getPerson, getTMDBContext } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const usePersonLoader = routeLoader$(async (event) => {
  const parseResult = z
    .object({ personId: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const context = getTMDBContext(event);

  try {
    const person = await getPerson({ context, id: parseResult.data.personId });
    return person;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = usePersonLoader();

  return (
    <div style="max-h-screen overflow-y-scroll flex flex-col">
      <PersonHero person={resource.value} />
      <MediaGrid
        collection={[
          ...(resource.value.combined_credits?.cast || []),
          ...(resource.value.combined_credits?.crew || []),
        ]}
        currentPage={1}
        pageCount={1}
      />
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
