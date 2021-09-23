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

            SELECT DISTINCT (concat ('/estampe/', ?reference_gravure) as ?link_path) (concat ('https://picsum.photos/75?ref=', ?reference_gravure) as ?image_path) (?E36_gravure as ?iri) ?date (GROUP_CONCAT (distinct ?titre_estampe; separator="#") as ?titles)        WHERE {
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

export function getEstampeIriByReference(estampeReference) {
    return req.sparqlEndpoint(
      `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>

        SELECT ?E36
        WHERE {
            GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
            ?E36 a crm:E36_Visual_Item .
            ?E36 crm:P1_is_identified_by ?E42_reference_gravure .
            ?E42_reference_gravure rdfs:label "${estampeReference}" .
          }
        }`);
}

export function getE13ByIris(iris) {
  return req.sparqlEndpoint(
    `
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX she: <http://data-iremus.huma-num.fr/ns/sherlock#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT *
WHERE {
  GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
    VALUES ?P140 { 
        ${iris}
    }

    ?E13 crm:P140_assigned_attribute_to ?P140 .
    ?E13 crm:P177_assigned_property_type ?P177 .
    ?E13 crm:P141_assigned ?P141 .
    ?E13 crm:P14_carried_out_by ?P14 .


    # Trouver un label signifiant pour l'entité P14
    OPTIONAL {
      GRAPH ?P14_label_g {
          VALUES ?P14_label_p { crm:P1_is_identified_by crm:P102_has_title rdfs:label }
          ?P14 ?P14_label_p ?P14_label .
          FILTER(isLiteral(?P14_label)) .
      } 
    }
    
    # Trouver un label signifiant pour l'entité P177
    OPTIONAL {
      GRAPH ?P177_label_g {
          VALUES ?P177_label_p { crm:P1_is_identified_by crm:P102_has_title rdfs:label }
          ?P177 ?P177_label_p ?P177_label .
          FILTER(isLiteral(?P177_label)) .
      } 
    }
    
    # Trouver un label signifiant pour l'entité P141
    OPTIONAL {
      GRAPH ?P141_label_g {
        {
          VALUES ?P141_label_p { crm:P1_is_identified_by crm:P102_has_title rdfs:label }
          ?P141 ?P141_label_p ?P141_label .
          FILTER(isLiteral(?P141_label)) .
        }
        UNION
        {
          VALUES ?P141_label_p { crm:P1_is_identified_by crm:P102_has_title }
          ?P141 ?P141_label_p ?P141_label_r .
          GRAPH ?P141_label_g {
            VALUES ?e41_type { crm:E35_Title crm:E41_Appellation crm:E42_Identifier }
            ?P141_label_r rdf:type ?e41_type .
            ?P141_label_r rdfs:label ?label .
          }
        }
      } 
    }
  }
}
        
        `);
}

export function getE36Structure(estampeIri) {
  return req.sparqlEndpoint(
    `
   PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX she: <http://data-iremus.huma-num.fr/ns/sherlock#>
SELECT *
WHERE {
  GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
    VALUES ?E36_source {<${estampeIri}>}

    # Tous les E36 et ses enfants via P106
    ?E36_source (^crm:P140_assigned_attribute_to/crm:P141_assigned)* ?E36_child .
    ?E13_P106 crm:P141_assigned ?E36_child .
    ?E13_P106 crm:P177_assigned_property_type crm:P106_is_composed_of .
    ?E13_P106 crm:P140_assigned_attribute_to ?E36_parent .
    ?E13_P106 crm:P14_carried_out_by ?E13_P106_P14 .
    ?E36_parent rdf:type crm:E36_Visual_Item .
    ?E36_child rdf:type crm:E36_Visual_Item .

    # P165 -> E33
    OPTIONAL {
      ?E13_P165 crm:P140_assigned_attribute_to ?E36_child .
      ?E13_P165 crm:P177_assigned_property_type crm:P165_incorporates .
      ?E13_P165 crm:P141_assigned ?E33 .
      ?E33 rdf:type crm:E33_Linguistic_Object .
      ?E13_P165 crm:P14_carried_out_by ?E13_P165_P14 .
      ?E13_P165 she:sheP_position_du_texte_par_rapport_à_la_médaille ?E33_position .
      GRAPH <http://data-iremus.huma-num.fr/graph/sherlock-data> {
        ?E33_position crm:P1_is_identified_by ?E33_position_label .
      }

      # Le texte de l'inscription
      ?E13_P190 crm:P140_assigned_attribute_to ?E33 .
      ?E13_P190 crm:P177_assigned_property_type crm:P190_has_symbolic_content .
      ?E13_P190 crm:P141_assigned ?E33_symbolic_content .
      ?E13_P190 crm:P14_carried_out_by ?E13_P190_P14 .
    }
  }
}
       
        `
  )
}