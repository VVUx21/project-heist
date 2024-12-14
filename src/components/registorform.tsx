// 'use client'
// import React, { useState } from "react";
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "./ui/form"
// import Inputform from "./inputform";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";

// export const Registor=z.object({
//     email: z.string().email('Please enter a valid email address'),
//     password: z.string().min(8, 'Password must be at least 8 characters long'),
// })

// const RegisterForm = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState(null);
//     const { register, handleSubmit, formState: { errors } } = useForm<typeof Registor>({ resolver: zodResolver(Registor) });
// }

// export default RegisterForm;