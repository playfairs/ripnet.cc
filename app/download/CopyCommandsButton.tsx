"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import styles from "./download.module.css";

export default function CopyCommandsButton({ commands }: { commands: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCommands() {
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className={styles.copyButton} onClick={copyCommands} type="button">
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Copied" : "Copy commands"}
    </button>
  );
}
