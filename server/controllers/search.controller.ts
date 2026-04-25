import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { Service } from "../models/service.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Category } from "../models/category.model";

export const searchServices = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query.query as string;

    if (!query) {
      throw new ApiError(400, "Query parameter is required");
    }

    try {
      const service = await Service.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { "location.city": { $regex: query, $options: "i" } },
          { "location.state": { $regex: query, $options: "i" } },
          { "location.country": { $regex: query, $options: "i" } },
        ],
      })
        .populate("provider", "name email phone address")
        .populate("category", "name")
        .populate([
          {
            path: "reviews",
            populate: {
              path: "customer",
              select: "name",
            },
          },
        ])
        .select("-__v")
        .exec();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { services: service },
            "Services fetched successfully",
          ),
        );
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new ApiError(500, "Failed to fetch services");
    }
  },
);

export const searchCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.params.query as string;

    if (!query) {
      throw new ApiError(400, "Query parameter is required");
    }

    try {
      const searchedServices = await Category.findById(query)
        .populate({
          path: "services",
          populate: [
            {
              path: "provider",
              select: "name email phone address",
            },
            {
              path: "category",
              select: "name",
            },
          ],
        })
        .exec();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { searchedServices },
            "Category and services fetched successfully",
          ),
        );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Internal server error");
    }
  },
);
