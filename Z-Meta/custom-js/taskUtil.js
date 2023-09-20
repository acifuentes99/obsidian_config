class testClass {

  setState(key, obj) {
    window.customJS.state[key] = obj;
  }

  getState(key) {
    return window.customJS.state[key];
  }

  printSomething(something) {
    console.log(something);
    console.log(window.customJS.state);
    console.log(window.customJS);
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

  drawProjectList(resources, title, dv, app, that) {
    let text = [];
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
      const { createButton } = app.plugins.plugins["buttons"];
      const { update } = app.plugins.plugins["metaedit"].api;
      console.log(text);
      dv.table(['name','extra'], text.map(b => [b.text, createButton({app, el: that.container, args: {name: "To Active"}, clickOverride: {click: update, params: ['tags', this.removeTagFromTags('backlog', b.file.frontmatter.tags), b.file.path]}})]));
      ;
    }
    else if (title === 'Active') {
      const { createButton } = app.plugins.plugins["buttons"];
      const { update } = app.plugins.plugins["metaedit"].api;
      dv.table(['name','extra'], text.map(b => [b.text, createButton({app, el: that.container, args: {name: "To Backlog"}, clickOverride: {click: update, params: ['tags', this.addTagToTags('backlog', b.file.frontmatter.tags), b.file.path]}})]));
    }
    else {
      dv.table(['name','extra'], text.map(b => [b.text, '']));
    }
}
}
