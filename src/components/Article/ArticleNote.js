import React from "react";

function ArticleNote(props) {
    return <div
        className={"note"}
    >
        {props.children}
    </div>
}

export default ArticleNote;