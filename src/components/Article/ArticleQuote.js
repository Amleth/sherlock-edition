import React from "react";

function ArticleQuote(props) {
    return <div
        className={"quote"}
    >
            {props.children}
    </div>
}

export default ArticleQuote;