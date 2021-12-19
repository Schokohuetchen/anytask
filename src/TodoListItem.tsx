import React, { FC, useState } from 'react';
import { Task } from '@doist/todoist-api-typescript';
import { useDispatch } from 'react-redux';
import { markAsComplete } from './redux/taskSlice';

interface TodoListItemProps {
  task: Task;
  selectMode: boolean;
  onSelect: (taskId: number) => void;
}

const TodoListItem: FC<TodoListItemProps> = ({ task, selectMode, onSelect }): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>(task.completed);
  const [isSelected, setIsSelected] = useState<boolean>(false);

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

  const handleCheckboxChange = (taskId: number, e: any) => {
    if (!selectMode) {
      setIsChecked(!isChecked);
      dispatch(markAsComplete(taskId));
    } else {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const toggleSelect = (taskId: number, e: any) => {
    if (selectMode) {
      e.preventDefault();
      e.stopPropagation();

      setIsSelected(!isSelected);
    }
  };

  return (
    <div className="todoListItem">
      {task && (
        <div
          onClick={(e) => {
            toggleSelect(task.id, e);
          }}
          className={`todoListItem__task ${isSelected ? 'todoListItem__task--selected' : ''}`}
        >
          <input
            id="checkbox"
            type="checkbox"
            defaultChecked={isChecked}
            onChange={(e) => handleCheckboxChange(task.id, e)}
            className={`todoListItem__checkbox ${
              isSelected ? 'todoListItem__checkbox--selected' : ''
            }`}
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
