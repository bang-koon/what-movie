import styles from "../main.module.scss";
import MyCalendar from "./calendar";

const Header = () => (
  <header className={styles.nav}>
    <h1>영화 뭐보지?</h1>
    <MyCalendar />
  </header>
);

export default Header;
