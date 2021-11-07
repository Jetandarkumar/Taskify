import React, { useState, useEffect } from "react";
import "./index.css";
import { AiFillFileAdd } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

const getAllTask = () => {
  const list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    console.log(list);
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const getComTasks = () => {
  const finishedTask = localStorage.getItem("comTask");

  if (finishedTask) {
    return JSON.parse(localStorage.getItem("comTask"));
  } else {
    return [];
  }
};

function TodoApp() {
  const [input, setInput] = useState("");
  const [allTask, setAllTask] = useState(getAllTask());
  const [comTasks, setComTasks] = useState(getComTasks());

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleOnClick = () => {
    if (!input) {
      toast.error("First Enter Data", {
        position: "top-center",
      });
    } else {
      toast.success("Successfully added", {
        position: "top-center",
        closeOnClick: true,
      });
      setAllTask([...allTask, input]);
      setInput("");
    }
  };

  const handleDelTask = (id) => {
    const updatedTasks = allTask.filter((val, ind) => {
      return ind != id;
    });

    setAllTask(updatedTasks);
  };

  const handleDoneTasks = (id) => {
    const DoneTasks = allTask.filter((val, ind) => {
      return ind === id;
    });

    setComTasks([...comTasks, DoneTasks]);

    handleDelTask(id);
  };

  const handlecomDelTask = (id) => {
    const updatedTasks = comTasks.filter((val, ind) => {
      return ind != id;
    });
    setComTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(allTask));
    localStorage.setItem("comTask", JSON.stringify(comTasks));
  }, [allTask, comTasks]);

  return (
    <>
      <div className="container">
        <h1>TASKIFY</h1>

        <div className="input">
          <input
            onChange={handleInputChange}
            value={input}
            type="text"
            placeholder="Enter a text"
            className="input_box"
          />
          <span onClick={handleOnClick}>
            <AiFillFileAdd className="addFile" />
          </span>
        </div>

        <div className="container_tasks">
          <div className="task_div1">
            <h3>Actice Tasks </h3>

            {/* add this to new component */}
            {allTask.map((val, ind) => {
              return (
                <div className="task" key={ind}>
                  <h3 className="note">{val} </h3>
                  <div className="icons_div">
                    <AiFillEdit
                      className="icons"
                      onClick={() => {
                        toast.error("Fuckin just rewrite instead of editing", {
                          position: "top-center",
                          closeOnClick: true,
                        });
                      }}
                    />
                    <AiFillDelete
                      className="icons"
                      onClick={() => handleDelTask(ind)}
                    />
                    <AiOutlineCheck
                      className="icons"
                      onClick={() => handleDoneTasks(ind)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="task_div2">
            <h3>Actice Tasks </h3>
            {/* add tasks here in such mess */}
            {comTasks.map((val, ind) => {
              return (
                <div className="task" key={ind}>
                  <h3 className="note">{val} </h3>
                  <div className="icons_div">
                    <AiFillDelete
                      className="icons"
                      onClick={() => handlecomDelTask(ind)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default TodoApp;
