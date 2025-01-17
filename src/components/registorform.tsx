"use client"
import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import FileUpload from './Firebase';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
  startupName: string;
  startupDescription: string;
  pitchDeck: string;
  productPhoto: string;
  payment:string
}

const RegistrationForm = ({ eventName }: { eventName: string }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    email: '',
    startupName: '',
    startupDescription: '',
    pitchDeck: '',
    productPhoto: '',
    payment:''
  });
  const { data: session } = useSession();

  const isValidUrl = (str: string): boolean => {
    try {
      new URL(str);
      return true;
   } catch {
     return false;
   }
 };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(formData.productPhoto)) {
      setFormData((prev) => ({ ...prev, productPhoto: '' })); // Or handle invalid URL case as needed
      toast.error("Give a valid url")
  } 

  try {
    const response = await fetch(`api/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({user_id:session?.user._id ,email:formData.email,Name:formData.name,phonenumber:formData.phoneNumber,startupname:formData.startupName,about:formData.startupDescription,pitchdeck:formData.pitchDeck,photo:formData.productPhoto,payment:formData.payment, eventname:eventName}),
    });
    if(response.ok){
      const result = await response.json();
      toast.success("Registered Successfully")
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        startupName: '',
        startupDescription: '',
        pitchDeck: '',
        productPhoto: '',
        payment:''
      })
      window.location.href = "/#Events";
    }
  } catch (error) {
    toast.error("Registration Unsuccessful")
    console.log(error)
  } 
  };

  const handleUploadSuccess = (url:string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pitchdeck: url,
    }));
  };

  const handleUploadSuccess2 = (url:string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      payment: url,
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-[#420D0D] backdrop-blur-lg rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-white-800 mb-6">{`${eventName} Registration`}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-white-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={formData.phoneNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white-700">
            Email ID <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        {/* Startup Name */}
        <div>
          <label htmlFor="startupName" className="block text-sm font-medium text-white-700">
            Startup Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="startupName"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={formData.startupName}
            onChange={(e) => setFormData(prev => ({ ...prev, startupName: e.target.value }))}
          />
        </div>

        {/* Startup Description */}
        <div>
          <label htmlFor="startupDescription" className="block text-sm font-medium text-white-700">
            What is the Startup About? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="startupDescription"
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={formData.startupDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, startupDescription: e.target.value }))}
          />
        </div>

        {/* Pitch Deck */}
         <div>
          <label htmlFor="pitchDeck" className="block text-sm font-medium text-white-700 mb-2">
          Pitch Deck <span className="text-white-500">(PDF or DOC)</span>
          </label>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>  
         
         {/* Payment Receipt  */}
          {(eventName == "Startup Expo") && (
         <div>
          <label htmlFor="pitchDeck" className="block text-sm font-medium text-white-700 mb-2">
          Payment Receipt <span className="text-white-500">(PDF or DOC)</span>
          </label>
          <FileUpload onUploadSuccess={handleUploadSuccess2} />
        </div>             
       )}

        {/* Product/Model Photo */}
        <div>
          <label htmlFor="productPhoto" className="block text-sm font-medium text-white-700">
            Product/Model Photo URL <span className="text-white-500">(Image)</span>
          </label>
          <input
             type="text"
             id="imageurl"
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={formData.productPhoto}
             onChange={(e) => {
             const url = e.target.value;
             const isValidUrl = (str: string): boolean => {
            try {
              new URL(str);
              return true;
           } catch {
             return false;
           }
         };
          if (isValidUrl(url)) {
              setFormData((prev) => ({ ...prev, productPhoto: url }));
          } else {
              setFormData((prev) => ({ ...prev, productPhoto: '' })); // Or handle invalid URL case as needed
              toast.error("Give a valid url")
           }
        }}
        />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-red-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <Send className="h-5 w-5" />
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;