import "server-only";
import Main from "./_components/main";
import { createMovieList } from "./_api/getBoxOfficeList";

export default async function Home() {
  const movieList = await createMovieList();
  // console.log(movieList);
  return <Main movieList={movieList} />;
}
