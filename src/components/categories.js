/**
 * Categories component that queries for data
 */

import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const Categories = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          categories
        }
      }
    }
  `)
  const categories = data.site.siteMetadata.categories

  return (
    <nav
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <ul
        style={{
          display: `flex`,
          width: "100%",
          listStyle: "none",
          justifyContent: "space-evenly",
          marginBottom: rhythm(2.5),
        }}
      >
        {categories.map(category => {
          return (
            <li key={category}>
              <Link to={`/categories/${category}`}>{category}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Categories
