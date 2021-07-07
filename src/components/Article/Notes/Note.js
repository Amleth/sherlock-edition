/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ArticleItem from "../TEITranscription/ArticleItem";
import Typography from "@material-ui/core/Typography";

function Note(props) {
  return <Box mt={2}>
    <Paper
      elevation={3}
      css={css`
      width: 95%;
      height: 15vh;
      margin: auto;
      
    display: flex;
    flexDirection: column;
    justifyContent: center;
    `}
    >
      {props.note.children && <Box css={theme => css`
      width: 95%;
      margin: auto auto;
      font-family:  ${theme.typography.article.fontFamily};
    `}>
        <Typography component="span" key={props.note.attributes.resp} variant="article" fontWeight="bold">
          {`${props.note.attributes.resp} : `}
        </Typography>
        {props.note.children.props.children.map(item => {
          return <ArticleItem
            key={item.key}
            item={item.props.item}
            setNote={props.setNote}
          />
        })}
      </Box>
      }
    </Paper>
  </Box>
}

export default Note;