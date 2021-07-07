/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";


function Annotations(props) {
  return <Box mt={2}>
  <Paper
    elevation={3}
    css={css`
      width: 95%;
      height: 80vh;
      margin: auto;
    `}
  >
    <Typography variant="h2" textAlign="center" pt={3}>Annotations</Typography>
  </Paper>
</Box>
}

export default Annotations;