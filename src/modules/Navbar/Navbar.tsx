import { component$ } from "@builder.io/qwik";
import { paths } from "~/utils/paths";

export const Navbar = component$(() => {
  return (
    <nav class="bg-black px-6 py-8 text-black">
      <ul class="flex justify-around gap-10 md:w-10 md:flex-col md:justify-start">
        <li class="hover:opacity-80">
          <a href={paths.index}>
            <img
              alt="home"
              aria-label="Home"
              height={24}
              src="/images/home.svg"
              width={24}
            />
          </a>
        </li>
        <li class="hover:opacity-80">
          <a href={paths.movies}>
            <img
              alt="movie"
              aria-label="Movies"
              height={24}
              src="/images/movie.svg"
              width={24}
            />
          </a>
        </li>
        <li class="hover:opacity-80">
          <a href={paths.tv}>
            <img
              alt="tv"
              aria-label="TV"
              height={24}
              src="/images/tv.svg"
              width={24}
            />
          </a>
        </li>
        <li class="hover:opacity-80">
          <a href={paths.search}>
            <img
              alt="search"
              aria-label="Search"
              height={24}
              src="/images/magnifier.svg"
              width={24}
            />
          </a>
        </li>
      </ul>
    </nav>
  );
});
