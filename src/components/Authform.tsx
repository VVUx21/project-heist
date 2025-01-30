'use client'
import React, { useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import Inputform from "./inputform";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/Apiresponse";
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export const SignupSchema = z
  .object({
    firstname: z.string().min(2, 'First name must be at least 2 characters long'),
    lastname: z.string().min(2, 'Last name must be at least 2 characters long'),
    email:z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    transaction_id: z.string().min(5, 'Transaction ID must be at least 5 characters long'),
    confirmPassword: z.string()
    .min(8, 'Confirm password must be at least 8 characters long')
  })

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      confirmPassword:"",
      transaction_id:"",
    },
  })
  const router = useRouter();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleverification = async (
    data: z.infer<typeof SignupSchema>
  ) => {
      setIsSubmitting(true);
    try {
      if(data.password != data.confirmPassword){
        toast.error('Password and Confirm Password must be same');
        setIsSubmitting(false);
        return;
      }
      const userdata={
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        image: fileUrl,
        transaction_id: data.transaction_id,
      }
      const response = await axios.post<ApiResponse>('/api/signup',userdata);
      if(response.data.success){
        toast.success('Account created successfully');
      }
      router.replace(`/login`);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');
      toast.error(errorMessage);

      setIsSubmitting(false);
  };
  }

  const handleUpload = async () => {
      if (!file) return;
        if(!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/imageupload", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setFileUrl(data.secure_url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.log(error)
            alert("Failed to upload image");
        } finally{
            setIsUploading(false);
        }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md px-6 py-8 bg-[#420D0D] rounded-lg shadow-lg">
        <h1 className="text-5xl tracking-wider font-bold font-bigger text-center text-white mb-4">
          REGISTER
        </h1>
            <Form {...form}>
            <form onSubmit={(e) => { e.preventDefault();
              form.handleSubmit(handleverification)(e);}} className="space-y-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-poppins text-white mb-2"
                        >Firstname</FormLabel>
                        <FormControl>
                          <Input {...field} 
                          placeholder="Enter..."
                          className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-poppins text-white mb-2"
                        >Lastname</FormLabel>
                        <FormControl>
                          <Input {...field} 
                          placeholder="Enter..."
                          className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Inputform form={form} name="email" label="Email" placeholder="Enter..." />
              <Inputform form={form} name="password" label="Password" placeholder="Enter..." />
              <Inputform form={form} name="confirmPassword" label="Confirm Password" placeholder="Enter..." />
              <Inputform form={form} name="transaction_id" label="Transaction ID" placeholder="Enter..." />
              <div className="bg-[#5A2323] p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-white mb-3">UPI Payment Details</h3>
                <h5 className="text-sm font-semibold text-white mb-3"> 499/- for accodomation and passes combined.(No other amount accepted)</h5>
                <div className="flex flex-col items-center gap-3">
                  {/* UPI Scanner Image */}
                  <img
                    src="https://res.cloudinary.com/dgtdkqfsx/image/upload/v1737407553/85002429435sbi_page-0001_vr6chm.jpg"
                    alt="UPI Scanner"
                    className="w-40 h-40 object-contain rounded-lg"
                  />
                  {/* UPI ID */}
                  <div className="text-white font-medium">
                    <p>UPI ID: <span className="text-gray-300">85002429435@upi</span></p>
                  </div>
                </div>
              </div>
              <div className=" flex flex-row justify-between gap-2">
                <div className="">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                  />
                </div>
                {!fileUrl && (<button
                  type="button"
                  onClick={() => handleUpload()}
                  className="bg-red-500 rounded-md hover:bg-red-600 text-white font-bold h-10 px-2 disabled:opacity-50 text-[0.7rem] md:text-base"
                >
                  {uploading ? "Uploading..." : "Upload File"}
                </button> )}
              </div>
                <Button
                type="submit"
                disabled={isSubmitting || !fileUrl}
                className="w-full py-3 mt-5 font-poppins text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                >
                {
                  isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    "Register"
                  )
                }
                </Button>
                </form>
              </Form>
              <p className="mt-4 text-center font-poppins text-white">
                Already Registered?{" "}
                <a href="/login" className="text-red-500 hover:underline">
                Login
                </a>
              </p>
          </div>
      </div>
  );
};

export default RegisterForm;
