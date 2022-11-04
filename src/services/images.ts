import type { PersonMedia, ProductionMedia } from "./types";

const imageBase = "https://image.tmdb.org/t/p";

type BackdropSizes = "w300" | "w780" | "w1280" | "original";

export const getBackdrop = (media: ProductionMedia, size: BackdropSizes) => {
  if ("backdrop_path" in media) {
    return `${imageBase}/${size}${media.backdrop_path}`;
  }
};

type LogoSizes = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";

export const getLogo = (logoPath: string, size: LogoSizes) => {
  return `${imageBase}/${size}${logoPath}`;
};

type PosterSizes =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export const getPoster = (media: ProductionMedia, size: PosterSizes) => {
  if ("poster_path" in media) {
    return `${imageBase}/${size}${media.poster_path}`;
  }
};

type ProfileSizes = "w45" | "w185" | "h632" | "original";

export const getProfile = (media: PersonMedia, size: ProfileSizes) => {
  if ("profile_path" in media) {
    return `${imageBase}/${size}${media.profile_path}`;
  }
};
