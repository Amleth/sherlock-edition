import React from "react";
import Typography from "@material-ui/core/Typography";

function ArticleVerseSpace(props) {
    return <Typography
        mr={4} component="span"
    >
        {props.children}
    </Typography>
}

export default ArticleVerseSpace;