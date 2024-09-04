import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IBid, IProperty, ITeamMember } from "./property.interface";
import { Property, TeamMember } from "./property.model";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { propertySearchAbleFields } from "./property.constant";
import { startSession } from "mongoose";

// create property team member
const createPropertyTeamMemberIntoDb = async (payload: ITeamMember) => {
    const result = await Property.create(payload);
    return result;
}

// create property
const createPropertyIntoDb = async (payload: IProperty, teamMembers: ITeamMember[], userId: string) => {
    const session = await startSession();
    session.startTransaction();
    try {
        // Check if the user exists
        const user = await User.findById(userId).session(session);
        if (!user || user.isDeleted) {
            throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
        }

        // Create the team members within the transaction
        const createdTeamMembers = await TeamMember.insertMany(teamMembers, { session });
        const teamMemberIds = createdTeamMembers.map(member => member._id);

        // Create the property with associated team member IDs
        const propertyPayload = {
            ...payload,
            uploaderId: userId,
            teamMembers: teamMemberIds,
        };

        const property = await Property.create([propertyPayload], { session });

        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession();
        return property;
    } catch (error) {
        // If an error occurs, abort the transaction
        await session.abortTransaction();
        session.endSession();
        throw error; // Re-throw the error after aborting the transaction
    }
}

// place Bid
const placeBid = async (newBid: IBid, user: any, id: string) => {
    const property = await Property.isPropertyExistById(id);
    if (!property || property.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, "Property Does not exist!")
    }
    if (!property.highestBid || newBid.amount > property.highestBid?.amount) {
        // property.highestBid = newBid;
        const newBidData = {
            ...newBid,
            bidderName: user?.name,
            bidderEmail: user?.email,
            location: user?.location
        }
        const result = await Property.findByIdAndUpdate(id, {
            highestBid: newBidData
        }, {
            new: true
        })
        return result;
    }
    else {
        throw new AppError(httpStatus.BAD_REQUEST, "Bid amount must be higher than the current highest bid")
    }


}

// get highest bid win property by user
const getWinProperty = async (email: string) => {
    const result = await Property.find({ 'highestBid.bidderEmail': email });
    return result;
}

// get all property
const getAllPropertyFromDb = async (params: Record<string, unknown>) => {
    const propertyQuery = new QueryBuilder(
        Property.find(),
        params
    ).search(propertySearchAbleFields).filter().paginate().sort().fields();
    const result = await propertyQuery.modelQuery.populate('uploaderId teamMembers');
    const meta = await propertyQuery.countTotal();
    return {
        result,
        meta
    };
}

// get single property
const getPropertyByIdFromDb = async (id: string) => {
    const property = await Property.isPropertyExistById(id);
    if (!property || property.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, "Property Does not exist!")
    }
    const result = await Property.findById(id).populate('teamMembers');
    return result;
}


export const PropertyServices = {
    createPropertyIntoDb,
    getAllPropertyFromDb,
    getPropertyByIdFromDb,
    createPropertyTeamMemberIntoDb,
    placeBid,
    getWinProperty



}