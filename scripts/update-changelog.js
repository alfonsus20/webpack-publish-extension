const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const changelogPath = path.resolve(__dirname, "CHANGELOG.md");
const version = require("./public/manifest.json").version;

// Generate changelog for the new version
const newChangelog = execSync(`npx auto-changelog --stdout --tag-prefix "v" --starting-version "v${version}"`, {
  encoding: "utf-8",
});

// Read the existing changelog
const existingChangelog = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf-8") : "";

// Combine the new changelog entries with the existing file
const updatedChangelog = `${newChangelog.trim()}\n\n${existingChangelog.trim()}`;

// Write back to the changelog file
fs.writeFileSync(changelogPath, updatedChangelog, "utf-8");

console.log(`CHANGELOG.md updated for version ${version}`);
