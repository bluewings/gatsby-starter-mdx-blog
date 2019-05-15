import React from 'react';
import styles from './Step.module.scss';

function Step({ text = '' }) {
  return (
    <div
      className={styles.root}
      style={{
        display: 'flex',
        background: '#eee',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>{text}</h1>
    </div>
  );
}

export default Step;
