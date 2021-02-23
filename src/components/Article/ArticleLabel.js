import React from "react";

function ArticleLabel(props) {
    return <h3
        className={"label"}
    >
        {props.children}
    </h3>
}

export default ArticleLabel;