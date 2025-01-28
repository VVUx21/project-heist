import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

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
    // Step 2: Parse and Destructure Request Body
    const { firstname, lastname, email, password,image } = await request.json();

    if (!email || !password || !firstname || !lastname || !image) {
      return Response.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Step 3: Check for Existing Verified User
    const existingVerifiedUser = await UserModel.findOne({ email, isVerified: true });
    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: 'Email already exists.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     
    // Step 5: Handle Unverified Existing User
    const existingUser = await UserModel.findOne({ email });
    if (existingUser && !existingUser.isVerified) {
      existingUser.password = hashedPassword;
      await existingUser.save();
    } else {
      // Step 6: Create New User
      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        isVerified: true,
        image,
        event: [],
      });

      await newUser.save();
    }

    // sendEmail({ email, firstname, lastname, verifyCode })
    //   .then(() => console.log('Verification email sent successfully.'))
    //   .catch((err) => console.error('Failed to send verification email:', err));

    // Step 8: Send Response to Client
    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      { success: false, message: 'Error registering user.' },
      { status: 500 }
    );
  }
}