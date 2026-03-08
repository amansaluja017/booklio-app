import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import { Review } from "../models/review";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Service } from "../models/service.model";
import mongoose from "mongoose";



export const postReview = asyncHandler(async (req: Request, res: Response) => {

    const { rating, comment, serviceId } = req.body;

    if (!serviceId) {
        throw new ApiError(400, "Service ID is required");
    }

    if (!rating || !comment) {
        throw new ApiError(400, "Rating and comment are required");
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        throw new ApiError(400, "Rating must be a number between 1 and 5");
    }

    try {
        const service = await Service.findById(new mongoose.Types.ObjectId(serviceId));
        if (!service) {
            throw new ApiError(404, "Service not found");
        }

        const review = await Review.create({
            service: serviceId,
            customer: req.customer!._id,
            rating,
            comment,
        });

        if (!review) {
            throw new ApiError(500, "Failed to create review");
        }

        const serviceRating  = service.rating ? ((service.rating * service.reviews.length) + review.rating) / (service.reviews.length + 1) : review.rating;

        service.reviews = service.reviews ? [...service.reviews, review._id] : [review._id];
        service.rating = serviceRating;
        await service.save();
        return res.status(201).json(new ApiResponse(201, "Review added successfully", review));
    }   catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});


export const getReviews = asyncHandler(async (req: Request, res: Response) => {
    const serviceId = req.query.serviceId as string;
    
    if (!serviceId) {
        throw new ApiError(400, "Service ID is required");
    }
    try {
        const reviews = await Review.find({ service: serviceId }).populate("customer", "name email");
        return res.status(200).json(new ApiResponse(200, {reviews}, "Reviews fetched successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});

export const getAllReviews = asyncHandler(async (req: Request, res: Response) => {
    const admin = req.admin;

    if (!admin) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const reviews = await Review.find()
            .populate("customer", "name email")
            .populate("service", "name");
        return res.status(200).json(new ApiResponse(200, { reviews }, "All reviews fetched successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
    const admin = req.admin;

    if (!admin) {
        throw new ApiError(401, "Unauthorized");
    }

    const { reviewId } = req.params;

    if (!reviewId || !mongoose.Types.ObjectId.isValid(reviewId)) {
        throw new ApiError(400, "Invalid review ID");
    }

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            throw new ApiError(404, "Review not found");
        }

        const service = await Service.findById(review.service).populate("reviews");

        if (service) {
            service.reviews = service.reviews?.filter(
                (r: any) => r._id.toString() !== reviewId
            );

            const serviceRating  = service.rating ? ((service.rating * service.reviews.length) + review.rating) / (service.reviews.length + 1) : review.rating;
            service.rating = serviceRating;
            await service.save();
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        return res.status(200).json(new ApiResponse(200, deletedReview, "Review deleted successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});