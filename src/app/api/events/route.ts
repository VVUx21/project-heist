import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
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
    const { eventname, email } = await request.json();

    if (!email || !eventname) {
      return Response.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    const existingVerifiedUser = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (!existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Email doesn't exist or user not verified." },
        { status: 400 }
      );
    }

    // Add the event name to the events array
    if (!existingVerifiedUser.event) {
      existingVerifiedUser.event = [];
    }
    existingVerifiedUser.event.push(eventname);
    await existingVerifiedUser.save();

    return Response.json(
      {
        success: true,
        message: 'Event registration successful.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in registration of events:', error);
    return Response.json(
      { success: false, message: 'Error registering in events.' },
      { status: 500 }
    );
  }
}