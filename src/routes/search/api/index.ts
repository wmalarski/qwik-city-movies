import { RequestEvent } from "@builder.io/qwik-city";

export const onGet = async (event: RequestEvent) => {
  const query = event.url.searchParams.get("query");
  const page = event.url.searchParams.get("page") || "1";

  if (!query) {
    return null;
  }

  const { search } = await import("~/services/tmdb");
  const result = await search({ page: +page, query });

  return { query, result };
};
