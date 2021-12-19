import React, { FC, useEffect, useState } from 'react';
import TodoListItem from './TodoListItem';
import RoundButton from './RoundButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, deselectAll, fetchTasks } from './redux/taskSlice';
import { RootState } from './redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

const TodoList: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state: RootState) => state.tasks.selectedTasks);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!selectMode) {
      dispatch(deselectAll());
    }
  }, [selectMode]);

  const handleAddTask = () => {
    console.log('add me');
  };

  const handleDeleteTask = () => {
    if (selectedTasks && selectedTasks.length > 0) {
      setSelectMode(false);
      selectedTasks.map((taskId: number) => dispatch(deleteTask(taskId)));
    }
  };

  const handleReloadTasks = () => {
    setSelectMode(false);
    dispatch(fetchTasks());
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
  };

  const buttonText = () => (selectMode ? 'Abbrechen' : 'Auswählen');

  return (
    <div className="todoList">
      <div className="todoList__header">
        <div className="todoList__header-content">
          <div className="todoList__back-action">
            <div className="todoList__back-btn">
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              <span>Zurück</span>
            </div>
          </div>
          <Button buttonText={buttonText()} onClick={toggleSelectMode} />
        </div>
      </div>
      <div className="todoList__content">
        <div className="todoList__headline">Ihre heutigen Tasks:</div>
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task) => {
            return <TodoListItem key={task.id} task={task} selectMode={selectMode} />;
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
