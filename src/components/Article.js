import React, {useEffect, useState} from "react";
import {getArticleContentByReference} from "../requests/article";
import {useParams} from "react-router-dom";
import ArticleItem from "./Article/ArticleItem";
import '../styles/MG/article.css';

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
    return <div className={"article"}>
        {articleContent.map(item =>
            <ArticleItem
                key={item.id}
                item={item}
            />
        )}
    </div>
}

export default Article;