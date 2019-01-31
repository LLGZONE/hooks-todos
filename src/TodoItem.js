import React, { useContext } from 'react';
import * as ActionCreators from './actionCreators';
import Context from './context';

function TodoItem({ message, isFinish, id }) {
  const dispatch = useContext(Context);
  return (
    <div>
      <span>{message}</span>
      {!isFinish && (
        <button
          onClick={() => {
            dispatch(ActionCreators.finish(id));
          }}
        >
          finish
        </button>
      )}
      <button
        onClick={() => {
          dispatch(ActionCreators.del(id));
        }}
      >
        delete
      </button>
    </div>
  );
}

export default React.memo(TodoItem);
