import Image from "next/image";
import styles from "../_style/card.module.scss";
import { CardProps } from "../types";

const Card = ({ movieDetail, hidden, rank }: CardProps) => {
  return (
    <>
      {hidden ? (
        <article className={`${styles.cardWrap} ${styles.hidden}`}></article>
      ) : (
        <article className={styles.cardWrap}>
          <div className={styles.posterWrap}>
            <Image
              src={movieDetail.poster}
              alt={movieDetail.title}
              fill
              objectFit="cover"
              quality={100}
            />
            <span className={styles.cardRankBox}>
              {" "}
              <p className={styles.cardRank}> {rank ? rank : ""} </p>
            </span>
          </div>
          <div className={styles.contents}>
            <div className={styles["title-director"]}>
              <h3>{movieDetail.title}</h3>
              <p>{movieDetail.directors}</p>
            </div>
            <p>
              {movieDetail.actors[0]}, {movieDetail.actors[1]}
            </p>
            <div className={styles.rating}>
              <p>왓챠: {movieDetail.watchaRating}</p>
              <p>도마: {movieDetail.tomatoRating}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
};
export default Card;
