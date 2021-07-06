import React, { ChangeEventHandler, ReactEventHandler, useState } from "react";
import "./Item.css";

export interface IItem {
  id: number;
  content: string;
  date: Date;
  completed: boolean;
  workspace: string;
}

export const Item: React.FC<{
  item: IItem;
  num: number;
  itemChanger: (
    todoitem: IItem,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  itemRemover: (toRemove: IItem) => void;
  itemCompleter: (toRemove: IItem) => void;
  autof: boolean;
}> = ({ item, itemChanger, itemRemover, num, itemCompleter, autof }) => {
  const [textField, setTextfield] = useState(item.content);
  const fieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTextfield(e.target.value);
    itemChanger(item, e);
  };

  return (
    <div>
      {num + " "}
      <input
        className={
          item.completed ? " item-input item-content-completed" : "item-input"
        }
        value={textField}
        onChange={fieldChange}
        id={item.id.toString()}
        spellCheck="false"
        autoFocus={autof}
      ></input>

      <button className="item-remove" onClick={() => itemRemover(item)}>
        X
      </button>
      <button className="item-completer" onClick={() => itemCompleter(item)}>
        ✓
      </button>
    </div>
  );
};
