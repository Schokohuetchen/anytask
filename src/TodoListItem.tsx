import React, { FC, useState } from 'react';

type DueObject = {
  date: string;
  recurring: boolean;
  datetime?: string;
  string?: string;
  timezone: string;
};

type TodoItem = {
  id: number;
  url: string;
  order: number;
  due: DueObject;
  content: string;
  priority: number;
  parentId: number;
  assignee?: number;
  assigner?: number;
  sectionId: number;
  projectId: number;
  completed: boolean;
  commentCount?: number;
  description?: string;
  labelsId: Array<number>;
};

interface TodoListItemProps {
  task: TodoItem;
}

const TodoListItem: FC<TodoListItemProps> = ({ task }): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>(task.completed);

  const hasDateTime = task.due?.datetime !== undefined && task.due?.datetime !== '';

  const getTime = () => {
    if (task.due?.datetime) {
      return new Date(task.due.datetime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const handleCheckboxChange = () => setIsChecked(!isChecked);

  return (
    <div className="todoListItem">
      {task && (
        <div className="todoListItem__task">
          <input
            id="checkbox"
            type="checkbox"
            defaultChecked={isChecked}
            onChange={handleCheckboxChange}
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
