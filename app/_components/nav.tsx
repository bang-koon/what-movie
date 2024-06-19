import styles from "../main.module.scss";
import Calendar from "./calendar";
import Image from "next/image";

const Header = () => (
  <header className={styles.nav}>
    <h1>what movie</h1>
    {/* <Calendar /> */}
  </header>
);

export default Header;
