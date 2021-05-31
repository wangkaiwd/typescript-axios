const conventionalChangelog = require('conventional-changelog');
const fs = require('fs');
const path = require('path');
const filename = 'CHANGELOG.md';
const writeStream = fs.createWriteStream(path.resolve(__dirname, `../${filename}`));
conventionalChangelog({
  preset: 'angular'
}).pipe(writeStream).on('close', () => {
  console.log(`Generate release note at ${filename}`);
});