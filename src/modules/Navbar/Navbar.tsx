import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { paths } from "~/utils/paths";

export const Navbar = component$(() => {
  return (
    <nav class="h-screen bg-black px-4 py-8">
      <ul class="flex flex-col gap-8">
        <li class="hover:opacity-80">
          <Link prefetch href={paths.index}>
            <img
              src="/images/home.svg"
              width={24}
              height={24}
              alt="home"
              aria-label="Home"
            />
          </Link>
        </li>
        <li class="hover:opacity-80">
          <Link prefetch href={paths.movies}>
            <img
              src="/images/movie.svg"
              width={24}
              height={24}
              alt="movie"
              aria-label="Movies"
            />
          </Link>
        </li>
        <li class="hover:opacity-80">
          <Link prefetch href={paths.tv}>
            <img
              src="/images/tv.svg"
              width={24}
              height={24}
              alt="tv"
              aria-label="TV"
            />
          </Link>
        </li>
        <li class="hover:opacity-80">
          <Link prefetch href={paths.search}>
            <img
              src="/images/magnifier.svg"
              width={24}
              height={24}
              alt="search"
              aria-label="Search"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
});
