import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from 'react-hot-toast';
import { FaCheck, FaTimes } from 'react-icons/fa';

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"] });
const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
 
  return {
    title: "Orbital CTF",
    description: "Capture The Flag Platform",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${roboto.className} ${roboto_mono.className} text-white`}>
          <Navbar />
          <main>{children}</main>
          <Toaster 
            position="top-center"
            toastOptions={{
              className: 'font-mono',
              style: {
                background: '#000000',
                border: '2px solid',
                fontSize: '1.25rem',
                padding: '1rem 2rem',
                boxShadow: '0 0 10px #00ff00',
                fontFamily: 'Roboto Mono, monospace',
                maxWidth: '600px',
                width: '100%',
                borderRadius: '0',
              },
              success: {
                style: {
                  border: '2px solid #00ff00',
                  color: '#00ff00',
                  borderRadius: '0',
                },
                icon: <FaCheck className="text-[#00ff00]" />,
              },
              error: {
                style: {
                  border: '2px solid #ff0000',
                  color: '#ff0000',
                  boxShadow: '0 0 10px #ff0000',
                  borderRadius: '0',
                },
                icon: <FaTimes className="text-[#ff0000]" />,
              },
            }}
          />
      </body>
    </html>
  );
}