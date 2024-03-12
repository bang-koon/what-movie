import styles from "../main.module.scss";
import { MainProps } from "../types";
import Card from "./card";

const Main = async ({ movieList }: MainProps) => {
  return (
    <main className={styles.mainContainer}>
      <h2>241010 박스오피스 순위</h2>
      <div className={styles.cardContainer}>
        <Card movieDetail={movieList[0]} />
        <Card movieDetail={movieList[1]} />
        <Card movieDetail={movieList[2]} />
        <Card movieDetail={movieList[3]} />
        <Card movieDetail={movieList[4]} />
        <Card movieDetail={movieList[5]} />
        <Card movieDetail={movieList[6]} />
      </div>
    </main>
  );
};

export default Main;
