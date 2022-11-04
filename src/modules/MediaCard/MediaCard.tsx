import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Stars } from "~/components/Stars/Stars";
import { getPoster, getProfile } from "~/services/images";
import type { Media } from "~/services/types";
import { paths } from "~/utils/paths";
import { getHeading, getMediaType } from "./MediaCard.utils";

type Props = {
  media: Media;
};

export const MediaCard = component$((props: Props) => {
  const mediaType = getMediaType(props.media);
  const heading = getHeading(props.media);

  return (
    <Link href={paths.media(mediaType, props.media.id)}>
      <div class="transition-scale scale-95 border-4 border-base-300 duration-300 ease-in-out hover:scale-100">
        {mediaType === "person" ? (
          <picture>
            <img
              alt={heading}
              class="h-full w-full max-w-full object-cover"
              src={getProfile(props.media, "w185")}
            />
          </picture>
        ) : mediaType === "movie" || mediaType === "tv" ? (
          <picture>
            <img
              alt={heading}
              class="h-full w-full max-w-full object-cover"
              src={getPoster(props.media, "w185")}
            />
          </picture>
        ) : null}
      </div>
      <h2>{heading}</h2>
      {props.media.media_type === "movie" || props.media.media_type === "tv" ? (
        <Stars rating={props.media.vote_average} />
      ) : null}
    </Link>
  );
});
