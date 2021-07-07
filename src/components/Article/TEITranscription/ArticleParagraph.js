import React from "react";
import Typography from "@material-ui/core/Typography";

function ArticleParagraph(props) {
    return <Typography component="p" variant="article" align="justify">
            {props.children}
        </Typography>
}

export default ArticleParagraph;