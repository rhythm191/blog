import React from "react"
import { Link } from "gatsby"
import Categories from "./categories"

import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

const headerStyle = css`
  width: 100%;
  padding: ${rhythm(1)} 0;
  color: #fff;
  background: #1c1c1c;

  h1,
  h3 {
    box-shadow: none;
    font-family: Abril Fatface, serif;
    font-size: 3.5rem;
    text-align: center;
    margin: 0 auto ${rhythm(1.5)};

    a {
      color: inherit;
      text-decoration: none;
      box-shadow: none;

      &:hover,
      &:focus {
        color: #e9e9e9;
        text-decoration: underline;
      }
    }
  }
`

const footerStyle = css`
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem 0;

  background: #1c1c1c;

  p {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
  }
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1>
        <Link to={`/`}>{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h3>
        <Link to={`/`}>{title}</Link>
      </h3>
    )
  }
  return (
    <div>
      <header css={headerStyle}>
        {header}
        <Categories></Categories>
      </header>
      <main
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {children}
      </main>
      <footer css={footerStyle}>
        <p>
          Copyright {new Date().getFullYear()},{` `}
          <a href="https://www.rhyztech.net">rhyztech</a>. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Layout
