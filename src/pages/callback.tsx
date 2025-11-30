// src/pages/OAuthCallback.tsx
import React from "react";
import { useOAuthTokens } from "@privy-io/react-auth";

export const OAuthCallback: React.FC = () => {
  useOAuthTokens({
    onOAuthTokenGrant: (tokenInfo) => {
      console.log("Received tokens:", tokenInfo.oAuthTokens);
      console.log("User:", tokenInfo.user);
      // You can now trigger post-login logic.
      // For example, you might redirect the user or fetch additional user data.

    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Finishing login… please wait.</p>
    </div>
  );
};
