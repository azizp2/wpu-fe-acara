import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";


export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        // if (!credentials) return null;

        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

          const result = await authServices.login({ identifier, password });
          const accessToken = result.data.data; 
          const me = await authServices.getProfileWithToken(accessToken);
          const user = me.data.data;
          
          if (accessToken && result.status === 200 && user._id && me.status === 200 ) {
            // Extend user object with accessToken
            user.accessToken = accessToken;
            return user; // Return the user, not just the token
          } else {
            return null;
          }

      },
    }),
  ],

  callbacks: {
    async jwt({
      token, 
      user
    }: {
      token: JWTExtended; 
      user: UserExtended | null
    }) {
      if(user){
        token.user = user;
      }
      return token
    },
    async session({
      session,
      token
    }:{
      session : SessionExtended;
      token: JWTExtended
    }){
      session.user = token.user;
      session.accessToken = token.user?.accessToken;

      return session
    }
  }
});
