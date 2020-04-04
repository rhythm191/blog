import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../components/layout"
import SEO from "../components/seo"

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

  .sns-buttons {
    margin: 3rem 0 1rem;

    iframe,
    > div {
      margin: 0 1rem 0 0;
    }
    .fb_iframe_widget > span {
      vertical-align: baseline !important;
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
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v5.0"
        ></script>
        <script
          async
          type="text/javascript"
          src="https://b.st-hatena.com/js/bookmark_button.js"
          charset="utf-8"
        ></script>
      </Helmet>
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

        <aside className="sns-buttons">
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-show-count="false"
          >
            Tweet
          </a>
          <div
            class="fb-like"
            data-href={window.location}
            data-layout="button"
            data-action="like"
            data-size="small"
            data-share="false"
          ></div>
          <a
            href="https://b.hatena.ne.jp/entry/"
            class="hatena-bookmark-button"
            data-hatena-bookmark-layout="basic-label"
            data-hatena-bookmark-lang="ja"
            title="このエントリーをはてなブックマークに追加"
          >
            <img
              src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
              alt="このエントリーをはてなブックマークに追加"
              width="20"
              height="20"
              style={{
                border: `none`,
              }}
            />
          </a>
        </aside>
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
