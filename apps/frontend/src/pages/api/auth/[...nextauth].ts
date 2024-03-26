import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface TokenObject extends JWT {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  error?: string;
}

type LoginObject = {
  username: string;
  password: string;
  remember: boolean;
};

async function refreshAccessToken(
  tokenObject: TokenObject
): Promise<TokenObject> {
  try {
    console.log("Refreshing token =====>", tokenObject);
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
      {
        refreshToken: tokenObject.refreshToken,
      }
    );

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: tokenResponse.data.expiresIn,
    };
  } catch (error) {
    return { ...tokenObject, error: "RefreshAccessTokenError" };
  }
}

const providers = [
  CredentialsProvider({
    type: "credentials",
    credentials: {},
    id: "username-login",
    async authorize(credentials) {
      try {
        console.log(credentials);
        const { username, password, remember } = credentials as LoginObject;
        // Authenticate user with credentials

        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          {
            password: password,
            username: username,
            remember: true,
          }
        );

        if (user.data.accessToken) {
          console.log("USER DATA =========+>", user.data);
          return user.data;
        }

        return null;
      } catch (e) {
        throw new Error("Login failed");
      }
    },
  }),
];

const callbacks = {
  jwt: async ({ token, user }: any) => {
    if (user) {
      console.log("CALL BACK =========+>", user, token);
      // This will only be executed at login. Each next invocation will skip this part.
      token.accessToken = user.accessToken;
      token.accessTokenExpiry = user.expiresIn;
      token.refreshToken = user.refreshToken;
    }
    const decoded = jwtDecode(token.accessToken);

    // If accessTokenExpiry is 15 minutes, we have to refresh token before 15 minutes pass.
    const shouldRefreshToken =
      Date.now() > decoded.iat! + token.expiresIn * 1000 ? true : false;
    console.log("shouldRefreshToken", shouldRefreshToken);

    // If the call arrives after 15 minutes have passed, we allow to refresh the token.

    if (shouldRefreshToken) {
      token = await refreshAccessToken(token);
    }
    // If the token is still valid, just return it.

    return Promise.resolve(token);
  },
  session: async ({ session, token }: any) => {
    // Here we pass accessToken to the client to be used in authentication with your API
    session.accessToken = token.accessToken;
    session.accessTokenExpiry = token.accessTokenExpiry;
    session.error = token.error;

    return Promise.resolve(session);
  },
};

const options: NextAuthOptions = {
  providers,

  pages: {
    signIn: "/auth/login-mvp",
  },
  callbacks,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
};

const Auth = (req: any, res: any) => NextAuth(req, res, options);

export default Auth;
