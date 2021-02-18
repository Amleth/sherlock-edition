import React from "react";
import ArticleParagraph from "../components/Article/ArticleParagraph";
import ArticleItalics from "../components/Article/ArticleItalics";
import ArticleTitle from "../components/Article/ArticleTitle";
import ArticleNotHandledTag from "../components/Article/ArticleNotHandledTag";
import ArticleItem from "../components/Article/ArticleItem";
import ArticleEditionTitle from "../components/Article/ArticleEditionTitle";

function computeNode(node) {
    //TODO: on ne devrait pas avoir à faire cette condition puisque tous les objets reçus ici ont un attribut children
    if (node.children) {
        return <React.Fragment>
            {node.children.map(item =>
                <ArticleItem
                    key={item.id}
                    item={item}
                />
            )}
        </React.Fragment>
    }
}

export function tagTranslate(tag, node) {
    const computedNode = computeNode(node);

    switch (tag) {
        case "p":
            return <ArticleParagraph>
                {computedNode}
            </ArticleParagraph>;
        case "hi":
            return <ArticleItalics>
                {computedNode}
            </ArticleItalics>;
        case "head":
            return <ArticleTitle>
                {computedNode}
            </ArticleTitle>;
        case "bibl":
            return computedNode;
        case "title":
            return <ArticleEditionTitle>
                {computedNode}
            </ArticleEditionTitle>;
        default:
            return <ArticleNotHandledTag>
                {computedNode}
            </ArticleNotHandledTag>
    }

}