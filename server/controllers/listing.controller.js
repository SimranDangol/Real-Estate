import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Listing from "../models/listing.model.js";
import mongoose from "mongoose";

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

// export const getListing = asyncHandler(async (req, res, next) => {
//   console.log("Request Params:", req.params); // Log request params
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     throw new ApiError(404, "Listing not found");
//   }
//   res.status(200).json(listing);
// });

export const getListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid listing ID");
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  res.status(200).json(listing);
});




export const getListings = asyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
});
