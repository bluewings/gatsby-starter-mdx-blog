/* eslint-disable jsx-a11y/html-has-lang,react/jsx-filename-extension, react/destructuring-assignment, react/require-default-props, react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {

              var preferredTheme;
              var THEME_LIGHT = 'light';
              var THEME_DARK = 'dark';
              
              try {
                preferredTheme = localStorage.getItem('theme');
              } catch (err) {}
              
              function getTheme() {
                return preferredTheme || THEME_LIGHT;
              }
              
              function setTheme(newTheme) {
                preferredTheme = newTheme;
                [THEME_LIGHT, THEME_DARK].forEach(function (e) {
                  return document.body.classList.remove(e);
                });
                document.body.classList.add(newTheme);
              }
              
              function setPreferredTheme(newTheme) {
                setTheme(newTheme);
              
                try {
                  localStorage.setItem('theme', newTheme);
                } catch (err) {
                  /* ignore */
                }
              }
              
              function toggleTheme() {
                var theme = getTheme();
                var newTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
                setPreferredTheme(newTheme);
                return newTheme;
              }
              
              setTheme(getTheme());
              window.__getTheme = getTheme;
              window.__toggleTheme = toggleTheme;

            })();
          `,
          }}
        />
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
