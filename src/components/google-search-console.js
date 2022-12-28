/**
 * google search console
 */

import React from "react"
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
    <meta
      name="google-site-verification"
      content={site.siteMetadata.googleSiteVerification}
    />
  )
}

export default GoogleSearchConsole
