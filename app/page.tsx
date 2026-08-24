import Link from 'next/link';
import { ArrowRight, Box, Cpu, Github, Search, Shield, Terminal, Zap } from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'Interface Statistics',
    description: 'List interfaces, packet counts, byte totals, and error rates in a single view.',
  },
  {
    icon: Box,
    title: 'Packet Capture',
    description: 'Capture traffic with BPF filters, promiscuous mode, and protocol-aware parsing.',
  },
  {
    icon: Zap,
    title: 'Stress Testing',
    description: 'Run TCP and HTTP load tests with configurable concurrency, duration, and rate limits.',
  },
  {
    icon: Search,
    title: 'Port Scanning',
    description: 'Scan ranges and identify services with timeout-aware probing.',
  },
  {
    icon: Shield,
    title: 'Vulnerability Detection',
    description: 'Surface basic security issues before they become larger problems.',
  },
  {
    icon: Cpu,
    title: 'Process Monitoring',
    description: 'Find processes that are actively using the network from your host.',
  },
];

export default function Home() {
  return (
    <div className="docs-page">
      <header className="page-header hero-header">
        <div>
          <p className="eyebrow">ripnetwork project</p>
          <h1>ripnet</h1>
          <p>
            A compact toolkit for network diagnostics, observability, authorization-aware testing, and fast investigations.
          </p>
        </div>
        <div className="stat-stack" aria-label="Project highlights">
          <div>
            <strong>6</strong>
            <span>capabilities</span>
          </div>
          <div>
            <strong>CLI</strong>
            <span>focused</span>
          </div>
        </div>
      </header>

      <section className="overview-strip" aria-label="Quick navigation">
        <div>
          <span>Download</span>
          <code>make install</code>
        </div>
        <div>
          <span>Docs</span>
          <code>docs.ripnet.cc</code>
        </div>
        <div>
          <span>Source</span>
          <code>github.com/ripnetwork</code>
        </div>
      </section>

      <section className="group-board" aria-label="Website sections">
        <div className="group-block">
          <h2>Capabilities</h2>
          <div className="group-links">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title}>
                  <span>
                    <strong>{feature.title}</strong>
                    <small>{feature.description}</small>
                  </span>
                  <Icon aria-hidden="true" size={15} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="group-block">
          <h2>Quick links</h2>
          <div className="group-links">
            <Link href="/downloads">
              <span>
                <strong>Downloads</strong>
                <small>Build and install locally</small>
              </span>
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
            <a href="https://docs.ripnet.cc" rel="noreferrer" target="_blank">
              <span>
                <strong>Documentation</strong>
                <small>Command reference and usage notes</small>
              </span>
              <ArrowRight aria-hidden="true" size={15} />
            </a>
            <a href="https://github.com/playfairs/ripnet" rel="noreferrer" target="_blank">
              <span>
                <strong>GitHub</strong>
                <small>Open source repository</small>
              </span>
              <Github aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="reference-panel" aria-label="Project overview">
        <div className="reference-heading">
          <h2>About ripnet</h2>
          <p>Built for operators, researchers, and developers.</p>
        </div>
        <div className="option-table">
          <div>
            <code>Language</code>
            <span>C17 with portability in mind.</span>
          </div>
          <div>
            <code>Platforms</code>
            <span>Linux and macOS with minimal dependencies.</span>
          </div>
          <div>
            <code>Use cases</code>
            <span>Inspection, analysis, security testing, and performance checks.</span>
          </div>
        </div>
      </section>

      <section className="notice-panel" aria-label="Authorization notice">
        <Shield aria-hidden="true" size={18} />
        <p>
          Use these network tools only on systems and networks you own or have explicit authorization to test.
        </p>
      </section>
    </div>
  );
}
