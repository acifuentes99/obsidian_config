class projectUtils {

  getProjectNotes(resultsResources, dv, args) {
    let resources = [];
    this.dv = dv;
    for (let result of resultsResources) {
        if (this.isProjectType(result.file, args)) {
        // if (true) {
          resources.push(this.checkIfPARANoteIsArchived(result));
        }
    }
    resources.sort((a, b) => {return b.date - a.date}); //from recent to not recent
    return resources;
  }

  getResourceNotes(resultsResources, dv, args) {
    let resources = [];
    this.dv = dv;
    for (let result of resultsResources) {
          resources.push(this.checkIfPARANoteIsArchived(result));
    }
    resources.sort((a, b) => {return b.date - a.date}); //from recent to not recent
    return resources;
  }

  checkIfPARANoteIsArchived(file) {
      let isArchived = false;
      let isDone = false;
      let inlinks = [];
      let journals = [];
      const fileData = file.file;
      if (fileData.inlinks.values.length > 0) {
          for (const link of fileData.inlinks.values) {
              const p = this.dv.page(link.path);
              inlinks.push('[[' + p.file.path + ']]');
          }
      }
      if (fileData.outlinks.values.length > 0) {
          for (const link of fileData.outlinks.values) {
              if (link.path.includes("Y. Journal/RelatedJournal")) {
                  journals.push('[[' + link.path + ']]');
              }
          }
      }
      if (fileData.tags.values.includes("#done") || fileData.frontmatter.status === 'done') {
          isDone = true;
      }
      else if (fileData.tags.values.includes("#archive") || fileData.frontmatter.status === 'archive') {
          isArchived = true;
      }
      file.inlinks = inlinks;
      file.archived = isArchived;
      file.done = isDone;
      file.backlog = !isArchived && !isDone && this.isBacklog(fileData);
      return file;
  }

  isProjectType(file, args) {
    const fileProjectType = file.frontmatter.projectType;

    if (args.projectType) {
      if (fileProjectType) {
        return fileProjectType.includes(args.projectType);
      }
    }
    // else if (args.typeToHide) {
    else  {
      if (fileProjectType) {
        for (const value of fileProjectType) {
          if (args.typeToHide.includes(value)) {
            return false; // el true solo se retorna, si la condicion se cumple. asdf
          }
        }
      }
      return true; //True dashboard normal de Proyectos, default (no tiene type)
    }
  }

  isBacklog(file) {
      if (!file.frontmatter.hasOwnProperty('status')) {
          return true;
      }
      return file.frontmatter.status === 'backlog';
  }

  getDateFormatted(dateInteger) {
      if (!dateInteger) {
          return null;
      }
      const dateString = dateInteger.toString();
      const year = dateString.slice(0,4);
      const month = parseInt(dateString.slice(4,6)) - 1;
      const day = dateString.slice(6,8);
      const minutes = dateString.slice(8,10);
      const seconds = dateString.slice(10,12);
      return new Date(year, month, day, minutes, seconds);
  }

}
