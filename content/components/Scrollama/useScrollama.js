/* eslint-disable no-restricted-globals */
import { useEffect, useMemo, useReducer } from 'react';
import scrollama from 'scrollama';
import 'intersection-observer';
import styles from './Scrollama.module.scss';

const STEP_ENTER = 'step-enter';
const STEP_PROGRESS = 'step-progress';
const STEP_EXIT = 'step-exit';

const initialState = {
  index: null,
  progress: null,
  rect: null,
  index_: null,
  progress_: null,
  rect_: null,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case STEP_ENTER: {
      const { element, index, direction } = payload;
      const progress = direction === 'down' ? 0 : 1;
      const elRect = element.getBoundingClientRect();
      const top = elRect.top + document.documentElement.scrollTop || document.body.scrollTop;
      const left = elRect.left + document.documentElement.scrollLeft || document.body.scrollLeft;
      const rect = {
        width: elRect.width,
        height: elRect.height,
        top,
        left,
        right: left + elRect.width,
        bottom: top + elRect.height,
      };
      return {
        ...state,
        index,
        progress,
        rect,
        index_: index,
        progress_: progress,
        rect_: rect,
      };
    }
    case STEP_PROGRESS: {
      const { index, progress } = payload;
      return { ...state, index, progress, index_: index, progress_: progress };
    }
    case STEP_EXIT: {
      return { ...state, index: null, rect: null, progress: null };
    }
    default:
      return state;
  }
}

const DEFAULT_OFFSET = 0.5;

function useScrollama(props) {
  const step = useMemo(() => props.step || '', [props.step || '']);

  const offset = useMemo(() => {
    const value = Number(props.offset);
    return isNaN(value) ? DEFAULT_OFFSET : value;
  }, [props.offset || '']);

  const progress = !!props.progress;

  const demo = !!props.demo;

  const [state, dispatch] = useReducer(reducer, initialState);

  // show guideline
  useEffect(() => {
    if (demo) {
      const guide = document.createElement('div');
      document.body.appendChild(guide);
      guide.classList.add(styles.guide);
      guide.innerText = `"${step}" trigger: ${offset}`;
      guide.style.top = `${offset * 100}%`;
      return () => {
        document.body.removeChild(guide);
      };
    }
    return () => null;
  }, [step, offset, demo]);

  useEffect(() => {
    if (step && document.body.querySelectorAll(step).length > 0) {
      const scroller = scrollama();
      scroller
        .setup({ step, offset, progress })
        .onStepEnter((payload) => dispatch({ type: STEP_ENTER, payload }))
        .onStepProgress((payload) => dispatch({ type: STEP_PROGRESS, payload }))
        .onStepExit((payload) => dispatch({ type: STEP_EXIT, payload }));
      window.addEventListener('resize', scroller.resize);
      return () => {
        window.removeEventListener('resize', scroller.resize);
        scroller.destroy();
      };
    }
    return () => null;
  }, [step, offset, progress]);

  return state;
}

export default useScrollama;
