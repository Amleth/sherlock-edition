import React, {useEffect, useState} from "react";
import {getAllLivraisons} from "../requests/livraison";
import { Link } from 'react-router-dom';

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
                    <li key={livraison.reference_livraison.value}>
                        <Link
                            to={{
                                pathname: '/livraison/' + livraison.reference_livraison.value,
                            }}
                        >
                            {livraison.titre.value}
                        </Link>
                    </li>
                )
            }
        </ul>
    );
}

export default LivraisonList;