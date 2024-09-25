import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Listing from "../models/listing.model.js";

export const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
        password: hashedPassword,
      },
    },
    { new: true }
  ).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, user, "User Profile Updated Successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
  }

  await User.findByIdAndDelete(userId);

  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

export const getUserListings = asyncHandler(async (req, res) => {
  if (req.user.id === req.params.id) {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  }
  throw new ApiError(401, "You can only view your own listings!");
});

