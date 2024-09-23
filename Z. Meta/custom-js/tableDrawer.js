class tableDrawer {

    setState(key, obj) {
        window.customJS.state[key] = obj;
    }

    getState(key) {
        return window.customJS.state[key];
    }

    buttonMaker(args) {
        return '';
    //    console.log('sdfdsaf');
    //    const { params, file, app, instance, dv } = args;
    //    const btn = instance.container.createEl('button', {"text": "Done!"});
    //    const file = app.vault.getAbstractFileByPath(fpath)
    //    btn.addEventListener('click', async (evt) => {
    //        evt.preventDefault();
    //        //await update(pn, pv, file);
    //        await this.updateTag(params[0], params[1], params[2], params[3]);
    //    });
    //    return btn;
    }

    async updateTag(propertyName, propertyValue, file, app) {
        const { update, createYamlProperty } = app.plugins.plugins["metaedit"].api;
        if (!file.frontmatter.hasOwnProperty('status')) {
            await createYamlProperty(propertyName, propertyValue, file.path);
        }
        else {
            await update(propertyName, propertyValue, file.path);
        }
        setTimeout(await app.workspace.activeLeaf.rebuildView(), 1000);
    }

    transformJsonToArray(inputArray, that) {
        return inputArray.reduce((acc, obj) => {
            acc.name.push(obj.name);
            const typeCodeObj = {
                type : obj.type,
                code : obj.code,
                args : obj.args
            };
            acc.functions.push(typeCodeObj);
            return acc;
        }, { name: [], functions: []});
    }

    /* Returns dv date
     * As input, can be Zettle prefix date (YYYYMMDDHHSS), or ISO Timestamp (default by Obsidian propertys)
     * If date is not present, returns empty string (compatible for showing on tables)
     */
    parseDate(dateString, dv) {
        //if (dateString === '') {
        if (dateString == null) {
            return null;
        }

        dateString = dateString.toString();
        const possibleDate = dv.date(dateString);
        if (possibleDate) {
            return possibleDate;
        }

        dateString = dateString.substring(0,4) + '-' + dateString.substring(4,6) + '-' + dateString.substring(6,8);
        //+'T'+dateString.substring(8,10)+':'+dateString.substring(10,12)+':'+dateString.substring(12,14);
        return dv.date(dateString);
    }

    getTimestamp(p, dv) {
      if (p.file.frontmatter.timestamp) {
          return this.parseDate(p.file.frontmatter.timestamp, dv)
      }
      //else if (p["zettel-prefix"]) {
      //    return dv.date(p["zettel-prefix"]);
      //}
      return null;
    }

    async returnFormattedFunctionWithType(args) {
        const { file, func, functionArray, that, dv, app, instance } = args;
        //if (that.debug) {
        //    console.log(func);
        //    console.log(file);
        //    console.log(that);
        //}
        if (func.type === 'text') {
            return func.code(file) ?? '';
        }
        else if (func.type === 'link') {
            return '[[' + file.file.path + '|' + file.file.name + ']]';
        }
        else if (func.type === 'date') {
            // let dateString = func.code(file) ?? '';
            let dateString = func.code(file);
            return this.parseDate(dateString, dv) ?? '';
        }
        else if (func.type === 'select') {
            const { fieldModifier : f } = instance.app.plugins.plugins["metadata-menu"].api;
            return await f(dv, file, func.args.fieldName);
        }
        //else if (func.type === 'button') {
        //    return this.buttonMaker({params : func.args.params(file), file, app, instance, dv});
            //this.buttonMaker({params : func.args.params(file), file, app, instance, dv});
        //},
        else if (func.type === 'button') {
            const { createButton } = app.plugins.plugins["buttons"];
            return createButton({
                app,
                el: instance.container,
                args: {name: func.args.name},
                clickOverride: {click: this.updateTag, params: func.args.params(file)}}
            );
        }
    }

    async executeArrayFunction(args) {
        const { file, functionArray, that, dv, app, instance } = args;
        let result = [];
        functionArray.forEach(func => {
            result.push(this.returnFormattedFunctionWithType({func, ...args}));
        });
        return await Promise.all(result);
    }

    async drawTable(tableJson, fileArray, args) {
        const { that, app, dv, instance } = args;
        const tableData = this.transformJsonToArray(tableJson);
        const mappedFiles = await Promise.all(fileArray.map(async file => this.executeArrayFunction({ file, functionArray : tableData.functions, ...args })));
        dv.table(tableData.name, mappedFiles);
    }


// const consoleame = (a, b) => {
//     if (dummyFiles.some(x => a.file.name === x) ){
//         console.log("cosa " + a.file.path);
//         console.log("inlinks de la cosa " + a.file.inlinks);
//         console.log(currentPage.frontmatter["para-note-parent"]);
//         console.log(dv.page(a.file.inlinks[0].path).file.tags.values);
//         console.log("valor de la cosa " + b);
//     }
// }
}

