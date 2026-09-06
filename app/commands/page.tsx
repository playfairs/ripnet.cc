import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import CommandsClient, { type CommandEntry } from "./CommandsClient";

type CommandsDocument = {
  commands?: CommandEntry[];
};

export default function CommandsPage() {
  const source = readFileSync(
    path.join(process.cwd(), "data/commands.yaml"),
    "utf8",
  );
  const document = parse(source) as CommandsDocument;
  const entries = document.commands ?? [];

  return <CommandsClient entries={entries} />;
}
