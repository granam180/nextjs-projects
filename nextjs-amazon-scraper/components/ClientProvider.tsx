"use client";

import { Toaster } from "react-hot-toast"; // Toasty!!

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />

      {children}
    </>
  );
}