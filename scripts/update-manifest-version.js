const fs = require('fs');
const path = require('path');

// Paths to package.json and manifest.json
const packageJsonPath = path.join(__dirname, '../package.json');
const manifestJsonPath = path.join(__dirname, '../public/manifest.json'); // Adjust to your build output

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const manifestJson = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf8'));

// Update the version in manifest.json
manifestJson.version = packageJson.version;

// Write back to manifest.json
fs.writeFileSync(manifestJsonPath, JSON.stringify(manifestJson, null, 2));

console.log(`Updated manifest.json to version ${packageJson.version}`);
