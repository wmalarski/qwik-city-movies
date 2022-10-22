import type { Media, MediaType } from "~/services/types";

const lists = {
  movie: [
    { query: "trending", title: "Trending Movies" },
    { query: "popular", title: "Popular Movies" },
    { query: "top_rated", title: "Top Rated Movies" },
    { query: "upcoming", title: "Upcoming Movies" },
    { query: "now_playing", title: "Now Playing Movies" },
  ],
  person: [],
  tv: [
    { query: "trending", title: "Trending TV Shows" },
    { query: "popular", title: "Popular TV Shows" },
    { query: "top_rated", title: "Top Rated TV Shows" },
    { query: "on_the_air", title: "Currently Airing TV Shows" },
    { query: "airing_today", title: "TV Shows Airing Today" },
  ],
};

type GetListItem = {
  type: MediaType;
  query: string;
};

export const getListItem = ({ type, query }: GetListItem) => {
  return lists[type].find((list) => list.query === query)?.title || query;
};

export const getHeading = (media: Media): string | undefined => {
  switch (media.media_type) {
    case "movie":
      return media.title || media.original_title;
    case "tv":
      return media.name || media.original_name;
    case "person":
      return media.name;
  }
};

export const getImgSrc = (media: Media): string | null | undefined => {
  switch (media.media_type) {
    case "movie":
    case "tv":
      return media.poster_path;
    case "person":
      return media.profile_path;
  }
};

export const getBackdropSrc = (media: Media): string | null | undefined => {
  switch (media.media_type) {
    case "movie":
    case "tv":
      return media.backdrop_path;
    case "person":
      return media.profile_path;
  }
};
