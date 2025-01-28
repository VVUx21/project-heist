import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isVerified: boolean;
  image: string;
  event: string[]; // Array of event names as strings
}

const UserSchema: Schema = new Schema({
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: [true, 'Payment url is required'],
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