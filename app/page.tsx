import "server-only";
import Card from "./_components/card";

import {
  getBoxOfficeList,
  getMovieDetail,
  createMovieList,
} from "./_api/getBoxOfficeList";
import crawlWatcha, { getWatchaUrl } from "./_api/watchaCrawler";
import tomatoCrawler from "./_api/tomatoCrawler";

export default async function Home() {
  const movieList = await createMovieList();
  console.log(movieList);
  return (
    <>
      <Card />
    </>
  );
}
