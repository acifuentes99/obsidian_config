console.log('asdf');
let query = '-#journal and -#archive and -#dashboard and -#type/resource and -#type/goals and -#type/area and -#type/project and -#template';
let headers = ["File", "Linked Section"];
let tableValues = [];
let currentPage = dv.current();
let result_limit = 0;
let tbl;
//console.log(input); // Incluye los parametros pasados desde arriba


let loadDv = async (event) => {
    //let asdfqewrt = await dv.view("Z-Meta/dv-scripts/noteTagByRecent", { resultSize : event.target.value });
    //result_limit = event.target.value;
    //var allInputs = document.querySelectorAll(".dataview");
    //for (var element of allInputs) {
    //  element.remove();
    //}
    //var allInputs = document.querySelectorAll("h1");
    //for (var element of allInputs) {
    //  element.remove();
    //}
    //drawDataview();
}

//let root = await input.container.createEl('div', {cls: ["card"]});
//root.createEl("b", { "text" : "asdf", cls : "sdaf"});
//const numberInput = root.createEl("input");
//numberInput.addEventListener("focusout",loadDv);

let isUndefined = (value) => {
    return typeof value === 'undefined';
}

let filterTypeInlinks = (p) => {
    if (currentPage.show_unlinked_notes) {
        return true;
    }
    if (p.file.inlinks.length === 0) {
        return false;
    }
    for (let link of p.file.inlinks.values) {
        let p = dv.page(link.path);
        if (!isUndefined(p.tags) && !p.tags.contains("dashboard") && p.tags.contains("type/")) {
            return true;
        }
    }
    return false;
};

let getLinkedResources = (p) => {
    let linkedResources = [];
    for (let link of p.file.inlinks.values) {
        let p = dv.page(link.path);
        if (isUndefined(p.tags))  return linkedResources;
        for (let tag of p.tags.split(' ')) {
            if (tag.contains("type")) {
                linkedResources.push(tag + ': ' + '[[' + p.file.path + ']]');
            }
        }
    }
    return linkedResources;
}

let addResultToDict = (page, linkedResources, dict) => {
    let result = {
        page : page,
        linkedResources : linkedResources,
        isLinked : linkedResources.length === 0 ? '❌' : '✅'
    };
    let dateKey = page.file.mday.toFormat("ccc dd LLL yyyy");
    if (isUndefined(dict[dateKey])) {
        dict[dateKey] = [ result ];
    }
    else {
        dict[dateKey].push(result);
    }
    return dict;
}


let dateDict = {};
for (let page of dv.pages(query).filter(p => filterTypeInlinks(p)).sort(p => p.file.mday, 'desc')) {
    let linkedResources = getLinkedResources(page);
    dateDict = addResultToDict(page, linkedResources, dateDict);
}

let drawDataview = () => {
    //dv.el("span", result_limit);
    for (let dateKey of Object.keys(dateDict).sort(a => a, 'desc')) {
        let text = [];
        dv.header(1, dateKey);
        for (let p of dateDict[dateKey]) {
            let asd = '';
            asd = asd + p.isLinked + '[['+p.page.file.name+']] <ul>';
            if (dv.current().show_references) {
                for (let linkedResource of p.linkedResources) {
                    asd = asd + '<li\>'+linkedResource+'</li>';
                }
            }
            asd = asd + '</ul>';
            text.push(asd);
        }
        //root.createEl("div", { "text" : text, cls : "sdaf"});
        dv.list(text);
    }
}

drawDataview();
