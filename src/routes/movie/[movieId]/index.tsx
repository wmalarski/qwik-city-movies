import { component$, useContext } from "@builder.io/qwik";
import { MovieContext } from "./movieContext";

export default component$(() => {
  const data = useContext(MovieContext);

  return (
    <>
      <span>OVERVIEW</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
});
