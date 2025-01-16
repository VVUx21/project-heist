"use client"
import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
  startupName: string;
  startupDescription: string;
  pitchDeck: File | null;
  productPhoto: File | null;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    email: '',
    startupName: '',
    startupDescription: '',
    pitchDeck: null,
    productPhoto: null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pitchDeck' | 'productPhoto') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.files![0]
      }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-[#420D0D] backdrop-blur-lg rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-white-800 mb-6">Startup Expo Registration</h2>
      
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
          <label htmlFor="pitchDeck" className="block text-sm font-medium text-white-700">
            Pitch Deck <span className="text-white-500">(PDF or DOC)</span>
          </label>
          <input
            type="file"
            id="pitchDeck"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, 'pitchDeck')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Product/Model Photo */}
        <div>
          <label htmlFor="productPhoto" className="block text-sm font-medium text-white-700">
            Product/Model Photo <span className="text-white-500">(Image)</span>
          </label>
          <input
            type="file"
            id="productPhoto"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'productPhoto')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-white-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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