import {request as req, utils} from "./request";

export async function getArticleByReference(articleReference) {
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
                (<${utils.uriEndpoint + articleReference}>)
            }
          }
        }`
    )
}

export async function getArticleContentByReference(reference) {
    let res = await fetch(`http://data-iremus.huma-num.fr/files/mercure-galant/json/articles/MG-${reference}.json`, {
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

export async function getAllArticles() {
    const referenceLivraisonTypeId = "http://data-iremus.huma-num.fr/id/92c258a0-1e34-437f-9686-e24322b95305";
    return req.sparqlEndpoint(
      `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         
        SELECT DISTINCT ?F2_livraison ?titre_livraison ?date ?nom_auteur ?reference_livraison ?titre_article ?reference_article ?F2_article_tei
        WHERE {
          GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
            
            #########################################
            # RECUPERATION DE TOUTES LES LIVRAISONS #
            #########################################
            
            ?F18 a lrmoo:F18_Serial_Work .
            ?F18 lrmoo:R10_has_member ?F1_livraison .
            ?F1_livraison lrmoo:R3_is_realised_in ?F2_livraison .
            ?F1_livraison lrmoo:R3_is_realised_in ?E31_livraison_document .
            ?E31_livraison_document crm:P1_is_identified_by ?E42_reference_livraison .
            ?E42_reference_livraison rdfs:label ?reference_livraison .
            ?E42_reference_livraison crm:P2_has_type ?type .
            VALUES (?type) {
              (<${referenceLivraisonTypeId}>)
            }

            ?F3_manifestation lrmoo:R4_embodies ?F2_livraison .
            ?F3_manifestation rdf:type lrmoo:F3_Manifestation .
            ?F30_manifestation_creation lrmoo:R24_created ?F3_manifestation .
            ?F30_manifestation_creation rdf:type lrmoo:F30_Manifestation_Creation .
            ?F30_manifestation_creation crm:P4_has_time-span ?E52_time_span .
            ?E52_time_span crm:P82b_end_of_the_end ?date .
    
            #################################################
            # RECUPERATION AUTEUR #
            #################################################
            ?F27 lrmoo:R16_initiated ?F18 .
            ?F27 crm:P14_carried_out_by ?auteur .
            ?auteur crm:P1_is_identified_by ?nom_auteur .

        		#################################################
            # RECUPERATION TITRE LIVRAISON #
            #################################################
            ?F1_livraison crm:P1_is_identified_by ?titre_livraison .
            
        		#################################################
            # RECUPERATION DES ARTICLES DE CHAQUE LIVRAISON #
            #################################################
            
            ?F2_livraison_tei crm:P1_is_identified_by ?E42_reference_livraison .
            ?F2_livraison_tei crm:P148_has_component ?F2_article_tei .
            
            ################################
            # RECUPERATION TITRES ARTICLES #
            ################################
            ?F1_article lrmoo:R3_is_realised_in ?F2_article_tei .
            ?F1_article crm:P1_is_identified_by ?titre_article .
    
            ####################################
            # RECUPERATION REFERENCES ARTICLES #
            ####################################
            ?F2_article_tei crm:P1_is_identified_by ?E42_reference_article .
    		    ?E42_reference_article rdfs:label ?reference_article
          }
        }
        ORDER BY ?date
        `
    )

}

/**
    @param {boolean} AND if true, should return articles which matches every concepts, else should return articles matching one or more concept
 */
export async function getArticlesByConcepts(conceptList, AND) {

    let requestContent = "";
    if (AND) {
        for (let i=0; i< conceptList.length; i++) {
            requestContent += `             
             ?e13${i} crm:P141_assigned <${conceptList[i].conceptIri}> .
             ?e13${i} crm:P177_assigned_property_type ?p177${i} .
             ?e13${i} crm:P140_assigned_attribute_to ?article_iri .
            `
        }
    } else {
        const parsedConceptsIris = conceptList.map(concept => "<" + concept.conceptIri + ">").join(' ');
        requestContent = `
            ?e13 crm:P141_assigned ?conceptIri .
            ?e13 crm:P177_assigned_property_type ?p177 .
            ?e13 crm:P140_assigned_attribute_to ?article_iri .
            VALUES ?conceptIri {
                ${parsedConceptsIris}
            }
        `
    }
    return req.sparqlEndpoint(
      `

        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         
        SELECT DISTINCT ?article_iri
        WHERE {
          GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
             ${requestContent}
          }  
        }
    `)
}