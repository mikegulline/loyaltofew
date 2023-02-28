// https://github.com/nextauthjs/next-auth-example

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import clientPromise from './lib/mongodb';
import User from '../../../models/user';
import db from '../../../utils/db';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        // password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        await db.connectDB();
        const user = await User.findOne({ email });
        await db.disconnectDB();
        if (user) {
          return await SignInUser({ password, user });
        } else {
          throw new Error('This email does not exist.');
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      await db.connectDB();
      let user = await User.findById(token.sub);
      await db.disconnectDB();
      session.user._id = token.sub || user._id.toString();
      session.user.role = user.role || 'user';
      session.user.emailVerified = user.emailVerified;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
};

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter your password.');
  }
  const testPassword = await bcrypt.compare(password, user.password);

  if (!testPassword) {
    throw new Error('Email or password is wrong!');
  }
  return user;
};

export default NextAuth(authOptions);
