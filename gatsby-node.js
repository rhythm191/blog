const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            categories
          }
        }
        allMarkdownRemark(
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
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create paging posts page
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    const previous = i === 0 ? null : i === 1 ? `/` : `/pages/${i}`
    const next = i + 1 === numPages ? null : `/pages/${i + 2}`

    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        previous,
        next,
      },
    })
  })

  // create category page with paging
  const categories = result.data.site.siteMetadata.categories

  const promises = categories.map(async (category) => {
    const categoryResult = await graphql(
      `
        query categoryQuery($category: String!) {
          allMarkdownRemark(
            filter: { frontmatter: { category: { eq: $category } } }
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
      {
        category: category,
      }
    )

    const categoryPosts = categoryResult.data.allMarkdownRemark.edges
    const postsPerPage = 10
    const numPages = Math.ceil(categoryPosts.length / postsPerPage)
    const categoryPagePromises = Array.from({ length: numPages }).map(
      (_, i) => {
        const previous =
          i === 0
            ? null
            : i === 1
            ? `/categories/${category}`
            : `/categories/${category}/${i}`
        const next =
          i + 1 >= numPages ? null : `/categories/${category}/${i + 2}`

        createPage({
          path:
            i === 0
              ? `/categories/${category}`
              : `/categories/${category}/${i + 1}`,
          component: path.resolve("./src/templates/blog-category-list.js"),
          context: {
            category: category,
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            previous,
            next,
          },
        })
      }
    )

    await Promise.all(categoryPagePromises)
  })

  await Promise.all(promises)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
