import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    h1: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "ヒラギノ角ゴ Pro W3",
        "Hiragino Kaku Gothic Pro",
        "Meiryo",
        "sans-serif",
      ].join(","),
    },
  }
}

delete Wordpress2016.googleFonts

Wordpress2016.headerFontFamily = ["Abril Fatface", "serif"]
Wordpress2016.bodyFontFamily = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Helvetica Neue",
  "ヒラギノ角ゴ Pro W3",
  "Hiragino Kaku Gothic Pro",
  "Meiryo",
  "sans-serif",
]

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
