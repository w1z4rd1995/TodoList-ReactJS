import { observer } from "mobx-react-lite";
import { store } from "../TaskStorage/TaskStorage";
import { useState } from "react";

import "./styles.css";

export const EditTaskHandler = observer((props) => {
    // console.log(props.IsShown);
    // if (props.Option === "Edit" && props.IsShown === true) {
    if (props.IsShown === true) {
        return (
            <div className="EditStyle">
                <div className="newText">
                    <input
                        className="inputNewText"
                        type="text"
                        value={props.TaskValue}
                        placeholder="Измените текст задачи..."
                        onChange={(e) => props.FuncTaskValue(e.target.value)}
                    ></input>
                </div>
                <div className="save">
                    <input
                        className="saveButton"
                        type="button"
                        value="Cохранить"
                        onClick={() => {
                            store.editTaskName(props.Id, props.TaskValue);
                            // setEditText("");
                            props.FuncTaskValue("");
                            store.setEditMode(props.id);
                        }}
                    ></input>
                </div>
                <div className="cancel">
                    <input
                        className="cancelButton"
                        type="button"
                        value="Отмена"
                        onClick={() => {
                            store.setShown(props.Id);
                            props.FuncTaskValue("");
                            store.setEditMode(props.id);
                        }}
                    ></input>
                </div>
            </div>
        );
    }
});
