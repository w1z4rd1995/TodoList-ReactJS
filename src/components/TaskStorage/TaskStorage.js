import { makeAutoObservable, observable, makeObservable } from "mobx";
import { createContext } from "react";
import uuid4 from "uuid4";

export class TaskDescription {
    constructor(id, name, uploadDate, isShown, isCompleted) {
        this.id = id;
        this.name = name;
        this.uploadDate = uploadDate;
        this.isShown = isShown;
        this.isCompleted = isCompleted;
    }
}

export class TaskStorage {
    constructor() {
        makeAutoObservable(this);
    }

    allTasksStorage = [];
    allTasksNumber = 0;
    completedTasksNumber = 0;

    addNewTask(id, name) {
        if (name !== "") {
            const newTask = new TaskDescription(id, name, new Date());
            newTask.id = uuid4();
            newTask.isShown = false;
            newTask.isCompleted = false;
            this.allTasksStorage.push(newTask);
            this.allTasksNumber += 1;
        } else return console.error("ошибка");
    }

    deleteTask(id) {
        this.allTasksStorage = this.allTasksStorage.filter(
            (item) => item.id !== id,
            (this.allTasksNumber -= 1)
        );
    }

    setShown(id) {
        this.allTasksStorage = this.allTasksStorage.map((item) => {
            if (item.id === id && item.isShown === false) {
                return { ...item, isShown: true };
            } else return { ...item, isShown: false };
        });
    }

    editTaskName(id, text) {
        this.allTasksStorage = this.allTasksStorage.map((item) => {
            if (item.id === id && text !== "") {
                return { ...item, name: text, isShown: false };
            } else {
                return item;
            }
        });
    }
    completedTask(id) {
        this.allTasksStorage = this.allTasksStorage.map((item) => {
            if (item.id === id) {
                this.completedTasksNumber += 1;
                this.allTasksNumber -= 1;
                return { ...item, isCompleted: true };
            } else {
                return item;
            }
        });
    }
}
export const store = new TaskStorage();
export const StoreContext = createContext(store);
