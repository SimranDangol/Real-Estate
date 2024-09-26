import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Listing from "../models/listing.model.js";

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);

  if (!listing) {
    throw new ApiError(400, "Listing not found");
  }

  res
    .status(201)
    .json(new ApiResponse(200, listing, "Listing created successfully"));
});

export const deleteListing = asyncHandler(async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  if (req.user.id !== listing.userRef) {
    throw new ApiError(401, "You can only delete your own listings!");
  }

  listing = await Listing.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, "Listing has been deleted"));
});

export const getListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }
  res.status(200).json(listing);
});
