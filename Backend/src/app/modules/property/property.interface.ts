import { Model, Types } from "mongoose";

// src/interfaces/property.interface.ts
export interface IBid {
    amount: number;
    bidderName: string;
    bidderEmail: string;
    location: string;
}
export interface IProperty {
    category:string;
    title: string;
    description: string;
    images: string[];
    price: number;
    totalArea:string;
    floor:string;
    status:string;
    highestBid?: IBid;
    bedrooms: number;
    bath:number;
    balcony:number;
    location: string;
    uploaderId: Types.ObjectId;
    teamMembers?: string[]; // Array of team member IDs
    isDeleted:boolean;
}

export interface ITeamMember {
    name: string;
    role: string;
    contact: string;
}


export interface PropertyModel extends Model<IProperty> {
    isPropertyExistById(id: any): Promise<IProperty>
  } 