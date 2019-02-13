import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const identity = (e) => e;

export const Code = ({ codeString, language, highlightLines, ...props }) => {
  // eslint-disable-next-line
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
  const overrideProps = (prev, type) => {
    const next = { ...prev };
    delete next.style;
    if (
      type === 'line' &&
      highlightLines &&
      highlightLines.indexOf(next.key) !== -1
    ) {
      return {
        ...next,
        className: [next.className, 'gatsby-highlight-code-line']
          .filter(identity)
          .join(' '),
      };
    }
    return next;
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
};
