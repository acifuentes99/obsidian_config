class testClass {

    setState(key, obj) {
        window.customJS.state[key] = obj;
    }

    getState(key) {
        return window.customJS.state[key];
    }

    printSomething(something) {
    }

    addTagToTags(tag, tags) {
        let tagsArray = tags.split(',');
        tagsArray.push(tag);
        return tagsArray.join(',');
    }

    removeTagFromTags(tag, tags) {
        let tagsArray = tags.split(',');
        tagsArray = tagsArray.filter(tagToRemove => tagToRemove !== tag);

        return tagsArray.join(',');
    }

    async updateTag(propertyName, propertyValue, file) {
        const { update, createYamlProperty } = app.plugins.plugins["metaedit"].api;
        if (!file.frontmatter.hasOwnProperty('status')) {
            await createYamlProperty(propertyName, propertyValue, file.path);
        }
        else {
            await update(propertyName, propertyValue, file.path);
        }
        setTimeout(await app.workspace.activeLeaf.rebuildView(), 1000);
    }

    drawProjectList(resources, title, dv, app, that) {
        let text = [];
        const { createButton } = app.plugins.plugins["buttons"];
        //dv.header(1, title + ' (' + resources.length + ')');
        for (let p of resources) {
            let asd = '';
            let emoji = p.file.frontmatter?.emoji == null ? '' : p.file.frontmatter?.emoji;
            asd = asd + emoji + ' ' + p.link + '<ul>';
            if (!(p.inlinks)) {
                continue;
            }
            if (p.inlinks.length > 0) {
                for (let link of p.inlinks) {
                    asd = asd + '<li\>' + link + '</li>';
                }
            }
            asd = asd + '</ul>';
            text.push({'text': asd, 'file': p.file});
        }
        if (title === 'Backlog') {
            dv.table(['name','extra'], text.map(b => [
                b.text,
                createButton({app, el: that.container, args: {name: "To Active"}, clickOverride: {click: this.updateTag, params: ['status', 'active', b.file]}})]));
            ;
        }
        else if (title === 'Active') {
            dv.table(['name','extra'], text.map(b => [b.text, createButton({app, el: that.container, args: {name: "To Backlog"}, clickOverride: {click: this.updateTag, params: ['status', 'backlog', b.file]}})]));
        }
        else {
            dv.table(['name','extra'], text.map(b => [b.text, '']));
        }
    }
}
