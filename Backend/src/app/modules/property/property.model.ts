import mongoose, { model, Schema } from "mongoose";
import { IBid, IProperty, ITeamMember, PropertyModel } from "./property.interface";


// Team Member Schema
const teamMemberSchema: Schema = new Schema<ITeamMember>({
    name: { type: String, required: true },
    role: { type: String, required: true },
    contact: { type: String, required: true }
});



// Property Schema
const propertySchema = new Schema<IProperty,PropertyModel>({
    category:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalArea: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }],
    price: {
        type: Number,
        required: true
    },
    bath:{
        type: Number,
        default:1
    },
    balcony:{
        type: Number
    },
    highestBid: {
    amount: { type: Number,default:0},
    bidderName: { type: String,default:null},
    bidderEmail: { type: String,default:null},
    location: { type: String,default:null},
    },
    bedrooms: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    uploaderId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember'
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

// static method
propertySchema.statics.isPropertyExistById = async function (id) {
    return await Property.findById(id)
}

// property model
export const Property = model<IProperty,PropertyModel>('Property', propertySchema);
// property team member schema
export const TeamMember = model<ITeamMember>('TeamMember', teamMemberSchema);

