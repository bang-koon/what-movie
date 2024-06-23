import React from "react";
import styles from "../_style/card.module.scss";

interface OverflowTooltipProps {
  text: string;
  isOverflow: boolean;
  children: React.ReactNode;
}

const OverflowTooltip = ({
  text,
  isOverflow,
  children,
}: OverflowTooltipProps) => (
  <span
    className={`${styles.tooltip} ${isOverflow ? styles.overflow : ""}`}
    data-title={text}
  >
    {children}
  </span>
);

export default OverflowTooltip;
