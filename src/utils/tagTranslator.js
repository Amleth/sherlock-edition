import React from "react";
import ArticleParagraph from "../components/Article/TEITranscription/ArticleParagraph";
import ArticleItalics from "../components/Article/TEITranscription/ArticleItalics";
import ArticleTitle from "../components/Article/TEITranscription/ArticleTitle";
import ArticleNotHandledTag from "../components/Article/TEITranscription/ArticleNotHandledTag";
import ArticleItem from "../components/Article/TEITranscription/ArticleItem";
import ArticleEditionTitle from "../components/Article/TEITranscription/ArticleEditionTitle";
import ArticleQuote from "../components/Article/TEITranscription/ArticleQuote";
import ArticleLabel from "../components/Article/TEITranscription/ArticleLabel";
import ArticleVerse from "../components/Article/TEITranscription/ArticleVerse";
import ArticleVerseSpace from "../components/Article/TEITranscription/ArticleVerseSpace";
import ArticleNote from "../components/Article/TEITranscription/ArticleNote";
import ArticleRef from "../components/Article/TEITranscription/ArticleRef";
import ArticleImage from "../components/Article/TEITranscription/ArticleImage";

function computeNode(node, setNote) {
    //TODO: on ne devrait pas avoir à faire cette condition puisque tous les objets reçus ici ont un attribut children
    if (node.children) {
        return <React.Fragment>
            {node.children.map(item =>
                <ArticleItem
                    key={item.id}
                    item={item}
                    setNote={setNote}
                />
            )}
        </React.Fragment>
    }
}

export function tagTranslate(tag, node, setNote) {
    const computedNode = computeNode(node, setNote);
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
        case "ab":
            return <span>
                {computedNode}
            </span>;
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
            return <ArticleNote setNote={setNote} attributes={node.attributes}>
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
        case "lb":
            return <br/>;
        default:
            console.log(node);
            return <ArticleNotHandledTag
                tag={tag}
            >
                {computedNode}
            </ArticleNotHandledTag>
    }

}