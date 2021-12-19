import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import TodoListItem from './TodoListItem';
import RoundButton from './RoundButton';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, deleteTask, deselectAll, fetchTasks } from './redux/taskSlice';
import { RootState } from './redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import TextField from './TextField';
import { AddTaskPayload } from './models/AddTaskPayload';

interface TodoListHeaderProps {
  addMode?: boolean;
  buttonText: string;
  onBackClick: () => void;
  onToggleSelectMode: () => void;
}

const TodoListHeader: FC<TodoListHeaderProps> = ({
  addMode = false,
  buttonText,
  onBackClick,
  onToggleSelectMode,
}): JSX.Element => {
  return (
    <div className="todoList__header">
      <div className="todoList__header-content">
        <div className="todoList__back-action">
          {addMode && (
            <div className="todoList__back-btn" onClick={onBackClick}>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              <span>Zurück</span>
            </div>
          )}
        </div>
        {!addMode && <Button buttonText={buttonText} onClick={onToggleSelectMode} />}
      </div>
    </div>
  );
};

interface AddTodoProps {
  onAddTodo: () => void;
}

const AddTodo: FC<AddTodoProps> = ({ onAddTodo }): JSX.Element => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleAddTodo = async () => {
    const data: AddTaskPayload = {
      content: textInput,
      due_string: 'today',
    };

    await dispatch(addNewTask(data));
    onAddTodo();
  };

  return (
    <div className="todoList__add">
      <TextField value={textInput} onChange={handleInputChange} placeholder="z.B. Brunch mit Ute" />
      <Button
        disabled={!textInput}
        isUppercase
        isLarge
        buttonText="Hinzufügen"
        onClick={handleAddTodo}
      />
    </div>
  );
};

const TodoList: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state: RootState) => state.tasks.selectedTasks);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<boolean>(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!selectMode) {
      dispatch(deselectAll());
    }
  }, [selectMode]);

  useEffect(() => {
    if (addMode && selectMode) {
      setSelectMode(false);
    }
  }, [addMode]);

  const handleAddTask = () => {
    setAddMode(true);
  };

  const closeAddMode = () => {
    setAddMode(false);
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
      <TodoListHeader
        addMode={addMode}
        buttonText={buttonText()}
        onBackClick={closeAddMode}
        onToggleSelectMode={toggleSelectMode}
      />
      {addMode && <AddTodo onAddTodo={closeAddMode} />}
      {!addMode && (
        <>
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
        </>
      )}
    </div>
  );
};

export default TodoList;
