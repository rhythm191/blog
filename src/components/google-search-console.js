/**
 * google search console
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const GoogleSearchConsole = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            googleSiteVerification
          }
        }
      }
    `
  )
  return (
    <Helmet
      meta={[
        {
          name: `google-site-verification`,
          content: site.siteMetadata.googleSiteVerification,
        },
      ]}
    />
  )
}

export default GoogleSearchConsole
