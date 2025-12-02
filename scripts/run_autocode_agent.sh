#!/usr/bin/env bash
set -euo pipefail

# Arguments from webhook:
# 1: ISSUE_KEY   (e.g. APP-123)
# 2: TITLE       (string)
# 3: DESCRIPTION (string)
# 4: LABELS      (comma-separated)
ISSUE_KEY="${1:-}"
TITLE="${2:-}"
DESCRIPTION="${3:-}"
LABELS="${4:-}"

if [[ -z "${ISSUE_KEY}" ]]; then
  echo "[run_autocode_agent] ERROR: ISSUE_KEY is required as first argument" >&2
  echo "Usage: run_autocode_agent.sh ISSUE_KEY TITLE DESCRIPTION LABELS" >&2
  exit 1
fi

# Where the repo lives. Prefer env var, fall back to your known path.
REPO_DIR="${AUTOCODE_REPO_PATH:-/Users/salilmonga/CSUN/disney-ai-plus}"

if [[ ! -d "${REPO_DIR}" ]]; then
  echo "[run_autocode_agent] ERROR: REPO_DIR does not exist: ${REPO_DIR}" >&2
  exit 1
fi

echo "[run_autocode_agent] Starting for issue ${ISSUE_KEY}"
echo "[run_autocode_agent] Repo: ${REPO_DIR}"
echo "[run_autocode_agent] Title: ${TITLE}"
echo "[run_autocode_agent] Labels: ${LABELS}"

cd "${REPO_DIR}"

# Build a short slug from the title for branch naming
SLUG=$(echo "${TITLE}" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-//;s/-$//' | cut -c1-40)
BRANCH_NAME="autocode/$(echo "${ISSUE_KEY}" | tr '[:upper:]' '[:lower:]')-${SLUG}"

# The instructions we send to Claude
PROMPT=$(cat <<EOF
You are an autonomous coding agent running inside this repository.

You were triggered by a Linear issue:

- Issue key: ${ISSUE_KEY}
- Title: ${TITLE}
- Labels: ${LABELS}
- Description (Markdown):

${DESCRIPTION}

Your tasks for THIS RUN:

1. Create (or checkout if it already exists) a feature branch named:

   \`${BRANCH_NAME}\`

   based off the main development branch (usually \`main\` or \`master\`).
   Do NOT push or commit on the default branch directly.

2. Analyze the codebase structure and the issue description above.
   Decide what needs to change in this Next.js / TypeScript app to move this issue forward.
   Prefer minimal, targeted changes over wide refactors.

3. Implement the required changes:
   - Modify or create files as needed.
   - Follow existing patterns, architecture, and code style.
   - Add or update tests when reasonable.

4. Run checks:
   - If available, run tests or linters (for example: \`pnpm test\`, \`npm test\`, \`pnpm lint\`, or \`npm run lint\`).
   - If those commands do not exist, note that and continue.

5. Stage, commit, and push:
   - Stage the relevant files.
   - Write a clear commit message that includes the issue key (e.g. "[${ISSUE_KEY}] ${TITLE}").
   - Commit the changes.
   - Push the feature branch \`${BRANCH_NAME}\` to the remote (typically \`origin\`).

Constraints and safety:

- Never commit directly to the main branch.
- Avoid touching .env and secret files.
- Avoid destructive operations like wiping large directories or histories.
- If there is any ambiguity, make a reasonable, conservative assumption and proceed.

At the end of your run, provide a short summary in the terminal output including:

- The branch name you used.
- The files you changed.
- Which commands you ran (tests/linters) and their results.
- Any TODOs or follow-ups you recommend.

EOF
)

echo "[run_autocode_agent] Launching Claude in headless-ish mode..."
echo "[run_autocode_agent] Branch target: ${BRANCH_NAME}"

# NOTE:
# This assumes `claude` CLI is installed and on PATH.
# We keep the invocation simple; you can add flags like --permission-mode or tools
# later depending on your CLI version.
claude -p "${PROMPT}" \
  --permission-mode bypassPermissions \
  --dangerously-skip-permissions

EXIT_CODE=$?
echo "[run_autocode_agent] Claude finished with exit code ${EXIT_CODE}"
exit "${EXIT_CODE}"
