import React from "react";

function ArticleRef(props) {
    return <a href={"https://github.com/OBVIL/mercure-galant/blob/gh-pages/" + props.attributes.target + "?raw=true"}
        className={"ref"}
    >
        {props.children}
    </a>
}

export default ArticleRef;