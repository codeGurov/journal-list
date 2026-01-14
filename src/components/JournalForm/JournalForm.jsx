import styles from "./JournalForm.module.css";
import Button from "./../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { Calendar, Tag, Archive } from "lucide-react";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className={styles["form-row"]}>
        <input
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !isValid.title,
          })}
          type="text"
          name="title"
          ref={titleRef}
          onChange={onChange}
          value={values.title}
        />
        <Archive size={32} />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <Calendar size={18} />
          <span>Дата</span>
        </label>
        <input
          className={cn(styles["input"], {
            [styles["invalid"]]: !isValid.date,
          })}
          type="date"
          name="date"
          id="date"
          ref={dateRef}
          value={values.date}
          onChange={onChange}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <Tag size={18} />
          <span>Метки</span>
        </label>
        <input
          type="text"
          name="tag"
          id="tag"
          onChange={onChange}
          value={values.tag}
          className={styles["input"]}
        />
      </div>

      <textarea
        name="text"
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.text,
        })}
        cols={30}
        rows={10}
        ref={textRef}
        onChange={onChange}
        value={values.text}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default JournalForm;
