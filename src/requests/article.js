import {request as req, utils} from "./request";

//TODO: récupérer un identifiant plutôt que le lien vers le TEI à parser

export async function getArticleById(articleId) {
    return req.sparqlEndpoint(
        `
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX  rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

        SELECT DISTINCT ?F2_article ?titre_article ?titre_livraison ?E42_tei_string
        WHERE {
          GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
            ?F1_livraison    lrmoo:R3_is_realised_in ?F2_livraison .
            ?F1_livraison crm:P1_is_identified_by ?titre_livraison .
            ?F2_livraison lrmoo:R5_has_component ?F2_article.
            ?F1_article lrmoo:R3_is_realised_in ?F2_article.
            ?F1_article crm:P1_is_identified_by ?titre_article.
            ?F2_article crm:P1_is_identified_by ?E42_article.
            ?E42_article crm:P106_is_composed_of ?E42_tei.
            ?E42_tei rdfs:label ?E42_tei_string
            VALUES (?F2_article) {
                (<${utils.uriEndpoint + articleId}>)
            }
          }
        }`
    )
}

export async function getArticleContentByReference(reference) {
    let res = await fetch(`http://data-iremus.huma-num.fr/files/mercure-galant/json/articles/${reference}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
    });
    res = await res.json();
    return res;
}