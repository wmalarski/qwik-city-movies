import { component$ } from "@builder.io/qwik";
import ImgHome from "~/media/home.svg?jsx";
import ImgMagnifier from "~/media/magnifier.svg?jsx";
import ImgMovie from "~/media/movie.svg?jsx";
import ImgTv from "~/media/tv.svg?jsx";

import { paths } from "~/utils/paths";

export const Navbar = component$(() => {
  return (
    <nav class="bg-black px-6 py-8 text-black">
      <ul class="flex justify-around gap-10 md:w-10 md:flex-col md:justify-start">
        <li class="hover:opacity-80">
          <a href={paths.index}>
            <ImgHome alt="home" aria-label="Home" class="h-6 w-6" />
          </a>
        </li>
        <li class="hover:opacity-80">
          <a href={paths.movies}>
            <ImgMovie alt="movie" aria-label="Movies" class="h-6 w-6" />
          </a>
        </li>
        <li class="hover:opacity-80">
          <a href={paths.tv}>
            <ImgTv alt="tv" aria-label="TV" class="h-6 w-6" />
          </a>
        </li>
        <li class="hover:opacity-80">
          <a href={paths.search}>
            <ImgMagnifier alt="search" aria-label="Search" class="h-6 w-6" />
          </a>
        </li>
      </ul>
    </nav>
  );
});
