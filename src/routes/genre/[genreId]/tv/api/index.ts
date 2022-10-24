import { RequestEvent } from "@builder.io/qwik-city";
import { z } from "zod";
import { paths } from "~/utils/paths";

export const onGet = async (event: RequestEvent) => {
  const rawPage = event.url.searchParams.get("page") || "1";
  const parseResult = z
    .object({
      genreId: z.number().min(0).step(1),
      page: z.number().min(1).step(1),
    })
    .safeParse({ genreId: +event.params.genreId, page: +rawPage });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getMediaByGenre, getGenreList } = await import("~/services/tmdb");

  const [tvShows, genres] = await Promise.all([
    getMediaByGenre({
      genre: parseResult.data.genreId,
      media: "tv",
      page: parseResult.data.page,
    }),
    getGenreList({ media: "tv" }),
  ]);

  const genre = genres.find((genre) => genre.id === parseResult.data.genreId);

  return { genre, tvShows };
};
