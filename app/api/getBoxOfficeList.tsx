import { Actor, BoxOfficeList, MovieDetail } from "../types";
import crawlWatcha from "./watchaCrawler";
import crawlTomato from "./tomatoCrawler";

const getDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = (yesterday.getMonth() + 1).toString().padStart(2, "0");
  const day = yesterday.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
};
export const getBoxOfficeList = async () => {
  const URL = process.env.KOBIS_URL;
  const KEY = process.env.KOBIS_KEY as string;

  const params = { key: KEY, targetDt: getDate() };
  const queryParams = new URLSearchParams(params).toString();

  const res = await fetch(`${URL}?${queryParams}`);

  if (!res.ok) {
    throw new Error("get box office error");
  }

  const json = await res.json();
  return json.boxOfficeResult.dailyBoxOfficeList;
};

export const getMovieDetail = async (
  title: string,
  releaseDate: string
): Promise<MovieDetail> => {
  const URL = process.env.KMDB_URL;

  const params = {
    releaseDts: releaseDate.replaceAll("-", ""),
    title,
  };
  const queryParams = new URLSearchParams(params).toString();
  const res = await fetch(`${URL}&${queryParams}`);

  if (!res.ok) {
    throw new Error("getMovieDetail Error");
  }

  const detail = (await res.json()).Data[0].Result[0];

  // data
  const actors = detail.actors.actor.map((actor: Actor) => actor.actorNm);
  const poster = detail.posters.split("|")[0];
  const watchaRating = await crawlWatcha(title);
  const tomatoRating = await crawlTomato(detail.titleEng);

  return {
    title,
    titleEn: detail.titleEng,
    directors: detail.directors.director[0].directorNm,
    actors,
    watchaRating,
    tomatoRating,
    poster,
  };
};

export const createMovieList = async () => {
  const boxOfficeList: BoxOfficeList[] = await getBoxOfficeList();
  const detail = await Promise.all(
    boxOfficeList.map((movie: BoxOfficeList) =>
      getMovieDetail(movie.movieNm, movie.openDt)
    )
  );

  return detail;
};