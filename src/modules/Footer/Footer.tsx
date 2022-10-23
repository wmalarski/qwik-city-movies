import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="flex flex-col gap-4 px-8 py-20">
      <div class="text-lg text-white">Qwik City Movies</div>
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm opacity-60">Made with</span>
        <a href="https://qwik.builder.io/" class="rounded-md bg-white p-1">
          <img
            src="/images/qwik.svg"
            width={100}
            height={20}
            alt="Qwik"
            aria-label="Qwik"
          />
        </a>
      </div>
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm opacity-60">Design by</span>
        <a href="https://movies.nuxt.space/" class="link">
          Nuxt Movies
        </a>
      </div>
      <div class="text-sm opacity-60">
        This product uses the{" "}
        <a class="link" href="https://www.themoviedb.org/documentation/api">
          TMDB API
        </a>{" "}
        but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );
});
