// src/app/api/linear-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "node:child_process";
import path from "node:path";

type LinearLabel = { id: string; name: string };

type LinearIssue = {
  id: string;
  identifier: string;
  title: string;
  description?: string;
  // Linear can send labels as an array OR as { nodes: [...] }
  labels?: LinearLabel[] | { nodes: LinearLabel[] };
  labelIds?: string[];
};

type LinearWebhookPayload = {
  action?: string;
  type?: string;
  data?: LinearIssue;
};

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as LinearWebhookPayload;
  console.log(
    "[Linear Webhook] Raw payload:",
    JSON.stringify(payload, null, 2),
  );

  const issue = payload?.data;
  if (!issue) {
    console.warn("[Linear Webhook] No issue data in payload");
    return NextResponse.json(
      { ok: false, reason: "no_issue_data" },
      { status: 200 },
    );
  }

  // --- Normalize labels ---

  // Case 1: labels is an array: labels: [ { id, name } ]
  const labelNamesFromArray: string[] = Array.isArray(issue.labels)
    ? issue.labels
        .map((l) => l?.name)
        .filter((n): n is string => typeof n === "string")
    : [];

  // Case 2: labels is an object: labels: { nodes: [ { id, name } ] }
  const labelNamesFromNodes: string[] =
    !Array.isArray(issue.labels) && issue.labels?.nodes
      ? issue.labels.nodes
          .map((l) => l?.name)
          .filter((n): n is string => typeof n === "string")
      : [];

  // Combine and dedupe
  const labelNames = Array.from(
    new Set([...labelNamesFromArray, ...labelNamesFromNodes]),
  );

  // Label IDs (from your JSON: "labelIds": ["..."])
  const labelIds: string[] = Array.isArray(issue.labelIds)
    ? issue.labelIds
    : [];

  const autocodeLabelId = process.env.LINEAR_AUTOCODE_LABEL_ID;

  const hasAutocode =
    labelNames.includes("autocode") ||
    (!!autocodeLabelId && labelIds.includes(autocodeLabelId));

  console.log("[Linear Webhook] Issue:", {
    id: issue.id,
    key: issue.identifier,
    title: issue.title,
    labelNames,
    labelIds,
    autocodeLabelId,
    hasAutocode,
  });

  if (!hasAutocode) {
    console.log("[Linear Webhook] Ignoring issue without 'autocode' label");
    return NextResponse.json(
      { ok: true, handled: "ignored_no_autocode" },
      { status: 200 },
    );
  }

  // --- Spawn the headless Claude agent (fire-and-forget) ---

  try {
    const scriptPath = path.join(
      process.cwd(),
      "..",
      "scripts",
      "run_autocode_agent.sh",
    );

    const child = spawn(
      scriptPath,
      [
        issue.identifier,
        issue.title,
        issue.description ?? "",
        labelNames.join(","),
      ],
      {
        env: {
          ...process.env,
          AUTOCODE_REPO_PATH: process.env.AUTOCODE_REPO_PATH ?? "",
        },
        stdio: "inherit", // so you see logs in the Next.js terminal
      },
    );

    child.on("error", (err) => {
      console.error("[Linear Webhook] Failed to start autocode agent:", err);
    });

    console.log(
      "[Linear Webhook] ✅ Started autocode agent for",
      issue.identifier,
    );

    return NextResponse.json(
      {
        ok: true,
        handled: "autocode_issue",
        agent: "claude-headless",
        issueKey: issue.identifier,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[Linear Webhook] Error spawning agent:", err);
    return NextResponse.json(
      { ok: false, handled: "autocode_issue", error: "spawn_failed" },
      { status: 500 },
    );
  }
}
