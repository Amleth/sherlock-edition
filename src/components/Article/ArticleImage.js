import React from "react";

function ArticleImage(props) {
    return <img
        src={"https://github.com/OBVIL/mercure-galant/blob/gh-pages/" + props.attributes.url + "?raw=true"}
    />
}

export default ArticleImage;