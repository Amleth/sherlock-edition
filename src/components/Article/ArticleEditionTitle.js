import React from "react";

function ArticleEditionTitle(props) {
    return <span
        style={{"fontWeight": "bold"}}
    >
                    {props.children}
    </span>
}

export default ArticleEditionTitle;