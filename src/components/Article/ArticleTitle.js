import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleTitle(props) {
    return <h1>
        <ArticleItem
            key={props.item.id}
            item={props.item}
            tagAlreadyPrinted={true}
        />
    </h1>
}

export default ArticleTitle;