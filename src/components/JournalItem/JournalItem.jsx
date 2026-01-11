import "./JournalItem.css";

const JournalItem = ({ title, date, text }) => {
  const formatDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '.');
  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <div className="journal-item__body">
        <p className="journal-item__date">{formatDate}</p>
        <p className="journal-item__text">{text}</p>
      </div>
    </>
  );
};

export default JournalItem;
