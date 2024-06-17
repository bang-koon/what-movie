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
              {movieDetail.watchaRating ? (
                <div>
                  <Image
                    src="watcha.svg"
                    alt="watcha pedia logo"
                    width={20}
                    height={20}
                  ></Image>
                  <p>: {movieDetail.watchaRating}</p>
                </div>
              ) : (
                <></>
              )}
              {movieDetail.tomatoRating ? (
                <div>
                  <Image
                    src="/fresh_tomato.svg"
                    alt="fresh tomato"
                    width={20}
                    height={20}
                  ></Image>
                  <p>: {movieDetail.tomatoRating}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </article>
      )}
    </>
  );
};
export default Card;
