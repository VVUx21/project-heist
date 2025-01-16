import { NextAuthOptions } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import Google from "next-auth/providers/google"

function getGoogleCred(): { clientId: string; clientSecret: string } {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Secret");
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: getGoogleCred().clientId,
      clientSecret: getGoogleCred().clientSecret,
    })
    // CredentialsProvider({
    //   id: 'credentials',
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'text' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials: any): Promise<any> {
    //     await dbConnect();
    //     try {
    //       const user = await UserModel.findOne({
    //         $or: [
    //           { email: credentials.email },
    //         ],
    //       });
    //       if (!user) {
    //         throw new Error('No user found with this email');
    //       }
    //       if (!user.isVerified) {
    //         throw new Error('Please verify your account before logging in');
    //       }
    //       const isPasswordCorrect = await bcrypt.compare(
    //         credentials.password,
    //         user.password
    //       );
    //       if (isPasswordCorrect) {
    //         return user;
    //       } else {
    //         throw new Error('Incorrect password');
    //       }
    //     } catch (err: any) {
    //       throw new Error(err);
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async signIn({profile}) {
      console.log(profile)
      try {
        await dbConnect();
        if (!profile) {
          throw new Error('Profile is undefined');
        }

        const user = await UserModel.findOne({ email: profile.email });
        if(user){
          return true;
        }
        if(!user){
          const user = await UserModel.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            is_verified: true,
          });
        }
        return true;
      } catch (error) {
        console.log(error)
        return false
      }
    },
    // async jwt({ token, user }) {
    //   if (user) {
    //     token._id = user._id?.toString(); // Convert ObjectId to string
    //     token.isVerified = user.isVerified;
    //     token.email = user.email;
    //     token.firstname = user.firstname;
    //   }
    //   return token;
    // },
    async session({ session}) {
      const sessionUser = await UserModel.findOne({ email: session.user.email });
      session.user._id = sessionUser?._id?.toString();
      session.user.isVerified = sessionUser?.is_verified;
      session.user.firstname = sessionUser?.name;
      session.user.email = sessionUser?.email;
      
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
