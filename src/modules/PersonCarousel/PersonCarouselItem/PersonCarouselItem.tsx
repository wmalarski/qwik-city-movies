import { component$ } from "@builder.io/qwik";
import { getProfile, getProfileSet } from "~/services/images";
import type { PersonMedia } from "~/services/types";
import { paths } from "~/utils/paths";

type Props = {
  media: PersonMedia;
};

export const PersonCarouselItem = component$((props: Props) => {
  return (
    <a href={paths.media("person", props.media.id)} class="w-48">
      <div class="transition-scale scale-95 duration-300 ease-in-out hover:scale-100">
        <picture>
          <img
            alt={props.media.name}
            class="max-w-full border-4 border-base-300 object-cover "
            height={270}
            src={getProfile(props.media, "w45")}
            srcSet={getProfileSet(props.media)}
            width={185}
          />
        </picture>
      </div>
      <span>{props.media.name}</span>
    </a>
  );
});
