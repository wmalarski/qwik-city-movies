import { z } from "zod";

const schema = z.object({
  VITE_TMDB_API_KEY: z.string(),
});

export const serverEnv = schema.parse(import.meta.env);
