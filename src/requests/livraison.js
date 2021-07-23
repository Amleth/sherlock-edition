import {request as req, utils} from "./request";
import {getCollectionGraphSparqlFragment, getGravureByE36SparqlFragment} from "../utils/utils";

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
    
    		#RECUPERATION LIVRAISON
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
    
    		# RECUPERATION AUTEUR
            ?F27 lrmoo:R16_initiated ?F18 .
            ?F27 crm:P14_carried_out_by ?auteur .
            ?auteur crm:P1_is_identified_by ?nom_auteur .
    
    		#RECUPERATION TITRE
            ?F1_livraison crm:P1_is_identified_by ?titre .
    
    		#RECUPERATION DATE
    		
    		?F3_manifestation lrmoo:R4_embodies ?F2_livraison .
    		?F3_manifestation rdf:type lrmoo:F3_Manifestation .
    		?F30_manifestation_creation lrmoo:R24_created ?F3_manifestation .
    		?F30_manifestation_creation rdf:type lrmoo:F30_Manifestation_Creation .
    		?F30_manifestation_creation crm:P4_has_time-span ?E52_time_span .
    		?E52_time_span crm:P82b_end_of_the_end ?date
          }
        }
        ORDER BY ?date`
  )
}

export async function getLivraisonByReference(livraisonReference) {
  return req.sparqlEndpoint(
    `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX lr: <http://linkedrecipes.org/schema/>
        PREFIX crmdig: <http://www.ics.forth.gr/isl/CRMdig/>

        SELECT DISTINCT ?titre_article ?titre_livraison ?reference_article ?F2_article_tei ?reference_gravure
        WHERE {
        
          ${getCollectionGraphSparqlFragment()}  
          GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
            VALUES (?reference_livraison) {
              ("${livraisonReference}")
            } .
            ?E42_reference_livraison rdfs:label ?reference_livraison .
            ?F2_livraison_tei crm:P1_is_identified_by ?E42_reference_livraison .
            ?F2_livraigson_tei crm:P148_has_component ?F2_article_tei .
            
            #RECUPERATION TITRE ARTICLE
            ?F1_article lrmoo:R3_is_realised_in ?F2_article_tei .
            ?F1_article crm:P1_is_identified_by ?titre_article .
    
            #RECUPERATION TITRE LIVRAISON
                ?F1_livraison lrmoo:R3_is_realised_in ?F2_livraison_tei .
            ?F1_livraison crm:P1_is_identified_by ?titre_livraison .
        
            #RECUPERATION REFERENCE ARTICLE
            ?F2_article_tei crm:P1_is_identified_by ?E42_reference_article .
            ?E42_reference_article rdfs:label ?reference_article .
            ?E31_article crm:P1_is_identified_by ?E42_reference_article .
            ?E31_article rdf:type crm:E31_Document. 
            
            #RECUPERATION PARTITIONS
            OPTIONAL {
              ?E31_article crm:P148_has_component ?E36_gravure .
              ${getGravureByE36SparqlFragment()}
            }
          }
        }
        ORDER BY ASC(?reference_article)`
  )
}

export async function getEstampesByLivraisonReference(livraisonReference) {
  return req.sparqlEndpoint(
    `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX lr: <http://linkedrecipes.org/schema/>
        PREFIX crmdig: <http://www.ics.forth.gr/isl/CRMdig/>

        SELECT DISTINCT ?label_collection ?titre_estampe ?reference_gravure ?E36_gravure
        WHERE {
            ${getCollectionGraphSparqlFragment()}
            GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
                VALUES (?reference_livraison) {
                    ("${livraisonReference}")
                } .
                ## RECUPERATION LIVRAISON
                ?E42_livraison rdfs:label ?reference_livraison .
                ?E31_livraison crm:P1_is_identified_by ?E42_livraison .
                ?E31_livraison rdf:type crm:E31_Document. 
      
                #RECUPERATION GRAVURE
                ?E31_livraison crm:P148_has_component ?E36_gravure .
                ${getGravureByE36SparqlFragment()}
                
                #RECUPERATION TITRE ESTAMPE
                ?E13 crm:P140_assigned_attribute_to ?E36_gravure .
                ?E13 crm:P177_assigned_property_type ?assigned_property_type .
                FILTER (?assigned_property_type IN (
                  <http://data-iremus.huma-num.fr/id/01a07474-f2b9-4afd-bb05-80842ecfb527>,
                  <http://data-iremus.huma-num.fr/id/ded9ea93-b400-4550-9aa8-e5aac1d627a0>,
                  <http://data-iremus.huma-num.fr/id/58fb99dd-1ffb-4e00-a16f-ef6898902301>
                ))
                ?E13 crm:P141_assigned ?titre_estampe
          }
        }`
  )
}