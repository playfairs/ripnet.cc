import { readFileSync } from "node:fs";
import path from "node:path";
import { ArrowRight, Github, Shield, Terminal } from "lucide-react";

const versionUrl =
  "https://raw.githubusercontent.com/playfairs/ripnet/refs/heads/master/VERSION";

async function getLatestVersion() {
  try {
    const response = await fetch(versionUrl, { next: { revalidate: 300 } });
    if (!response.ok) return "unavailable";
    return (await response.text()).trim() || "unavailable";
  } catch {
    return "unavailable";
  }
}

const commandCount = (
  readFileSync(path.join(process.cwd(), "data/commands.yaml"), "utf8").match(
    /^  - name:/gm,
  ) ?? []
).length;

const examples = [
  ["Inspect interfaces", "ripnet list-interfaces"],
  ["Check reachability", "ripnet ping 1.1.1.1"],
  ["Resolve a domain", "ripnet dns-lookup playfairs.cc"],
];

export default async function Home() {
  const latestVersion = await getLatestVersion();

  return (
    <div className="overview-page">
      <section className="overview-hero">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> ripnetwork{" "}
          </p>
          <h1>a networking tool for all.</h1>
          <p className="hero-lede">
            Ripnet brings diagnostics, packet analysis, observability,
            discovery, and authorized testing into one focused command line.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="/download">
              Download v{latestVersion} <ArrowRight size={16} />
            </a>
            <a className="primary-action" href="/commands">
              Explore commands <ArrowRight size={16} />
            </a>
            <a
              className="text-action"
              href="https://github.com/playfairs/ripnet"
              rel="noreferrer"
              target="_blank"
            >
              <Github size={16} /> Source
            </a>
          </div>
        </div>
        <div className="overview-terminal">
          <div className="terminal-top">
            <span />
            <span />
            <span />
            <small>ripnet</small>
          </div>
          <div className="terminal-body">
            <p>
              <i>$</i> ripnet list-interfaces
            </p>
            <p className="terminal-muted">XHC0 mtu=0 rx=0 tx=0</p>
            <p className="terminal-muted">XHC1 mtu=0 rx=0 tx=0 ...</p>
            <p>
              <i>$</i> ripnet ping 1.1.1.1
            </p>
            <p className="terminal-good">1.1.1.1: reachable (24.00 ms)</p>
            <p>
              <i>$</i> ripnet dns-lookup example.com
            </p>
            <p className="terminal-good">104.20.23.154</p>
            <p className="terminal-good">172.66.147.243</p>
            <p>
              <i>$</i> <span className="cursor" />
            </p>
          </div>
        </div>
      </section>
      <section className="stat-grid">
        <div>
          <strong>v{latestVersion}</strong>
          <span>latest version</span>
        </div>
        <div>
          <strong>{commandCount}</strong>
          <span>commands documented</span>
        </div>
        <div>
          <strong>D</strong>
          <span>primary language</span>
        </div>
        <div>
          <strong>CLI</strong>
          <span>built for fast checks</span>
        </div>
        <div>
          <strong>macOS, Linux, BSD</strong>
          <span>platform-aware workflows</span>
        </div>
      </section>
      <section className="overview-grid">
        <article className="overview-card feature-card">
          <p className="eyebrow">one reference</p>
          <h2>Find the right operation.</h2>
          <p>
            Search commands by name, workflow, or flag. Every entry includes a
            usage form and a clear note when it depends on platform tools or
            privileges.
          </p>
          <a className="inline-link" href="/commands">
            Open command reference <ArrowRight size={15} />
          </a>
        </article>
        <article className="overview-card">
          <Terminal size={20} />
          <h2>Start small.</h2>
          <div className="example-list">
            {examples.map(([label, command]) => (
              <div key={command}>
                <span>{label}</span>
                <code>{command}</code>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="authorization-card">
        <Shield size={21} />
        <div>
          <p className="eyebrow">responsible use</p>
          <h2>Know the network before you touch it.</h2>
          <p>
            Use active scanning, packet capture, ARP operations, firewall
            changes, and load testing only on systems and networks you own or
            are explicitly authorized to test.
          </p>
        </div>
      </section>
      <footer className="site-footer">
        <span>© 2026 ripnetwork</span>
        <a
          href="https://github.com/playfairs/ripnet"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        <a
          href="https://github.com/playfairs/ripnet/issues"
          rel="noreferrer"
          target="_blank"
        >
          Issues
        </a>
        <span className="footer-build">D / Meson / libpcap</span>
      </footer>
    </div>
  );
}
