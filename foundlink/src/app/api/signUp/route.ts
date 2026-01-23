import User from "@/models/user";

import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (request:any)=>{
    const{fname,lname,email,phone,password} = await request.json();

    await connectToDatabase();

    const existingUser = await User.findOne({email});

    if(existingUser){
        return NextResponse.json({message:"Email is already in use"},{status:400})
    }

    const newUser = new User({
        fname,
        lname,
        email,
        phone,
        password
    })

    try{

        await newUser.save();
        return NextResponse.json("User is saved successfully",{status:200});
    }catch(err:any){
        return NextResponse.json(err,{status:500});
    }
}
