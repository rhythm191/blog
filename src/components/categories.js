/**
 * Categories component that queries for data
 */

/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const navStyle = css`
  width: 100%;
  max-width: ${rhythm(24)};
  margin: 0 auto;
  color: #fff;

  ul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin: 0;
      padding: 0;
    }
  }

  a {
    position: relative;
    padding-bottom: 4px;
    color: inherit;
    text-decoration: none;
    box-shadow: none;

    &:hover,
    &:focus {
      color: #00bfa5;
      text-decoration: none;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #00bfa5;

      transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    &:hover::after {
      width: 100%;
    }
  }
`

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
    <nav css={navStyle}>
      <ul>
        {categories.map((category) => {
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
