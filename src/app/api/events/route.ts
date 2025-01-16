import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
  try {
    // Step 1: Establish a database connection
    await dbConnect();
  } catch (err) {
    console.error("Database connection error:", err);
    return Response.json(
      { success: false, message: "Database connection failed" },
      { status: 500 }
    );
  }

  try {
    // Step 2: Extract the event name and email from the request
    const { eventname, email } = await request.json();

    // Step 3: Validate the input fields
    if (!email || !eventname) {
      return Response.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Step 4: Check if the user exists and is verified
    const existingVerifiedUser = await UserModel.findOne({
      email,
      is_verified: true,
    });

    if (!existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Email doesn't exist or user not verified." },
        { status: 400 }
      );
    }

    // Step 5: Check for duplicate event registration
    if (
      Array.isArray(existingVerifiedUser.event) &&
      existingVerifiedUser.event.some(
        (registeredEvent) =>
          registeredEvent.trim().toLowerCase() === eventname.trim().toLowerCase()
      )
    ) {
      return Response.json(
        {
          success: false,
          message: `You are already registered for the event: ${eventname}.`,
        },
        { status: 409 }
      );
    }

    // Step 6: Add the event to the user's event array
    if (!existingVerifiedUser.event) {
      existingVerifiedUser.event = [];
    }

    existingVerifiedUser.event.push(eventname);
    await existingVerifiedUser.save();

    // Step 7: Return success response
    return Response.json(
      {
        success: true,
        message: "Event registration successful.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration of events:", error);
    return Response.json(
      { success: false, message: "Error registering for the event." },
      { status: 500 }
    );
  }
}
