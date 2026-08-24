import { Cloud, Code, ExternalLink, Folder, Github, Monitor, Smartphone } from 'lucide-react';

const projects = [
  {
    name: 'ripnet',
    description: 'The main CLI toolkit for network analysis, packet capture, and load testing.',
    tags: ['C', 'Networking', 'CLI'],
    icon: Code,
    status: 'active',
    link: 'https://github.com/playfairs/ripnet',
  },
  {
    name: 'ripnet-web',
    description: 'The official web presence for the toolkit, with docs, downloads, and project information.',
    tags: ['Next.js', 'Docs', 'Website'],
    icon: Monitor,
    status: 'active',
    link: 'https://github.com/playfairs/ripnet.cc',
  },
  {
    name: 'ripnet-gui',
    description: 'A future graphical interface for making diagnostics more accessible.',
    tags: ['GUI', 'Cross-platform'],
    icon: Monitor,
    status: 'coming-soon',
    link: '#',
  },
  {
    name: 'ripnet-lib',
    description: 'An upcoming library for integrating ripnet capabilities into other applications.',
    tags: ['Library', 'API'],
    icon: Code,
    status: 'coming-soon',
    link: '#',
  },
  {
    name: 'ripnet-cloud',
    description: 'Cloud-based monitoring and testing services for distributed networks.',
    tags: ['Cloud', 'SaaS'],
    icon: Cloud,
    status: 'coming-soon',
    link: '#',
  },
  {
    name: 'ripnet-mobile',
    description: 'Mobile diagnostics experiences for iOS and Android on the go.',
    tags: ['iOS', 'Android', 'Mobile'],
    icon: Smartphone,
    status: 'coming-soon',
    link: '#',
  },
];

export default function Projects() {
  return (
    <div className="docs-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">projects</p>
          <h1>ripnetwork ecosystem</h1>
          <p>Explore the core toolkit and the broader projects that extend it.</p>
        </div>
      </header>

      <section className="command-grid" aria-label="Project list">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <article className="command-card" key={project.name}>
              <div className="command-card-header">
                <div>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                </div>
                {project.status === 'coming-soon' ? <span className="short-flag">soon</span> : <Icon aria-hidden="true" size={16} />}
              </div>
              <div className="command-meta">
                <div className="mini-list">
                  <span>Tags</span>
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                {project.status === 'active' ? (
                  <a href={project.link} rel="noreferrer" target="_blank">
                    View project <ExternalLink aria-hidden="true" size={14} />
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>

      <section className="reference-panel" aria-label="Contribution callout">
        <div className="reference-heading">
          <h2>Contribute</h2>
          <p>Join the ripnetwork community and help shape future releases.</p>
        </div>
        <div className="option-table">
          <div>
            <code>GitHub</code>
            <span><a href="https://github.com/playfairs/ripnet" rel="noreferrer" target="_blank">Explore the organization</a></span>
          </div>
          <div>
            <code>Issues</code>
            <span><a href="https://github.com/playfairs/ripnet/issues" rel="noreferrer" target="_blank">Report bugs and suggest enhancements</a></span>
          </div>
        </div>
      </section>
    </div>
  );
}
