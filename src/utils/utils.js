export default {
    articleContentIndex: 6,
}

export function createRowsFromConcepts(conceptsJSON, referentiels) {
    const rows = [];
    let i=1;
    /* Iterate on each concept */
    for (const [key, concept] of Object.entries(conceptsJSON)) {
        /* Iterate on each Iri of the concept, because he can be used in contexts */
        for (const [iri, conceptInReferentiel] of Object.entries(concept.iris)) {
            rows.push({
                id: i,
                concept: concept.label,
                normalizedStringConcept: key,
                ancestors: conceptInReferentiel.ancestors,
                E32Iri: conceptInReferentiel.E32,
                E32Label: referentiels[conceptInReferentiel.E32].label,
                key:`${concept.label}-${JSON.stringify(conceptInReferentiel.ancestors)}`,
                conceptIri: iri});
            i++;
        }
    }
    return rows;
}

/*
    See https://github.com/Amleth/SHERLOCK/blob/master/indices/mg.py
 */
export function normalizeString(string) {
    let s = "";
    for (const c of string) {

        //check is alphanumeric
        if (c.match(/^[\p{L}\p{N}]+$/u)) {
            if ('ÀÁÂÃÄÅàáâãäå'.includes(c))
                s += 'a';
            else if ('Çç'.includes(c))
                s += 'c';
            else if ('ÈÉÊËèéêë'.includes(c))
                s += 'e';
            else if ('ÒÓÔÕÖØòóôõöø'.includes(c))
                s += 'o';
            else if ('ÌÍÎÏìíîï'.includes(c))
                s += 'i';
            else if ('ÙÚÛÜùúûü'.includes(c))
                s += 'u';
            else if ('ÿ'.includes(c))
                s += 'y';
            else if ('Ññ'.includes(c))
                s += 'n';
            else if ('œ'.includes(c))
                s += 'oe';
            else if ('ß'.includes(c))
                s += 'ss';
            else
                s += c;
        }
    }
    return s.toLowerCase();
}

export function getCollectionGraphSparqlFragment() {
    return `
    #récupération collection
    GRAPH <http://data-iremus.huma-num.fr/graph/corpora-icono/collections> {
      ?D1_collection rdf:type crmdig:D1_Digital_Object .
      ?D1_collection crm:P1_is_identified_by ?label_collection .
    }
  `
}

export function getGravureByE36SparqlFragment() {
    return `
    ?E36_gravure a crm:E36_Visual_Item .
    ?E36_gravure crm:P1_is_identified_by ?E42_reference_gravure .
    ?E42_reference_gravure crm:P2_has_type <http://data-iremus.huma-num.fr/id/92c258a0-1e34-437f-9686-e24322b95305> .
    ?E42_reference_gravure rdfs:label ?reference_gravure .
    ?D1_collection crm:P148_has_component ?E36_gravure .      
  `
}

export const monthsAsInt = {
    0: "Janvier",
    9: "Février",
    18: "Mars",
    27: "Avril",
    36: "Mai",
    45: "Juin",
    54: "Juillet",
    63: "Août",
    72: "Septembre",
    81: "Octobre",
    90: "Novembre",
    99: "Decembre"
}