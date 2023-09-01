import Image from "next/image";
import { useState } from "react";

import {
  getBoxOfficeList,
  getMovieDetail,
  createMovieList,
} from "./_api/getBoxOfficeList";
import crawlWatcha, { getWatchaUrl } from "./_api/watchaCrawler";
import tomatoCrawler from "./_api/tomatoCrawler";

export default async function Home() {
  // tomatoCrawler("Mission: Impossible - Dead Reckoning - PART ONE");
  // const boxOffice = await getBoxOfficeList();
  // const movieDetail = await getMovieDetail("엘리멘탈", "20230614");
  const movieList = createMovieList().then(r => console.log(r));
  // console.dir(boxOffice);
  // console.dir(movieDetail);
  // const aa = await crawlWatcha("미션 임파서블: 데드 레코닝 PART ONE");
  // console.log(await crawlWatcha("미션 임파서블: 데드 레코닝 PART ONE"));
  // const gigi = await getWatchaRating();
  // await getWatchaUrl("명탐정코난: 흑철의 어영");
  return <></>;
}
