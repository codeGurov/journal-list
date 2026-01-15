import styles from "./JournalAddButton.module.css";
import CardButton from "./../CardButton/CardButton";
import { Plus } from "lucide-react";

const JournalAddButton = ({ clearForm }) => {
  return (
    <CardButton className={styles["journal-add"]} onClick={clearForm}>
      <Plus size={18} />
      Новая запись
    </CardButton>
  );
};

export default JournalAddButton;
