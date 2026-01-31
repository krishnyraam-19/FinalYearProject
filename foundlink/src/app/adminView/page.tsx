"use client"
import AdminView from "@/components/adminView";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function adminPage (){
    return(
        <AdminView/>
    )
}