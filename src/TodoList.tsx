import React, { FC, useState } from 'react';
import TodoListItem from './TodoListItem';
import RoundButton from './RoundButton';
import { TodoItem } from './models/TodoItem';

const TodoList: FC = (): JSX.Element => {
  const [tasks, setTasks] = useState<Array<TodoItem>>([]);

  const handleAddTask = () => {
    console.log('add me');
  };

  const handleDeleteTask = () => {
    console.log('delete me');
  };

  const handleReloadTasks = () => {
    console.log('reload me');
  };

  return (
    <div className="todoList">
      <div className="todoList__content">
        <div className="todoList__headline">Ihre heutigen Tasks:</div>
        {tasks && tasks.map((task) => <TodoListItem key={task.id} task={task} />)}
      </div>
      <div className="todoList__actions">
        <RoundButton onClick={handleReloadTasks} icon="reload" />
        <RoundButton onClick={handleAddTask} isLarge />
        <RoundButton onClick={handleDeleteTask} icon="delete" />
      </div>
    </div>
  );
};

export default TodoList;
