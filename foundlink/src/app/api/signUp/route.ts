import User from "@/models/user";

import connectToDatabase from "@/lib/mongodb";

export const POST = async (request:any)=>{
    const{fname,lname,email,phone,password} = await request.json();

    await connectToDatabase();

    const newUser = new User({
        fname,
        lname,
        email,
        phone,
        password
    })

    await newUser.save();
}
