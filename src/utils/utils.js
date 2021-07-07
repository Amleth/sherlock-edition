export default {
    articleContentIndex: 6
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