import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { getProfile } from "~/services/images";
import type { PersonMedia } from "~/services/types";
import { paths } from "~/utils/paths";

type Props = {
  media: PersonMedia;
};

export const PersonCarouselItem = component$((props: Props) => {
  return (
    <Link href={paths.media("person", props.media.id)}>
      <div class="transition-scale scale-95 border-4 border-base-300 duration-300 ease-in-out hover:scale-100">
        <picture>
          <img
            alt={props.media.name}
            class="h-full w-full max-w-full object-cover"
            src={getProfile(props.media, "w185")}
          />
        </picture>
      </div>
      <h2>{props.media.name}</h2>
    </Link>
  );
});
