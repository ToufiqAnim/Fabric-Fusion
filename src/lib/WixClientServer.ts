import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";

export const WixClientServer = async () => {
  let refreshToken;
  try {
    const Cookies = cookies();
    refreshToken = JSON.parse(Cookies.get("refreshToken")?.value || "{}");
  } catch (error) {}

  const WixClient = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });
  return WixClient;
};
