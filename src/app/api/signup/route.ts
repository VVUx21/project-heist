import dbConnect from '@/lib/dbConnect';
import { sendEmail } from '@/lib/mailer';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  // Step 1: Connect to Database
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
    const { uniquecode, firstname, lastname, email, password } = await request.json();

    if (!email || !password || !firstname || !lastname || !uniquecode) {
      return Response.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    console.log('Unique Code:', uniquecode);

    // Step 3: Check for Existing Verified User
    const existingVerifiedUser = await UserModel.findOne({ email, isVerified: true });
    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: 'Email already exists.' },
        { status: 400 }
      );
    }

    // Step 4: Generate Verify Code and Hash Password
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCodeExpiry = new Date(Date.now() + 3600000); // 1-hour expiry

    // Step 5: Handle Unverified Existing User
    const existingUser = await UserModel.findOne({ email });
    if (existingUser && !existingUser.isVerified) {
      existingUser.password = hashedPassword;
      existingUser.verifyCode = verifyCode;
      existingUser.verifyCodeExpiry = verifyCodeExpiry;
      await existingUser.save();
    } else {
      // Step 6: Create New User
      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        isVerified: false,
        uniquecode,
        event: [],
      });

      await newUser.save();
    }

    sendEmail({ email, firstname, lastname, verifyCode })
      .then(() => console.log('Verification email sent successfully.'))
      .catch((err) => console.error('Failed to send verification email:', err));

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
