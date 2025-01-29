import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { members } from "@wix/members";
import { cookies } from "next/headers";

export const WixClientServer = async () => {
  let refreshToken = null;

  try {
    const cookieStore = cookies();
    const refreshTokenCookie = cookieStore.get("refreshToken")?.value;

    if (refreshTokenCookie) {
      refreshToken = JSON.parse(refreshTokenCookie);
    } else {
      console.warn("No refreshToken found in cookies.");
    }
  } catch (e) {
    console.error("Failed to parse refreshToken:", e);
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken: refreshToken || undefined, // Ensure it's not an empty object
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
