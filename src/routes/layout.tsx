import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <main>
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          This product uses the
          <a href="https://www.themoviedb.org/documentation/api">TMDB API</a>
          but is not endorsed or certified by TMDB.
        </a>
      </footer>
    </>
  );
});
