"use client"
import AddItem from "@/components/addItem";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AddItemPage(){
    // const { data: session, status } = useSession();
    // // const router = useRouter();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         alert("Login first");
    //         redirect("/logIn");
    //     }else{
    //         redirect("/addItem");
    //     };
    // }, [status]);

    // if (status === "loading") return null;
    // if (!session) return null;

    return (
        <AddItem/>
    );
    
}