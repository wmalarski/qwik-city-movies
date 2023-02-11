import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { getImage, getImageSet } from "~/services/images";
import { movieLoader } from "../layout";

export default component$(() => {
  const resource = movieLoader.use();

  return (
    <section class="flex flex-col gap-8 px-16 py-4">
      <div class="flex items-end gap-4">
        <h2 class="text-2xl">Backdrops</h2>
        <span class="text-sm opacity-80">
          {resource.value.images?.backdrops?.length || 0} Images
        </span>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-6">
        {resource.value.images?.backdrops?.map((backdrop) => (
          <img
            alt={`${resource.value.title} backdrop`}
            src={getImage(backdrop, "92")}
            srcSet={getImageSet(backdrop, "500")}
            style={{ "aspect-ratio": backdrop.aspect_ratio }}
            class="h-full max-h-full w-full object-cover"
          />
        ))}
      </div>
      <div class="flex items-end gap-4">
        <h2 class="text-2xl">Posters</h2>
        <span class="text-sm opacity-80">
          {resource.value.images?.posters?.length || 0} Images
        </span>
      </div>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {resource.value.images?.posters?.map((poster) => (
          <img
            alt={`${resource.value.title} poster`}
            src={getImage(poster, "92")}
            srcSet={getImageSet(poster, "342")}
            class="h-full max-h-full w-full object-cover"
            style={{ "aspect-ratio": poster.aspect_ratio }}
          />
        ))}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
