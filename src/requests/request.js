export const request = {
    sparqlEndpoint: sparqlEndpoint,
};
export const utils = {
    uriEndpoint: "http://data-iremus.huma-num.fr/id/",
};

async function sparqlEndpoint(query) {
    let res = await fetch(`http://localhost:3030/sherlock-concept/sparql`, {
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
    return res;
}