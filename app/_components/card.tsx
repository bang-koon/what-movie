import Image from "next/image";
import styles from "../_style/card.module.scss";
import { CardProps } from "../types";

const Card = ({ movieDetail }: CardProps) => {
  return (
    <article className={styles.cardWrap}>
      <div className={styles.posterWrap}>
        <Image
          src={movieDetail.poster}
          alt={movieDetail.title}
          fill
          objectFit="cover"
          quality={100}
        />
        <span className={styles.cardNumber}> 1 </span>
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
  );
};
export default Card;
