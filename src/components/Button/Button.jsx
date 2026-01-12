import styles from "./Button.module.css";

const Button = ({ text = "Текст кнопки" }) => {
  return (
    <button className={`${styles["button"]} ${styles["accent"]}`}>
      {text}
    </button>
  );
};

export default Button;
