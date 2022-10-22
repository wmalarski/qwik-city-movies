import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { MovieMedia } from "~/services/types";
import { paths } from "~/utils/paths";

type Props = {
  media: MovieMedia;
};

export const MovieHero = component$((props: Props) => {
  return (
    <section>
      <Link href={paths.media("movie", props.media.id)}>
        <div>
          <div>
            <img
              // src={"https://image.tmdb.org/t/p/original" + props.item.backdrop_path}
              src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.media.backdrop_path}`}
              alt={props.media.title || props.media.original_title}
              style={{ height: "100%" }}
            />
          </div>
        </div>

        <div>
          <div>
            <h1>{props.media.title || props.media.original_title}</h1>
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
                <span>{props.media.release_date}</span>
              </div>
            </div>
            <div>{props.media.overview}</div>
          </div>
        </div>
      </Link>
    </section>
  );
});
