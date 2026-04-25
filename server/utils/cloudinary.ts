import { v2 as Cloudinary } from "cloudinary";
import fs from "fs";
import {
  cloudinary_api_key,
  cloudinary_api_secret,
  cloudinary_cloud_name,
} from "server/config/config";
import { ApiError } from "./ApiError";

Cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});


export const uploadImage = async (localFilePath: string): Promise<string | undefined> => {

  try {
    const upload = await Cloudinary.uploader.upload(localFilePath, {
      resourceType: "image",
      transformation: [
        { crop: "scale" },
        { quality: 100 },
        { fetch_format: "auto" },
      ],
    });
    
    fs.unlinkSync(localFilePath);

    if (!upload.secure_url)
      throw new ApiError(500, "Internal error, Failed to upload file!");
    
    return upload.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("failed to upload", error);
  }
};

export const deleteImage = async (public_id: string) => {
  if (!public_id) return null;

  try {
    await Cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("failed to delete", error);
  }
};
