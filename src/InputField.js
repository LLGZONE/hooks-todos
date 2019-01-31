import React from 'react';

function InputField({ onChange }) {
  return (
    <div>
      <span>输入todo：</span>
      <input onKeyDown={onChange} />
    </div>
  );
}

export default React.memo(InputField);
