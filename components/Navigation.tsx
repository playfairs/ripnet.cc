"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <aside className="top-shell">
        <a className="wordmark" href="/">
          <span>r</span>ipnet
        </a>
        <nav>
          <a href="/commands">Commands</a>
          <a href="/quick-start">Quick start</a>
        </nav>
        <a
          className="shell-github"
          href="https://github.com/playfairs/ripnet"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </aside>
      <header className="mobile-shell">
        <a className="wordmark" href="/">
          <span>r</span>ipnet
        </a>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          type="button"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        {open && (
          <nav>
            <a href="/commands" onClick={() => setOpen(false)}>
              Commands
            </a>
            <a href="/quick-start" onClick={() => setOpen(false)}>
              Quick start
            </a>
            <a href="https://github.com/playfairs/ripnet">GitHub</a>
          </nav>
        )}
      </header>
    </>
  );
}
