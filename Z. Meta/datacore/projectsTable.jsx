const { getSecitonOrdinalMap } = await dc.require("Z. Meta/datacore/utils/datacore.js");
const { projectUtils } = await dc.require("Z. Meta/datacore/utils/project.js");

const COLUMNS = [
    {
       id : "Name",
        value : (row) => row.$link
    },
    {
       id : "Date",
        value : (row) => row.timestamp?.toFormat('yyyy-MM-dd') ?? ''
    },
    {
       id : "Type",
        value : (row) => row.$frontmatter?.projecttype?.value
    }
];

return function ProjectsTable(args) {
    const data = dc.useQuery(`@page and path("A. PARA Notes/Projects") and #type/project`);
    const active = [];
    const cold = [];
    const managed = [];
    const pUtil = new projectUtils(dc);

    for (const page of data) {
      const frontmatter = page?.$frontmatter;
      const status = frontmatter?.status?.value;
      page.timestamp = pUtil.getDateFormatted(frontmatter?.timestamp?.value);

      if (status === 'active') active.push(page);
      else if (status === 'coldtask') cold.push(page);
      else if (status === 'managed') managed.push(page);
    }

    console.log(cold);
    return (<>
        <h2>Active</h2>
        <dc.Table rows={active} columns={COLUMNS} />
        <h2>Cold</h2>
        <dc.Table rows={cold} columns={COLUMNS} />
    </>);
}

