/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from "react";
import Typography from "@material-ui/core/Typography";

function ArticleLabel(props) {
  return <Typography
    component="h3"
    variant="article"
    align="justify"
    fontWeight="bold"
    textAlign="center"
    css={css`                    
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    `}
  >
    {props.children}
  </Typography>
}

export default ArticleLabel;