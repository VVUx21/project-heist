"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [error, setError] = useState("");
//hii hellooo
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Create a storage reference
      const storageRef = ref(storage, `uploads/${file.name}`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      console.log("File uploaded successfully");

      // Get download URL
      const url = await getDownloadURL(snapshot.ref);
      setDownloadURL(url);
      onUploadSuccess(url);
      toast.success("File uploaded")

      setFile(null);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
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
      {!downloadURL && (<button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-red-500 rounded-md hover:bg-red-600 text-white font-bold h-10 px-2 disabled:opacity-50 text-[0.7rem] md:text-base"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button> )}
      
    </div>
  );
};

export default FileUpload;
