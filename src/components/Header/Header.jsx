import styles from "./Header.module.css";
import SelectUser from "./../SelectUser/SelectUser";

const Header = () => {
  return (
    <>
      <div className={styles["logo"]}>Journal list</div>
      <SelectUser />
    </>
  );
};

export default Header;
