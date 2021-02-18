import React, {useEffect, useState} from "react";
import {getArticleById, getArticleContentByReference} from "../requests/article";
import {useParams} from "react-router-dom";
import ArticleItem from "./Article/ArticleItem";

function Article() {
    const [article, setArticle] = useState({
        contentData: {
            children: []
        }
    });
    const {articleReference} = useParams();
    useEffect(() => {
            getArticleContentByReference(articleReference).then(articleContentData => {
                setArticle({
                    contentData: articleContentData
            });
        });
    }, []);

    const articleContent = article.contentData.children;
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

export default Article;