import styles from "../main.module.scss";
import { MainProps } from "../types";
import Card from "./card";

const Main = async ({ movieList }: MainProps) => {
  console.log(movieList);
  return (
    <main className={styles.mainContainer}>
      <section className={styles.cardContainer}>
        <Card movieDetail={movieList[0]} />
        <Card movieDetail={movieList[1]} />
        <Card movieDetail={movieList[2]} />
        <Card movieDetail={movieList[3]} />
        <Card movieDetail={movieList[4]} />
        <Card movieDetail={movieList[5]} />
        <Card movieDetail={movieList[6]} />
      </section>
    </main>
  );
};

export default Main;
