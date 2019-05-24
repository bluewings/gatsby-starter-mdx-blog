/* eslint-disable prefer-destructuring */
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { getSlugAndLang } = require('ptz-i18n');
const { langKeyDefault, pagesPaths } = require('./i18n');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.jsx`);
  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    let slug;
    let langKey = langKeyDefault;
    const slugAndLang = getSlugAndLang(
      { langKeyDefault, pagesPaths },
      node.fileAbsolutePath,
    );
    if (slugAndLang) {
      langKey = slugAndLang.langKey;
      slug = slugAndLang.slug;
    } else {
      slug = createFilePath({ node, getNode });
    }

    createNodeField({ node, name: 'langKey', value: langKey });
    createNodeField({ node, name: `slug`, value: slug });
  }
};
