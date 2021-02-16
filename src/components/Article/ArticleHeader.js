import React from "react";

function ArticleHeader(props) {
    return <React.Fragment>
        <h1>
            {props.edition}
        </h1>
        <h2>
            {props.livraison}
        </h2>

        <h2>
            {props.articleTitle}
        </h2>
    </React.Fragment>
}

export default ArticleHeader;