"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, currentCart, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const WixClient = createClient({
  modules: {
    products,
    collections,
    //   currentCart,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
});

export type WixClient = typeof WixClient;
export const WixClientContext = createContext<WixClient>(WixClient);

export const WixClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WixClientContext.Provider value={WixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
