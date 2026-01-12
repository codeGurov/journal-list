import styles from "./JournalItem.module.css";

const JournalItem = ({ title, date, text }) => {
  const formatDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '.');
  return (
    <>
      <h2 className={styles["journal-item__header"]}>{title}</h2>
      <div className={styles["journal-item__body"]}>
        <p className={styles["journal-item__date"]}>{formatDate}</p>
        <p className={styles["journal-item__text"]}>{text}</p>
      </div>
    </>
  );
};

export default JournalItem;
