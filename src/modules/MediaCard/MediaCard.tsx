import { component$ } from "@builder.io/qwik";
import { Stars } from "~/components/Stars/Stars";
import { getPoster } from "~/services/images";
import type { ProductionMedia } from "~/services/types";
import { paths } from "~/utils/paths";
import { getHeading, getMediaType } from "./MediaCard.utils";

type Props = {
  media: ProductionMedia;
};

export const MediaCard = component$((props: Props) => {
  const mediaType = getMediaType(props.media);
  const heading = getHeading(props.media);

  return (
    <a href={paths.media(mediaType, props.media.id)}>
      <div class="transition-scale scale-95 border-4 border-base-300 duration-300 ease-in-out hover:scale-100">
        <picture>
          <img
            alt={heading}
            class="h-[400px] w-full max-w-full object-cover"
            src={getPoster(props.media, "w185")}
          />
        </picture>
      </div>
      <h2>{heading}</h2>
      <Stars rating={props.media.vote_average} />
    </a>
  );
});
