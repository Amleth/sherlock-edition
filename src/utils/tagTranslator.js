import React from "react";
import ArticleParagraph from "../components/Article/ArticleParagraph";
import ArticleItalics from "../components/Article/ArticleItalics";
import ArticleTitle from "../components/Article/ArticleTitle";
import ArticleNotHandledTag from "../components/Article/ArticleNotHandledTag";
import ArticleItem from "../components/Article/ArticleItem";
import ArticleEditionTitle from "../components/Article/ArticleEditionTitle";

export function tagTranslate(tag, item) {
    switch (tag) {
        case "p":
            return <ArticleParagraph
                key={item.id}
                item={item}
            />;
        case "hi":
            return <ArticleItalics
                key={item.id}
                item={item}
            />;
        case "head":
            return <ArticleTitle
                key={item.id}
                item={item}
            />;
        case "bibl":
            return <ArticleItem
                key={item.id}
                item={item}
                tagAlreadyPrinted={true}
            />;
        case "title":
            return <ArticleEditionTitle
                key={item.id}
                item={item}
                tagAlreadyPrinted={true}
            />;
        default:
            return <ArticleNotHandledTag
                key={item.id}
                item={item}
                tagAlreadyPrinted={true}
            />;
    }

}