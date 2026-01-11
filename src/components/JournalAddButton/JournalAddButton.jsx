import "./JournalAddButton.css";
import CardButton from "./../CardButton/CardButton";
import { Plus } from "lucide-react";

const JournalAddButton = () => {
  return (
    <CardButton className="journal-add">
      <Plus size={18} />
      Новая запись
    </CardButton>
  );
};

export default JournalAddButton;
