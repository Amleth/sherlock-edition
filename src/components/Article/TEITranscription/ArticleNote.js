import React from "react";
import Typography from "@material-ui/core/Typography";

function ArticleNote(props) {
  return <Typography variant="note" component="span"
    onClick={() => props.setNote(props)}>📝</Typography>
}

export default ArticleNote;