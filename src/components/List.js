import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";

const List = ({ id, task, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.delete(`https://mern-crud-api-penn.onrender.com/api/delete/${id}`).then((res) => {
      // console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <li className="flex justify-between p-5 mb-5 bg-slate-100 rounded-lg">
      {task}
      <div className="flex gap-5 justify-center">
        <BiEditAlt title="Edit" className="cursor-pointer text-gray-600" size={20} onClick={() => updateMode(id, task)} />
        <BsTrash title="Delete" className="cursor-pointer text-gray-600" size={20} onClick={removeTask} />
      </div>
    </li>
  );
};

export default List;
