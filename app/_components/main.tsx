"use client";

import styles from "../main.module.scss";
import { useState, useEffect } from "react";
import { MainProps } from "../types";
import Card from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useIsMobile } from "../hook/useIsMobile";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

const Main = ({ movieList }: MainProps) => {
  const isMobile = useIsMobile();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null | undefined>(
    null
  );
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [nextImage, setNextImage] = useState<string | null>(null);

  useEffect(() => {
    setBackgroundImage(movieList[0].still);
  }, []);

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
        {isMobile ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            mousewheel={true}
            modules={[Pagination, Navigation, Mousewheel]}
            className={styles.cardContainer}
            onSlideChange={(swiper: SwiperType) => {
              const realIndex = swiper.realIndex;
              const currentStill = movieList[realIndex].still;
              setBackgroundImage(currentStill);
            }}
          >
            {movieList.map((v, i) => (
              <SwiperSlide key={i}>
                <Card
                  movieDetail={movieList[i]}
                  setBackgroundImage={setBackgroundImage}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  rank={i + 1}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
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
        )}
      </main>
    </>
  );
};

export default Main;
