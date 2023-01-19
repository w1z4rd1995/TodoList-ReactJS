import { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "./components/TaskStorage/TaskStorage";
import { ToastContainer, toast } from "react-toastify";
import { AllTabs } from "./components/Tabs/AllTabs";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = observer(() => {
    const store = useContext(StoreContext);

    const [inputTask, setInputTask] = useState("");

    const notifySuccess = (notifyText) => {
        toast.success(notifyText);
    };
    const notifyError = (notifyText) => {
        toast.error(notifyText);
    };
    const notifyInfo = (notifyText) => {
        toast.info(notifyText);
    };

    return (
        <div className="mostMainApp">
            <div className="mainApp">
                <div className="header">
                    <input
                        placeholder="Введите новую задачу..."
                        value={inputTask}
                        className="inputStyle"
                        type="text"
                        onChange={(e) => {
                            setInputTask(e.target.value);
                        }}
                    ></input>
                    <input
                        className="addButtonStyle"
                        type="button"
                        value="Добавить"
                        onClick={() => {
                            store.addNewTask(0, inputTask);
                            if (inputTask === "") {
                                notifyError("Ошибка добавления");
                            } else {
                                notifySuccess("Задача успешно добавлена");
                            }
                            setInputTask("");
                        }}
                    ></input>
                </div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <AllTabs />
            </div>
        </div>
    );
});
export default App;
