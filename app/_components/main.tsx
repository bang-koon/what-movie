import styles from "../main.module.scss";
import { MainProps } from "../types";
import Card from "./card";

const Main = async ({ movieList }: MainProps) => {
  return (
    <main className={styles.mainContainer}>
      <h2>어제 박스오피스 순위</h2>
      <div className={styles.cardContainer}>
        {movieList.map((v, i) => (
          <Card movieDetail={movieList[i]} key={i} rank={i + 1}></Card>
        ))}
        <Card movieDetail={movieList[0]} hidden={true}></Card>
        <Card movieDetail={movieList[0]} hidden={true}></Card>
      </div>
    </main>
  );
};

export default Main;
