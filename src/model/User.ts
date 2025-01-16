import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  image: string;
  is_verified: boolean;
  event: string[]; // Array of event names as strings
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  is_verified: {
    type: Boolean,
    default: false,
    required: [true, 'Verification status is required'],
  },
  event: {
    type: [String],
    default: [],
  },
});

const UserModel = 
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;