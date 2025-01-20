import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
});
export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    // Upload an image
    cloudinary.uploader
      .upload(
        path,
        {
          public_id: imageName,
        },
        function (error, result) {
          if (error) {
            reject(error);
          }
          resolve(result as UploadApiResponse);
          // delete a file asynchronously
          fs.unlink(path, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('File is deleted.');
            }
          });
        },
      )
      .catch((error) => {
        console.log(error);
      });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    cloudinary.url('shoes', {
      fetch_format: 'auto',
      quality: 'auto',
    });

    // console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    cloudinary.url('shoes', {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });

    // console.log(autoCropUrl);
  });
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
