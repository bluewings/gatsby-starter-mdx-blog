import React from 'react';
import { MDXProvider } from '@mdx-js/tag';
import rangeParser from 'parse-numeric-range';
import { Code } from '../components/code';
import { Provider as ThemeProvider } from './theme-context';

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
};
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </ThemeProvider>
);
