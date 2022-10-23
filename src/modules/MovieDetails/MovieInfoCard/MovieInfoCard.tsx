import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ExternalLinks } from "~/modules/ExternalLinks/ExternalLinks";
import type { MediaDetails } from "~/services/types";
import {
  formatCurrency,
  formatDate,
  formatLanguage,
  formatRuntime,
} from "~/utils/format";
import { paths } from "~/utils/paths";

type Props = {
  media: MediaDetails;
};

export const MovieInfoCard = component$((props: Props) => {
  const directors = props.media.credits?.crew?.filter(
    (person) => person.job === "Director"
  );

  const links = {
    ...props.media.external_ids,
    homepage: props.media.homepage,
  };

  return (
    <section>
      <div>
        <div>
          <img
            width={370}
            height={556}
            alt="name"
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${props.media.poster_path}`}
          />
        </div>
      </div>

      <div>
        {props.media.overview ? (
          <div>
            <h2>Storyline</h2>

            <div>{props.media.overview}</div>
          </div>
        ) : null}
        <div>
          <ul class="nolist">
            {props.media.release_date ? (
              <li>
                <div>Released</div>

                <div>{formatDate(props.media.release_date)}</div>
              </li>
            ) : null}
            {props.media.runtime ? (
              <li>
                <div>Runtime</div>

                <div>{formatRuntime(props.media.runtime)}</div>
              </li>
            ) : null}
            {directors ? (
              <li>
                <div>Director</div>
                <div>
                  {directors.map((person, i) => (
                    <>
                      <Link href={paths.person(person.id)}>{person.name}</Link>
                      {i < directors.length - 1 ? ", " : ""}
                    </>
                  ))}
                </div>
              </li>
            ) : null}
            {props.media.budget ? (
              <li>
                <div>Budget</div>
                <div>{formatCurrency(props.media.budget)}</div>
              </li>
            ) : null}
            {props.media.revenue ? (
              <li>
                <div>Revenue</div>
                <div>{formatCurrency(props.media.revenue)}</div>
              </li>
            ) : null}
            {props.media.genres ? (
              <li>
                <div>Genre</div>
                <div>
                  {props.media.genres.map((genre, i, arr) => (
                    <>
                      <Link href={`/genre/${genre.id}`}>{genre.name}</Link>
                      {i < arr.length - 1 ? ", " : ""}
                    </>
                  ))}
                </div>
              </li>
            ) : null}
            {props.media.status ? (
              <li>
                <div>Status</div>

                <div>{props.media.status}</div>
              </li>
            ) : null}
            {props.media.original_language ? (
              <li>
                <div>Language</div>

                <div>{formatLanguage(props.media.original_language)}</div>
              </li>
            ) : null}
            {props.media.production_companies ? (
              <li>
                <div>Production</div>
                <div>
                  {props.media.production_companies
                    .map((c) => c.name)
                    .join(", ")}
                </div>
              </li>
            ) : null}
          </ul>
        </div>
        <div>
          {<ExternalLinks links={links} media={props.media.media_type} />}
        </div>
      </div>
    </section>
  );
});
