import { request as req } from "./request";
import { getGravureByE36SparqlFragment } from "../utils/utils";

export function getEstampesByPeriod(period) {
  return req.sparqlEndpoint(
    `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX lr: <http://linkedrecipes.org/schema/>
        PREFIX crmdig: <http://www.ics.forth.gr/isl/CRMdig/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

            SELECT DISTINCT (concat ('/estampe/', ?reference_gravure) as ?link_path) (concat ('https://picsum.photos/150?ref=', ?reference_gravure) as ?image_path) (?E36_gravure as ?iri) ?date (GROUP_CONCAT (distinct ?titre_estampe; separator="  -  ") as ?titles)        WHERE {
            GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
                ## RECUPERATION LIVRAISON
                ?F1_livraison lrmoo:R3_is_realised_in ?F2_livraison .
                ?F1_livraison lrmoo:R3_is_realised_in ?E31_livraison .
                ?E42_livraison rdfs:label ?reference_livraison .
                ?E31_livraison crm:P1_is_identified_by ?E42_livraison .
                ?E31_livraison rdf:type crm:E31_Document. 
      
                #RECUPERATION GRAVURE
                ?E31_livraison crm:P148_has_component ?E36_gravure .
                ${getGravureByE36SparqlFragment()}
                
                #RECUPERATION TITRE 
                
                ?E13 crm:P140_assigned_attribute_to ?E36_gravure .
                ?E13 crm:P177_assigned_property_type ?assigned_property_type .
                FILTER (?assigned_property_type IN (
                  <http://data-iremus.huma-num.fr/id/01a07474-f2b9-4afd-bb05-80842ecfb527>,
                  <http://data-iremus.huma-num.fr/id/ded9ea93-b400-4550-9aa8-e5aac1d627a0>,
                  <http://data-iremus.huma-num.fr/id/58fb99dd-1ffb-4e00-a16f-ef6898902301>
                ))
                ?E13 crm:P141_assigned ?titre_estampe .
                
                
                #RECUPERATION DATE
    		
                ?F3_manifestation lrmoo:R4_embodies ?F2_livraison .
                ?F3_manifestation rdf:type lrmoo:F3_Manifestation .
                ?F30_manifestation_creation lrmoo:R24_created ?F3_manifestation .
                ?F30_manifestation_creation rdf:type lrmoo:F30_Manifestation_Creation .
                ?F30_manifestation_creation crm:P4_has_time-span ?E52_time_span .
                ?E52_time_span crm:P82b_end_of_the_end ?date .
                filter (datatype(?date) = <http://www.w3.org/2001/XMLSchema#dateTime>)
                filter (?date >= '${period[0]}'^^xsd:dateTime && ?date <= '${period[1]}'^^xsd:dateTime)
          }
        }
        GROUP BY ?E36_gravure ?reference_gravure ?date
        ORDER BY ?date`
  )
}

