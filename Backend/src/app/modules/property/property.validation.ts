import { z } from "zod";

const teamMemberValidationSchema = z.object({
    name: z.string().nonempty("Team member name is required"),
    role: z.string().nonempty("Team member role is required"),
    contact: z.string().email("Invalid contact email format"),
});

const bidValidationSchema = z.object({
    amount: z.number().positive("Amount must be a positive number"),
    bidderName: z.string().min(1, "Bidder name is required"),
    bidderEmail: z.string().email("Invalid email address"),
    location: z.string().min(1, "Location is required"),
});

const propertyValidationSchema = z.object({
    category: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    images: z.array(z.string().url("Invalid URL for image")),
    price: z.number().positive("Price must be a positive number"),
    totalArea: z.string(),
    status: z.string(),
    floor: z.string(),
    highestBid: bidValidationSchema.optional(),
    bedrooms: z.number().int().positive("Bedrooms must be a positive integer"),
    bath: z.number().int().nonnegative("Number of bathrooms must be a non-negative integer"),
    balcony: z.number().int().nonnegative("Number of balconies must be a non-negative integer"),
    location: z.string().min(1, "Location is required"),
    teamMembers: z.array(z.string().nonempty("Team member ID is required")).optional(),


})

const createPropertyValidationSchema = z.object({
    body: z.object({
        propertyData: propertyValidationSchema,
        teamMembersData: z.array(teamMemberValidationSchema).nonempty("At least one team member is required")
    })
})


export const PropertyValidationSchemas = {
    createPropertyValidationSchema,

}