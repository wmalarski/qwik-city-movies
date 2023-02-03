import { RequestHandler } from "@builder.io/qwik-city";
import { z } from "zod";
import { getTrendingTv, getTvShows } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const onGet: RequestHandler = async (event) => {
  const entries = Object.fromEntries(event.url.searchParams.entries());

  const parseResult = z
    .object({ page: z.coerce.number().min(1).step(1).default(1) })
    .safeParse(entries);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  try {
    const query = event.params.name;
    const page = parseResult.data.page;

    const movies =
      query === "trending"
        ? await getTrendingTv({ page })
        : await getTvShows({ page, query });

    event.json(200, movies);
  } catch {
    throw event.redirect(302, paths.notFound);
  }
};
