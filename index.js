const fs = require('fs');
const path = require('path');
const { generateAssetsLink } = require('./config');
// Get current directory
const currentDir = path.resolve('.');
const baseURL = 'https://aniketchanana.github.io/public-assets';

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(
        path.join(dirPath, '/', file).replace(currentDir, baseURL)
      );
    }
  });

  return arrayOfFiles;
};

// Function to create README file
const createReadme = function (files) {
  const readmeContent = `## Files\n\n${files
    .map((file) => `- ${file}`)
    .join('\n')}`;

  fs.writeFileSync('README.md', readmeContent, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('README.md created successfully!');
  });
};

const allowedFolders = fs.readdirSync(currentDir).filter(generateAssetsLink);
const files = [];
allowedFolders.forEach((allowedFolder) => {
  files.push(...getAllFiles(`${currentDir}/${allowedFolder}`));
});
createReadme(files);

console.log('Script executed successfully.');
