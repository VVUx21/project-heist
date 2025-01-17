import mongoose, { Schema, Document } from 'mongoose';

export interface Register extends Document {
  user_id: string;
  Name: string;
  email: string;
  phonenumber: string;
  startupname: string;
  about: string;
  pitchdeck: string;
  photo: string;
  eventname:string;
  payment:string
}

const RegisterSchema: Schema = new Schema({
  user_id:{
     type:String,
     required:true,
  },
  Name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  phonenumber: {
    type: String,
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
  eventname:{
    type:String,
    required: true,
  },
  payment:{
    type:String,
    default:""
  }
});

const RegisterModel = 
  (mongoose.models.Register as mongoose.Model<Register>) ||
  mongoose.model<Register>('Register', RegisterSchema);

export default RegisterModel;