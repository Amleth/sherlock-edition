import React from "react";
import {tagTranslate} from "../../utils/tagTranslator";

function ArticleItem(props) {
    // Si on est sur une feuille, c'est-à-dire uniquement du texte à afficher
    if (props.item.text || props.item.text === "") {
        return <React.Fragment>
            {props.item.text}
        </React.Fragment>
    }
    // Sinon, on fait un appel récursif sur tous les noeuds enfants
    return <React.Fragment>
        {tagTranslate(props.item.tag, props.item)}
    </React.Fragment>
}

export default ArticleItem;