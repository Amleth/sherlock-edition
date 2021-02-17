import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleParagraph(props) {
    return <p>
        <ArticleItem
            key={props.item.id}
            item={props.item}
            tagAlreadyPrinted={true}
        />
        </p>
}

export default ArticleParagraph;