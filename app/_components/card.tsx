import Image from "next/image";
import styles from "../_style/card.module.scss";
import { CardProps } from "../types";
import CardContents from "./cardContents";

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
              <p className={styles.cardRank}>{rank ? rank : ""}</p>
            </span>
          </div>
          <CardContents movieDetail={movieDetail} />
        </article>
      )}
    </>
  );
};

export default Card;
