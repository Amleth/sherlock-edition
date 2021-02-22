import React from "react";

function ArticleParagraph(props) {
    return <p className={"paragraph"}>
            {props.children}
        </p>
}

export default ArticleParagraph;