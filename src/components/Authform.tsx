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

const RegisterForm = ({type}:{type:string}) => {
  const [otpSent, setOtpSent] = useState(false);

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

  const formverify = useForm<z.infer<typeof VerifyEmail>>({
    resolver: zodResolver(VerifyEmail),
    defaultValues: {
      code:"",
    },
  })
  
  const handleSendOtp = () => {
    setOtpSent(true);
    // Add logic for sending OTP here
  };

  const handleVerifyOtp = () => {
    // Add logic for verifying OTP here
  };

  const handleRegister = () => {
    // Add logic for registration submission here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md px-6 py-8 bg-[#420D0D] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          {type ==='signup'? 'REGISTER' : 'VERIFY'}
        </h1>
        {
          type === 'signup'?(
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSendOtp)} className="space-y-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-white mb-2"
                        >Firstname</FormLabel>
                        <FormControl>
                          <Input {...field} 
                          placeholder="Enter..."
                          className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        <FormLabel className="block text-sm font-medium text-white mb-2"
                        >Lastname</FormLabel>
                        <FormControl>
                          <Input {...field} 
                          placeholder="Enter..."
                          className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
            </form>
            <Button
              onClick={handleRegister}
              className="w-full py-3 mt-5 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
            >
              Send OTP
            </Button>
            <p className="mt-4 text-center text-white">
              Already have an account?{" "}
                <a href="/login" className="text-red-500 hover:underline">
                  Login
                </a>
            </p>
          </Form>
          ):(
            <Form {...formverify}>
          <form onSubmit={formverify.handleSubmit(handleSendOtp)} className="space-y-6">
            <div className="">
                <FormField
                  control={formverify.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-white mb-2"
                      >Verification Code</FormLabel>
                      <FormControl>
                        <Input {...field} 
                        placeholder="Enter OTP..."
                        className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </form>
          <Button
            onClick={handleRegister}
            className="w-full py-3 mt-5 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
          >
            Verify
          </Button>
        </Form>
          )
        }
      </div>
    </div>
  );
};

export default RegisterForm;
