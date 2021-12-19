import React, { FC, useEffect } from 'react';
import TodoListItem from './TodoListItem';
import RoundButton from './RoundButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './redux/taskSlice';
import { RootState } from './redux/store';

const TodoList: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchTasks());
    }
  }, [dispatch]);

  const handleAddTask = () => {
    console.log('add me');
  };

  const handleDeleteTask = () => {
    console.log('delete me');
  };

  const handleReloadTasks = () => {
    dispatch(fetchTasks());
  };

  return (
    <div className="todoList">
      <div className="todoList__content">
        <div className="todoList__headline">Ihre heutigen Tasks:</div>
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task) => {
            return <TodoListItem key={task.id} task={task} />;
          })}
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
