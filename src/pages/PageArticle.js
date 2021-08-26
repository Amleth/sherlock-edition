/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../components/Article";
import Note from "../components/Article/Notes/Note";
import Box from "@material-ui/core/Box";
import Annotations from "../components/Article/Annotations/Annotations";

function PageArticle() {

  const { articleReference } = useParams();
  useEffect(() => {
  }, []);

  const [note, setNote] = useState([]);

  return <Box display="flex" className={"wrapper"}>

    <div className={"article"}>
      <Article
        articleReference={articleReference}
        setNote={setNote}
      />
    </div>
    <Box position="fixed" css={css`
      width: 40%;
      background-color: #F9F9F9;
      right: 0;
      height: 100%;
      overflow-y: auto;
    `}
    >
      <Note note={note} />
      <Annotations />
    </Box>
  </Box>
}

export default PageArticle;