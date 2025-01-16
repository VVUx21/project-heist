import mongoose, { Schema, Document } from 'mongoose';

export interface Register extends Document {
  user_id: string;
  Name: string;
  email: string;
  phonenumber: number;
  startupname: string;
  about: string;
  pitchdeck: string;
  photo: string;
}

const RegisterSchema: Schema = new Schema({
  user_id:{
     type:String,
     required:true,
     unique:true
  },
  Name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  phonenumber: {
    type: Number,
    required: [true, 'Phonenumber is required'],
  },
  startupname: {
    type: String,
    required: [true, 'StartUp Name is required'],
  },
  about: {
    type: String,
    required: [true, 'Write something about the startup'],
  },
  pitchdeck: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
});

const RegisterModel = 
  (mongoose.models.User as mongoose.Model<Register>) ||
  mongoose.model<Register>('User', RegisterSchema);

export default RegisterModel;