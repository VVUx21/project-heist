import dbConnect from "@/lib/dbConnect";
import RegisterModel from "@/model/Register";

export async function POST(request:Request){
    try {
        await dbConnect();
      } catch (err) {
        console.error('Database connection error:', err);
        return Response.json(
          { success: false, message: 'Database connection failed' },
          { status: 500 }
        );
      }

      try {
        const { user_id,email,Name,phonenumber,startupname,about,pitchdeck,photo } = await request.json();

    if (!user_id || !email || !Name || !phonenumber || !startupname || !about) {
      return Response.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    const existing = await RegisterModel.findOne({ email });

    if(existing){
        return Response.json(
            { success: false, message: 'You have already registered' },
            { status: 400 }
          );
    }else{
        const newregister = new RegisterModel({user_id,email,Name,phonenumber,startupname,about,pitchdeck,photo});
        await newregister.save();
        return Response.json(
            {
              success: true,
              message: 'Startup registered successfully',
            },
            { status: 201 }
          );
    }
      } catch (error) {
        return Response.json(
            { success: false, message: 'Error registering startup.' },
            { status: 500 }
          );
      }
}