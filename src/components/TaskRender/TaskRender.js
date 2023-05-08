import "./styles.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { store } from "../TaskStorage/TaskStorage";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { EditTaskHandler } from "../EditTaskHandler/EditTaskHandler";

export const TaskRender = observer((props) => {
    const [anchorEl, setAnchorEl] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [id, setId] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [taskValue, setTaskValue] = useState("");
    const [parent] = useAutoAnimate();
    const options = ["Edit", "Delete"];
    const ITEM_HEIGHT = 48;

    const handleClose = () => {
        if (open) {
            setOpen(false);
        }
    };
    return (
        <div className="newTask">
            <div ref={parent} className="flexUl">
                {store.allTasksNumber === 0 ? (
                    <div className="empty"> Список задач пуст </div>
                ) : (
                    store.allTasksStorage.map((item) =>
                        item.isCompleted === false ? (
                            <ul key={item.id} className="ul">
                                {item.isShown === false ? (
                                    <>
                                        <span
                                            key={item.id}
                                            className="textStyle"
                                            onClick={() => {
                                                setTaskValue(item.name);
                                                store.setEditMode(item.id);
                                                setId(item.id);
                                                store.setShown(item.id);
                                                setEditMode(item.editMode);
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                        <div>
                                            <IconButton
                                                color="success"
                                                size="small"
                                                onClick={() => {
                                                    store.completedTask(
                                                        item.id
                                                    );
                                                }}
                                            >
                                                <DoneOutlinedIcon />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={(e) => {
                                                    setOpen(true);
                                                    setId(item.id);
                                                    setAnchorEl(
                                                        e.currentTarget
                                                    );
                                                }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: "150px",
                                        },
                                    }}
                                >
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option}
                                            onClick={() => {
                                                setSelectedOption(option);
                                                setOpen(false);
                                                store.setShown(id);
                                                if (option === "Delete") {
                                                    store.deleteTask(id);
                                                }
                                            }}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <EditTaskHandler
                                    SetEditMode={setEditMode}
                                    Option={selectedOption}
                                    IsShown={item.isShown}
                                    Id={id}
                                    FuncTaskValue={setTaskValue}
                                    TaskValue={taskValue}
                                    EditMode={editMode}
                                />
                            </ul>
                        ) : (
                            ""
                        )
                    )
                )}
            </div>
        </div>
    );
});
