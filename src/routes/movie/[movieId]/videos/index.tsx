import { component$, useContext } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { MovieResourceContext } from "../context";

export default component$(() => {
  const resource = useContext(MovieResourceContext);

  return (
    <section class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 px-16 py-4">
      {resource.value.videos?.results?.map((video) => (
        <a
          class="aspect-video"
          href={`https://www.youtube.com/watch?v=${video.key}`}
          target="_none"
        >
          <img
            alt={video.name}
            src={`https://movies-proxy.vercel.app/ipx/f_webp,s_400x600/youtube/vi/${video.key}/maxresdefault.jpg`}
            class="h-full max-h-full w-full object-cover"
            width={400}
            height={600}
          />
          <div class="mt-2 flex flex-col gap-2">
            <span>{video.name}</span>
            <span class="op-60 text-sm">{video.type}</span>
          </div>
        </a>
      ))}
    </section>
  );
});

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
