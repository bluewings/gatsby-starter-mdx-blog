import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const removeStyle = (props) => {
  const newProps = { ...props };
  delete newProps.style;
  return newProps;
};

export const Code = ({ codeString, language, ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  } else {
    return (
      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <div className="gatsby-highlight">
            <pre className={className}>
              {tokens.map((line, i) => (
                <div {...removeStyle(getLineProps({ line, key: i }))}>
                  {line.map((token, key) => (
                    <span {...removeStyle(getTokenProps({ token, key }))} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    )
  }
}