import React from "react";
import ArticleItem from "./ArticleItem";

function ArticleEditionTitle(props) {
    return <span
        style={{"fontWeight": "bold"}}
    >
        <ArticleItem
            key={props.item.id}
            item={props.item}
            tagAlreadyPrinted={true}
        />
    </span>
}

export default ArticleEditionTitle;