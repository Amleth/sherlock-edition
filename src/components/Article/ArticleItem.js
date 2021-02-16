import React from "react";
import {tagTranslate} from "../../utils/tagTranslator";

function ArticleItem(props) {
    console.log(props);

    if (props.tag) { //Cas où le composant reçoit une balise à traiter
        return <React.Fragment>
            {tagTranslate(props.tag, props.value)}
        </React.Fragment>
    } else if (typeof props.value === 'string') { // Cas où le composant reçoit juste le contenu de la balise
        return props.value;
    } else if (Array.isArray(props.value)) { // Cas où le composant reçoit un tableau
        return props.value.map(item =>
            <ArticleItem
                key={item.tag}
                tag={item.tag}
                value={item.value ? item.value : item}
            />
        );
    } else { // Cas impossible
        return null;
    }
}

export default ArticleItem;