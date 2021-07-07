import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleNotHandledTag(props) {
    return <div
        style={{"backgroundColor": "red", "width": "50px", "height": "50px"}}
        id={props.tag}>
        {props.children}
    </div>
}

export default ArticleNotHandledTag;