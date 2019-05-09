import React from 'react';

function Dummy({ text = '' }) {
  return (
    <div
      style={{
        display: 'flex',
        background: '#eee',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {text}
    </div>
  );
}

export default Dummy;
