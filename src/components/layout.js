/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Link } from "gatsby"
import Categories from "./categories"

import { rhythm } from "../utils/typography"

const headerStyle = css`
  position: relative;
  width: 100%;
  margin-bottom: 5px;
  padding: ${rhythm(1)} 0;
  color: #fff;
  background: #1c1c1c;
  box-shadow: 0 3px 2px -2px rgba(0, 0, 0, 0.3);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 4px;
    width: 100%;
    background: #ff1744;
    z-index: -1;
  }

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
        css={css`
          margin: 0 auto;
          max-width: ${rhythm(28)};
          padding: 0 ${rhythm(3 / 4)} ${rhythm(1.5)};
        `}
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
