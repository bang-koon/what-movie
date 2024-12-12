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
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [nextImage, setNextImage] = useState<string | null>(null);

  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        setNextImage(backgroundImage);
        setTimeout(() => {
          setCurrentImage(backgroundImage);
        }, 400);
      };
    }
  }, [backgroundImage]);

  return (
    <>
      <div
        className={styles.backgroundContainer}
        style={{
          backgroundImage: `url(${currentImage})`,
          opacity: nextImage === currentImage ? 1 : 0,
        }}
      ></div>
      <div
        className={styles.backgroundContainer}
        style={{
          backgroundImage: `url(${nextImage})`,
          opacity: nextImage === currentImage ? 0.6 : 1,
        }}
      ></div>
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
          <Card movieDetail={movieList[0]} empty={true}></Card>
          <Card movieDetail={movieList[0]} empty={true}></Card>
        </div>
      </main>
    </>
  );
};

export default Main;
