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
    const body = document.body;
    if (backgroundImage) {
      body.style.transition = "opacity 0.5s ease-in-out";
      body.style.opacity = "0.7";
      setTimeout(() => {
        body.style.backgroundImage = `url(${backgroundImage})`;
        body.style.opacity = "1";
      }, 200);
    } else {
      body.style.backgroundImage = "";
    }
  }, [backgroundImage]);

  return (
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
        <Card movieDetail={movieList[0]} hidden={true}></Card>
        <Card movieDetail={movieList[0]} hidden={true}></Card>
      </div>
    </main>
  );
};

export default Main;
