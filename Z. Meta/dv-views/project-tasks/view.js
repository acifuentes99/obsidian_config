const currentPage = dv.current().file;

const getProgress = (taskValues) => {
    const taskValuesLength = taskValues.length;
    let completedTaskLength = 0;
    for (const taskValue of taskValues) {
        if (taskValue.completed) {
            completedTaskLength += 1;
        }
    }
    return Math.round(100 * (completedTaskLength / taskValuesLength));
}

const filterShowDone = (taskValues) => {
    return taskValues.filter(task => {
        return !task.completed;
    });
}

const getDateFormatted = (dateInteger) => {
    if (!dateInteger) {
        return null;
    }
    let dateString = dateInteger.toString();
    let year = dateString.slice(0,4);
    let month = parseInt(dateString.slice(4,6)) - 1;
    let day = dateString.slice(6,8);
    let minutes = dateString.slice(8,10);
    let seconds = dateString.slice(10,12);
    return new Date(year, month, day, minutes, seconds);
}

const drawTasks = (result) => {
    if (result.tags.includes('archive') || result.tags.includes('done')) {
        return;
    }
    const tasks = result.tasks.values;
    if (!tasks.length) {
        return;
    }
    if (result.frontmatter.level === 1 && !currentPage.frontmatter['show-level-1']  ) {
        return;
    }
    else if (result.frontmatter.level === 2 && !currentPage.frontmatter['show-level-2']  ) {
        return;
    }
    else if (result.frontmatter.level === 3 && !currentPage.frontmatter['show-level-3']  ) {
        return;
    }

    let progress = getProgress(result.tasks.values);
    if (!currentPage.frontmatter['show-done']) {
        result.tasks.values = filterShowDone(result.tasks.values);
    }

    const theDate = getDateFormatted(result.frontmatter.timestamp).toLocaleString("es-CL", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
    const text = `##### ${result.name}\n**[Level : ${result.frontmatter.level} - Progress : ${progress}% - Date : ${theDate}]**`;
    dv.span(text);
    const taskList = dv.taskList(result.tasks, false);
}

for (const result of input.activeProjects) { drawTasks(result.file); }
