/**
 * feed component that queries for data
 */

import React from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"

const feedStyle = css`
  margin: 3.5rem auto 0;

  h3 {
    margin: 0 auto ${rhythm(1 / 4)};
  }

  .meta {
    small {
      margin-right: 1rem;
    }
  }
`

const Feed = ({ title, slug, date, category, excerpt }) => {
  return (
    <article css={feedStyle}>
      <header>
        <h3>
          <Link style={{ boxShadow: `none` }} to={slug}>
            {title}
          </Link>
        </h3>
        <div className="meta">
          <small>{date}</small>
          <small>{category}</small>
        </div>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
      </section>
    </article>
  )
}

export default Feed
