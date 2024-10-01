

import localFont from "next/font/local";

import "./globals.css";
// import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { usePathname } from "next/navigation";
import { Metadata } from 'next';
// Adicionando metadados
export const metadata: Metadata = {
  title: "Paraty App",
  description: "Paraty App",
  icons: {
    icon: "./favicon.ico",
  },
};


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // const pathname = usePathname();
  return (
    <html lang="pt-br">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {pathname === "/dashboard" && <Header/>} */}
        <main className="flex-grow">
          {children}
           <ToastContainer />

        </main>
      </body>
    </html>
  );
}
