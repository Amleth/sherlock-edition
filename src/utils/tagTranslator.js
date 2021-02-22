import React from "react";
import ArticleParagraph from "../components/Article/ArticleParagraph";
import ArticleItalics from "../components/Article/ArticleItalics";
import ArticleTitle from "../components/Article/ArticleTitle";
import ArticleNotHandledTag from "../components/Article/ArticleNotHandledTag";
import ArticleItem from "../components/Article/ArticleItem";
import ArticleEditionTitle from "../components/Article/ArticleEditionTitle";
import ArticleQuote from "../components/Article/ArticleQuote";
import ArticleLabel from "../components/Article/ArticleLabel";
import ArticleVerse from "../components/Article/ArticleVerse";
import ArticleVerseSpace from "../components/Article/ArticleVerseSpace";
import ArticleNote from "../components/Article/ArticleNote";
import ArticleRef from "../components/Article/ArticleRef";
import ArticleImage from "../components/Article/ArticleImage";

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
            return <div>
                {computedNode};
            </div>;
        case "title":
            return <ArticleEditionTitle>
                {computedNode}
            </ArticleEditionTitle>;
        case "quote":
            return <ArticleQuote>
                {computedNode}
            </ArticleQuote>;
        case "label":
            return <ArticleLabel>
                {computedNode}
            </ArticleLabel>;
        case "l":
            return <ArticleVerse>
                {computedNode}
            </ArticleVerse>;
        case "space":
            return <ArticleVerseSpace>
                {computedNode}
            </ArticleVerseSpace>;
        case "note":
            return <ArticleNote>
                {computedNode}
            </ArticleNote>;
        case "lg":
            return <div>
                {computedNode}
            </div>;
        case "ref":
            return <ArticleRef
                attributes={node.attributes}
            >
                {computedNode}
            </ArticleRef>;
        case "figure":
            return <div>
                {computedNode}
            </div>;
        case "graphic":
            return <ArticleImage
                attributes={node.attributes}
            >
                {computedNode}
            </ArticleImage>;
        default:
            console.log(node);
            return <ArticleNotHandledTag
                tag={tag}
            >
                {computedNode}
            </ArticleNotHandledTag>
    }

}