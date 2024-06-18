const fs = require('fs');
const path = require('path');
const { generateAssetsLink } = require('./config');
// Get current directory
const currentDir = path.resolve('.');
console.log(currentDir);
const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

// Function to create README file
const createReadme = function (files) {
  const readmeContent = `# Directory Listing\n\n## Files\n\n${files.join(
    '\n'
  )}`;

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
