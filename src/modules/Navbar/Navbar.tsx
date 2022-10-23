import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { paths } from "~/utils/paths";

export const Navbar = component$(() => {
  return (
    <nav class="h-screen bg-black p-2">
      <ul class="flex flex-col gap-2 ">
        <li>
          <Link href={paths.index}>All</Link>
        </li>
        <li>
          <Link href={paths.movies}>Movies</Link>
        </li>
        <li>
          <Link href={paths.tv}>TV</Link>
        </li>
      </ul>
    </nav>
  );
});
