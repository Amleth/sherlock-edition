import {request as req, utils} from "./request";

export async function getAllLivraisons() {
    const referenceLivraisonTypeId = "http://data-iremus.huma-num.fr/id/92c258a0-1e34-437f-9686-e24322b95305";
    return req.sparqlEndpoint(
        `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         
        SELECT DISTINCT ?F2_livraison ?titre ?date ?nom_auteur ?reference_livraison 
        WHERE {
          GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
            ?F18 a lrmoo:F18_Serial_Work .
            ?F18 lrmoo:R10_has_member ?F1_livraison .
            ?F27 lrmoo:R16_initiated ?F18 .
            ?F27 crm:P14_carried_out_by ?auteur .
            ?auteur crm:P1_is_identified_by ?nom_auteur .
            ?F1_livraison crm:P1_is_identified_by ?titre .
            ?F1_livraison lrmoo:R3_is_realised_in ?F2_livraison .
            ?F1_livraison lrmoo:R3_is_realised_in ?E31_livraison_document .
            ?E31_livraison_document crm:P1_is_identified_by ?E42_reference_livraison .
            ?E42_reference_livraison rdfs:label ?reference_livraison .
            ?E42_reference_livraison crm:P2_has_type ?type .
            VALUES (?type) {
              (<${referenceLivraisonTypeId}>)
            }
            ?E63 crm:P92_brought_into_existence ?F2_livraison .
            ?E63 crm:P4_has_time-span/crm:P80_end_is_qualified_by ?date .
          }
        }`
    )
}

export async function getLivraisonByReference(livraisonReference) {
    return req.sparqlEndpoint(
        `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
     
        SELECT DISTINCT ?F2_livraison ?F2_article ?titre_article ?titre_livraison ?reference_article
        WHERE {
          GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
            ?F1_livraison lrmoo:R3_is_realised_in ?F2_livraison .
            ?F1_livraison crm:P1_is_identified_by ?titre_livraison .
            ?F2_livraison lrmoo:R5_has_component ?F2_article.
            ?F1_article lrmoo:R3_is_realised_in ?F2_article.
            ?F1_article crm:P1_is_identified_by ?titre_article .
            ?F1_livraison lrmoo:R3_is_realised_in ?E31_livraison_document .
            ?E31_livraison_document crm:P1_is_identified_by ?E42_reference_livraison .
            ?E42_reference_livraison rdfs:label ?reference_livraison .
            VALUES (?reference_livraison) {
              ("${livraisonReference}")
            }
            ?F2_article crm:P1_is_identified_by ?E42_reference_article .
            ?E42_reference_article rdfs:label ?reference_article .
          }
        }`
    )
}