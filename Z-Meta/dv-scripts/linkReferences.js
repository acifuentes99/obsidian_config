//let currentPage = dv.current();
/* TODO : 
Ver el tema de un subpath / heading en donde está la nota
Idea : Para poder ordenar mejor, la lista recursiva, por topico, y no tener que estar creando otra nota, para colocar los subtopicos
Opciones: utilizar el Objeto lists
Pero : Hay que ver como filtar solo los links, no los otros tipos de elementos
Paja : La opción anterior va a leer todos los campos de listas, y no se si sea muy buena en rendimiento
Esto tal vez igual pasa... por que los outlinks es lago de Obsidian en particular, y este no lee los headings
    */

let main = () => {
    let links = dv.current().file.outlinks.path.array();
    let list = getInternalLinks(links, 0);
    let html = '';
    dv.header(3, "Link references");
    dv.span(formatPagesDepth(list, 0));
    drawPARANotesLinks(links, list);
}

let drawPARANotesLinks = (links, list) => {
    for (let link of links) {
        let page = dv.page(link);
        if (page.tags === undefined) continue;
        if (page.tags.includes('type/resource')) {
            dv.header(3, "From resource: " + page.file.name);
            let list = getInternalLinks(page.file.outlinks.path.array(), 0);
            dv.span(formatPagesDepth(list, 0));
        }
        else if (page.tags.includes('type/project')) {
            dv.header(3, "From Project: " + page.file.name);
            let list = getInternalLinks(page.file.outlinks.path.array(), 0);
            dv.span(formatPagesDepth(list, 0));
        }
    }
}

let getInternalLinks = (links, depth) => {
    depth++;
    let pages = {};
    if (depth >= 5) { return pages }; //Cortcircuito para evitar depth recursion
    if (links.length === 0) { return pages; }
    for (let link of links) {
        let page = dv.page(link);
        if (isNormalNoteType(page)) {
            let pageLinks = page.file.outlinks.path.array();
            if (pageLinks.includes(link)) {
                pages[link] = {};
                continue;
            }
            pages[link] = getInternalLinks(pageLinks, depth);
        }
    }
    return pages;
};

let formatPagesDepth = (pages, depth) => {
    depth++;
    let html = '';
    if (Object.keys(pages).length === 0) {
        return html;
    }
    for (let link of Object.keys(pages)) {
        html += '   '.repeat(depth) + '* [[' + dv.page(link).file.name + ']]\n';
        html += formatPagesDepth(pages[link], depth);
        html += ''
    }
    html += '';
    return html;
}

let isNormalNoteType = (p) => {
    if (p === undefined) return false;
    if (p.tags === undefined || p.tags === null) return true;
    let count = 0;
    for (let tag of p.tags.split(' ')) {
        if ( tag.includes('type/note/') || tag === 'type' ) { return true; }
    }
    return false;
}

main();
