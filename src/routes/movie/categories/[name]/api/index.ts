import { RequestHandler } from "@builder.io/qwik-city";
import { z } from "zod";
import { getMovies, getTrendingMovie } from "~/services/tmdb";
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
    const name = event.params.name;

    const movies =
      name === "trending"
        ? await getTrendingMovie({ page: 1 })
        : await getMovies({ page: 1, query: name });

    event.json(200, movies);
  } catch {
    throw event.redirect(302, paths.notFound);
  }
};
