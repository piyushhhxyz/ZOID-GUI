// const express = require('express');
// const fs = require('fs').promises;
// const path = require('path');
// const cors = require('cors');

// const app = express();
// const port = 4000; // You can change the port as needed

// app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/api/getImageData', async (req, res) => {
//   try {
//     const dataFolderPath = path.join(__dirname, 'DATA');
//     const imageData = await getImageData(dataFolderPath);

//     res.json({ imageData });
//   } catch (error) {
//     console.error('Error getting image data:', error);
//     res.status(500).json({ error: 'Error getting image data' });
//   }
// });

// async function getImageData(folderPath) {
//   const files = await fs.readdir(folderPath);
//   const imageData = [];

//   for (const file of files) {
//     const filePath = path.join(folderPath, file);
//     const fileStat = await fs.stat(filePath);

//     if (fileStat.isDirectory()) {
//       // If it's a directory, recursively fetch image data from the subfolder
//       const subfolderImageData = await getImageData(filePath);
//       imageData.push(...subfolderImageData);
//     } else if (isImageFile(file)) {
//       // If it's an image file, add image details to imageData
//       imageData.push({
//         filename: file,
//         size: fileStat.size,
//         // Add more image information as needed
//       });
//     }
//   }

//   return imageData;
// }

// function isImageFile(filename) {
//   const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
//   const extname = path.extname(filename).toLowerCase();
//   return imageExtensions.includes(extname);
// }

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000; // You can change the port as needed

app.use(cors());

// Serve static files from the "DATA" folder and its subfolders
app.use('/images', express.static(path.join(__dirname, 'DATA')));

app.get('/api/getImageFilenames', async (req, res) => {
  try {
    const dataFolderPath = path.join(__dirname, 'DATA');
    const imageFilenames = await getImageFilenames(dataFolderPath);

    res.json({ imageFilenames });
  } catch (error) {
    console.error('Error getting image filenames:', error);
    res.status(500).json({ error: 'Error getting image filenames' });
  }
});

async function getImageFilenames(dataFolderPath) {
  const folders = await fs.readdir(dataFolderPath);
  const imageFilenames = [];

  for (const folder of folders) {
    const folderPath = path.join(dataFolderPath, folder);
    const folderStat = await fs.stat(folderPath);

    if (!folderStat.isDirectory()) {
      continue; // Skip if it's not a directory
    }

    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileStat = await fs.stat(filePath);

      if (fileStat.isFile() && !file.startsWith('.')) {
        imageFilenames.push(path.join('/images', folder, file));
      }
    }
  }

  return imageFilenames;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
