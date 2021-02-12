import React, {useEffect, useState} from "react";
import {getAllLivraisons} from "../requests/livraison";

function LivraisonList() {
    const [livraisons, setLivraisons] = useState([]);

    useEffect(() => {
        getAllLivraisons().then(res => {
            setLivraisons(res.results.bindings)
        })
    }, []);

    return (
        <ul>
            {
                livraisons.map(livraison =>
                <li key={livraison.F2_livraison.value}>
                    {livraison.titre.value}
                </li>)
            }
        </ul>
    );
}

export default LivraisonList;