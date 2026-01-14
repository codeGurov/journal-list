import styles from "./JournalForm.module.css";
import Button from "./../Button/Button";
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { Calendar, Tag, Archive } from "lucide-react";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
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
    }
  }, [isFormReadyToSubmit]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: "SUBMIT", payload: formProps });
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
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <Tag size={18} />
          <span>Метки</span>
        </label>
        <input type="text" name="tag" id="tag" className={styles["input"]} />
      </div>

      <textarea
        name="text"
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.text,
        })}
        cols={30}
        rows={10}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default JournalForm;
