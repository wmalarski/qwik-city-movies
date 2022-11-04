import type { MediaType, ProductionMedia } from "~/services/types";

export const getMediaType = (media: ProductionMedia): MediaType => {
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

export const getHeading = (media: ProductionMedia): string | undefined => {
  if ("title" in media) {
    return media.title;
  }
  if ("name" in media) {
    return media.name;
  }
};
