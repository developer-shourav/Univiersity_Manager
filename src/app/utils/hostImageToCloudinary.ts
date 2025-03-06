import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const hostImageToCloudinary = async () => {
    // Configuration
    cloudinary.config({
        cloud_name: config.cloudinary_cloud_name,
        api_key: config.cloudinary_api_key,
        api_secret: config.cloudinary_api_secret,
    });


    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Radha_Krishna_at_Iskcon_Vrindavan.jpg', {
            public_id: 'HareKrishna',
        }
        )
        .catch((error) => {
            console.log("🚀 ~ hostImageToCloudinary ~ error:", error)

        });

        console.log("🚀 ~ hostImageToCloudinary ~ uploadResult:", uploadResult);
};
    
