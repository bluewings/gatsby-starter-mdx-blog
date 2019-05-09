import React from 'react';
import { MDXProvider } from '@mdx-js/tag';
import rangeParser from 'parse-numeric-range';
import { Code } from '../components/code';
import { Provider as ThemeProvider } from './theme-context';
import styles from './wrap.module.scss';

const preToCodeBlock = (preProps) => {
  if (
    // children is MDXTag
    preProps.children &&
    // MDXTag props
    preProps.children.props &&
    // if MDXTag is going to render a <code>
    preProps.children.props.name === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      props: { className, ...props },
    } = preProps.children.props;
    let language;
    let highlightLines;
    if (typeof className === 'string') {
      const matched = className
        .trim()
        .match(/^language-([^{}]+)(\{(.+)\}){0,1}$/);
      if (matched) {
        let option;
        [, language, , option] = matched;
        if (typeof option === 'string' && option.match(/^[0-9,-.]+$/)) {
          try {
            highlightLines = rangeParser.parse(option);
          } catch (err) {
            // ignore
          }
        }
      }
    }
    return {
      codeString: codeString.trim(),
      language,
      highlightLines,
      ...props,
    };
  }
  return null;
};

const parseNode = (() => {
  const pattern = /^gatsby--([^\s]+)$/;
  return (node) => {
    if (typeof node.type === 'string' && node.type.search(pattern) === 0) {
      const [, type] = node.type.match(pattern);
      const props = { ...node.props };
      return { type, props, node };
    }
    return { type: null, node };
  };
})();

// components is its own object outside of render so that the references to
// components are stable
const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  wrapper: (gridProps) => {
    const children = Array.isArray(gridProps.children)
      ? gridProps.children
      : [gridProps.children];
    const nested = children.reduce(
      (accum, child) => {
        const cursor = {
          col: accum.cursor.col || accum.items,
          row: accum.cursor.col && accum.cursor.row,
        };
        const { type, props, node } = parseNode(child);
        if (type === 'grid') {
          if (!cursor.row) {
            const columns = [];
            cursor.row = columns;
            accum.items.push(<div className={styles.row}>{columns}</div>);
          }
          const rows = [];
          const classNames = [
            styles.col,
            ...(props.args || '').split(',').map((e) => `col-${e}`),
          ];
          cursor.row.push(<div className={classNames.join(' ')}>{rows}</div>);
          cursor.col = rows;
        } else if (type === 'gridend') {
          cursor.col = null;
        } else {
          cursor.col.push(node);
        }
        return { ...accum, cursor };
      },
      { items: [], cursor: { row: null, col: null } },
    ).items;
    return nested;
  },
};
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </ThemeProvider>
);
