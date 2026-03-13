import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { createCategoryValidation } from "../../validations/validation";
import z from "zod";
import { Category } from "../models/category.model";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";


export const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const admin = req.admin;

    if (!admin) {
        throw new ApiError(401, "Unauthorized");
    }

    const body = req.body;

    const parsedData = createCategoryValidation.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ error: (z as any).treeifyError(parsedData.error).properties });
    }

    const { name, services } = parsedData.data;

    try {
        const existedCategory = await Category.findOne({ name });

        if (existedCategory) {
            throw new ApiError(400, "Category already exists");
        }

        const category = await Category.create({ name, services_name: services });

        if (!category) {
            throw new ApiError(500, "Failed to create category");
        }

        return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(new ApiResponse(200, { categories }, "Categories retrieved successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const admin = req.admin;

    if (!admin) {
        throw new ApiError(401, "Unauthorized");
    }

    const { categoryId } = req.params;

    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new ApiError(400, "Invalid category ID");
    }

    try {
        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            throw new ApiError(404, "Category not found");
        }

        return res.status(200).json(new ApiResponse(200, category, "Category deleted successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});