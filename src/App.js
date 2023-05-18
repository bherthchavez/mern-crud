import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`https://mern-crud-api-penn.onrender.com/api/get`).then((res) => {
      // console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`https://mern-crud-api-penn.onrender.com/api/save`, { task: input }).then((res) => {
      // console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`https://mern-crud-api-penn.onrender.com/api/update/${updateId}`, { task: input }).then((res) => {
      // console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  return (
    <main className="p-4  sm:p-6">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
          CRUD
        </h2>
        <div className="mt-2 flex items-center justify-between gap-3" >

          <input
            type="text"
            required
            className="block w-full rounded-md  border-0 py-1.5 p-4 text-gray-900  ring-1  ring-gray-300 placeholder:text-gray-400  sm:text-lg sm:leading-6"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className="w-40 justify-center rounded-md bg-gray-600  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={updateId ? updateTask : addTask}
          >
            {updateId ? "Update Task" : "Add Task"}
          </button>
        </div>


        <ul className="list-none mt-5">
          {tasks.map((task) => (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
            />
          ))}
        </ul>
      </div>

    </main>
  );
};

export default App;
