import React from "react";

function ArticleItalics(props) {
    return <span
        style={{"fontStyle": "italic"}}
    >
            {props.children}
    </span>
}

export default ArticleItalics;