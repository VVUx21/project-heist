'use client'
import React, { useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Form,
} from "@/components/ui/form"
import Inputform from "@/components/inputform";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
const Registor=z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const RegistorForm = () => {
    const form = useForm<z.infer<typeof Registor>>({
        resolver: zodResolver(Registor),
        defaultValues: {
        email:"",
        password:""
        },
    })
    const { toast } = useToast();
    const router = useRouter();
    const handleRegister = async (
        data: z.infer<typeof Registor>
    ) => {
        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });
      
        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
            toast({
                title: 'Login Failed',
                description: 'Incorrect username or password',
                variant: 'destructive',
            });
            } else {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            });
            }
        }
      
        if (result?.url) {
            router.replace('/');
        }
    };
    

    return(
    <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="w-full max-w-md px-6 py-8 bg-[#420D0D] rounded-lg shadow-lg">
        <h1 className="text-5xl tracking-wider font-bold font-bigger text-center text-white mb-8">
        LOGIN
        </h1>
        <Form {...form}>
        <form onSubmit={(e) => { e.preventDefault();
            form.handleSubmit(handleRegister)(e);}} className="space-y-6">
        <Inputform form={form} name="email" label="Email" placeholder="Enter..." />
        <Inputform form={form} name="password" label="Password" placeholder="Enter..." />
        <Button
            className="w-full py-3 mt-5 font-poppins text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
        >
        Login
        </Button>
        <p className="mt-4 text-center font-poppins text-white">
            Have not Registered?{" "}
            <a href="/sign-in" className="text-red-500 hover:underline">
            Register
            </a>
        </p>
        </form>   
        </Form>
        </div>
    </div>
    )
}

export default RegistorForm;