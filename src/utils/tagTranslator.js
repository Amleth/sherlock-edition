import React from "react";
import ArticleParagraph from "../components/Article/ArticleParagraph";

export function tagTranslate(tag, value) {
    if (tag === "p") {
        return <ArticleParagraph
            value={value}
        />;
    }
}