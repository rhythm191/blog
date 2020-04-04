import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Feed from "../components/feed"

const BlogList = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Rhyztech blog" />
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

      <nav>
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
      sort: { fields: [frontmatter___date], order: DESC }
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
