#!/usr/bin/env bash
# agent-toolkit bump-version.sh
# Bumps the version in VERSION, package.json, and plugin manifests
#
# Usage: bash bump-version.sh [major|minor|patch]

set -euo pipefail

TOOLKIT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERSION_FILE="$TOOLKIT_ROOT/VERSION"

# Read current version
if [ ! -f "$VERSION_FILE" ]; then
  echo "0.1.0" > "$VERSION_FILE"
fi

CURRENT="$(cat "$VERSION_FILE")"
BUMP_TYPE="${1:-patch}"

# Parse version
MAJOR="$(echo "$CURRENT" | cut -d. -f1)"
MINOR="$(echo "$CURRENT" | cut -d. -f2)"
PATCH="$(echo "$CURRENT" | cut -d. -f3)"

# Bump
case "$BUMP_TYPE" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
  *) echo "Usage: $0 [major|minor|patch]"; exit 1 ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"

echo "Bumping version: $CURRENT → $NEW_VERSION"

# Update VERSION
echo "$NEW_VERSION" > "$VERSION_FILE"

# Update package.json
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" "$TOOLKIT_ROOT/package.json"

# Update plugin manifests
for manifest in "$TOOLKIT_ROOT/.claude-plugin/plugin.json" "$TOOLKIT_ROOT/.codex-plugin/plugin.json" "$TOOLKIT_ROOT/.cursor-plugin/plugin.json"; do
  [ -f "$manifest" ] && sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" "$manifest"
done

echo "✅ Version bumped to $NEW_VERSION"