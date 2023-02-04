import { RequestHandler } from "@builder.io/qwik-city";
import { z } from "zod";
import { search } from "~/services/tmdb";
import { paths } from "~/utils/paths";

export const onGet: RequestHandler = async (event) => {
  const entries = Object.fromEntries(event.url.searchParams.entries());

  const parseResult = z
    .object({
      page: z.coerce.number().min(1).step(1).default(1),
      query: z.string(),
    })
    .safeParse(entries);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const result = await search(parseResult.data);

  event.json(200, { query: parseResult.data.query, ...result });
};
