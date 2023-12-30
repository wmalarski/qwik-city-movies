import {
  component$,
  type FunctionComponent,
  type SVGProps,
} from "@builder.io/qwik";
import ImgFacebook from "~/media/facebook.svg?jsx";
import ImgImdb from "~/media/imdb.svg?jsx";
import ImgInstagram from "~/media/instagram.svg?jsx";
import ImgLink from "~/media/link.svg?jsx";
import ImgTwitter from "~/media/twitter.svg?jsx";

type LinkImgProps = {
  href: string;
  label: string;
  tag: FunctionComponent<SVGProps<SVGSVGElement>>;
};

export const LinkImg = (props: LinkImgProps) => {
  const Tag = props.tag;
  return (
    <li>
      <a
        aria-label={props.label}
        href={props.href}
        rel="noopener"
        target="_blank"
      >
        <Tag class="scale-95 transition duration-300 ease-in-out hover:scale-110 w-5 h-5" />
      </a>
    </li>
  );
};

type Props = {
  links: Record<string, string | undefined>;
  isPerson?: boolean;
};

export const ExternalLinks = component$((props: Props) => {
  return (
    <ul class="flex flex-row gap-4 opacity-80">
      {props.links.twitter_id ? (
        <LinkImg
          tag={ImgTwitter}
          label="Twitter account"
          href={`https://twitter.com/${props.links.twitter_id}`}
        />
      ) : null}
      {props.links.facebook_id ? (
        <LinkImg
          label="Facebook account"
          href={`https://facebook.com/${props.links.facebook_id}`}
          tag={ImgFacebook}
        />
      ) : null}
      {props.links.instagram_id ? (
        <LinkImg
          label="Instagram account"
          href={`https://instagram.com/${props.links.instagram_id}`}
          tag={ImgInstagram}
        />
      ) : null}
      {props.links.imdb_id ? (
        <LinkImg
          label="IMDb account"
          href={`https://www.imdb.com/${props.isPerson ? "name" : "title"}/${
            props.links.imdb_id
          }`}
          tag={ImgImdb}
        />
      ) : null}
      {props.links.homepage ? (
        <LinkImg label="Homepage" href={props.links.homepage} tag={ImgLink} />
      ) : null}
    </ul>
  );
});
