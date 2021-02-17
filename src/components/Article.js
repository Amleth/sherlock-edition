import React, {useEffect, useState} from "react";
import {getArticleById, getArticleContentByReference} from "../requests/article";
import {useParams} from "react-router-dom";
import utils from '../utils/utils'
import ArticleItem from "./Article/ArticleItem";

function Article() {
    const [article, setArticle] = useState({
        data: null,
        contentData: null
    });
    const {articleId} = useParams();
    let articleReference;
    useEffect(() => {
        getArticleById(articleId).then(articleData => {
            //TODO: refactor quand les identifiants des articles pourront être récupérés
            articleReference = "MG-1672-01_013";
            getArticleContentByReference(articleReference).then(articleContentData => {
                setArticle({
                    data: articleData.results.bindings,
                    contentData: articleContentData
                });
            });
        });
    }, []);

    if (article.contentData) {
        const articleContent = article.contentData.children;
        console.log(articleContent);
        return <div>
            {articleContent.map(item =>
                <ArticleItem
                    key={item.id}
                    item={item}
                    tagAlreadyPrinted={false}
                />
            )}
        </div>
    }
    return null;
}

export default Article;