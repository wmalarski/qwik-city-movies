import { component$, useContext, useStore } from "@builder.io/qwik";
import {
  action$,
  loader$,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { z } from "zod";
import { MediaGrid } from "~/modules/MediaGrid/MediaGrid";
import { search } from "~/services/tmdb";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";
import { ContainerContext } from "../context";

export const getAction = action$(async (form, event) => {
  const parseResult = z
    .object({ page: z.coerce.number().min(1).step(1) })
    .safeParse({ page: form.get("page") || 1 });

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const query = event.url.searchParams.get("query");

  if (!query) {
    return null;
  }

  const result = await search({ page: 1, query });

  return { query, ...result };
});

export const getContent = loader$(async (event) => {
  const query = event.url.searchParams.get("query");

  if (!query) {
    return null;
  }

  const result = await search({ page: 1, query });

  return { query, ...result };
});

export default component$(() => {
  const location = useLocation();

  const container = useContext(ContainerContext);

  const resource = getContent.use();
  const action = getAction.use();

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

  return (
    <div class="flex flex-col">
      <form class="flex flex-row justify-start gap-4 bg-base-300 p-4">
        <img
          src="/images/magnifier.svg"
          width={24}
          height={24}
          alt="search"
          aria-label="Search"
        />
        <input
          class="input"
          name="query"
          id="query"
          aria-label="query"
          value={location.query.get("query") || ""}
        />
        <button class="btn" type="submit">
          Search
        </button>
      </form>

      {resource.value ? (
        <MediaGrid
          collection={[...(resource.value.results || []), ...store.results]}
          currentPage={store.currentPage}
          pageCount={resource.value.total_pages || 1}
          parentContainer={container.value}
          onMore$={async () => {
            await action.execute({ page: `${store.currentPage + 1}` });
            const newMedia = action.value?.results || [];
            store.results.push(...newMedia);
            store.currentPage += 1;
          }}
        />
      ) : (
        <span class="w-full py-40 text-center text-4xl opacity-80">
          Type something to search...
        </span>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Search - Qwik City Movies",
};
