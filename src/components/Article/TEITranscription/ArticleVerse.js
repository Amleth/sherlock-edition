import React from "react";
import Typography from "@material-ui/core/Typography";

function ArticleVerse(props) {
    return <Typography component="div" variant="article" fontStyle="italic">
        {props.children}
    </Typography>
}

export default ArticleVerse;