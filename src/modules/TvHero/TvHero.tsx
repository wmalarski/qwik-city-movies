import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { TvMedia } from "~/services/types";
import { getHeading } from "~/utils/format";
import { paths } from "~/utils/paths";

type Props = {
  media: TvMedia;
};

export const TvHero = component$((props: Props) => {
  return (
    <section>
      <Link href={paths.media("tv", props.media.id)}>
        <div>
          <div>
            <img
              // src={"https://image.tmdb.org/t/p/original" + props.item.backdrop_path}
              src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.media.backdrop_path}`}
              alt={getHeading(props.media)}
              style={{ height: "100%" }}
            />
          </div>
        </div>

        <div>
          <div>
            <h1>{getHeading(props.media)}</h1>
            <div>
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

              <div>
                <span>{props.media.first_air_date}</span>
              </div>
            </div>
            <div>{props.media.overview}</div>
          </div>
        </div>
      </Link>
    </section>
  );
});
