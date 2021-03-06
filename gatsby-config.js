const mdxFeed = require('gatsby-mdx/feed');
const tailwindcss = require('tailwindcss');

module.exports = {
  pathPrefix: `/gatsby-starter-mdx-blog`,
  siteMetadata: {
    title: `개츠비 스타터 MDX`,
    author: `Cha Sung Won`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: ``,
      facebook: ``,
      github: `https://github.com/bluewings`,
      stackOverflow: ``,
      disqusShortname: `gatsby-starter-mdx-blog`,
    },
    github: {
      owner: 'bluewings',
      repository: 'gatsby-starter-mdx-blog',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `${__dirname}/src/plugins/remark-grid-snippet.js`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-smartypants` },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [tailwindcss('./tailwind.config.js')],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-87089021-4`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: mdxFeed,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat:800`,
          `Black Han Sans`,
          // `Noto Serif KR`,
          // `Noto Sans KR`,
          'Open Sans',
          `Gothic A1:400,700`,
          // other korean google fonts
          // `Cute Font`, `Do Hyeon`, `Gothic A1`, `Jua`, `Stylish`,
        ],
      },
    },
    `gatsby-plugin-typescript`,
    // `gatsby-plugin-sitemap`,
  ],
};
