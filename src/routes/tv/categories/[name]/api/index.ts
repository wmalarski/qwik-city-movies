import { RequestEvent } from "@builder.io/qwik-city";
import { z } from "zod";
import { paths } from "~/utils/paths";

export const onGet = async (event: RequestEvent) => {
  const rawPage = event.url.searchParams.get("page") || "1";
  const parseResult = z
    .object({ name: z.string().min(1), page: z.number().min(1).step(1) })
    .safeParse({ ...event.params, page: +rawPage });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getTvShows, getTrending } = await import("~/services/tmdb");
  const { page, name } = parseResult.data;

  try {
    const movies =
      name === "trending"
        ? await getTrending({ mediaType: "tv", page })
        : await getTvShows({ page, query: name });
    return movies;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};
