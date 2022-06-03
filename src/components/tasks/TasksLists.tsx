import React from "react";
import { TaskType } from "../../domain";
import { Task } from ".";

type Props = {
  tasks: TaskType[];
};

const TasksLists: React.FC<Props> = ({ tasks }) => {
  return (
    <>
      {tasks.map(task => {
        return <Task key={task.id} {...task} />;
      })}
    </>
  );
};

export default TasksLists;
