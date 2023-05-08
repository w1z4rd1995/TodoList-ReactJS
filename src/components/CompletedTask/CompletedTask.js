import { store } from "../TaskStorage/TaskStorage";

export const CompletedTask = () => {
    return (
        <div className="newTask">
            <div className="flexUl">
                {store.allTasksStorage.map((item) =>
                    item.isCompleted === true ? (
                        <ul key={item.id} className="ul">
                            <span key={item.id} className="textStyle">
                                {item.name}
                            </span>
                        </ul>
                    ) : (
                        ""
                    )
                )}
            </div>
        </div>
    );
};
