import React, {useEffect, useState} from "react";
import {getArticleById, getArticleContentByReference} from "../requests/article";

function ArticleContent(props) {
    const [articleContent, setArticleContent] = useState([]);
    const {articleReference} = props;

    useEffect(() => {
        getArticleContentByReference(articleReference).then(res => {
            setArticleContent(res);
        });
    }, []);

    console.log(articleContent);
    return (
        <ul>
            oui
        </ul>
    );
}

export default ArticleContent;