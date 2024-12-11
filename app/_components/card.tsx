"use client";

import Image from "next/image";
import styles from "../_style/card.module.scss";
import { CardProps } from "../types";
import CardContents from "./cardContents";

const Card = ({
  movieDetail,
  hidden,
  rank,
  setBackgroundImage,
  hoveredCard,
  setHoveredCard,
}: CardProps) => {
  const handleMouseEnter = () => {
    if (movieDetail.still && setBackgroundImage) {
      setBackgroundImage(movieDetail.still);
    }
    if (setHoveredCard) {
      setHoveredCard(rank);
    }
  };

  const handleMouseLeave = () => {
    if (setHoveredCard) {
      setHoveredCard(null);
    }
  };

  return (
    <>
      {hidden ? (
        <article className={`${styles.cardWrap} ${styles.hidden}`}></article>
      ) : (
        <article
          className={`${styles.cardWrap} ${
            hoveredCard !== null && hoveredCard !== rank ? styles.invisible : ""
          }`}
        >
          {!movieDetail.isReleased && (
            <aside
              className={styles.dDayTag}
            >{`D-${movieDetail.daysToRelease}`}</aside>
          )}
          <div
            className={styles.posterWrap}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
            <div className={styles.overlay}>
              <p className={styles.hiddenScroll}>{movieDetail.plot}</p>
            </div>
          </div>
          <CardContents movieDetail={movieDetail} />
        </article>
      )}
    </>
  );
};

export default Card;
