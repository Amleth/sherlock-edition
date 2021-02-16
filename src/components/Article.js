import React, {useEffect, useState} from "react";
import {getArticleById, getArticleContentByReference} from "../requests/article";
import {useParams} from "react-router-dom";
import ArticleHeader from "./Article/ArticleHeader";
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
            articleReference = "MG-1672-01_001";
            getArticleContentByReference(articleReference).then(articleContentData => {
                setArticle({
                    data: articleData.results.bindings,
                    contentData: articleContentData
                });
            });
        });
    }, []);

    if (article.contentData) {
        const articleHeader = article.contentData.div;
        const articleContent = Object.keys(article.contentData.div).slice(utils.articleContentIndex);
        return <div>
            <ArticleHeader
                edition={articleHeader.bibl.title.value}
                livraison={articleHeader.bibl["#"].value}
                articleTitle={articleHeader.head.value}
            />
            {articleContent.map(tag =>
                <ArticleItem
                    key={tag}
                    tag={tag}
                    value={article.contentData.div[tag]}
                />
            )}
        </div>
    }
    return null;
}

export default Article;