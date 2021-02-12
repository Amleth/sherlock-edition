export const request = {
    sparqlEndpoint: sparqlEndpoint
};

async function sparqlEndpoint(query) {
    let res = await fetch(`http://data-iremus.huma-num.fr/sparql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        body: `query=${encodeURIComponent(query)}`,
    });
    res = await res.json();
    return res
}