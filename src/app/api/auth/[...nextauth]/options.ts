import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    // CredentialsProvider({
    //   id: 'credentials',
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'text' },
    //     password: { label: 'Password', type: 'password' },
    //   },
      // async authorize(credentials: any): Promise<any> {
      //   await dbConnect();
      //   try {
      //     const user = await UserModel.findOne({
      //       $or: [
      //         { email: credentials.email },
      //       ],
      //     });
      //     if (!user) {
      //       throw new Error('No user found with this email');
      //     }
      //     if (!user.isVerified) {
      //       throw new Error('Please verify your account before logging in');
      //     }
      //     // const isPasswordCorrect = await bcrypt.compare(
      //     //   credentials.password,
      //     //   user.password
      //     // );
      //     // if (isPasswordCorrect) {
      //     //   return user;
      //     // } else {
      //     //   throw new Error('Incorrect password');
      //     // }

      //   } catch (err: any) {
      //     throw new Error(err);
      //   }
      // },
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          
          const existingUser = await UserModel.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user if they don't exist
            await UserModel.create({
              email: user.email,
              firstname: user.name?.split(' ')[0] || '',
              lastname: user.name?.split(' ')[1] || '',
              isVerified: true, // Google accounts are pre-verified
            });
          }
          
          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.firstname = user.firstname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.firstname = token.firstname;
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    signOut:'/'
  },
};