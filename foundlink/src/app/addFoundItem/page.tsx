"use client"
import AddFoundItem from "@/components/addFoundItem";
import AdminView from "@/components/addFoundItem";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function addFoundItem (){
    return(
        <AddFoundItem/>
    )
}