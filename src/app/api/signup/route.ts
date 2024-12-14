import dbConnect from '@/lib/dbConnect';
import { sendEmail } from '@/lib/mailer';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
await dbConnect();

try {
    const { firstname, lastname, email, password } = await request.json();

    const existingVerifiedUserByUsername = await UserModel.findOne({
    email,
    isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
    return Response.json(
        {
        success: false,
        message: 'Email already exists',
        },
        { status: 400 }
    );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        event: [],
      });

      await newUser.save();
    }

    // Send verification email
    const responseemail = await sendEmail({
      email,
      firstname,
      lastname,
      verifyCode,
    })
    console.log('Email sent', responseemail);

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
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}