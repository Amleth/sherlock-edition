import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleNotHandledTag(props) {
    return <span
    style={{"backgroundColor": "red"}}>
            {props.children}
    </span>
}

export default ArticleNotHandledTag;