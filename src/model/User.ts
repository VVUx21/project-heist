import mongoose, { Schema, Document } from 'mongoose';

export interface Event extends Document {
  eventname: string;
 }

 const EventSchema: Schema<Event> = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
  },
});

export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date; 
  isVerified: boolean;
  uniquecode:string;
  event: Event[];
}

const UserSchema: Schema<User> = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Username is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  uniquecode: {
    type: String,
    required: [true, 'Unique Code is required',],
  },
  event:[EventSchema]
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;