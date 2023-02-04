import type { Loader } from "@builder.io/qwik-city";

export type LoaderContent<T> = T extends Loader<infer R> ? R : never;
