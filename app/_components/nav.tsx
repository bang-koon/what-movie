import styles from "../main.module.scss";
import Image from "next/image";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.nav}>
      <Image src="/logo.png" alt="logo" width={46} height={46} />
    </div>
  </header>
);

export default Header;
