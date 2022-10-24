import { createContext } from "@builder.io/qwik";

export const ContainerContext = createContext<{ value: Element | null }>(
  "container-context"
);
