import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, updateTask } from "./features/Tasks";

function App() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasks.value);

  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  //const [done, setDone] = useState("");
  const [filterTaskList, setFilterTaskList] = useState(taskList);
  //const [filter, setFilter] = useState("");



  useEffect(() => {
    //...
    setFilterTaskList(taskList);
    setTitle('');
    setDescriptions('');
    return () => { };
  }, [taskList]);

  // console.log("@@@taskList:", taskList);
  ///console.log("!!!filterTaskList:", filterTaskList);

  return (
    <>
      <div className="p-10">
        <h1 className="font-semibold text-gray-50">
          ToDos | Redux Sample in ReactJS by Redux Toolkit
        </h1>
        <hr className="mt-2" />

        {/* Make task */}
        <div className="py-2">
          <input
          value={title}
            type="text"
            placeholder="Task Name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            value={descriptions}
            type="text"
            placeholder="Task Description"
            className="ml-2"
            onChange={(e) => {
              setDescriptions(e.target.value);
            }}
          />
          <button
            className="ml-2"
            onClick={() => {
              dispatch(
                addTask({
                  id: taskList[taskList.length - 1].id + 1,
                  title,
                  descriptions,
                  done: 0
                })
              );
            }}
          >
            Add Task
          </button>
        </div>

        
        
        {/* Read information */}
        <div  className="py-2">
          {filterTaskList && filterTaskList.map((task) => {
            return (
              <div key={task.id} className={`p-2 mt-2 rounded-md ${task.done ? 'bg-green-600' : 'bg-orange-300'} text-gray-50`}>
                {/* Update Done */}
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={e => {
                    //console.log("@@@@@checked:", e.target.checked)
                    dispatch(
                      updateTask({ id: task.id, done: e.target.checked })
                    )
                  }
                  }
                />
                <span className="mx-2"></span>
                <span className="font-semibold">Title: </span>
                <span> {task.title} </span>
                <span className="text-red-300"> | </span>
                <span className="font-semibold">Descriptions: </span>
                <span className="text-red-300"> | </span>
                <span>{task.descriptions} </span>
                <span className="text-red-300"> | </span>
                <span className="font-semibold">Done: </span>
                <span>{task.done ? 'True' : 'False'}</span>

                <button
                  onClick={() => {
                    dispatch(deleteTask({ id: task.id }));
                  }}
                  className="ml-4"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>


{/* Filter information */}
<div>
          <select className="ml-2" onChange={e => {
            
            // e.preventDefault();
            let _filter = e.target.value;
            if(_filter === 'done')
              setFilterTaskList(taskList.filter(x => x.done));
            else if(_filter === 'undone')
              setFilterTaskList(taskList.filter(x => !x.done));
            else
              setFilterTaskList(taskList);
          }}>
            <option value="nofilter">No Filter</option>
            <option value="done">Done</option>
            <option value="undone">Undone</option>
          </select>
        </div>



      </div>
    </>
  );
}

export default App;
