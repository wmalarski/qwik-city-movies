import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Stars } from "~/components/Stars/Stars";
import type { Media } from "~/services/types";
import { getHeading, getImgSrc, getMediaType } from "~/utils/format";
import { paths } from "~/utils/paths";

type Props = {
  media: Media;
};

export const MediaCard = component$((props: Props) => {
  const mediaType = getMediaType(props.media);
  const heading = getHeading(props.media);
  const imgSrc = getImgSrc(props.media);

  return (
    <Link href={paths.media(mediaType, props.media.id)}>
      <div class="transition-scale scale-95 border-4 border-base-300 duration-300 ease-in-out hover:scale-100">
        <img
          // src={"https://image.tmdb.org/t/p/" + props.item.poster_path}
          // TODO: check for null or undefined
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${imgSrc}`}
          width={370}
          height={556}
          alt={heading}
        />
      </div>
      <h2>{heading}</h2>
      {props.media.media_type === "movie" || props.media.media_type === "tv" ? (
        <Stars rating={props.media.vote_average} />
      ) : null}
    </Link>
  );
});
