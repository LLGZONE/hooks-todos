import React, { useReducer, useMemo } from 'react';
import TodoItem from './TodoItem';
import InputField from './InputField';
import rootReducer from './reducers';
import Context from './context';
import * as ActionCreators from './actionCreators';

function handleChange(dispatch) {
  return e => {
    if (e.key === 'Enter') {
      dispatch(ActionCreators.add(e.target.value));
    }
  };
}

function App() {
  const [state, dispatch] = useReducer(rootReducer, {
    todos: [],
    history: []
  });
  const onChange = useMemo(
    () => {
      return handleChange(dispatch);
    },
    [dispatch]
  );
  return (
    <div>
      <InputField onChange={onChange} />
      <Context.Provider value={dispatch}>
        <div>finish:</div>
        {state.todos.map(
          todo =>
            todo.finish && (
              <TodoItem
                isFinish={todo.finish}
                message={todo.message}
                key={todo.id}
                id={todo.id}
              />
            )
        )}
        <div>unfinish:</div>
        {state.todos.map(
          todo =>
            !todo.finish && (
              <TodoItem
                isFinish={todo.finish}
                message={todo.message}
                key={todo.id}
                id={todo.id}
              />
            )
        )}
      </Context.Provider>
      <button
        onClick={() => {
          dispatch(ActionCreators.undo());
        }}
      >
        undo
      </button>
    </div>
  );
}

export default App;
