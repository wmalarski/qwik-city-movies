import { component$ } from "@builder.io/qwik";
import { DocumentHead, loader$ } from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { PersonHero } from "~/modules/PersonHero/PersonHero";
import { getPerson } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const getContent = loader$(async (event) => {
  const parseResult = z
    .object({ personId: z.coerce.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
    const person = await getPerson({ id: parseResult.data.personId });
    return person;
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = getContent.use();

  return (
    <div style="flex flex-col">
      <PersonHero person={resource.value} />
      <MediaGrid
        collection={[
          ...(resource.value.combined_credits?.cast || []),
          ...(resource.value.combined_credits?.crew || []),
        ]}
        currentPage={1}
        pageCount={1}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
