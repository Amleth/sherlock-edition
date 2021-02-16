//TODO: check si il y a une meilleure façon de faire
export function getIdFromURL(url) {
    const splitUrl = url.split('/');
    return splitUrl[splitUrl.length-1];
}

export default {
    articleContentIndex: 6
}