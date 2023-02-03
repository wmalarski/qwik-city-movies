import { RequestHandler } from "@builder.io/qwik-city";
import { z } from "zod";
import { getMediaByGenre } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const onGet: RequestHandler = async (event) => {
  const entries = Object.fromEntries(event.url.searchParams.entries());

  const parseResult = z
    .object({ page: z.coerce.number().min(1).step(1).default(1) })
    .safeParse(entries);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const result = await getMediaByGenre({
    genre: +event.params.genreId,
    media: "tv",
    page: parseResult.data.page,
  });

  event.json(200, result);
};
