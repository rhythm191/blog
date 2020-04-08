import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ShareButtons from "../components/share-buttons"

import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

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
    margin: 0 0 1.75rem;
    padding: 0;
  }
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl
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
            <time dateTime={post.frontmatter.date}>
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
        <ShareButtons
          text={encodeURI(`${post.frontmatter.title} | ${siteTitle}`)}
          url={`${siteUrl}${location.pathname}`}
        />
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
        siteUrl
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