export function getEstampeDetail(estampeReference) {
  return req.sparqlEndpoint(
    `
    
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX lr: <http://linkedrecipes.org/schema/>
        PREFIX crmdig: <http://www.ics.forth.gr/isl/CRMdig/>
        PREFIX : <undefined>

        SELECT DISTINCT ?titre_sur_image ?titre_peritexte ?titre_descriptif ?E36_zone ?reference_gravure ?E36_gravure ?date  ?E12_gravure ?auteur ?technique_specifique ?technique_generale ?see_also ?represents_label ?label_cote_bnf ?E55_thematique ?thematique
        WHERE {

            GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
                ## RECUPERATION LIVRAISON
                ?F1_livraison lrmoo:R3_is_realised_in ?F2_livraison .
                ?F1_livraison lrmoo:R3_is_realised_in ?E31_livraison .
                ?E42_livraison rdfs:label ?reference_livraison .
                ?E31_livraison crm:P1_is_identified_by ?E42_livraison .
                ?E31_livraison rdf:type crm:E31_Document. 
      
                #RECUPERATION GRAVURE
                ?E31_livraison crm:P148_has_component ?E36_gravure .
                
    ?E36_gravure a crm:E36_Visual_Item .
    ?E36_gravure crm:P1_is_identified_by ?E42_reference_gravure .
    ?E42_reference_gravure crm:P2_has_type <http://data-iremus.huma-num.fr/id/92c258a0-1e34-437f-9686-e24322b95305> .
    ?E42_reference_gravure rdfs:label "${estampeReference}" .
    ?D1_collection crm:P148_has_component ?E36_gravure .
    
    #COTE BNF
    OPTIONAL {
      ?E36_gravure crm:P1_is_identified_by ?E42_cote_bnf .
      ?E42_cote_bnf crm:P2_has_type <http://data-iremus.huma-num.fr/id/15c5867f-f612-4a00-b9f3-17b57e566b8c> .
      ?E42_cote_bnf rdfs:label ?label_cote_bnf .
    }
  
    			OPTIONAL {
      				?E13_titre_sur_image crm:P140_assigned_attribute_to ?E36_gravure .
	                ?E13_titre_sur_image crm:P177_assigned_property_type <http://data-iremus.huma-num.fr/id/01a07474-f2b9-4afd-bb05-80842ecfb527> .                  
                	?E13_titre_sur_image crm:P141_assigned ?titre_sur_image .      
    			}
    			OPTIONAL {
      				?E13_titre_peritexte crm:P140_assigned_attribute_to ?E36_gravure .
	                ?E13_titre_peritexte crm:P177_assigned_property_type <http://data-iremus.huma-num.fr/id/ded9ea93-b400-4550-9aa8-e5aac1d627a0> .           
                	?E13_titre_peritexte crm:P141_assigned ?titre_peritexte .      
    			}
        			OPTIONAL {
      				?E13_titre_descriptif crm:P140_assigned_attribute_to ?E36_gravure .
	                ?E13_titre_descriptif crm:P177_assigned_property_type  <http://data-iremus.huma-num.fr/id/58fb99dd-1ffb-4e00-a16f-ef6898902301> .           
                	?E13_titre_descriptif crm:P141_assigned ?titre_descriptif .      
    			}
    
    			              #THEMATIQUES 
          OPTIONAL {
          
            ?E13_thematique crm:P140_assigned_attribute_to ?E36_gravure .
        
            ?E13_thematique crm:P141_assigned ?E55_thematique .
            ?E13_thematique crm:P177_assigned_property_type <http://data-iremus.huma-num.fr/id/f2d9b792-2cfd-4265-a2c5-e0a69ce01536> .
    			  GRAPH ?g_thematique {
              ?E55_thematique crm:P1_is_identified_by ?thematique .
            }
          }
                #RECUPERATION DATE
    		
                ?F3_manifestation lrmoo:R4_embodies ?F2_livraison .
                ?F3_manifestation rdf:type lrmoo:F3_Manifestation .
                ?F30_manifestation_creation lrmoo:R24_created ?F3_manifestation .
                ?F30_manifestation_creation rdf:type lrmoo:F30_Manifestation_Creation .
                ?F30_manifestation_creation crm:P4_has_time-span ?E52_time_span .
                ?E52_time_span crm:P82b_end_of_the_end ?date .
                filter (datatype(?date) = <http://www.w3.org/2001/XMLSchema#datetime>)
    
    			OPTIONAL {
                    ?E13_see_also crm:P140_assigned_attribute_to ?E36_gravure .
                    ?E13_see_also crm:P177_assigned_property_type rdfs:seeAlso .
                    ?E13_see_also crm:P141_assigned ?see_also .
      			}
				
    			OPTIONAL {
      				?E13_zone_image crm:P140_assigned_attribute_to ?E36_gravure .
      				?E13_zone_image crm:P177_assigned_property_type crm:P106_is_composed_of .
      				?E13_zone_image crm:P141_assigned ?E36_zone .
      				?E36_zone rdf:type crm:E36_Visual_Item .
      
     				?E13_represents crm:P140_assigned_attribute_to ?E36_zone .
      				?E13_represents crm:P177_assigned_property_type crm:P138_represents .
      				OPTIONAL {
      					?E13_represents crm:P141_assigned ?represents_label .
        				filter isLiteral(?represents_label)
      				}
      				OPTIONAL {
        				?E13_represents crm:P141_assigned ?represents .
      					?represents crm:P1_is_identified_by ?represents_label
      				}
    			}
    			# RECUPERATION CONCEPTEUR / GRAVEUR
          OPTIONAL {
          
            ?E12_Production crm:P108_has_produced ?E36_gravure .
            
            #INVENIT (conception)
            OPTIONAL {
                    ?E12_Production crm:P9_consists_of ?E12_invenit .
                    ?E12_invenit crm:P2_has_type <http://data-iremus.huma-num.fr/id/4d57ac14-247f-4b0e-90ca-0397b6051b8b> .
        
              OPTIONAL {
                ?E13_Auteur crm:P140_assigned_attribute_to ?E12_invenit .
                  ?E13_Auteur crm:P177_assigned_property_type crm:P14_carried_out_by .
                  ?E13_Auteur crm:P141_assigned/rdfs:label ?auteur .
                }
        
                  OPTIONAL {
                ?E13_Technique_generale crm:P140_assigned_attribute_to ?E12_invenit .
                ?E13_Technique_generale crm:P177_assigned_property_type crm:P32_used_general_technique .
                  ?E13_Technique_generale crm:P141_assigned/rdfs:label ?technique_generale .
                    }
            }
                  #SCULPSIT (gravure)
            OPTIONAL {
                    ?E12_Production crm:P9_consists_of ?E12_sculpsit .
                    ?E12_sculpsit crm:P2_has_type <http://data-iremus.huma-num.fr/id/f39eb497-5559-486c-b5ce-6a607f615773> .
        
        
                OPTIONAL {
                      ?E13_Technique_specifique crm:P140_assigned_attribute_to ?E12_sculpsit .
                      ?E13_Technique_specifique crm:P177_assigned_property_type crm:P33_used_specific_technique .
                      ?E13_Technique_specifique crm:P141_assigned/rdfs:label ?technique_specifique .
                }      
            }
          }
          }
        }
        ORDER BY ?date
    `
  )
}