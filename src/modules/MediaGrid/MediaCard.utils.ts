import { MediaBase } from "~/services/types";

export const getMediaType = (media: MediaBase): MediaBase["media_type"] => {
  if (media.media_type) {
    return media.media_type;
  }

  if ("title" in media) {
    return "movie";
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
