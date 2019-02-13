import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const identity = (e) => e;

export const Code = ({ codeString, language, highlightLines, ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  } else {
    const overrideProps = (props, type) => {
      const newProps = { ...props };
      delete newProps.style;
      if (
        type === 'line' &&
        highlightLines &&
        highlightLines.indexOf(newProps.key) !== -1
      ) {
        return {
          ...newProps,
          className: [newProps.className, 'gatsby-highlight-code-line']
            .filter(identity)
            .join(' '),
        };
      }
      return newProps;
    };
    return (
      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <div className="gatsby-highlight">
            <pre className={className}>
              {tokens.map((line, i) => (
                <div {...overrideProps(getLineProps({ line, key: i }), 'line')}>
                  {line.map((token, key) => (
                    <span {...overrideProps(getTokenProps({ token, key }))} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    );
  }
};
