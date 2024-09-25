
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      imageUrls.push(result.secure_url); // Get the secure URL from Cloudinary response
    }

    res.status(200).json({
      success: true,
      imageUrls,
    });
  } catch (error) {
    console.error("Error in upload route:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
