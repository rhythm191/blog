/**
 * feed component that queries for data
 */

/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Link } from "gatsby"

const feedStyle = css`
  margin: 3.5rem auto 0;

  h3 {
    margin: 0 auto 0.4375rem;
  }

  .meta {
    time {
      margin-right: 1rem;
    }
    a {
      color: inherit;
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
          <time dateTime={date}>{date}</time>
          <span>
            <Link to={`/categories/${category}`}>{category}</Link>
          </span>
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
