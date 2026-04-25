import { ApiError } from "../utils/ApiError";

function isString(value: string | undefined, name: string): asserts value is string {
  if (value === null || value === undefined) throw new ApiError(404, `${name} is not defined`);
}

isString(process.env.MONGODB_URI, "mongodb string");
isString(process.env.AUTH_SECRET, "auth secret");
isString(process.env.CLOUDINARY_CLOUD_NAME, "cloudinary cloud name");
isString(process.env.CLOUDINARY_API_KEY, "cloudinary api key");
isString(process.env.CLOUDINARY_API_SECRET, "cloudinary api secret");

const mongodbUri = process.env.MONGODB_URI;
const auth_secret = process.env.AUTH_SECRET;
const port = process.env.PORT;
const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;


export {
  mongodbUri,
  auth_secret,
  port,
  cloudinary_api_key,
  cloudinary_api_secret,
  cloudinary_cloud_name
}