"use client";

import Image from "next/image";
import styles from "../main.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
    </div>
  );
};

export default Loading;
