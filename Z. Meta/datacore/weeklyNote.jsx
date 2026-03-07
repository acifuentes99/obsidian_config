const commons = await dc.require("Z. Meta/datacore/utils/commons.js");

const COLUMNS = [
    {
        id : "Section",
        value : (row) => dc.coerce.link(`[[${row.$file}#${row.$title}|${row.$title}]]`)
    },
    {
        id : "Project",
        value : (row) => row.$parent?.$frontmatter?.project?.value
    }
];

const getWeekDates = (year, weekNumber) => {
    let date = new Date(year, 0, 1);

    while (date.getDat() !== 0) {
        date.setDate(date.getDate() + 1);
    }

    let weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        let day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        weekDates.push(day);
    }

    return weekDates;
}

const filterDateSectionsByTitle = (parentNode) => parentNode.$sections.filter(a => {
    const regex = /\[\[Y-Journal\/Daily\/\d{4}-\d{2}-\d{2}\|/i;
    return regex.test(a.$titile);
}).map(a => a.$ordinal);

const getSecitonOrdinalMap = (parentNode) => {
    const dateSections = filterDateSectionsByTitle(parentNode);
    let dict = {};

    for (i = 0; i < dateSections.length; i++) {
        let ordinals = [];
        let lastElement;
        if (i === dateSections.length - 1) {
            lastElement = parentNode.$sections.length + 1;
        }
        else {
            lastElement = dateSections[i+1];
        }

        for (j = dateSections[i] + 1; j < lastElement; j++) {
            ordinals.push(j);
        }
        dict[dateSections[i]] = ordinals;
    }
    return dict;
}

return function WeeklyNotes(args) {
    const fileNameArray = args.filename.split('-W');
    const year = parseInt(fileNameArray[0]);
    const weekNumber = parseInt(fileNameArray[1]) - 1;

    let sectionString = '';

    for (date of getWeekDates(year, weekNumber)) {
        const dateString = date.tiISOString().split('T')[0];
        const sectionTitle = `[[Y-Journal/Daily/${dateString}]]`;
        sectionString += `connected(${sectionTitle}) or `;
    }

    const data = dc.useQuery(`@section and (${sectionString} null)`);

    let filtered = [];
    for (sectionNode of data) {
        const parentNode = sectionNode.$parent;
        const ordinalMap = getSecitonOrdinalMap(parentNode);

        for (key in ordinalMap) {
            if (key == sectionNode.$ordinal) {
                filtered = filtered.concat(parentNode.$sections.filter(section => ordinalMap[key].includes(section.$ordinal)));
            }
        }
    }
    return <dc.Table rows={filtered} columns={COLUMNS} />;
}

