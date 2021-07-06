import React from "react";
import { List } from "../List/List";
import { IItem } from "../Item/Item";
import "./App.css";

//draggable items
//additem input field becomes an item field on type, and a new input appears bellow
//Add ability to complete items and filter completed only
//Add workspaces input
//sort items by number, date created
//completion button styling - make into checkboxes
//factor workspaces into separate component
//input expands when too long

export function App() {
  const list: IItem[] = [
    {
      id: 1,
      content: "Go for a walk",
      date: new Date(),
      completed: false,
      workspace: "default",
    },
    {
      id: 2,
      content: "Topology",
      date: new Date(),
      completed: false,
      workspace: "default",
    },
    {
      id: 3,
      content: "FFC",
      date: new Date(),
      completed: false,
      workspace: "default",
    },
    {
      id: 4,
      content: "Kaneki",
      date: new Date(),
      completed: false,
      workspace: "default",
    },
    {
      id: 5,
      content: "Graduate Schhol",
      date: new Date(),
      completed: false,
      workspace: "default",
    },
    {
      id: 6,
      content: "SHAD prep",
      date: new Date(),
      completed: false,
      workspace: "default",
    },
    {
      id: 7,
      content: "Category theory read",
      date: new Date(),
      completed: false,
      workspace: "work",
    },
  ];
  const [workspaces, setworkspaces] = React.useState([
    "all",
    "thesis",
    "home",
    "work",
    "LeetCode",
  ]);
  const [workspace, setworkspace] = React.useState<"all" | "rest">("all");
  const [items, setItems] = React.useState(list);
  const [darkmode, setDarkmode] = React.useState(false);

  const darkModeSwitch = (): void => {
    setDarkmode(!darkmode);
  };

  const itemChanger = (
    todoitem: IItem,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let toChange = {
      ...todoitem,
    };

    let index = items.indexOf(todoitem);
    if (index === items.length - 1 && e.currentTarget.value.length == 0) {
      setItems(items.slice(0, items.length - 1));
      return;
    }

    toChange.content = e.currentTarget.value;
    let newList = items.slice(0, index);
    newList.push(toChange);
    const rest = items.slice(index + 1, items.length);
    newList.push(...rest);
    setItems(newList);
  };

  const itemRemover = (toRemove: IItem): void => {
    console.log(toRemove.id);
    setItems(items.filter((item) => item.id != toRemove.id));
  };

  const itemCompleter = (todoitem: IItem): void => {
    let toChange = {
      ...todoitem,
    };
    let index = items.indexOf(todoitem);
    toChange.completed = !todoitem.completed;
    let newList = items.slice(0, index);
    newList.push(toChange);
    const rest = items.slice(index + 1, items.length);
    newList.push(...rest);
    setItems(newList);
  };
  const itemAdder = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let maxi: number = Math.max(items[0].id, 0);
    for (let i = 0; i < items.length; i++) {
      if (items[i].id > maxi) {
        maxi = items[i].id;
      }
    }
    const newitem: IItem = {
      id: maxi + 1,
      content: e.currentTarget.value,
      date: new Date(),
      completed: false,
      workspace: "default",
    };
    setItems(items.concat([newitem]));
  };

  return (
    <>
      <div className={darkmode ? "expand overlay" : "overlay"}></div>
      <button className="dark-mode-button" onClick={darkModeSwitch}>
        D
      </button>

      <div className={"workspaces-container"}>
        <h1>View: </h1>
        <li
          className={
            workspace == "all"
              ? "all-workspace selected-workspaces"
              : "all-workspace"
          }
          onClick={() => setworkspace("all")}
        >
          {"List"}{" "}
        </li>

        <div
          className={
            workspace == "rest"
              ? "rest-workspaces selected-workspaces"
              : "rest-workspaces"
          }
          onClick={() => setworkspace("rest")}
        >
          <li>{"Workspaces"} </li>
          <ul>
            {workspaces.slice(1, workspaces.length).map((workspace, i) => (
              <li>{workspace}</li>
            ))}
          </ul>
        </div>
      </div>
      <List
        itemlist={items}
        itemChanger={itemChanger}
        itemRemover={itemRemover}
        itemCompleter={itemCompleter}
        itemAdder={itemAdder}
      />
      <div className={darkmode ? "footer absolute-text-dark" : " footer"}>
        Yevhen Melnyk, 2021
      </div>
    </>
  );
}
