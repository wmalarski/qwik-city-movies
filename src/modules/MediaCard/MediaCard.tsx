import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
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
      {/* TODO: Add hover effect */}
      <div>
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
      {/* TODO: Add rating stars */}
    </Link>
  );
});
