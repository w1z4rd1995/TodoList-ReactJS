import { observer } from "mobx-react-lite";
import { store } from "../TaskStorage/TaskStorage";
import { useState } from "react";

import "./styles.css";

export const EditTaskHandler = observer((props) => {
    const [editText, setEditText] = useState("");
    console.log(props.Option);
    console.log(props.IsShown);

    // if (props.Option === "Edit" && props.IsShown === true) {
    if (props.IsShown === true) {
        return (
            <div className="EditStyle">
                <input
                    type="text"
                    placeholder="Измените текст задачи..."
                    onChange={(e) => setEditText(e.target.value)}
                ></input>
                <input
                    type="button"
                    value="Cохранить"
                    onClick={() => {
                        store.editTaskName(props.Id, editText);
                        setEditText("");
                        store.setEditMode(props.id);
                    }}
                ></input>
                <input
                    type="button"
                    value="Отмена"
                    onClick={() => {
                        store.setShown(props.Id);
                        setEditText("");
                    }}
                ></input>
            </div>
        );
    }
});
