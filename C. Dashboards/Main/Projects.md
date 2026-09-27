---
tags:
  - type/dashboard
obsidianUIMode: preview
cssclasses: no-hover
cssclass: no-hover
sticker: 1f4d4
typeToHide:
  - obsidian
  - nvim
---
![[Dashboards Navigation]]

`button-lqz2`

> [!info]- New project?
> ```button
> name New Project
> type command
> action From Template: Project
> ```
> ProjectType values : [[T. Templates/metadata-menu/Projects|Projects]]
> * Docu : [[Obsidian Proyects Docs]]

### Alt Projects
* [[Nvim Projects]]
* [[Obsidian Projects (Post 11 Feb 2024)]]
* [[Book and Self development action plans]]

```datacorejsx
const getTimestamp = (row) => {
    const v = row.$frontmatter?.timestamp?.value;
    if (!v) return null;
    const d = dc.coerce.date(v);
    if (d) return d;
    const s = v.toString();
    return dc.coerce.date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`);
};

const fmtDate = ts => ts ? ts.toFormat("LLL dd yyyy") : "—";
const fmtTypes = types => types.join(", ") || "—";

return function View() {
    const currentFile = dc.useCurrentFile({ debounce: 10000 });
    const typeToHideRaw = currentFile.$frontmatter?.typeToHide?.value;
    const typeToHide = Array.isArray(typeToHideRaw) ? typeToHideRaw : (typeToHideRaw ? [typeToHideRaw] : []);

    const allProjects = dc.useQuery(
        '@page and #type/project and !path("T. Templates")',
        { debounce: 2500 }
    );

    const projects = dc.useArray(allProjects, (arr) =>
        arr
            .filter(p => {
                const ptRaw = p.$frontmatter?.projectType?.value;
                if (!ptRaw) return true;
                const pts = Array.isArray(ptRaw) ? ptRaw : [ptRaw];
                return !pts.some(t => typeToHide.includes(t));
            })
            .map(p => {
                const status = p.$frontmatter?.status?.value;
                const tags = p.$tags ?? [];
                const isDone = tags.includes('#done') || status === 'done';
                const isArchived = !isDone && (tags.includes('#archive') || status === 'archive');
                const isColdTask = status === 'coldtask';
                const isBacklog = !isArchived && !isDone && (!status || status === 'backlog');
                const isActive = !isArchived && !isDone && !isBacklog && !isColdTask;
                const timestamp = getTimestamp(p);
                const ptRaw = p.$frontmatter?.projectType?.value;
                const types = ptRaw ? (Array.isArray(ptRaw) ? ptRaw : [ptRaw]) : [];
                return { link: p.$link, path: p.$path, name: p.$name ?? p.$path, status, types, timestamp, isDone, isArchived, isColdTask, isBacklog, isActive };
            })
            .sort(r => r.timestamp, "desc"),
        [typeToHide.join(",")]
    );

    const categories = dc.useMemo(() => ({
        active:    projects.filter(r => r.isActive),
        coldTasks: projects.filter(r => r.isColdTask),
        backlog:   projects.filter(r => r.isBacklog),
        archived:  projects.filter(r => r.isArchived),
        done:      projects.filter(r => r.isDone),
    }), [projects]);

    const updateStatus = async (path, newStatus) => {
        const file = app.vault.getAbstractFileByPath(path);
        if (!file) return;
        await app.vault.process(file, (content) => {
            if (/^status:/m.test(content)) {
                return content.replace(/^status:.*$/m, `status: ${newStatus}`);
            }
            return content.replace(/^---\n/, `---\nstatus: ${newStatus}\n`);
        });
    };

    const nowrap = { whiteSpace: "nowrap" };
    const actionStyle = { ...nowrap, cursor: "pointer", color: "var(--text-accent)", fontSize: "0.85rem" };

    const makeColumns = (actionLabel, actionStatus) => [
        { id: "File",   value: r => r.link },
        { id: "Date",   value: r => fmtDate(r.timestamp), render: (v) => <span style={nowrap}>{v}</span>, width: "minimum" },
        { id: "Status", value: r => r.status ?? "—",      render: (v) => <span style={nowrap}>{v}</span>, width: "minimum" },
        { id: "Type",   value: r => fmtTypes(r.types),    render: (v) => <span style={nowrap}>{v}</span>, width: "minimum" },
        ...(actionLabel ? [{
            id: "Action",
            value: r => r.path,
            render: (path) => <span style={actionStyle} onClick={() => updateStatus(path, actionStatus)}>{actionLabel}</span>,
            width: "minimum",
        }] : []),
    ];

    const ACTIVE_COLS   = makeColumns("To Backlog", "backlog");
    const COLD_COLS     = makeColumns("To Active",  "active");
    const BACKLOG_COLS  = makeColumns("To Active",  "active");
    const BASE_COLS     = makeColumns(null, null);

    const Section = ({ title, rows, columns }) => {
        const [query, setQuery] = dc.useState("");
        const visible = dc.useMemo(() => {
            const q = query.trim().toLowerCase();
            return q ? rows.filter(r => r.name.toLowerCase().includes(q)) : rows;
        }, [rows, query]);
        const count = visible?.length ?? 0;
        return (
            <div>
                <h2>{title} ({count})</h2>
                <input
                    type="text"
                    placeholder="Filter..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{ width: "100%", marginBottom: "0.5rem", padding: "4px 8px", background: "var(--background-secondary)", border: "1px solid var(--background-modifier-border)", borderRadius: "4px", color: "var(--text-normal)" }}
                />
                {count === 0
                    ? <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No items.</p>
                    : <dc.Table class="no-hover" rows={visible} columns={columns} paging={50} />
                }
            </div>
        );
    };

    return (
        <div>
            <Section title="Active"     rows={categories?.active}    columns={ACTIVE_COLS}  />
            <Section title="Cold Tasks" rows={categories?.coldTasks} columns={COLD_COLS}    />
            <Section title="Backlog"    rows={categories?.backlog}   columns={BACKLOG_COLS} />
            <Section title="Archived"   rows={categories?.archived}  columns={BASE_COLS}    />
            <Section title="Done"       rows={categories?.done}      columns={BASE_COLS}    />
        </div>
    );
};
```
