import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Feed from "../components/feed"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Rhyztech blog" />
      {posts.slice(0, 10).map(({ node }) => {
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

      {posts.length > 10 && (
        <nav>
          <Link style={{ boxShadow: `none` }} to="/pages/2">
            Next >>
          </Link>
        </nav>
      )}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
