"use client"
import AdminView from "@/components/adminView";
import ItemApproval from "@/components/itemApproval";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function approvalPage (){
    return(
        <>
        <ItemApproval/>
        </>
    )
}