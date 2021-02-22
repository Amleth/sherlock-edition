import React from "react";

function ArticleVerseSpace(props) {
    return <span
        className={"space"}
    >
        {props.children}
    </span>
}

export default ArticleVerseSpace;