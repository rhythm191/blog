import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Feed from "../components/feed"
import GoogleSearchConsole from "../components/google-search-console"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Rhyztech blog" />
      <GoogleSearchConsole />
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
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li></li>
            <li>
              <Link style={{ boxShadow: `none` }} to="/pages/2">
                Next >>
              </Link>
            </li>
          </ul>
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
