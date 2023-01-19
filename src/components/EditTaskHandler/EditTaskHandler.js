import { observer } from "mobx-react-lite";
import { store } from "../TaskStorage/TaskStorage";
import { useState } from "react";

import "./styles.css";

export const EditTaskHandler = observer((props) => {
    const [editText, setEditText] = useState("");
    console.log(props.Option);
    console.log(props.IsShown);

    if (props.Option === "Edit" && props.IsShown === true) {
        return (
            <div className="EditStyle">
                <input
                    type="button"
                    value="Cохранить"
                    onClick={() => {
                        store.editTaskName(props.Id, editText);
                        setEditText("");
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
                <input
                    type="text"
                    placeholder="Измените текст задачи..."
                    onChange={(e) => setEditText(e.target.value)}
                ></input>
            </div>
        );
    }
});
