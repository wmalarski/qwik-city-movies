import { component$ } from "@builder.io/qwik";
import type { PersonMediaDetails } from "~/services/types";
import { formatDate } from "~/utils/format";
import { ExternalLinks } from "../ExternalLinks/ExternalLinks";

export const calculateAge = (birthday: string, deathday?: string) => {
  const cutoffDate = deathday ? Number(new Date(deathday)) : Date.now();
  const ageDifMs = cutoffDate - Number(new Date(birthday));
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

type Props = {
  person: PersonMediaDetails;
};

export const PersonHero = component$((props: Props) => {
  const links = {
    ...props.person.external_ids,
    homepage: props.person.homepage,
  };

  return (
    <section>
      <div>
        <div>
          {props.person.profile_path ? (
            <img
              src={
                "https://image.tmdb.org/t/p/w370_and_h556_bestv2" +
                props.person.profile_path
              }
              alt={props.person.name}
            />
          ) : null}
        </div>
      </div>

      <div>
        <div>
          <h2>{props.person.name}</h2>

          {props.person.biography ? (
            <>
              {props.person.profile_path ? (
                <img
                  src={
                    "https://image.tmdb.org/t/p/w370_and_h556_bestv2" +
                    props.person.profile_path
                  }
                  alt={props.person.name}
                />
              ) : null}
              <div>
                {props.person.biography
                  .split("\n")
                  .filter((section) => section !== "")
                  .map((section) => (
                    <p>${section}</p>
                  ))}
              </div>
            </>
          ) : null}
        </div>

        <div>
          <ul>
            {props.person.known_for_department ? (
              <li>
                <div>Known For</div>
                <div>{props.person.known_for_department}</div>
              </li>
            ) : null}
            {props.person.birthday ? (
              <li>
                <div>Born</div>
                <div>
                  {formatDate(props.person.birthday)}{" "}
                  {!props.person.deathday ? (
                    <span>(age {calculateAge(props.person.birthday)})</span>
                  ) : null}
                </div>
              </li>
            ) : null}

            {props.person.place_of_birth ? (
              <li>
                <div>Place of Birth</div>
                <div>{props.person.place_of_birth}</div>
              </li>
            ) : null}

            {props.person.deathday ? (
              <li>
                <div>Died</div>
                <div>
                  {formatDate(props.person.deathday)}{" "}
                  {props.person.birthday ? (
                    <span>
                      age{" "}
                      {calculateAge(
                        props.person.birthday,
                        props.person.deathday
                      )}
                    </span>
                  ) : null}
                </div>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <ExternalLinks media="person" links={links} />
        </div>
      </div>
    </section>
  );
});
