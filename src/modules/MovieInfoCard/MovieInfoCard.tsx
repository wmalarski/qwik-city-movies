import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ExternalLinks } from "~/modules/ExternalLinks/ExternalLinks";
import type { MovieMediaDetails, TvMediaDetails } from "~/services/types";
import {
  formatCurrency,
  formatDate,
  formatLanguage,
  formatRuntime,
} from "~/utils/format";
import { paths } from "~/utils/paths";

type Props = {
  media: MovieMediaDetails | TvMediaDetails;
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
    <section class="flex justify-center p-6">
      <div class="flex max-w-5xl flex-row items-center gap-8">
        <div class="hidden flex-grow md:flex">
          <div class="min-w-max">
            <img
              class="w-80"
              alt="name"
              src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${props.media.poster_path}`}
            />
          </div>
        </div>

        <div class="flex flex-col gap-6">
          {props.media.overview ? (
            <div>
              <h2 class="mb-4 text-3xl">Storyline</h2>
              <div class="opacity-80">{props.media.overview}</div>
            </div>
          ) : null}
          <div class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm opacity-80 lg:grid-cols-[max-content_1fr_max-content_1fr]">
            {props.media.media_type === "movie" && props.media.release_date ? (
              <>
                <div>Released</div>
                <div>{formatDate(props.media.release_date)}</div>
              </>
            ) : null}
            {props.media.runtime ? (
              <>
                <div>Runtime</div>
                <div>{formatRuntime(props.media.runtime)}</div>
              </>
            ) : null}
            {directors && directors.length > 0 ? (
              <>
                <div>Director</div>
                <div>
                  {directors.map((person, i) => (
                    <>
                      <Link href={paths.person(person.id)}>{person.name}</Link>
                      {i < directors.length - 1 ? ", " : ""}
                    </>
                  ))}
                </div>
              </>
            ) : null}
            {props.media.budget ? (
              <>
                <div>Budget</div>
                <div>{formatCurrency(props.media.budget)}</div>
              </>
            ) : null}
            {props.media.revenue ? (
              <>
                <div>Revenue</div>
                <div>{formatCurrency(props.media.revenue)}</div>
              </>
            ) : null}
            {props.media.genres ? (
              <>
                <div>Genre</div>
                <div>
                  {props.media.genres.map((genre, i, arr) => (
                    <>
                      <Link
                        href={paths.genre(props.media.media_type, genre.id)}
                      >
                        {genre.name}
                      </Link>
                      {i < arr.length - 1 ? ", " : ""}
                    </>
                  ))}
                </div>
              </>
            ) : null}
            {props.media.status ? (
              <>
                <div>Status</div>
                <div>{props.media.status}</div>
              </>
            ) : null}
            {props.media.original_language ? (
              <>
                <div>Language</div>
                <div>{formatLanguage(props.media.original_language)}</div>
              </>
            ) : null}
            {props.media.production_companies ? (
              <>
                <div>Production</div>
                <div>
                  {props.media.production_companies
                    .map((c) => c.name)
                    .join(", ")}
                </div>
              </>
            ) : null}
          </div>
          <div>
            {<ExternalLinks links={links} media={props.media.media_type} />}
          </div>
        </div>
      </div>
    </section>
  );
});
