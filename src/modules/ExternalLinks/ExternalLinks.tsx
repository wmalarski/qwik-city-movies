import { component$ } from "@builder.io/qwik";
import type { MediaType } from "~/services/types";

type Props = {
  media?: MediaType;
  links: Record<string, string | undefined>;
};

export const ExternalLinks = component$((props: Props) => {
  return (
    <ul class="flex flex-row gap-4">
      {props.links.twitter_id ? (
        <li>
          <a
            href={`https://twitter.com/${props.links.twitter_id}`}
            target="_blank"
            aria-label="Twitter account"
            rel="noopener"
          >
            {/* TODO: Icons */}
            {/* <TwitterIcon width={24} height={24} /> */}
            Twitter
          </a>
        </li>
      ) : null}
      {props.links.facebook_id ? (
        <li>
          <a
            href={`https://facebook.com/${props.links.facebook_id}`}
            target="_blank"
            aria-label="Facebook account"
            rel="noopener"
          >
            {/* <FacebookIcon width={24} height={24} /> */}
            Facebook
          </a>
        </li>
      ) : null}
      {props.links.instagram_id ? (
        <li>
          <a
            href={`https://instagram.com/${props.links.instagram_id}`}
            target="_blank"
            aria-label="Instagram account"
            rel="noopener"
          >
            {/* <InstagramIcon width={24} height={24} /> */}
            Instagram
          </a>
        </li>
      ) : null}
      {props.links.imdb_id ? (
        <li>
          <a
            href={`https://www.imdb.com/${
              props.media === "person" ? "name" : "title"
            }/${props.links.imdb_id}`}
            target="_blank"
            aria-label="IMDb account"
            rel="noopener"
          >
            {/* <IMDBIcon width={24} height={24} /> */}
            IMDB
          </a>
        </li>
      ) : null}
      {props.links.homepage ? (
        <li>
          <a
            href={props.links.homepage}
            target="_blank"
            aria-label="Homepage"
            rel="noopener"
          >
            {/* <LinkIcon width={24} height={24} /> */}
            Homepage
          </a>
        </li>
      ) : null}
    </ul>
  );
});
