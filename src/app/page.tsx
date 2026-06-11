"use client"

import HomeClient from "@/components/HomeClient";
import getCurrentUser from "@/hooks/getCurrentUser";




export default function Home() {
  getCurrentUser();
  return (
    <>
      <HomeClient />

    </>
  );
}
