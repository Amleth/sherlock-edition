import React, {useEffect, useState} from "react";
import {getLivraisonById} from "../requests/livraison";
import {Link, useParams} from "react-router-dom";
import {getIdFromURL} from "../utils/utils";

function Livraison() {
    const [livraison, setLivraison] = useState([]);
    const { livraisonId } = useParams();

    useEffect(() => {
        getLivraisonById(livraisonId).then(res => {
            setLivraison(res.results.bindings)
        });
    }, []);

    return (
        <ul>
            {
                livraison.map(article =>
                    <li key={article.F2_article.value}>
                        <Link
                            to={{
                                pathname: '/article/' + getIdFromURL(article.F2_article.value),
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