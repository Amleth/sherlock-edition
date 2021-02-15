import React, {useEffect, useState} from "react";
import {getArticleById} from "../requests/article";
import {Link, useParams} from "react-router-dom";
import {getArticleReferenceByTeiUrl} from "../utils/utils";
import ArticleContent from "./ArticleContent";

function Article() {
    const [article, setArticle] = useState([]);
    const { articleId } = useParams();
    let articleReference;
    useEffect(() => {
        getArticleById(articleId).then(res => {
            setArticle(res.results.bindings);
        });
    }, []);

    //TODO: refactor quand les identifiants des articles pourront être récupérés
    if (article[0]) {
        articleReference = "MG-1672-01_001";
        return (
            <ul>
                <ArticleContent
                    articleReference={articleReference}
                />
            </ul>
        );
    }
    return null;
}

export default Article;