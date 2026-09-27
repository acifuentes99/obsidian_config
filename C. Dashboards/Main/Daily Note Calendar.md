---
obsidianUIMode: preview
cssclasses: no-hover
cssclass: no-hover
---

# 📅 Daily Note Calendar

One dot per daily note that exists in your vault. Hover a dot to preview the note.
Use the arrows to move all three months together.

```datacorejsx
const Calendar = await dc.require("Z. Meta/datacore/calendar.jsx");

const dateFromPath = (path) => {
    const m = (path ?? "").match(/(\d{4}-\d{2}-\d{2})/);
    return m ? dc.luxon.DateTime.fromISO(m[1]) : null;
};

const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
};
const btnStyle = {
    cursor: "pointer",
    padding: "0.15rem 0.55rem",
    borderRadius: "4px",
    border: "1px solid var(--background-modifier-border)",
    background: "var(--background-secondary)",
    color: "var(--text-normal)",
    fontSize: "0.85rem",
    lineHeight: "1.5",
};
const rowStyle = {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    alignItems: "flex-start",
};

return function View() {
    const [center, setCenter] = dc.useState(() => dc.luxon.DateTime.now().startOf("month"));
    const pages = dc.useQuery(`@page and path("Y. Journal/Daily")`, { debounce: 2500 });

    const sharedProps = {
        pages,
        getDate:  (p) => dateFromPath(p.$path ?? p.$name ?? ""),
        getFile:  (p) => p.$path ?? "",
        getLabel: (p) => p.$name ?? p.$path ?? "",
    };

    return (
        <div>
            <div style={navStyle}>
                <button style={btnStyle} onClick={() => setCenter(d => d.minus({ months: 1 }))}>‹</button>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {center.minus({ months: 1 }).toFormat("LLL yyyy")}
                    {" · "}
                    <strong style={{ color: "var(--text-normal)" }}>{center.toFormat("LLL yyyy")}</strong>
                    {" · "}
                    {center.plus({ months: 1 }).toFormat("LLL yyyy")}
                </span>
                <button style={btnStyle} onClick={() => setCenter(d => d.plus({ months: 1 }))}>›</button>
                <button style={btnStyle} onClick={() => setCenter(dc.luxon.DateTime.now().startOf("month"))}>Today</button>
            </div>
            <div style={rowStyle}>
                <Calendar {...sharedProps} viewDate={center.minus({ months: 1 })} />
                <Calendar {...sharedProps} viewDate={center} />
                <Calendar {...sharedProps} viewDate={center.plus({ months: 1 })} />
            </div>
        </div>
    );
};
```
