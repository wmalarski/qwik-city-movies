import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/modules/Navbar/Navbar";

export default component$(() => {
  return (
    <div class="flex h-screen w-screen flex-row">
      <Navbar />
      <div class="overflow-scroll">
        <main>
          <section>
            <Slot />
          </section>
        </main>
        <footer>
          This product uses the
          <a href="https://www.themoviedb.org/documentation/api">TMDB API</a>
          but is not endorsed or certified by TMDB.
        </footer>
      </div>
    </div>
  );
});
