"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Search, Terminal, X } from "lucide-react";

type Entry = {
  name: string;
  group: string;
  summary: string;
  usage: string;
  platform?: boolean;
};
const groups: Record<string, string[]> = {
  Interfaces: ["list-interfaces", "show-stats"],
  Capture: ["capture"],
  Reachability: [
    "ping",
    "ping-tcp",
    "ping-udp",
    "ping-sweep",
    "traceroute",
    "traceroute-tcp",
    "traceroute-udp",
    "traceroute-icmp",
  ],
  Scanning: [
    "scan",
    "port-scan",
    "service-scan",
    "network-scan",
    "udp-scan",
    "syn-scan",
    "fin-scan",
    "xmas-scan",
    "null-scan",
    "os-fingerprint",
    "vuln-scan",
  ],
  DNS: [
    "dns-lookup",
    "dns-reverse",
    "dns-query",
    "dns-server-test",
    "dns-trace",
    "dns-bruteforce",
    "dns-zone-transfer",
    "dnssec-verify",
    "dns-cache-flush",
  ],
  "Local network": [
    "arp-table",
    "arp-scan",
    "arp-spoof-detect",
    "arp-request",
    "arp-reply",
    "arp-cache-add",
    "arp-cache-delete",
  ],
  Discovery: [
    "discovery-ping",
    "discovery-arp",
    "discovery-dns",
    "discovery-snmp",
    "discovery-upnp",
    "discovery-mdns",
    "discovery-llmnr",
    "discovery-netbios",
    "discovery-smb",
    "discovery-http",
    "discovery-ssl",
  ],
  System: [
    "netstat",
    "netstat-listening",
    "netstat-route",
    "netstat-process",
    "netstat-interface",
    "netstat-group",
    "netstat-timer",
    "scan-processes",
  ],
  Routing: ["route-table", "route-get", "route-trace", "route-monitor"],
  Firewall: [
    "firewall-status",
    "firewall-log",
    "firewall-add",
    "firewall-delete",
    "firewall-flush",
    "block-ip",
    "unblock-ip",
    "block-port",
    "unblock-port",
  ],
  Monitoring: [
    "bandwidth-test",
    "bandwidth-speedtest",
    "bandwidth-monitor",
    "bandwidth-history",
    "bandwidth-limit",
    "bandwidth-shaper",
    "monitor-start",
    "monitor-stop",
    "monitor-status",
    "monitor-alert",
    "monitor-log",
    "monitor-export",
  ],
  Security: [
    "security-ssh",
    "security-http",
    "security-ssl",
    "security-smtp",
    "security-banner",
    "security-dns",
    "security-audit",
    "security-scan",
    "port-knocking",
  ],
  "Load testing": ["tcp-stress", "http-stress", "packet-flood", "ping-flood"],
  Other: ["ddos"],
};
const platformCommands = new Set([
  "capture",
  "traceroute",
  "traceroute-tcp",
  "traceroute-udp",
  "traceroute-icmp",
  "vuln-scan",
  "dns-trace",
  "dns-zone-transfer",
  "dnssec-verify",
  "dns-cache-flush",
  "arp-spoof-detect",
  "arp-request",
  "arp-reply",
  "arp-cache-add",
  "arp-cache-delete",
  "discovery-snmp",
  "discovery-upnp",
  "discovery-mdns",
  "discovery-llmnr",
  "discovery-netbios",
  "discovery-smb",
  "discovery-http",
  "discovery-ssl",
  "netstat",
  "netstat-listening",
  "netstat-route",
  "netstat-process",
  "netstat-group",
  "netstat-timer",
  "scan-processes",
  "route-trace",
  "route-monitor",
  "firewall-status",
  "firewall-log",
  "firewall-add",
  "firewall-delete",
  "firewall-flush",
  "block-ip",
  "unblock-ip",
  "block-port",
  "unblock-port",
  "bandwidth-speedtest",
  "bandwidth-history",
  "bandwidth-limit",
  "bandwidth-shaper",
  "security-dns",
  "security-audit",
  "security-scan",
  "tcp-stress",
  "http-stress",
]);
const summary: Record<string, string> = {
  ping: "Probe a host over the default TCP path.",
  scan: "Scan a TCP range with live progress.",
  "dns-lookup": "Resolve a hostname to addresses.",
  "list-interfaces": "List local interfaces and counters.",
  capture: "Capture and parse packets through libpcap.",
  "service-scan": "Scan a port and identify its service.",
  "arp-table": "Read the local ARP table.",
  netstat: "List active network connections.",
  "route-table": "Read the local route table.",
  "bandwidth-test": "Measure interface throughput.",
  "monitor-status": "Show the current monitor snapshot.",
  "security-http": "Check HTTP reachability.",
  "security-ssl": "Check TLS reachability.",
  ddos: "A harmless historical easter egg.",
};
const entries: Entry[] = Object.entries(groups)
  .flatMap(([group, names]) =>
    names.map((name) => ({
      name,
      group,
      summary: summary[name] ?? `${name.replaceAll("-", " ")} workflow.`,
      usage:
        `ripnet ${name} ${["list-interfaces", "show-stats", "capture", "netstat", "route-table", "firewall-status", "firewall-log", "bandwidth-speedtest", "bandwidth-history", "bandwidth-shaper", "monitor-start", "monitor-stop", "monitor-status", "ddos"].includes(name) ? "" : "TARGET"}`.trim(),
      platform: platformCommands.has(name),
    })),
  )
  .sort((left, right) => left.name.localeCompare(right.name));
const filters = ["All", ...Object.keys(groups)];

export default function CommandsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const visible = useMemo(
    () =>
      entries.filter(
        (entry) =>
          (filter === "All" || entry.group === filter) &&
          `${entry.name} ${entry.summary} ${entry.usage}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query],
  );
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEntry(null);
      if (event.key === "Escape") setFilterOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      )
        setFilterOpen(false);
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
          <h1>Command reference</h1>
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
        {visible.map((entry) => (
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
                <span
                  className={`command-state ${entry.platform ? "platform" : "available"}`}
                >
                  {entry.platform ? "platform" : "ready"}
                </span>
              </div>
              <p>{entry.summary}</p>
              <code>{entry.usage}</code>
            </div>
            <ChevronRight className="row-arrow" size={17} />
          </article>
        ))}
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
  entry: Entry | null;
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
            <span
              className={`command-state ${entry.platform ? "platform" : "available"}`}
            >
              {entry.platform ? "platform" : "ready"}
            </span>
          </div>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{entry.group}</dd>
            </div>
            <div>
              <dt>Description</dt>
              <dd>{entry.summary}</dd>
            </div>
            <div>
              <dt>Usage</dt>
              <dd>
                <code>{entry.usage}</code>
              </dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>
                {entry.platform
                  ? "Requires platform support"
                  : "Available on all supported platforms"}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
