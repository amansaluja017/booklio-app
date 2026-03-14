import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { z } from "zod";
import { Category } from "../models/category.model";
import { Provider } from "../models/provider.model";
import { Service } from "../models/service.model";
import { createServiceValidataions } from "../validations/validation";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";



export const createService = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = createServiceValidataions.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ error: (z as any).treeifyError(parsedData.error).properties });
    }

    const { name, category, description, images, price, status } = parsedData.data;

    try {
        const isValidCategory = await Category.findOne({ name: category });

        if (!isValidCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        const isValidProvider = await Provider.findOne({ _id: req.provider?._id });

        if (!isValidProvider) {
            throw new ApiError(404, "Provider not found");
        }

        if (isValidProvider.address === null) {
            throw new ApiError(400, "Please setup your store address before adding services");
        }

        const service = await Service.create({
            name,
            category: isValidCategory._id,
            provider: req.provider?._id,
            description,
            price,
            status,
            location: isValidProvider.address,
        });

        if (!service) {
            throw new ApiError(500, "Failed to create service");
        }
        await Category.findByIdAndUpdate(
            isValidCategory._id,
            { $push: { services: service._id, providers: isValidProvider._id } },
            { returnDocument: "after" }
        );
        return res.status(201).json(new ApiResponse(201, { message: "Service created successfully", service }));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

export const getAllServices = asyncHandler(async (_req: Request, res: Response) => {
    try {
        const services = await Service.find()
            .sort("createdAt -1")
            .populate("category", "name")
            .populate("provider", "name email phone address")
            .populate(([
                {
                    path: "reviews",
                    populate: {
                        path: "customer",
                        select: "name"
                    }
                }
            ])).select("-__v")
            .exec();

        return res.status(200).json(new ApiResponse(200, { message: "All services fetch successfully", services }));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error: Failed to get all services" });
    }
});

export const getProviderServices = asyncHandler(async (req: Request, res: Response) => {

    try {
        const services = await Service.find({ provider: req.provider?._id }
        ).sort("createdAt -1").populate("category", "name");

        return res.status(200).json(new ApiResponse(200, { message: "Provider services fetch successfully", services }));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error: Failed to get provider services" });
    }
});

export const updateServiceStatus = asyncHandler(async (req: Request, res: Response) => {
    const { serviceId } = req.params;
    const provider = req.provider;

    const {status} = req.body;

    if (!serviceId) {
        return res.status(400).json({ error: "Service ID is required" });
    }

    if (!provider) {
        return res.status(401).json({ error: "Unauthorized: Provider authentication required" });
    }

    try {
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ error: "Service not found or you are not authorized to update this service" });
        }

        service.status = status;
        await service.save();

        return res.status(200).json(new ApiResponse(200, { message: "Service status updated successfully", service }));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error: Failed to update service status" });
    }
});