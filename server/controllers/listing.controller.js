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
