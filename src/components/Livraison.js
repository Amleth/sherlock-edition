import React, {useEffect, useState} from "react";
import {getLivraisonByReference} from "../requests/livraison";
import {Link, useParams} from "react-router-dom";

function Livraison() {
    const [livraison, setLivraison] = useState([]);
    const { livraisonReference } = useParams();

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
                                pathname: '/article/' + article.reference_article.value,
                            }}
                        >
                            {article.titre_article.value}
                        </Link>
                    </li>
                )
            }
        </ul>
    );
}

export default Livraison;