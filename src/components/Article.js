/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useEffect, useState} from "react";
import {getArticleContentByReference} from "../requests/article";
import ArticleItem from "./Article/TEITranscription/ArticleItem";
import Box from "@material-ui/core/Box";

function Article(props) {
  const [article, setArticle] = useState({
    contentData: {
      children: []
    }
  });
  console.log(article);
  useEffect(() => {
    getArticleContentByReference(props.articleReference).then(articleContentData => {
      setArticle({
        contentData: articleContentData
      });
    });
  }, []);

  const articleContent = article.contentData.children;
  return <Box
    css={theme => css`
          width: 50%;
          font-family:  ${theme.typography.article.fontFamily};
          font-size: 1em;
      `}
  paddingX={5} >
    {articleContent.map(item =>
      <ArticleItem
        key={item.id}
        item={item}
        setNote={props.setNote}
      />
    )}
  </Box>
}

export default Article;