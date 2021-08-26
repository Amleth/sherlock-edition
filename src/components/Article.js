/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from "react";
import { getArticleContentByReference } from "../requests/article";
import ArticleItem from "./Article/TEITranscription/ArticleItem";
import Box from "@material-ui/core/Box";

function Article({ articleReference, setNote }) {
  const [article, setArticle] = useState({
    contentData: {
      children: []
    }
  });

  useEffect(() => {
    getArticleContentByReference(articleReference).then(articleContentData => {
      setArticle({
        contentData: articleContentData
      });
    });
  }, [articleReference]);

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
        setNote={setNote}
      />
    )}
  </Box>
}

export default Article;