// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/apiError.js";

// export const uploadImage = asyncHandler(async (req, res) => {
//   if (!req.file) {
//     throw new ApiError(400, "File not uploaded");
//   }

//   const result = await uploadOnCloudinary(req.file.path);

//   if (!result) {
//     // return res.status(500).json({ message: "Upload failed" });
//     throw new ApiError(500, "Upload failed");
//   }

//   res.json({
//     url: result.secure_url,
//     public_id: result.public_id,
//   });
// });
