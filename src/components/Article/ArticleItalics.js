import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleItalics(props) {
    return <span
        style={{"fontStyle": "italic"}}
    >
        <ArticleItem
            key={props.item.id}
            item={props.item}
            tagAlreadyPrinted={true}
        />
    </span>
}

export default ArticleItalics;