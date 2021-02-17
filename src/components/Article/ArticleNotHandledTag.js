import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleNotHandledTag(props) {
    return <span
    style={{"backgroundColor": "red"}}>
        <ArticleItem
            item={props.item}
            tagAlreadyPrinted={true}
        />
    </span>
}

export default ArticleNotHandledTag;