import { component$ } from "@builder.io/qwik";
import ImgFacebook from "~/media/facebook.svg?jsx";
import ImgImdb from "~/media/imdb.svg?jsx";
import ImgInstagram from "~/media/instagram.svg?jsx";
import ImgLink from "~/media/link.svg?jsx";
import ImgTwitter from "~/media/twitter.svg?jsx";
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
            <ImgTwitter
              alt="twitter"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110 w-5 h-5"
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
            <ImgFacebook
              alt="facebook"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110 w-5 h-5"
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
            <ImgInstagram
              alt="instagram"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110 w-5 h-5"
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
            <ImgImdb
              alt="imdb"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110 w-5 h-5"
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
            <ImgLink
              alt="homepage"
              class="scale-95 transition duration-300 ease-in-out hover:scale-110 w-5 h-5"
            />
          </a>
        </li>
      ) : null}
    </ul>
  );
});
