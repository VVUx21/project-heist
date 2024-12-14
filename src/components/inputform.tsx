import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

const Inputform = ({form,name,label,placeholder}:any) => {
  return (
    <>
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <div>
                   <FormLabel className='block text-sm font-medium text-white mb-2'>{label}</FormLabel>
                   <div className='flex space-x-4'>
                   <FormControl>
                        <Input {...field} className='flex-1 px-3 py-2 bg-transparent border border-gray-300 
                        rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500' 
                        type={name === 'password' ? 'password' : 'text'} placeholder={placeholder} />
                   </FormControl>
                   <FormMessage className='text-12 text-red-500 mt-2'/>
                   </div>
                </div>
            )}
            />
    </>    
  )
}

export default Inputform