import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Media, MediaType } from "~/services/types";
import { getHeading, getImgSrc } from "~/utils/format";
import { paths } from "~/utils/paths";

type Props = {
  media: Media;
  mediaType: MediaType;
};

export const MediaCard = component$((props: Props) => {
  const heading = getHeading(props.media);
  const imgSrc = getImgSrc(props.media);

  return (
    <div>
      <Link href={paths.media(props.mediaType, props.media.id)}>
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
      </Link>
    </div>
  );
});
