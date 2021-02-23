import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import '../styles/MG/article.css';
import Article from "../components/Article";
import {getArticleByReference} from "../requests/article";

function PageArticle() {
    const [article, setArticle] = useState({});
    console.log("articleReference")

    const {articleReference} = useParams();
    console.log(articleReference)
    useEffect(() => {
    }, []);

    return <React.Fragment>

        <div className={"article"}>
            <Article
                articleReference={articleReference}
            />
        </div>
    </React.Fragment>
}

export default PageArticle;