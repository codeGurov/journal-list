import { useContext, useMemo } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import styles from "./JournalList.module.css";
import { UserContext } from "../../context/user.context";

const JournalList = ({ items }) => {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => items.filter((item) => item.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (items.length === 0) {
    return <p>Записей пока нет, создайте новую.</p>;
  }

  return (
    <div className={styles["journal-list"]}>
      {filteredItems.map((item) => {
        return (
          <CardButton key={item.id}>
            <JournalItem title={item.title} date={item.date} text={item.text} />
          </CardButton>
        );
      })}
    </div>
  );
};

export default JournalList;
