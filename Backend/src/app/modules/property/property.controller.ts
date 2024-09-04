import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PropertyServices } from "./property.service";


// create property teamMember
const createPropertyTeamMember = catchAsync(async (req, res) => {
  const result = await PropertyServices.createPropertyTeamMemberIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Property team member created successfully",
    data: result
  })
})


// create property
const createProperty = catchAsync(async (req, res) => {
  // console.log(req.user);
  const {id:userId}=req.user;
  const { propertyData, teamMembersData } = req.body;
  const result = await PropertyServices.createPropertyIntoDb(propertyData,teamMembersData,userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Property created successfully",
    data: result
  })
})

// place bid
const placeBid = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyServices.placeBid(req.body, req.user, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bid placed successfully",
    data: result
  })

})

// get highest bid win property by user
const getWinProperty = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await PropertyServices.getWinProperty(email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Win bid property retrieve successfully",
    data: result
  })

})

// get all property
const getAllProperty = catchAsync(async (req, res) => {
  const result = await PropertyServices.getAllPropertyFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property fetched successfully",
    meta: result.meta,
    data: result.result
  })
})

// get single property
const getPropertyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyServices.getPropertyByIdFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property fetched successfully",
    data: result
  })
})

export const PropertyControllers = {
  createProperty,
  createPropertyTeamMember,
  getAllProperty,
  getPropertyById,
  placeBid,
  getWinProperty

}