import { component$ } from "@builder.io/qwik";
import ImgGitHub from "~/media/git-hub.svg?jsx";
import ImgQwik from "~/media/qwik.svg?jsx";

export const Footer = component$(() => {
  return (
    <footer class="flex flex-col gap-4 px-8 py-20">
      <div class="text-lg text-white">Qwik City Movies</div>
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm opacity-80">Made with</span>
        <a href="https://qwik.builder.io/" class="rounded-md bg-white p-1">
          <ImgQwik alt="Qwik" aria-label="Qwik" class="h-5 w-25" />
        </a>
      </div>
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm opacity-80">Design by</span>
        <a href="https://movies.nuxt.space/" class="link">
          Nuxt Movies
        </a>
      </div>
      <div class="text-sm opacity-80">
        This product uses the{" "}
        <a class="link" href="https://www.themoviedb.org/documentation/api">
          TMDB API
        </a>{" "}
        but is not endorsed or certified by TMDB.
      </div>
      <div class="text-sm opacity-80">
        <a href="https://github.com/wmalarski/qwik-city-movies">
          <ImgGitHub
            alt="GitHub repository"
            aria-label="GitHub repository"
            class="w-6 h-6"
          />
        </a>
      </div>
    </footer>
  );
});
