import { CheckCircle, Cpu, Download, HardDrive, Shield } from 'lucide-react';

export default function Downloads() {
  return (
    <div className="docs-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">downloads</p>
          <h1>Build and install</h1>
          <p>Get ripnet onto your system and start inspecting traffic with a small set of dependencies.</p>
        </div>
      </header>

      <section className="command-grid" aria-label="Installation instructions">
        <article className="command-card">
          <div className="command-card-header">
            <div>
              <h2>From source</h2>
              <p>Clone the repository, build it, and install the binary.</p>
            </div>
            <Download aria-hidden="true" size={16} />
          </div>
          <div className="command-examples">
            <div className="command-line"><code>git clone https://github.com/playfairs/ripnet.git</code></div>
            <div className="command-line"><code>cd ripnet</code></div>
            <div className="command-line"><code>make &amp;&amp; sudo make install</code></div>
          </div>
        </article>

        <article className="command-card">
          <div className="command-card-header">
            <div>
              <h2>Requirements</h2>
              <p>Install the prerequisites for compilation and packet capture.</p>
            </div>
            <CheckCircle aria-hidden="true" size={16} />
          </div>
          <div className="command-meta">
            <div className="mini-list">
              <span>System</span>
              <ul>
                <li>Linux or macOS</li>
                <li>gcc compiler</li>
                <li>make build tool</li>
              </ul>
            </div>
            <div className="mini-list">
              <span>Deps</span>
              <ul>
                <li>libpcap development library</li>
                <li>pthread support</li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="group-board" aria-label="System requirements">
        <div className="group-block">
          <h2>Platform notes</h2>
          <div className="group-links">
            <div>
              <span>
                <strong>Operating systems</strong>
                <small>Linux 2.6+ and macOS 10.12+</small>
              </span>
              <Cpu aria-hidden="true" size={15} />
            </div>
            <div>
              <span>
                <strong>Dependencies</strong>
                <small>libpcap 1.0+ and pthread support</small>
              </span>
              <HardDrive aria-hidden="true" size={15} />
            </div>
          </div>
        </div>

        <div className="group-block">
          <h2>Permissions</h2>
          <div className="group-links">
            <div>
              <span>
                <strong>Privileges</strong>
                <small>Root or sudo access may be required for packet capture.</small>
              </span>
              <Shield aria-hidden="true" size={15} />
            </div>
          </div>
        </div>
      </section>

      <section className="reference-panel" aria-label="Quick start">
        <div className="reference-heading">
          <h2>Quick start</h2>
          <p>Verify the install from the command line.</p>
        </div>
        <div className="option-table">
          <div>
            <code>Version</code>
            <span>Current release is 1.0.0.</span>
          </div>
          <div>
            <code>Check it</code>
            <span>Run ripnet --help after installation.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
