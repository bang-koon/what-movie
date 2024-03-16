import styles from "../main.module.scss";
import Calendar from "./calendar";

const Header = () => (
  <header className={styles.nav}>
    <h1>영화 뭐보지?</h1>
    <Calendar />
  </header>
);

export default Header;
