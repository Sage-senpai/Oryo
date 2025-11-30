import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WalletProvider } from "./utils/walletContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Profile from "./components/profile.tsx";
import HomePage from "./pages/homepage.tsx";
import CreatorPage from "./pages/creatorPage.tsx";
import { PrivyProvider } from "@privy-io/react-auth"
import { OAuthCallback } from "./pages/callback.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/creator/:id",
        element: <CreatorPage />,
      },
      {
        path: "OAuth/callback",
        element: <OAuthCallback />
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <StrictMode>
       <PrivyProvider
        appId="cmhex8gjy00nejn0c4qqw58xv"
        clientId="client-WY6STfjx98HNPqFwZKEZVNenBdQ69BtZsXQYyPe7qpNEp"
        config={{
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            ethereum: {
              createOnLogin: 'users-without-wallets'
            }
          }
        }}
      >
        <RouterProvider router={router} />
      </PrivyProvider>
    </StrictMode>
  </WalletProvider>
);
