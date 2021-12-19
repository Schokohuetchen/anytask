import React, { FC, useState } from 'react';
import { Task } from '@doist/todoist-api-typescript';
import { useDispatch } from 'react-redux';
import { markAsComplete } from './redux/taskSlice';

interface TodoListItemProps {
  task: Task;
}

const TodoListItem: FC<TodoListItemProps> = ({ task }): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>(task.completed);

  const dispatch = useDispatch();

  const hasDateTime = task.due?.datetime !== undefined && task.due?.datetime !== '';

  const getTime = () => {
    if (task.due?.datetime) {
      return new Date(task.due.datetime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const handleCheckboxChange = (taskId: number) => {
    setIsChecked(!isChecked);
    dispatch(markAsComplete(taskId));
  };

  return (
    <div className="todoListItem">
      {task && (
        <div className="todoListItem__task">
          <input
            id="checkbox"
            type="checkbox"
            defaultChecked={isChecked}
            onChange={() => handleCheckboxChange(task.id)}
            className="todoListItem__checkbox"
          />
          <label htmlFor="checkbox" className="todoListItem__description">
            {task.content}
          </label>
          {hasDateTime && <span className="todoListItem__time">{getTime()}</span>}
        </div>
      )}
    </div>
  );
};

export default TodoListItem;
