"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../_style/card.module.scss";
import { MovieDetail } from "../types";
import Rating from "./rating";

interface CardContentsProps {
  movieDetail: MovieDetail;
}

const CardContents = ({ movieDetail }: CardContentsProps) => {
  const [isTitleOverflow, setIsTitleOverflow] = useState(false);
  const [isDirectorOverflow, setIsDirectorOverflow] = useState(false);
  const [isActorsOverflow, setIsActorsOverflow] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const directorRef = useRef<HTMLParagraphElement>(null);
  const actorsRef = useRef<HTMLParagraphElement>(null);

  const isTextOverflowing = (element: HTMLElement | null) => {
    return element ? element.scrollWidth > element.clientWidth : false;
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current)
        setIsTitleOverflow(isTextOverflowing(titleRef.current));
      if (directorRef.current)
        setIsDirectorOverflow(isTextOverflowing(directorRef.current));
      if (actorsRef.current)
        setIsActorsOverflow(isTextOverflowing(actorsRef.current));
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [movieDetail]);

  const allActors = movieDetail.actors.join(", ");
  return (
    <div className={styles.contents}>
      <div className={styles["title-director"]}>
        <span
          className={`${styles.tooltip} ${
            isTitleOverflow ? styles.overflow : ""
          }`}
          data-title={movieDetail.title}
        >
          <h3 ref={titleRef}>{movieDetail.title}</h3>
        </span>
        <span
          className={`${styles.tooltip} ${
            isDirectorOverflow ? styles.overflow : ""
          }`}
          data-title={movieDetail.directors}
        >
          <p ref={directorRef}>{movieDetail.directors}</p>
        </span>
      </div>
      <span
        className={`${styles.tooltip} ${
          isActorsOverflow ? styles.overflow : ""
        }`}
        data-title={allActors}
      >
        <p className={styles.actor} ref={actorsRef}>
          {allActors}
        </p>
      </span>
      <div className={styles.rating}>
        {movieDetail.watchaRating && (
          <Rating type="watcha" rating={movieDetail.watchaRating} />
        )}
        {movieDetail.tomatoRating && (
          <Rating type="tomato" rating={movieDetail.tomatoRating} />
        )}
      </div>
    </div>
  );
};

export default CardContents;
