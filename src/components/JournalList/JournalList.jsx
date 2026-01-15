import { useContext } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import styles from "./JournalList.module.css";
import { UserContext } from "../../context/user.context";

const JournalList = ({ items }) => {
  const { userId } = useContext(UserContext);

  if (items.length === 0) {
    return <p>Записей пока нет, создайте новую.</p>;
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className={styles["journal-list"]}>
      {items
        .filter((item) => item.userId === userId)
        .sort(sortItems)
        .map((item) => {
          return (
            <CardButton key={item.id}>
              <JournalItem
                title={item.title}
                date={item.date}
                text={item.text}
              />
            </CardButton>
          );
        })}
    </div>
  );
};

export default JournalList;
