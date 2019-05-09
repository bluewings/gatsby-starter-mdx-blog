import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { DiscussionEmbed } from 'disqus-react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

function BlogPostTemplate(props) {
  const {
    location,
    data: {
      site: {
        siteMetadata: {
          title: siteTitle,
          social: { disqusShortname },
        },
      },
      mdx: post,
    },
    pageContext: { previous, next },
  } = props;

  return (
    <Layout
      location={location}
      title={siteTitle}
      maxWidth={post.frontmatter.max_width}
    >
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <h1>{post.frontmatter.title}</h1>
      <p
        className="date"
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-0.75),
        }}
      >
        {post.frontmatter.date}
      </p>
      <MDXRenderer>{post.code.body}</MDXRenderer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
      {disqusShortname && (
        <DiscussionEmbed
          shortname={disqusShortname}
          config={{
            identifier: post.id,
            title: post.frontmatter.title,
          }}
        />
      )}
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        social {
          disqusShortname
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        max_width
      }
    }
  }
`;
