import crawlWatcha from "./watchaCrawler";
import crawlTomato from "./tomatoCrawler";

export const getBoxOfficeList = async () => {
  const URL = process.env.KOBIS_URL;
  const KEY = process.env.KOBIS_KEY as string;

  const params = { key: KEY, targetDt: "20230829" };
  const queryParams = new URLSearchParams(params).toString();

  const res = await fetch(`${URL}?${queryParams}`);

  if (!res.ok) {
    throw new Error("get box office error");
  }

  const json = await res.json();
  return json.boxOfficeResult.dailyBoxOfficeList;
};

export const getMovieDetail = async (title: string, releaseDate: string) => {
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

  interface Actor {
    actorNm: string;
    actorEnNm: string;
    actorId: string;
  }

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

interface boxOfficeList {
  [key: string]: unknown;
  movieNm: string;
  openDt: string;
}

export const createMovieList = async () => {
  const boxOfficeList: boxOfficeList[] = await getBoxOfficeList();
  const detail = await Promise.all(
    boxOfficeList.map((movie: boxOfficeList) =>
      getMovieDetail(movie.movieNm, movie.openDt)
    )
  );

  return detail;
};
