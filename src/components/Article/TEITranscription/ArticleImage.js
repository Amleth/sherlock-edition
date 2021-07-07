/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from "react";

function ArticleImage(props) {
  return <img
    css={css`
      width: 100%;
    `}
    src={"https://github.com/OBVIL/mercure-galant/blob/gh-pages/" + props.attributes.url + "?raw=true"}
  />
}

export default ArticleImage;