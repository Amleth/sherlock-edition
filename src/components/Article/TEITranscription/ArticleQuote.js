/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from "react";
import Box from "@material-ui/core/Box";

function ArticleQuote(props) {
    return <Box
      css={css`
          margin: 2vh auto 2vh auto;
          width: fit-content;
          border: 1px solid rgba(0, 0, 0, 0.12);
          padding-left: 5px;
           padding-right: 5px
      `}
    >
            {props.children}
    </Box>
}

export default ArticleQuote;