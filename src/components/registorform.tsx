"use client"
import React, { useState, FormEvent,useEffect } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const FileUpload = dynamic(() => import('./Firebase'), {
  ssr: false
});

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
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      setFormData((prev) => ({ ...prev, productPhoto: '' })); 
      toast.error("Give a valid url")
      return;
  } 

  if(eventName == "Startup Expo"){
    if(formData.payment == ''){
      toast.error("Complete Payment for Registration")
      return;
    }
  }

  try {
    const response = await fetch(`/api/upload`, {
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
      router.push("/");
    }
  } catch (error) {
    toast.error("Registration Unsuccessful")
    console.log(error)
    router.push("/");
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

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
<div className="w-full max-w-2xl mx-auto p-6 bg-[#420D0D] backdrop-blur-lg rounded-2xl shadow-lg">
  <h2 className="text-2xl font-bold text-white-800 mb-6">{`${eventName} Registration`}</h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-white">
        Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="name"
        required
        className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
      />
    </div>

    {/* Phone Number */}
    <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
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
          <label htmlFor="email" className="block text-sm font-medium text-white">
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
          <label htmlFor="startupName" className="block text-sm font-medium text-white">
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
          <label htmlFor="startupDescription" className="block text-sm font-medium text-white">
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
          <label htmlFor="pitchDeck" className="block text-sm font-medium text-white mb-2">
          Pitch Deck <span className="text-white-500">(PDF or DOC)</span>
          </label>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>  

    {/* Payment Receipt */}
    {eventName === "Startup Expo" && (
      <>
      {/* UPI Payment Section */}
    <div className="bg-[#5A2323] p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-white mb-3">UPI Payment Details</h3>
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
      <div>
        <label htmlFor="paymentReceipt" className="block text-sm font-medium text-white mb-2">
          Payment Receipt <span className="text-white-500">(PDF or DOC)</span>
        </label>
        <FileUpload onUploadSuccess={handleUploadSuccess2} />
      </div>
      </>
    )}

    {/* Product/Model Photo */}
    <div>
          <label htmlFor="productPhoto" className="block text-sm font-medium text-white">
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
