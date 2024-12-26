// scripts/bumpManifestVersion.js
const fs = require('fs');
const path = require('path');

const bumpType = process.argv[2]; // 'major', 'minor', or 'patch'
const environment = process.argv[3]; // 'staging' or 'production'
const manifestPath = path.resolve(__dirname, environment === 'staging' ? '../public/manifest-stg.json' : '../public/manifest-prod.json');

if (!bumpType || !['major', 'minor', 'patch'].includes(bumpType)) {
  console.error("Error: Please provide a valid bump type ('major', 'minor', 'patch').");
  process.exit(1);
}

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const versionParts = manifest.version.split('.').map(Number);

  switch (bumpType) {
    case 'major':
      versionParts[0]++;
      versionParts[1] = 0;
      versionParts[2] = 0;
      break;
    case 'minor':
      versionParts[1]++;
      versionParts[2] = 0;
      break;
    case 'patch':
      versionParts[2]++;
      break;
  }

  manifest.version = versionParts.join('.');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Updated version in manifest.json to:', manifest.version);
} catch (err) {
  console.error('Error updating manifest.json:', err);
  process.exit(1);
}
