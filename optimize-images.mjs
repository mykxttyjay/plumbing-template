import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = path.join(process.cwd(), 'public/images/photos');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  
  files.forEach(async (file) => {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const filePath = path.join(directoryPath, file);
      const tempFilePath = path.join(directoryPath, 'temp_' + file);
      
      try {
        await sharp(filePath)
          .resize({ width: 800, withoutEnlargement: true })
          .jpeg({ quality: 60, progressive: true })
          .toFile(tempFilePath);
          
        fs.unlinkSync(filePath);
        fs.renameSync(tempFilePath, filePath);
        console.log(`Optimized: ${file}`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  });
});
