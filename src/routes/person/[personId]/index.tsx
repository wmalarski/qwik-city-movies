import { component$, Resource } from "@builder.io/qwik";
import { RequestEvent, useEndpoint } from "@builder.io/qwik-city";
import { z } from "zod";
import type { inferPromise } from "~/services/types";
import { paths } from "~/utils/paths";

export const onGet = async (event: RequestEvent) => {
  const parseResult = z
    .object({ personId: z.number().min(0).step(1) })
    .safeParse({ personId: +event.params.personId });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getPerson } = await import("~/services/tmdb");

  try {
    const movie = await getPerson({ id: parseResult.data.personId });
    return movie;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};

export default component$(() => {
  const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    <main>
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Rejected</div>}
        onResolved={(data) => (
          <section>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </section>
        )}
      />
    </main>
  );
});
