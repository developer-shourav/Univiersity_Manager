import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';

export const hostImageToCloudinary = async (imageName: string, imagePath: string) => {
  // -------------Configuration values for cloudinary
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  // -------------Upload an image to cloudinary
  const uploadResult = await cloudinary.uploader
    .upload(
      imagePath,
      {
        public_id: imageName,
      },
    )
    .catch((error) => {
      console.log(error);
    });
  console.log({ uploadResult });
};

// -------------Configuration for multer for temporary storage and file management
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
