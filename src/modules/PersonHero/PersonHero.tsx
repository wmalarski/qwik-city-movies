import { component$ } from "@builder.io/qwik";
import { getProfile, getProfileSet } from "~/services/images";
import { PersonDetails } from "~/services/types";
import { formatDate } from "~/utils/format";
import { ExternalLinks } from "../ExternalLinks/ExternalLinks";

export const calculateAge = (birthday: string, deathday?: string) => {
  const cutoffDate = deathday ? Number(new Date(deathday)) : Date.now();
  const ageDifMs = cutoffDate - Number(new Date(birthday));
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

type Props = {
  person: PersonDetails;
};

export const PersonHero = component$((props: Props) => {
  return (
    <section class="flex justify-center p-6">
      <div class="flex max-w-5xl flex-row items-center gap-8">
        <div class="hidden flex-grow md:flex">
          {props.person.profile_path ? (
            <div class="min-w-max">
              <picture>
                {/* eslint-disable-next-line qwik/jsx-img */}
                <img
                  width="185"
                  height="278"
                  alt={props.person.name}
                  class="w-80 text-black"
                  src={getProfile(props.person, "w45")}
                  srcset={getProfileSet(props.person)}
                />
              </picture>
            </div>
          ) : null}
        </div>
        <div class="flex flex-col gap-6">
          <div>
            <h2 class="mb-4 text-3xl">{props.person.name}</h2>
            {props.person.biography ? (
              <div class="opacity-80">
                {props.person.biography
                  .split("\n")
                  .filter((section) => section !== "")
                  .map((section) => (
                    <p key={section} class="mt-4">
                      {section}
                    </p>
                  ))}
              </div>
            ) : null}
          </div>
          <div class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm opacity-80 lg:grid-cols-[max-content_1fr_max-content_1fr]">
            {props.person.known_for_department ? (
              <>
                <div>Known For</div>
                <div>{props.person.known_for_department}</div>
              </>
            ) : null}
            {props.person.birthday ? (
              <>
                <div>Born</div>
                <div>
                  {formatDate(props.person.birthday)}{" "}
                  {!props.person.deathday ? (
                    <span>(age {calculateAge(props.person.birthday)})</span>
                  ) : null}
                </div>
              </>
            ) : null}

            {props.person.place_of_birth ? (
              <>
                <div>Place of Birth</div>
                <div>{props.person.place_of_birth}</div>
              </>
            ) : null}

            {props.person.deathday ? (
              <>
                <div>Died</div>
                <div>
                  {formatDate(props.person.deathday)}{" "}
                  {props.person.birthday ? (
                    <span>
                      age{" "}
                      {calculateAge(
                        props.person.birthday,
                        props.person.deathday,
                      )}
                    </span>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          <div>
            <ExternalLinks
              isPerson
              links={{
                ...props.person.external_ids,
                homepage: props.person.homepage,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
