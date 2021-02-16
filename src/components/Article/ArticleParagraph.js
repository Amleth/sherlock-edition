import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleParagraph(props) {
    console.log("props :")
    return <p>
        <ArticleItem
            value={props.value}
        />
        </p>
}

export default ArticleParagraph;