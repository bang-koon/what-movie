export interface StringIndex {
  [key: string]: string;
}

export interface Actor {
  actorNm: string;
  actorEnNm: string;
  actorId: string;
}

export interface BoxOfficeList {
  [key: string]: unknown;
  movieNm: string;
  openDt: string;
}

export interface MovieDetail {
  title: string;
  titleEn: string;
  directors: string;
  actors: string[];
  watchaRating: string;
  still: string;
  tomatoRating: string;
  poster: string;
  isReleased: boolean;
  daysToRelease?: number;
  plot: string;
}

export interface MainProps {
  movieList: MovieDetail[];
}

export interface CardProps {
  movieDetail: MovieDetail;
  empty?: boolean;
  rank?: number;
  setBackgroundImage?: (image: string) => void;
  hoveredCard?: number | null | undefined;
  setHoveredCard?: (rank: number | null | undefined) => void;
}

export interface RatingProps {
  type: "watcha" | "tomato";
  rating: string;
}
