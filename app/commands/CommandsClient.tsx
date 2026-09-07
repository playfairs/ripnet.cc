"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Search, Terminal, X } from "lucide-react";

export type CommandEntry = {
  name: string;
  category: string;
  description: string;
  usage: string;
  flags: string[];
  status: "available" | "platform" | "privileged" | "limited" | string;
};

type Props = {
  entries: CommandEntry[];
};

const statusLabels: Record<string, string> = {
  available: "ready",
  platform: "platform",
  privileged: "privileged",
  limited: "limited",
};

function categoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CommandsClient({ entries }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const [selectedEntry, setSelectedEntry] = useState<CommandEntry | null>(null);
  const filters = useMemo(
    () => [
      "All",
      ...new Set(entries.map((entry) => categoryLabel(entry.category))),
    ],
    [entries],
  );
  const visible = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return entries.filter((entry) => {
      const category = categoryLabel(entry.category);
      const searchable = [
        entry.name,
        category,
        entry.description,
        entry.usage,
        ...entry.flags,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (filter === "All" || category === filter) &&
        searchable.includes(normalizedQuery)
      );
    });
  }, [entries, filter, query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedEntry(null);
        setFilterOpen(false);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className="commands-page">
      <header className="commands-header">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> commands
          </p>
          <h1>command reference.</h1>
          <p>
            Positional commands first. Flags explain the detail. Search the full
            ripnet surface by workflow or name.
          </p>
        </div>
        <div className="command-count">
          <strong>{entries.length}</strong>
          <span>commands indexed</span>
        </div>
      </header>
      <div className="command-toolbar">
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search commands"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands, workflows, or flags"
            value={query}
          />
        </label>
        <div
          className={`filter-menu${filterOpen ? " is-open" : ""}`}
          ref={filterMenuRef}
        >
          <button
            aria-expanded={filterOpen}
            aria-haspopup="listbox"
            className="filter-select"
            onClick={() => setFilterOpen(!filterOpen)}
            type="button"
          >
            <span>Filter by</span>
            <strong>{filter}</strong>
            <ChevronRight size={15} />
          </button>
          {filterOpen && (
            <div className="filter-popover" role="listbox">
              {filters.map((item) => (
                <button
                  aria-selected={filter === item}
                  className={filter === item ? "selected" : ""}
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setFilterOpen(false);
                  }}
                  role="option"
                  type="button"
                >
                  {filter === item ? "✓" : ""}
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="command-list">
        {visible.length ? (
          visible.map((entry) => (
            <article
              aria-label={`Open details for ${entry.name}`}
              className="command-row"
              key={entry.name}
              onClick={() => setSelectedEntry(entry)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedEntry(entry);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="command-marker">
                <Terminal size={15} />
              </div>
              <div className="command-detail">
                <div className="command-title">
                  <h2>{entry.name}</h2>
                  <span className={`command-state ${entry.status}`}>
                    {statusLabels[entry.status] ?? entry.status}
                  </span>
                </div>
                <p>{entry.description}</p>
                <code>{entry.usage}</code>
              </div>
              <ChevronRight className="row-arrow" size={17} />
            </article>
          ))
        ) : (
          <div className="command-empty">
            <Terminal size={18} />
            <p>No commands match this search.</p>
          </div>
        )}
      </div>
      <CommandDetails
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </div>
  );
}

function CommandDetails({
  entry,
  onClose,
}: {
  entry: CommandEntry | null;
  onClose: () => void;
}) {
  if (!entry) return null;
  return (
    <div className="spotlight-backdrop" onMouseDown={onClose}>
      <section
        aria-label={`${entry.name} command details`}
        className="spotlight-modal command-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <p className="eyebrow">command details</p>
            <p>Reference information for this operation.</p>
          </div>
          <button
            aria-label="Close command details"
            className="spotlight-close"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </header>
        <div className="command-modal-body">
          <div className="command-modal-title">
            <Terminal size={19} />
            <h2>{entry.name}</h2>
            <span className={`command-state ${entry.status}`}>
              {statusLabels[entry.status] ?? entry.status}
            </span>
          </div>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{categoryLabel(entry.category)}</dd>
            </div>
            <div>
              <dt>Description</dt>
              <dd>{entry.description}</dd>
            </div>
            <div>
              <dt>Usage</dt>
              <dd>
                <code>{entry.usage}</code>
              </dd>
            </div>
            <div>
              <dt>Flags</dt>
              <dd>
                {entry.flags.length ? entry.flags.join(", ") : "No flags"}
              </dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{statusLabels[entry.status] ?? entry.status}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
