import React from "react";
import {tagTranslate} from "../../utils/tagTranslator";

/*
   Algorithme :

   Réception d'un élement, on crée d'abord la balise qui l'englobera
   On fait ensuite un appel récursif pour afficher le contenu de la balise

 */
function ArticleItem(props) {
    console.log(props.item);

    if (props.item.tag && ! props.tagAlreadyPrinted) {
        return <React.Fragment>
            {tagTranslate(props.item.tag, props.item)}
        </React.Fragment>
    }
    if (props.item.children) { // si ce n'est pas une balise terminale
        return <React.Fragment>
            { props.item.children.map(item =>
                <ArticleItem
                    key={item.id}
                    item={item}
                    tagAlreadyPrinted={false}
                />
            )}
        </React.Fragment>
    } else if (props.item.text) {
        return <React.Fragment>
            {props.item.text}
        </React.Fragment>
    }
    return null;
}

export default ArticleItem;