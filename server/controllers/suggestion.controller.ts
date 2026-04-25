import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { Service } from "../models/service.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const getSuggestions = asyncHandler(
  async (req: Request, res: Response) => {
    const query = (req.query.query as string) || "";
    if (!query) {
      return res.status(200).json({ suggestions: [] });
    }
    try {
      const suggestions = await Service.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { "location.city": { $regex: query, $options: "i" } },
          { "location.state": { $regex: query, $options: "i" } },
          { "location.country": { $regex: query, $options: "i" } },
        ],
      })
        .limit(10)
        .select("name location.city location.state location.country");

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { suggestions },
            "Suggestions fetched successfully",
          ),
        );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      throw new ApiError(500, "Failed to fetch suggestions");
    }
  },
);
