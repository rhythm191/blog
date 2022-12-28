/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Feed from "../components/feed"

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

const BlogList = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { category, currentPage, previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`${category} page ${currentPage}`} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Feed
            key={node.fields.slug}
            title={title}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            category={node.frontmatter.category}
            excerpt={node.frontmatter.description || node.excerpt}
          ></Feed>
        )
      })}

      <nav css={navStyle}>
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
              <Link to={previous} rel="prev">
                {"<< Prev"}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next} rel="next">
                {"Next >>"}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogList

export const categoryListQuery = graphql`
  query categoryListQuery($category: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            category
          }
        }
      }
    }
  }
`
