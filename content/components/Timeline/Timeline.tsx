import * as React from 'react';
import { useEffect, useMemo, useState, useRef, RefObject } from 'react';
import { scaleLinear } from 'd3-scale';
import { format } from 'date-fns';
import styles from './Timeline.module.scss';

const MILLISEC_IN_A_DAY = 24 * 60 * 60 * 1000;

const toTimestamp = (str: any) => {
  let date = new Date(str || '');
  if (date.toString().search(/Invalid/) !== -1) {
    return new Date().valueOf();
  }
  return date.valueOf();
};

function Timeline({ range, offset = 200 }: any) {
  const [from, to] = useMemo(() => {
    let [from, to] = (range || '').split(',');
    from = toTimestamp(from);
    to = toTimestamp(to);
    return [Math.min(from, to), Math.max(from, to)];
  }, [range]);

  const dates = useMemo(() => {
    let curr = from;
    let dates = [];
    while (curr <= to) {
      const tmp = new Date(curr);
      dates.push({
        month: tmp.getMonth(),
        date: tmp.getDate(),
        day: tmp.getDay(),
        timestamp: tmp.valueOf(),
      });
      curr += MILLISEC_IN_A_DAY;
    }
    return dates;
  }, [from, to]);
  const baseTimestamp = useMemo(() => dates[0].timestamp, [dates]);

  const windowWidth = useWindowWidth();
  const [ref1, parentWidth] = useWidth('parent');
  const [ref2, listWidth] = useWidth();

  const [{ edges, bottom }, setEdges] = useState<any>({ edges: [], bottom: 99999 });
  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll('[data-date]'))
        .map((section) => {
          const rect = section.getBoundingClientRect();
          return {
            top: rect.top - offset,
            bottom: rect.bottom - offset,
            timestamp: toTimestamp(section.getAttribute('data-date')),
          };
        })
        .reduce((accum: any, curr: any) => {
          if (accum.length > 0 && accum.slice(-1)[0].top > 0) {
            return accum;
          }
          return [...accum, curr];
        }, [])
        .slice(-2);
      const bottom = sections.slice(-1)[0].bottom;
      const edges = sections
        .reduce((accum: any, curr: any) => {
          if (accum.length > 0 && accum.slice(-1)[0].top > 0) {
            return accum;
          }
          return [...accum, curr];
        }, [])
        .slice(-2)
        .slice(-2);
      setEdges({ edges, bottom });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  const scrollTimestamp = useMemo(
    () =>
      edges && edges.length === 2
        ? scaleLinear()
            .domain([edges[0].top, edges[1].top])
            .range([edges[0].timestamp, edges[1].timestamp])
            .clamp(true)(0)
        : 0,
    [edges],
  );

  const [fromTs, toTs] = useMemo(() => (edges || []).map(({ timestamp }: any) => timestamp), [edges]);

  const innerStyle = useMemo(
    () => ({
      width: windowWidth,
      paddingLeft: (windowWidth - parentWidth) / 2,
      opacity: scrollTimestamp && bottom > 0 ? 1 : 0,
    }),
    [windowWidth, parentWidth, scrollTimestamp, bottom],
  );

  const ulistStyle = useMemo(() => {
    if (scrollTimestamp) {
      let translateX = Math.max(((scrollTimestamp - baseTimestamp) / MILLISEC_IN_A_DAY) * -50, parentWidth - listWidth);
      return { transform: `translateX(${translateX}px)` };
    }
    return {};
  }, [baseTimestamp, scrollTimestamp]);

  const formattedMonth = useMemo(() => format(new Date(Math.max(baseTimestamp, scrollTimestamp)), 'MMMM, YYYY'), [
    baseTimestamp,
    scrollTimestamp,
  ]);

  return (
    <div ref={ref1} className={styles.root}>
      <div className={styles.inner} style={innerStyle}>
        <h3>{formattedMonth}</h3>

        <ul ref={ref2} style={ulistStyle}>
          {dates.map((e) => {
            return (
              <li
                className={`${e.day === 0 ? styles.sunday : ''} ${
                  fromTs <= e.timestamp && e.timestamp <= toTs ? styles.selected : ''
                }`}
              >
                <h4>{e.date}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function useWindowWidth() {
  const [width, setWidth] = useState(() => {
    try {
      return window.innerWidth
    } catch (err) {
      /* ignore */
    }
    return 0;
  });
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return width;
}

function useWidth(type?: string): [RefObject<any>, number] {
  const ref = useRef<HTMLDivElement | HTMLUListElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        if (type === 'parent') {
          // @ts-ignore
          setWidth(ref.current.parentElement.clientWidth);
        } else {
          const liElems = Array.from(ref.current.querySelectorAll('li'));
          if (liElems.length > 1) {
            setWidth(
              liElems[liElems.length - 1].getBoundingClientRect().right - liElems[0].getBoundingClientRect().left,
            );
          }
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return [ref, width];
}

export default Timeline;
