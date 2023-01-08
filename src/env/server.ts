import { z } from "zod";

if (typeof window !== "undefined") {
  throw new Error("server env on client");
}

const schema = z.object({
  VITE_TMDB_API_KEY: z.string(),
});

export const serverEnv = schema.parse(import.meta.env);
