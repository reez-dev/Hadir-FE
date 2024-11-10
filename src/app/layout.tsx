import ToastProvider from "@/components/molecul/toast_wrapper";
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./store_provider";

export const metadata: Metadata = {
  title: "Hadir: Attendance Management System",
  description:
    "Easily manage your organization and institution attendance by single click provided by Hadir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <StoreProvider>
        <body className={`font-sans antialiased`}>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
