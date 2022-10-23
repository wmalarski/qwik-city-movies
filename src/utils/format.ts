import type { Media, MediaType } from "~/services/types";
import { categories } from "./constants/categories";
import { languages } from "./constants/languages";

type GetListItem = {
  type: MediaType;
  query: string;
};

export const getListItem = ({ type = "movie", query }: GetListItem) => {
  return categories[type].find((list) => list.query === query)?.title || query;
};

export const getMediaType = (media: Media): MediaType => {
  if (media.media_type) {
    return media.media_type;
  }

  if ("title" in media) {
    return "movie";
  }
  if ("profile_path" in media) {
    return "person";
  }
  return "tv";
};

export const getHeading = (media: Media): string | undefined => {
  if ("title" in media) {
    return media.title;
  }
  if ("name" in media) {
    return media.name;
  }
};

export const getImgSrc = (media: Media): string | null | undefined => {
  if ("poster_path" in media) {
    return media.poster_path;
  }
  if ("profile_path" in media) {
    return media.profile_path;
  }
};

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatCurrency(amount?: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  });

  return formatter.format(amount || 0);
}

export function formatRuntime(minutes: number) {
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  // mins
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? hours + "h" : ""} ${mins}min`;
}

export function formatLanguage(iso?: string) {
  const fullLang = languages.find((lang) => lang.iso_639_1 === iso);

  if (fullLang) {
    return fullLang.english_name;
  }

  return iso;
}
