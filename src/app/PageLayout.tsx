"use client";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/hooks";
import { Container } from "@chakra-ui/react";
import React from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   useAuth({});

   return (
     <>
       <NavBar />
       <Container height={"90vh"} maxW={"8xl"}>
         {children}
       </Container>
     </>
   );
}
