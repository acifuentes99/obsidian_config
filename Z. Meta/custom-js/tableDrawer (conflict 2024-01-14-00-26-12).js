class tableDrawer {

    setState(key, obj) {
        window.customJS.state[key] = obj;
    }

    getState(key) {
        return window.customJS.state[key];
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

    async returnFormattedFunctionWithType(args) {
        //console.log(JSON.stringify(Object.keys(args)));
        const { file, func, functionArray, that, dv, app, instance } = args;
        //if (that.debug) {
        //    console.log(func);
        //    console.log(file);
        //    console.log(that);
        //}
        const fileData = file.file;
        if (func.type === 'text') {
            return func.code(fileData) ?? '';
        }
        else if (func.type === 'link') {
            return '[[' + fileData.file.path + '|' + fileData.file.name + ']]';
        }
        else if (func.type === 'date') {
            let dateString = func.code(fileData) ?? '';
            if (dateString === '') {
                return '';
            }
            dateString = dateString.toString();
            dateString = dateString.substring(0,4) + '-' + dateString.substring(4,6) + '-' + dateString.substring(6,8);
            //console.log(dateString);
            return dv.date(dateString);
        }
        else if (func.type === 'select') {
            const { fieldModifier : f } = instance.app.plugins.plugins["metadata-menu"].api;
            console.log(f);
            console.log(JSON.stringify(Object.keys(file.file)));
            //return func.code(file) ?? '';
            return await f(dv, file, "status");
        }
        else if (func.type === 'button') {
            const { createButton } = app.plugins.plugins["buttons"];
            return createButton({
                app, 
                el: instance.container,
                args: {name: func.args.name},
                clickOverride: {click: this.updateTag, params: func.args.params(fileData)}}
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
}
