import { useState } from "react";
import { observer } from "mobx-react-lite";
import { TaskRender } from "../TaskRender/TaskRender";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { store } from "../TaskStorage/TaskStorage";
import "./styles.css";

export const AllTabs = observer(() => {
    const [activeTab, setActiveTab] = useState("firstTab");

    return (
        <>
            <div className="tabs">
                <div
                    className={activeTab === "firstTab" ? "active" : ""}
                    onClick={() => setActiveTab("firstTab")}
                >
                    Все задачи({store.allTasksNumber})
                </div>
                <div
                    className={activeTab === "secondTab" ? "active" : ""}
                    onClick={() => setActiveTab("secondTab")}
                >
                    Выполненные({store.completedTasksNumber})
                </div>
            </div>
            {activeTab === "firstTab" ? <TaskRender /> : <CompletedTask />}
        </>
    );
});
