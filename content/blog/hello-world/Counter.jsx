import React, { useState } from 'react';
import styles from './Counter.module.scss';

function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <button className={styles.btn} type="button" onClick={handleClick}>
      count: {count}
    </button>
  );
}

export default Counter;
