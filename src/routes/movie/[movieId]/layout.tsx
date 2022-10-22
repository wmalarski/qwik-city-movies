import { component$, Resource, Slot } from "@builder.io/qwik";
import {
  Link,
  RequestEvent,
  useEndpoint,
  useLocation,
} from "@builder.io/qwik-city";
import { z } from "zod";
import { inferPromise } from "~/services/types";
import { paths } from "~/utils/paths";

export const onGet = async (event: RequestEvent) => {
  const parseResult = z
    .object({ movieId: z.number().min(0).step(1) })
    .safeParse(event.params);

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getMovie } = await import("~/services/tmdb");

  try {
    const movie = await getMovie({ id: parseResult.data.movieId });
    return movie;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};

export default component$(() => {
  const location = useLocation();

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
      <div class="flex flex-row">
        <Link
          href={paths.media("movie", +location.params.movieId)}
          // TODO: add active class
          // activeClass={styles.buttonActive}
          // class={styles.button}
        >
          Overview
        </Link>
        <Link
          href={paths.movieVideo(+location.params.movieId)}
          // activeClass={styles.buttonActive}
          // class={styles.button}
        >
          Videos
        </Link>
        <Link
          href={paths.moviePhotos(+location.params.movieId)}
          // activeClass={styles.buttonActive}
          // class={styles.button}
        >
          Photos
        </Link>
      </div>
      <Slot />
    </main>
  );
});
