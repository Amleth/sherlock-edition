import React from "react";

function ArticleLabel(props) {
    return <div
        className={"label"}
    >
        {props.children}
    </div>
}

export default ArticleLabel;