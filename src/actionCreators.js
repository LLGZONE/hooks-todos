let id = 0;

export function add(text) {
  return {
    type: 'add',
    id: id++,
    message: text
  };
}

export function undo() {
  return {
    type: 'undo'
  };
}

export function finish(id) {
  return {
    type: 'finish',
    id
  };
}

export function del(id) {
  return {
    type: 'delete',
    id
  };
}
