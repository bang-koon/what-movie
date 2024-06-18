import Image from "next/image";
import { RatingProps } from "../types";

const Rating = ({ type, rating }: RatingProps) => {
  const info = {
    watcha: {
      svg: "watcha.svg",
      alt: "watcha pedia logo",
    },
    fresh: {
      svg: "fresh_tomato.svg",
      alt: "fresh tomato",
    },
    rotten: {
      svg: "rotten_tomato.svg",
      alt: "rotten tomato",
    },
  };

  const isWatcha = type === "watcha";
  const tomatoType = Number(rating.slice(0, 2)) >= 60 ? "fresh" : "rotten";

  const { svg, alt } = isWatcha ? info.watcha : info[tomatoType];

  return (
    <div>
      <Image src={svg} alt={alt} width={20} height={20} />
      <p>: {rating}</p>
    </div>
  );
};

export default Rating;
