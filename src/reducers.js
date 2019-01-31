function finish(todos, id) {
  for (const todo of todos) {
    if (todo.id === id) {
      todo.finish = true;
      return todos;
    }
  }
}

function todosReducer(state = [], action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: action.id,
          message: action.message,
          finish: false
        }
      ];
    case 'finish':
      return finish(state, action.id);
    case 'delete':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function findTodo(todos, id) {
  for (const item of todos) {
    if (item.id === id) {
      return item;
    }
  }
  return null;
}

function insertTodo(todos, undo) {
  if (todos.length === 0) {
    return [undo];
  }
  if (todos[0].id > undo.id) {
    return [undo, ...todos];
  }
  let t = [];
  let last = todos[0].id;
  let insert = false;
  for (let i = 0; i < todos.length; i++) {
    if (undo.id < todos[i].id && undo.id > last) {
      t.push(undo, todos[i]);
      insert = true;
    } else {
      t.push(todos[i]);
    }
    last = todos[i].id;
  }
  if (!insert) {
    todos.push(undo);
  }
  return t;
}

function undoTodo(todos, history) {
  if (history.length === 0) return todos;
  return insertTodo(todos, history[0]);
}

function rootReducer(
  state = {
    todos: [],
    history: []
  },
  action
) {
  switch (action.type) {
    case 'add':
    case 'finish':
      return {
        ...state,
        todos: todosReducer(state.todos, action)
      };
    case 'delete':
      return {
        ...state,
        todos: todosReducer(state.todos, action),
        history: [findTodo(state.todos, action.id), ...state.history]
      };
    case 'undo':
      return {
        ...state,
        todos: undoTodo(state.todos, state.history),
        history: state.history.slice(1)
      };
    default:
      return state;
  }
}

export default rootReducer;
