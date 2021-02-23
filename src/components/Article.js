import React, {useEffect, useState} from "react";
import {getArticleContentByReference} from "../requests/article";
import ArticleItem from "./Article/ArticleItem";
import '../styles/MG/article.css';

function Article(props) {
    const [article, setArticle] = useState({
        contentData: {
            children: []
        }
    });
    useEffect(() => {
            getArticleContentByReference(props.articleReference).then(articleContentData => {
                setArticle({
                    contentData: articleContentData
            });
        });
    }, []);

    const articleContent = article.contentData.children;
    return <React.Fragment>
        {articleContent.map(item =>
            <ArticleItem
                key={item.id}
                item={item}
            />
        )}
    </React.Fragment>
}

export default Article;