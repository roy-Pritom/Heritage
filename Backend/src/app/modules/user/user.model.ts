import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
const userSchema = new Schema<TUser, UserModel>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender:{
      type:String,
     enum:['male','female'],
     required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  location:{
    type:String
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto:{
    type:String,
    default:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010"
  },
  role:{
    type:String,
    enum:['admin','user'],
    default:'user',
    require:true
  },
  isBlock:{
    type:Boolean,
    default:false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  }
)

// pre hook
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
})

// post hook
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next()
})

// for check user is exist or not
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email: email })
}

// for password check
userSchema.statics.isPasswordMatched = async function (plainPassword: string, hashPassword: string) {
  return await bcrypt.compare(plainPassword, hashPassword);
}


export const User = model<TUser, UserModel>('User', userSchema);