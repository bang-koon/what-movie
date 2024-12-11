"use client";

import styles from "../main.module.scss";
import { useState, useEffect } from "react";
import { MainProps } from "../types";
import Card from "./card";

const Main = ({ movieList }: MainProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null | undefined>(
    null
  );

  useEffect(() => {
    const container = document.querySelector(
      `.${styles.backgroundContainer}`
    ) as HTMLElement;
    if (backgroundImage) {
      container.style.opacity = "0.7";
      setTimeout(() => {
        container.style.backgroundImage = `url(${backgroundImage})`;
        container.style.opacity = "1";
      }, 200);
    }
  }, [backgroundImage]);

  return (
    <>
      <div className={styles.backgroundContainer}></div>
      <main className={styles.mainContainer}>
        <div className={styles.cardContainer}>
          {movieList.map((v, i) => (
            <Card
              movieDetail={movieList[i]}
              setBackgroundImage={setBackgroundImage}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              key={i}
              rank={i + 1}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;
