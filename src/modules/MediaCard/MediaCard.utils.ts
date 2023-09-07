import type { MediaType } from "~/services/types";
import { MediaBase } from "~/services/types3";

export const getMediaType = (media: MediaBase): MediaType => {
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

export const getHeading = (media: MediaBase): string | undefined => {
  if ("title" in media) {
    return media.title;
  }
  if ("name" in media) {
    return media.name;
  }
};
