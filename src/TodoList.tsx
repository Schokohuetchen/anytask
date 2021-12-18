import React, { FC } from 'react';
import TodoListItem from './TodoListItem';
import RoundButton from './RoundButton';

const TodoList: FC = (): JSX.Element => {
  const tasks = [
    {
      assignee: 2671362,
      assigner: 2671355,
      commentCount: 10,
      completed: false,
      content: 'Buy Milk',
      description: '',
      due: {
        date: '2016-09-01',
        recurring: false,
        datetime: '2016-09-01T09:00:00Z',
        string: 'tomorrow at 12',
        timezone: 'Europe/Moscow',
      },
      id: 2995104339,
      labelsId: [2156154810, 2156154820, 2156154826],
      order: 1,
      priority: 1,
      projectId: 2203306141,
      sectionId: 7025,
      parentId: 2995104589,
      url: 'https://todoist.com/showTask?id=2995104339',
    },
    {
      assignee: 2671362,
      assigner: 2671355,
      commentCount: 10,
      completed: true,
      content: 'Buy Milk',
      description: '',
      due: {
        date: '2016-09-01',
        recurring: false,
        datetime: '2016-09-01T09:00:00Z',
        string: 'tomorrow at 12',
        timezone: 'Europe/Moscow',
      },
      id: 2995104339,
      labelsId: [2156154810, 2156154820, 2156154826],
      order: 1,
      priority: 1,
      projectId: 2203306141,
      sectionId: 7025,
      parentId: 2995104589,
      url: 'https://todoist.com/showTask?id=2995104339',
    },
  ];

  const handleClick = () => {
    console.log('add me');
  };

  return (
    <div className="todoList">
      <div className="todoList__content">
        <div className="todoList__headline">Ihre heutigen Tasks:</div>
        {tasks && tasks.map((task) => <TodoListItem key={task.id} task={task} />)}
      </div>
      <div className="todoList__actions">
        <RoundButton onClick={handleClick} icon="reload" />
        <RoundButton onClick={handleClick} isLarge />
        <RoundButton onClick={handleClick} icon="delete" />
      </div>
    </div>
  );
};

export default TodoList;
