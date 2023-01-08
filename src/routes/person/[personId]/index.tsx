import { component$, Resource } from "@builder.io/qwik";
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
    <Resource
      value={resource}
      onPending={() => <div class="h-screen" />}
      onRejected={() => <div>Rejected</div>}
      onResolved={(data) => (
        <div style="flex flex-col">
          <PersonHero person={data} />
          <MediaGrid
            collection={[
              ...(data.combined_credits?.cast || []),
              ...(data.combined_credits?.crew || []),
            ]}
            currentPage={1}
            pageCount={1}
          />
        </div>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
