import React, {useEffect, useState} from "react";
import {getLivraisonByReference} from "../requests/livraison";
import {Link, useParams, useLocation} from "react-router-dom";

function Livraison() {
    const [livraison, setLivraison] = useState([]);
    const { livraisonReference } = useParams();
    const location = useLocation();

    useEffect(() => {
        getLivraisonByReference(livraisonReference).then(res => {
            setLivraison(res.results.bindings)
        });
    }, []);

    return (
        <ul>
            {
                livraison.map(article =>
                    <li key={article.reference_article.value}>
                        <Link
                            to={{
                                pathname: location.pathname + '/article/' + article.reference_article.value,
                            }}
                        >
                            {article.titre_article.value} - {getPageValueByArticleReference(article.reference_article.value)}
                        </Link>
                    </li>
                )
            }
        </ul>
    );

    function getPageValueByArticleReference(reference) {
        return reference.slice(reference.length - 3);
    }
}

export default Livraison;