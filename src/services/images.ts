import { Cast, Crew, Image, MediaBase, PersonDetails } from "./types";

const imageBase = "https://image.tmdb.org/t/p";

type BackdropSizes = "w300" | "w780" | "w1280" | "original";

export const getBackdrop = (media: MediaBase, size: BackdropSizes) => {
  if (!media.backdrop_path) {
    return;
  }
  return `${imageBase}/${size}${media.backdrop_path}`;
};

export const getBackdropSet = (media: MediaBase) => {
  if (!media.backdrop_path) {
    return;
  }
  const sizes = ["w300", "w780"] as const;
  return sizes
    .map((size) => `${getBackdrop(media, size)} ${size.slice(1)}w`)
    .join(", ");
};

type PosterSizes = "92" | "154" | "185" | "342" | "500" | "780";

export const getPoster = (media: MediaBase, size: PosterSizes) => {
  if (!media.poster_path) {
    return;
  }
  return `${imageBase}/w${size}${media.poster_path}`;
};

export const getPosterSet = (media: MediaBase, maxSize: PosterSizes) => {
  if (!media.poster_path) {
    return;
  }
  const sizes = ["92", "154", "185", "342", "500", "780"] as const;
  return sizes
    .filter((size) => +size <= +maxSize)
    .map((size) => `${getPoster(media, size)} ${size}w`)
    .join(", ");
};

export const getImage = (image: Image, size: PosterSizes) => {
  if (!image.file_path) {
    return;
  }
  return `${imageBase}/w${size}${image.file_path}`;
};

export const getImageSet = (image: Image, maxSize: PosterSizes) => {
  if (!image.file_path) {
    return;
  }
  const sizes = ["92", "154", "185", "342", "500", "780"] as const;
  return sizes
    .filter((size) => +size <= +maxSize)
    .map((size) => `${getImage(image, size as PosterSizes)} ${size}w`)
    .join(", ");
};

type ProfileSizes = "w45" | "w185" | "h632" | "original";

export const getProfile = (
  media: PersonDetails | Cast | Crew,
  size: ProfileSizes,
) => {
  if (!media.profile_path) {
    return;
  }
  return `${imageBase}/${size}${media.profile_path}`;
};

export const getProfileSet = (media: PersonDetails | Cast | Crew) => {
  if (!media.profile_path) {
    return;
  }
  const sizes = ["w45", "w185"] as const;
  return sizes
    .map((size) => `${getProfile(media, size)} ${size.slice(1)}w`)
    .join(", ");
};
