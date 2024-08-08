import "server-only";
import Main from "./_components/main";
import { createMovieList } from "./api/getBoxOfficeList";

export const revalidate = 3600;

export default async function Home() {
  const movieList = await createMovieList();
  return <Main movieList={movieList} />;
}
