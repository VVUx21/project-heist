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
  const { toast } = useToast();
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
  
  const handleSendOtp = async (
    data: z.infer<typeof VerifyEmail>
  ) => {
    try {
      const response = await axios.post<ApiResponse>(`/api/verifycode`, {
        code: data.code,
        uniquecode:email,
      });

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Verification Failed',
        description:
          axiosError.response?.data.message ??
          'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

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
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md px-6 py-8 bg-[#420D0D] rounded-lg shadow-lg">
        <h1 className="text-5xl tracking-wider font-bold font-bigger text-center text-white mb-8">
          {type ==='signup'? 'REGISTER' : 'VERIFY'}
        </h1>
        {
          type === 'signup'?(
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
              <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-5 font-poppins text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Send OTP'
              )}
            </Button>
            </form>
            <p className="mt-4 text-center font-poppins text-white">
              Already have an account?{" "}
                <a href="/sign-in" className="text-red-500 hover:underline">
                  Login
                </a>
            </p>
          </Form>
          ):(
            <Form {...formverify}>
          <form onSubmit={(e) => { e.preventDefault(); formverify.handleSubmit(handleSendOtp)(e);}} className="space-y-6">
            <div className="">
                <FormField
                  control={formverify.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-poppins text-white mb-2"
                      >Verification Code</FormLabel>
                      <FormControl>
                        <Input {...field} 
                        placeholder="Enter OTP..."
                        className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Button
          type="submit"
            className="w-full py-3 mt-5 font-poppins text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
          >
            Verify
          </Button>
          </form>
        </Form>
          )
        }
      </div>
    </div>
  );
};

export default RegisterForm;
