import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";
import AuthProvider from '../context/AuthProvider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

const editor =localfont({
  src:[{
    path :"../../public/fonts/PPEditorialNew-Italic-BF644b214fb0c0a.otf",
    weight:"300",
  }],
  variable:"--fonts-editor",
})
export const metadata: Metadata = {
  title: "NES | NIT ROURKELA",
  description: "National Entrepreneurship Summit, NIT Rourkela",
};
const bigger = localfont({
  src:[{
    path: "../../public/fonts/BiggerDisplay.otf",
    weight: "400",
  }],
  variable: "--font-bigger",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={` ${bigger.variable} ${editor.variable} bg-black`}>
          {children}

          <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={true} 
          closeButton={true}
        />

        </body>
      </AuthProvider>
    </html>
  );
}