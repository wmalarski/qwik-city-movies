import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Media } from "~/services/types";
import { getBackdropSrc, getHeading } from "~/utils/format";
import { paths } from "~/utils/paths";

type Props = {
  media: Media;
};

export const Hero = component$((props: Props) => {
  return (
    <section>
      <Link href={paths.media(props.media.media_type, props.media.id)}>
        <div>
          <div>
            <img
              // src={"https://image.tmdb.org/t/p/original" + props.item.backdrop_path}
              src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${getBackdropSrc(
                props.media
              )}`}
              alt={getHeading(props.media)}
              style={{ height: "100%" }}
            />
          </div>
        </div>

        <div>
          <div>
            <h1>{getHeading(props.media)}</h1>
            <div>
              {props.media.media_type !== "person" ? (
                <div>
                  <div>
                    <div
                      style={{
                        width: `${(props.media.vote_average || 0) * 100}%`,
                      }}
                    />
                  </div>
                  <div>{props.media.vote_count} Reviews</div>
                </div>
              ) : null}

              <div>
                {props.media.media_type === "tv" ? (
                  <span>{props.media.first_air_date}</span>
                ) : null}
                {props.media.media_type === "movie" ? (
                  <span>{props.media.release_date}</span>
                ) : null}
              </div>
            </div>
            <div>
              {props.media.media_type !== "person"
                ? props.media.overview
                : null}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
});

export default Hero;
