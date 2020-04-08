/**
 * SNS share buttons
 */

import React from "react"
import Helmet from "react-helmet"

import { css } from "@emotion/core"

const snsStyle = css`
  display: flex;
  justify-content: center;
  margin: 3rem 0 1rem;

  .sns-link {
    display: inline-flex;
    justify-content: center;
    align-center: flex;
    width: 50px;
    height: 50px;
    line-height: 50px;

    color: #fff;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
    cursor: pointer;

    margin-right: 1.4rem;
  }

  .sns-link.twitter {
    background-color: #55acee;

    &:hover,
    &:foucs {
      background-color: rgba(85, 172, 238, 0.87);
    }
  }

  .sns-link.facebook {
    background-color: #315096;

    &:hover,
    &:foucs {
      background: rgba(49, 80, 150, 0.87);
    }
  }

  .sns-link.hatena {
    background-color: #008fde;
  }

  @font-face {
    font-family: "fontello";
    src: url("/font/fontello.eot?94974946");
    src: url("/font/fontello.eot?94974946#iefix") format("embedded-opentype"),
      url("/font/fontello.woff2?94974946") format("woff2"),
      url("/font/fontello.woff?94974946") format("woff"),
      url("/font/fontello.ttf?94974946") format("truetype"),
      url("/font/fontello.svg?94974946#fontello") format("svg");
    font-weight: normal;
    font-style: normal;
  }
  /* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */
  /* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */
  /*
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    @font-face {
      font-family: 'fontello';
      src: url('../font/fontello.svg?94974946#fontello') format('svg');
    }
  }
  */

  [class^="icon-"]:before,
  [class*=" icon-"]:before {
    font-family: "fontello";
    font-style: normal;
    font-weight: normal;
    speak: none;

    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    /* opacity: .8; */

    /* For safety - reset parent styles, that can break glyph codes*/
    font-variant: normal;
    text-transform: none;

    /* fix buttons height, for twitter bootstrap */
    line-height: 1em;

    /* Animation center compensation - margins should be symmetric */
    /* remove if not needed */
    margin-left: 0.2em;

    /* you can be more comfortable with increased icons size */
    /* font-size: 120%; */

    /* Font smoothing. That was taken from TWBS */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Uncomment for 3D effect */
    /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
  }

  .icon-facebook:before {
    content: "";
  }
  .icon-twitter:before {
    content: "";
  }
`

const ShareButtons = ({ url, text }) => {
  console.log(text)
  return (
    <aside css={snsStyle}>
      <a
        href={`https://twitter.com/share?url=${url}&text=${text}`}
        className="sns-link twitter"
        target="_blank"
      >
        <i class="icon-twitter"></i>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        className="sns-link facebook"
        target="_blank"
      >
        <i class="icon-facebook"></i>
      </a>
      <a
        href={`http://b.hatena.ne.jp/entry/${url}`}
        className="sns-link hatena"
        target="_blank"
      >
        B!
      </a>
    </aside>
  )
}

export default ShareButtons
