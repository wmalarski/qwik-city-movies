import { component$, useContext } from "@builder.io/qwik";
import { MovieContext } from "../movieContext";

export default component$(() => {
  const data = useContext(MovieContext);

  return (
    <section>
      <h2>PHOTOS</h2>
      {JSON.stringify(data, null, 2)}
    </section>
  );
});
