/*import NextAuth from "next-auth/next"
import { config } from "auth"

const handler = NextAuth(config.providers.Keycloak)
export { handler as GET, handler as POST }

*/
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_KEYCLOAK_ID ?? "",
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET ?? "",
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};