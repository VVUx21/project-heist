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
}

const RegistrationForm = ({ eventName }: { eventName: string }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    email: '',
    startupName: '',
    startupDescription: '',
    pitchDeck: '',
  });
  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/upload`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({user_id:session?.user._id ,email:formData.email,Name:formData.name,phonenumber:formData.phoneNumber,startupname:formData.startupName,about:formData.startupDescription,pitchdeck:formData.pitchDeck,photo:fileUrl,eventname:eventName}),
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
        })
        router.push("/");
      }
    } catch (error) {
      toast.error("Registration Unsuccessful")
      console.log(error)
      router.push("/");
    } 
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
      }
    };
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
        } catch (error) {
            console.log(error)
            alert("Failed to upload image");
        } finally{
            setIsUploading(false);
        }
  };
  const handleUploadSuccess = (url:string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pitchdeck: url,
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

    {/* Product/Model Photo */}
    <label htmlFor="pitchDeck" className="block text-sm font-medium text-white mb-2">
          Product Photo
          </label>
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
