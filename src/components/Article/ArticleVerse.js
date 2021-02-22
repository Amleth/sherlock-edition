import React from "react";

function ArticleVerse(props) {
    return <div
        className={"verse"}
    >
        {props.children}
    </div>
}

export default ArticleVerse;