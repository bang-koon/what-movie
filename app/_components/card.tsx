"use client";

import Image from "next/image";
import styles from "../_style/card.module.scss";
import { CardProps } from "../types";
import CardContents from "./cardContents";
import { useIsMobile } from "../hook/useIsMobile";
import { useState } from "react";

const Card = ({
  movieDetail,
  rank,
  setBackgroundImage,
  hoveredCard,
  setHoveredCard,
  empty,
}: CardProps) => {
  const isMobile = useIsMobile();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleMouseEnter = () => {
    if (isMobile) return;

    if (movieDetail.still && setBackgroundImage) {
      setBackgroundImage(movieDetail.still);
    }
    if (setHoveredCard) {
      setHoveredCard(rank);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    if (setHoveredCard) {
      setHoveredCard(null);
    }
  };

  const isHidden = !isMobile && hoveredCard !== null && hoveredCard !== rank;
  const isHovered = !isMobile && hoveredCard === rank;

  return (
    <article
      className={`${styles.cardWrap} ${isHidden ? styles.hidden : ""}`}
      style={{
        transform: isHovered ? "scale(1.2)" : "scale(1)",
        visibility: empty ? "hidden" : "visible",
      }}
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
        {!isImageLoaded && <div className={styles.skeleton} />}
        <Image
          src={movieDetail.poster}
          alt={movieDetail.title}
          fill
          objectFit="cover"
          quality={100}
          onLoadingComplete={() => setIsImageLoaded(true)}
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
  );
};

export default Card;
