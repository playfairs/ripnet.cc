"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Network,
  Search,
  Shield,
  Terminal,
} from "lucide-react";
import styles from "./quick-start.module.css";

type Recipe = {
  id: string;
  label: string;
  question: string;
  description: string;
  command: string;
  output: string[];
  icon: typeof Network;
};

const recipes: Recipe[] = [
  {
    id: "orient",
    label: "Orient yourself",
    question: "What is this machine connected to?",
    description:
      "Start with the local interfaces and the counters behind them.",
    command: "ripnet list-interfaces",
    output: [
      "XHC0                                mtu=0      rx=0 tx=0",
      "XHC1                                mtu=0      rx=0 tx=0",
      "...",
    ],
    icon: Network,
  },
  {
    id: "reach",
    label: "Check a path",
    question: "Can I reach the thing I need?",
    description:
      "Probe a known host before you investigate anything more dramatic.",
    command: "ripnet ping 1.1.1.1",
    output: ["1.1.1.1: reachable (24.00 ms)"],
    icon: Search,
  },
  {
    id: "resolve",
    label: "Name the signal",
    question: "What does this domain resolve to?",
    description: "Turn a hostname into addresses and make DNS visible.",
    command: "ripnet dns-lookup example.com",
    output: [
      "104.20.23.154",
      "104.20.23.154",
      "172.66.147.243",
      "172.66.147.243",
    ],
    icon: Shield,
  },
];

export default function QuickStartPage() {
  const [activeId, setActiveId] = useState(recipes[0].id);
  const [copied, setCopied] = useState(false);
  const activeRecipe =
    recipes.find((recipe) => recipe.id === activeId) ?? recipes[0];

  async function copyCommand() {
    await navigator.clipboard.writeText(activeRecipe.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> quick start
          </p>
          <h1>Begin with a question.</h1>
          <p className={styles.lede}>
            A good network check is a conversation: ask something small, read
            the signal, then decide what deserves your attention.
          </p>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <strong>
            start
            <br />
            here
          </strong>
        </div>
      </header>

      <main className={styles.workspace}>
        <section
          className={styles.chooser}
          aria-label="Choose a starting point"
        >
          <div className={styles.sectionLabel}>
            <span>Choose your first move</span>
            <span>{recipes.length} paths</span>
          </div>
          <div
            className={styles.recipeList}
            role="tablist"
            aria-label="Quick start recipes"
          >
            {recipes.map((recipe, index) => {
              const Icon = recipe.icon;
              return (
                <button
                  aria-selected={activeId === recipe.id}
                  className={`${styles.recipe} ${activeId === recipe.id ? styles.active : ""}`}
                  key={recipe.id}
                  onClick={() => {
                    setActiveId(recipe.id);
                    setCopied(false);
                  }}
                  role="tab"
                  type="button"
                >
                  <span className={styles.recipeNumber}>0{index + 1}</span>
                  <Icon size={18} />
                  <span>
                    <strong>{recipe.label}</strong>
                    <small>{recipe.question}</small>
                  </span>
                  <ArrowRight className={styles.recipeArrow} size={16} />
                </button>
              );
            })}
          </div>
          <p className={styles.note}>
            Each path starts read-only. Explore your own systems or systems you
            are authorized to test.
          </p>
        </section>

        <section className={styles.terminal} aria-live="polite">
          <div className={styles.terminalTop}>
            <span />
            <span />
            <span />
            <small>quick start / {activeRecipe.id}</small>
          </div>
          <div className={styles.terminalBody}>
            <p className={styles.prompt}>
              <i>$</i> {activeRecipe.command}
            </p>
            <p className={styles.commandDescription}>
              {activeRecipe.description}
            </p>
            <div className={styles.output} key={activeRecipe.id}>
              {activeRecipe.output.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className={styles.prompt}>
              <i>$</i> <span className={styles.cursor} />
            </p>
          </div>
          <button
            className={styles.copyButton}
            onClick={copyCommand}
            type="button"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
            {copied ? "Copied" : "Copy command"}
          </button>
        </section>
      </main>

      <section className={styles.nextStep}>
        <Terminal size={20} />
        <div>
          <p className="eyebrow">looking for more?</p>
          <h2>Look at all the commands in full detail.</h2>
          <p>
            The full reference covers everything from packet capture to route
            inspection.
          </p>
        </div>
        <a className="primary-action" href="/commands">
          Browse commands <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
}
