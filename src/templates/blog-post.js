import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { css } from "@emotion/core"
import { rhythm, scale } from "../utils/typography"

const articleStyle = css`
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.2);
  margin-bottom: 2rem;

  h1 {
    margin: ${rhythm(2)} auto ${rhythm(1 / 4)};
  }

  .meta {
    margin: 0 auto 1.75rem;
    color: #3c3c3c;
    font-size: 0.8rem;
    line-height: 1.75rem;
    text-align: right;

    time {
      margin-right: 1rem;
    }

    a {
      color: inherit;
    }
  }
`

const navStyle = css`
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article css={articleStyle}>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p className="meta">
            <time datetime={post.frontmatter.date}>
              {post.frontmatter.date}
            </time>
            <span>
              <Link to={`/categories/${post.frontmatter.category}`}>
                {post.frontmatter.category}
              </Link>
            </span>
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <nav css={navStyle}>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {"<<"} {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} {">>"}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        category
      }
    }
  }
`
