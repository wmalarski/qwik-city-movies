import { component$ } from "@builder.io/qwik";
import type { MediaType } from "~/services/types";

type Props = {
  links: Record<string, string | undefined>;
  media?: MediaType;
};

export const ExternalLinks = component$((props: Props) => {
  return (
    <ul class="flex flex-row gap-4 opacity-80">
      {props.links.twitter_id ? (
        <li>
          <a
            aria-label="Twitter account"
            href={`https://twitter.com/${props.links.twitter_id}`}
            rel="noopener"
            target="_blank"
          >
            <img
              alt="twitter"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110"
              height={20}
              src="/images/twitter.svg"
              width={20}
            />
          </a>
        </li>
      ) : null}
      {props.links.facebook_id ? (
        <li>
          <a
            aria-label="Facebook account"
            href={`https://facebook.com/${props.links.facebook_id}`}
            rel="noopener"
            target="_blank"
          >
            <img
              alt="facebook"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110"
              height={20}
              src="/images/facebook.svg"
              width={20}
            />
          </a>
        </li>
      ) : null}
      {props.links.instagram_id ? (
        <li>
          <a
            aria-label="Instagram account"
            href={`https://instagram.com/${props.links.instagram_id}`}
            rel="noopener"
            target="_blank"
          >
            <img
              alt="instagram"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110"
              height={20}
              src="/images/instagram.svg"
              width={20}
            />
          </a>
        </li>
      ) : null}
      {props.links.imdb_id ? (
        <li>
          <a
            aria-label="IMDb account"
            href={`https://www.imdb.com/${
              props.media === "person" ? "name" : "title"
            }/${props.links.imdb_id}`}
            rel="noopener"
            target="_blank"
          >
            <img
              alt="imdb"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110"
              height={20}
              src="/images/imdb.svg"
              width={20}
            />
          </a>
        </li>
      ) : null}
      {props.links.homepage ? (
        <li>
          <a
            aria-label="Homepage"
            href={props.links.homepage}
            rel="noopener"
            target="_blank"
          >
            <img
              alt="homepage"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110"
              height={20}
              src="/images/link.svg"
              width={20}
            />
          </a>
        </li>
      ) : null}
    </ul>
  );
});
