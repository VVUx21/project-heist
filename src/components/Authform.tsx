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
import { useToast } from './ui/use-toast';
import { ApiResponse } from "@/types/Apiresponse";
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import FileUpload from './Firebase';

export const VerifyEmail=z.object({
  code:z.string().length(6,'Verification code is 6 digits long')
})

export const SignupSchema = z
  .object({
    firstname: z.string().min(2, 'First name must be at least 2 characters long'),
    lastname: z.string().min(2, 'Last name must be at least 2 characters long'),
    email:z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string()
    .min(8, 'Confirm password must be at least 8 characters long')
  })

const RegisterForm = ({type,email}:{type:string,email:any}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [about, setAbout] = useState("");
  const { toast } = useToast();
  const [fileUrl, setFileUrl] = useState('');
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      confirmPassword:"",
    },
  })
  const router = useRouter();
  const formverify = useForm<z.infer<typeof VerifyEmail>>({
    resolver: zodResolver(VerifyEmail),
    defaultValues: {
      code:"",
    },
  })

  const handleverification = async (
    data: z.infer<typeof SignupSchema>
  ) => {
    setIsSubmitting(true);
    try {
      if(data.password != data.confirmPassword){
        toast({
          title: 'Password Mismatch',
          description: 'Passwords do not match',
        });
        setIsSubmitting(false);
        return;
      }
      let uniquecode = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      const userdata={
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        uniquecode:uniquecode,
      }
      const response = await axios.post<ApiResponse>('/api/signup',userdata);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/verify/${uniquecode}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
  };
  }

  const handleUploadSuccess = (url:string) => {
    setFileUrl(url);
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
                        >Name</FormLabel>
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
                        >Phone no.</FormLabel>
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
              <Inputform form={form} name="startupname" label="Startup Name" placeholder="Enter..." />
              <div className="flex flex-col gap-2">
               <label htmlFor="about" className="text-base font-poppins font-bold">
                  About
                 </label>
                 <input
                  type="text"
                  name="about"
                  placeholder="Enter..."
                  className="h-12 p-2 transition-all duration-300 bg-white/20 border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={about}
                  disabled={false}
                  onChange={(e) => setAbout(e.target.value)}
                  style={{ cursor: 'text' }}
                 />
          </div>
          <div className="flex flex-col gap-2">
          <label htmlFor="about" className="text-base font-poppins bolder">Pitch Deck</label>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>
              <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-5 font-poppins text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
            >
             Register
            </Button>
            </form>
          </Form>
      </div>
    </div>
  );
};

export default RegisterForm;