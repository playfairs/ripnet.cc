import { ArrowDownToLine, Check, Github, Terminal } from "lucide-react";
import styles from "./download.module.css";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type LatestRelease = {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: ReleaseAsset[];
};

const repository = "playfairs/ripnet";

async function getLatestRelease(): Promise<LatestRelease | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/releases/latest`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) return null;
    return (await response.json()) as LatestRelease;
  } catch {
    return null;
  }
}

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const linuxAsset = release?.assets.find((asset) =>
    asset.name.endsWith("linux-x86_64"),
  );
  const macosAsset = release?.assets.find((asset) =>
    asset.name.endsWith("macos-arm64"),
  );

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className="eyebrow">
            <ArrowDownToLine aria-hidden="true" size={14} /> latest release
          </p>
          <h1>download ripnet.</h1>
          <p className={styles.lede}>
            Download a ready-to-run binary for your machine, then install it on
            your PATH.
          </p>
        </div>
        <div className={styles.releaseStamp}>
          <span>current</span>
          <strong>{release?.tag_name ?? "unavailable"}</strong>
          <small>
            {release?.published_at
              ? new Date(release.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "GitHub release unavailable"}
          </small>
        </div>
      </header>

      <section className={styles.assetGrid} aria-label="Downloads">
        <DownloadCard
          asset={linuxAsset}
          platform="Linux"
          detail="x86_64 executable"
        />
        <DownloadCard
          asset={macosAsset}
          platform="macOS"
          detail="Apple Silicon / arm64 executable"
        />
      </section>

      <section className={styles.installGrid}>
        <article className={styles.installPanel}>
          <div className={styles.panelHeading}>
            <Terminal size={19} />
            <div>
              <p className="eyebrow">01 / Linux</p>
              <h2>Install from a terminal</h2>
            </div>
          </div>
          <ol>
            <li>Download the Linux asset above.</li>
            <li>Run the install command from the folder containing it.</li>
          </ol>
          <code>
            chmod +x ripnet-vVERSION-linux-x86_64
            <br />
            sudo install -m 755 ripnet-vVERSION-linux-x86_64 /usr/local/bin/ripnet
          </code>
          <p>Then verify it with <code>ripnet --version</code>.</p>
        </article>
        <article className={styles.installPanel}>
          <div className={styles.panelHeading}>
            <Terminal size={19} />
            <div>
              <p className="eyebrow">02 / macOS</p>
              <h2>Install from a terminal</h2>
            </div>
          </div>
          <ol>
            <li>Download the macOS arm64 asset above.</li>
            <li>Run these commands from the download folder.</li>
          </ol>
          <code>
            chmod +x ripnet-vVERSION-macos-arm64
            <br />
            sudo install -m 755 ripnet-vVERSION-macos-arm64 /usr/local/bin/ripnet
          </code>
          <p>Then verify it with <code>ripnet --version</code>.</p>
        </article>
      </section>

      <section className={styles.sourceLine}>
        <Github size={18} />
        <span>Assets are served directly from the latest GitHub release.</span>
        <a href={release?.html_url ?? `https://github.com/${repository}/releases`} rel="noreferrer" target="_blank">
          View release on GitHub
        </a>
      </section>
    </div>
  );
}

function DownloadCard({
  asset,
  platform,
  detail,
}: {
  asset?: ReleaseAsset;
  platform: string;
  detail: string;
}) {
  return (
    <article className={styles.assetCard}>
      <div className={styles.assetTop}>
        <div>
          <p className="eyebrow">{platform}</p>
          <h2>{detail}</h2>
        </div>
        <ArrowDownToLine size={22} />
      </div>
      <div className={styles.assetMeta}>
        <span>{asset?.name ?? "Asset unavailable"}</span>
        {asset && <span>{formatSize(asset.size)}</span>}
      </div>
      {asset ? (
        <a className="primary-action" download href={asset.browser_download_url}>
          <ArrowDownToLine size={16} /> Download
        </a>
      ) : (
        <span className={styles.disabledAction}>Unavailable</span>
      )}
    </article>
  );
}
