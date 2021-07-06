import React, { ReactElement, useState } from "react";
import { Item, IItem } from "../Item/Item";
import "./List.css";

interface ListProps {
  itemlist: IItem[];
  itemChanger: (
    todoitem: IItem,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  itemRemover: (toRemove: IItem) => void;
  itemCompleter: (toRemove: IItem) => void;
  itemAdder: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const List: React.FC<ListProps> = ({
  itemlist,
  itemChanger,
  itemRemover,
  itemCompleter,
  itemAdder,
}) => {
  const [inputText, setinputText] = useState("");
  return (
    <div id="list-container">
      {itemlist.map((item, i) => (
        <div className="item-container">
          <Item
            item={item}
            itemChanger={itemChanger}
            itemRemover={itemRemover}
            itemCompleter={itemCompleter}
            key={item.id}
            num={i + 1}
            autof={i === itemlist.length - 1}
          />
        </div>
      ))}

      <div className="item-container">
        &nbsp;&nbsp;
        <input
          className="item-input"
          value={inputText}
          id="new-input"
          spellCheck="false"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            itemAdder(e);
          }}
        ></input>
      </div>
    </div>
  );
};
