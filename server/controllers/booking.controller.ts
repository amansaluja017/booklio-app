import { asyncHandler } from "../utils/asyncHandler";
import { createBookingValidations } from "../../validations/validation";
import { Request, Response } from "express";
import { Customer } from "../models/customer.model";
import { Service } from "../models/service.model";
import { Booking } from "../models/booking.model";
import z from "zod";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import otpGenerator from "otp-generator";
import { uploadImage } from "../utils/cloudinary";


export const createBooking = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = createBookingValidations.safeParse(req.body);
    const { date } = req.body;

    if (!parsedData.success) {
        return res.status(400).json({ error: (z as any).treeifyError(parsedData.error).properties });
    }

    const uploadedFile = (req as any).file;

    const localFilePath = uploadedFile.path;

    const { service, category, status, notes, provider } = parsedData.data;

    try {
        const isValidCustomer = await Customer.findById(req.customer!._id);
        if (!isValidCustomer) {
            throw new ApiError(400, "Invalid customer");
        }

        const isValidService = await Service.findById(service);
        if (!isValidService) {
            throw new ApiError(400, "Invalid service");
        }

        const image = await uploadImage(localFilePath);

        const booking = await Booking.create({
            customer: req.customer!._id,
            service,
            category,
            status,
            date,
            image,
            provider,
            notes,
            location: {
                state: isValidCustomer.address?.state || "",
                city: isValidCustomer.address?.city || "",
                country: isValidCustomer.address?.country || "",
            },
        });

        if (!booking) {
            throw new ApiError(500, "Failed to create booking");
        }

        return res.status(201).json(new ApiResponse(201, "Booking created successfully", booking));
    } catch (err) {
        throw new ApiError(500, "Internal server error");
    }
});

export const getProviderBookings = asyncHandler(async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find({ provider: req.provider!._id })
            .sort({ createdAt: -1 })
            .populate("customer", "name email phone address")
            .populate("service", "name description price")
            .populate("category", "name");

        const events = bookings
            .filter((b: { status: string }) => b.status === "confirmed")
            .map((booking: any) => ({
                title: `${booking.service.name} - ${booking.customer.name}`,
                location: `${booking.location.city}, ${booking.location.state}`,
                start: booking.date,
                end: new Date(new Date(booking.date).getTime() + 60 * 60 * 1000),
                status: booking.status,
            }));

        return res.status(200).json(new ApiResponse(200, { bookings, events }, "Bookings retrieved successfully"));

    } catch (err) {
        console.error(err);
        throw new ApiError(500, "Internal server error");
    }
});

export const getCustomerBookings = asyncHandler(async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find({ customer: req.customer!._id })
            .sort({ createdAt: -1 })
            .populate("service", "name description price")
            .populate("category", "name")
            .populate("provider", "name email phone address");

        return res.status(200).json(new ApiResponse(200, bookings, "Bookings retrieved successfully"));
    } catch (err) {
        console.error(err);
        throw new ApiError(500, "Internal server error");
    }
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
    const { afterImage, beforeImage, bookingId, price, notes, otp } = req.body;
    if (!bookingId) {
        return res.status(400).json({ error: "Booking ID is required" });
    }

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new ApiError(404, "Booking not found");
        }
        if (booking.status === "requested") {
            booking.status = "confirmed";
            await booking.save();
            return res.status(200).json(new ApiResponse(200, "Booking updated successfully"));
        }
        if (booking.status === "confirmed") {
            if (!beforeImage) {
                throw new ApiError(400, "Before image is required to start the service");
            }
            const otpCode = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true,
            });
            (booking as any).otp = otpCode;
            (booking as any).before_image = beforeImage;
            booking.status = "in-progress";
            await booking.save();
            return res.status(200).json(new ApiResponse(200, "Booking updated successfully"));
        }
        if (booking.status === "in-progress") {
            if (!afterImage || !notes || !price || !otp) {
                throw new ApiError(400, "All fields are required to complete the service");
            }
            if ((booking as any).otp !== otp) {
                throw new ApiError(400, "Invalid OTP");
            }
            booking.notes = notes;
            (booking as any).price = price;
            booking.status = "completed";
            await booking.save();
            return res.status(200).json(new ApiResponse(200, "Booking updated successfully"));
        }
        throw new ApiError(400, "Invalid booking status");
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});

export const confirmedBookingStatus = asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.body;

    if (!bookingId) {
        throw new ApiError(400, "Invalid booking");
    }

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            throw new ApiError(400, "invalid booking")
        }

        booking.status = "confirmed";
        await booking.save();

        return res.status(200).json(new ApiResponse(200, "status updated successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal servier error: Failed to update the status")
    }
});

export const cancelBooking = asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.body;

    if (!bookingId) {
        throw new ApiError(400, "Invalid booking");
    }

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            throw new ApiError(400, "invalid booking")
        }

        booking.status = "cancelled";
        await booking.save();

        return res.status(200).json(new ApiResponse(200, "Booking cancelled successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal servier error: Failed to cancel the booking")
    }
});

export const InProgressBookingStatus = asyncHandler(async (req: Request, res: Response) => {
    const { bookingId } = req.body;

    if (!bookingId) {
        throw new ApiError(400, "Invalid booking");
    }
    const uploadedFile = (req as any).file;

    if (!uploadedFile) {
        throw new ApiError(400, "Before image is required to start the service");
    }

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            throw new ApiError(400, "invalid booking")
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true,
        });
        (booking as any).otp = otp;

        booking.status = "in-progress";

        const localFilePath = uploadedFile.path;

        if (!localFilePath) {
            throw new ApiError(404, "please upload a file")
        }

        const url = await uploadImage(localFilePath);
        (booking as any).before_image = url;
        await booking.save();

        return res.status(200).json(new ApiResponse(200, "status updated successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error: Failed to update booking status");
    }
});


export const completeBookingStatus = asyncHandler(async (req: Request, res: Response) => {
    const { bookingId, notes, price, otp } = req.body;

    if (!bookingId) {
        throw new ApiError(400, "Invalid booking");
    }

    const uploadedFile = (req as any).file;

    if (!uploadedFile) {
        throw new ApiError(400, "After image is required to complete the service");
    }

    if (!notes || !price || !otp) {
        throw new ApiError(400, "All fields are required to complete the service");
    }

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            throw new ApiError(400, "invalid booking")
        }

        if ((booking as any).otp !== otp) {
            throw new ApiError(400, "Invalid OTP");
        }

        booking.notes = notes;
        (booking as any).price = price;
        booking.otp = "";

        booking.status = "completed";

        const localFilePath = uploadedFile.path;

        if (!localFilePath) {
            throw new ApiError(404, "please upload a file")
        }

        const url = await uploadImage(localFilePath);
        (booking as any).after_image = url;
        await booking.save();

        return res.status(200).json(new ApiResponse(200, "status updated successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal servier error: Failed to update the status")
    }
});