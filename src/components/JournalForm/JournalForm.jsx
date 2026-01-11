import styles from "./JournalForm.module.css";
import Button from "./../Button/Button";
import { useEffect, useState } from "react";
import cn from "classnames";
import { Calendar, Tag, Archive } from "lucide-react";

const INITIAL_STATE = {
  title: true,
  date: true,
  text: true,
};

const JournalForm = ({ onSubmit }) => {
  const [formValid, setFormValid] = useState(INITIAL_STATE);

  useEffect(() => {
    let timerId;
    if (!formValid.date || !formValid.text || !formValid.title) {
      timerId = setTimeout(() => {
        setFormValid(INITIAL_STATE);
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [formValid]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValide = true;
    if (!formProps.title?.trim().length) {
      setFormValid((prev) => ({ ...prev, title: false }));
      isFormValide = false;
    } else {
      setFormValid((prev) => ({ ...prev, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValid((prev) => ({ ...prev, text: false }));
      isFormValide = false;
    } else {
      setFormValid((prev) => ({ ...prev, text: true }));
    }
    if (!formProps.date) {
      setFormValid((prev) => ({ ...prev, date: false }));
      isFormValide = false;
    } else {
      setFormValid((prev) => ({ ...prev, date: true }));
    }
    if (!isFormValide) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className={styles["form-row"]}>
        <input
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !formValid.title,
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
            [styles["invalid"]]: !formValid.date,
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
          [styles["invalid"]]: !formValid.text,
        })}
        cols={30}
        rows={10}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default JournalForm;
