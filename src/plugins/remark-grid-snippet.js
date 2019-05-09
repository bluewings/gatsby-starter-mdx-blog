/* eslint-disable no-param-reassign */
const visit = require(`unist-util-visit`);

module.exports = ({ markdownAST }) =>
  new Promise((resolve) => {
    const pattern = /^@([^\s,]+)(.*)$/;
    visit(markdownAST, 'paragraph', (node) => {
      // convert ruled-link to custom-grid node
      if (node.children && node.children.length === 1) {
        const child = node.children[0];
        if (
          child.type === 'link' &&
          child.url &&
          child.url.search(pattern) === 0
        ) {
          const matched = child.url.match(pattern);
          const [type, ...args] = matched[1].split('-');
          node.type = 'html';
          node.value = `<gatsby--${type} args="${args}" />`;
          delete node.children;
        }
      }
    });
    resolve(markdownAST);
  });
