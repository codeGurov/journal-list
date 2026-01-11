import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";

const JournalList = ({ items }) => {
  if (items.length === 0) {
    return <p>Записей пока нет, создайте новую.</p>;
  }
  return (
    <div className="journal-list">
      {items.map((item) => {
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
