import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res) => {
  try {
    const {
      name,
      description,
      regularPrice,
      discountedPrice,
      imageUrls, // Ensure this matches the frontend field
      offer,
      parking,
      type,
      address,
      bedrooms,
      bathrooms,
      furnished,
      userRef, // Ensure this matches the frontend field
    } = req.body;

    // Ensure imageUrls is an array and not undefined
    if (!imageUrls || imageUrls.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Image URLs are required." });
    }

    // Create new listing
    const newListing = new Listing({
      name,
      description,
      regularPrice,
      discountedPrice,
      imageUrls,
      offer,
      parking,
      type,
      address,
      bedrooms,
      bathrooms,
      furnished,
      userRef, // Ensure userRef is included
    });

    const savedListing = await newListing.save();
    res.status(201).json({ success: true, data: savedListing });
  } catch (error) {
    console.error("Error while creating listing:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
