import { component$ } from "@builder.io/qwik";
import { StyledLink } from "~/components/StyledLink/StyledLink";
import ImgGitHub from "~/media/git-hub.svg?jsx";
import ImgQwik from "~/media/qwik.svg?jsx";

export const Footer = component$(() => {
  return (
    <footer class="flex flex-col gap-4 px-8 py-20">
      <div class="text-lg text-white">Qwik City Movies</div>
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm opacity-80">Made with</span>
        <StyledLink
          href="https://qwik.builder.io/"
          class="rounded-md bg-white p-1"
        >
          <ImgQwik aria-label="Qwik" class="h-5 w-25" />
        </StyledLink>
      </div>
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm opacity-80">Design by</span>
        <StyledLink href="https://movies.nuxt.space/">Nuxt Movies</StyledLink>
      </div>
      <div class="text-sm opacity-80">
        This product uses the{" "}
        <StyledLink href="https://www.themoviedb.org/documentation/api">
          TMDB API
        </StyledLink>{" "}
        but is not endorsed or certified by TMDB.
      </div>
      <div class="text-sm opacity-80">
        <StyledLink href="https://github.com/wmalarski/qwik-city-movies">
          <ImgGitHub aria-label="GitHub repository" class="w-6 h-6" />
        </StyledLink>
      </div>
    </footer>
  );
});
