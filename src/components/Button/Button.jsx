import "./Button.css";

const Button = ({ text = "Текст кнопки" }) => {
  return <button className="button accent">{text}</button>;
};

export default Button;
