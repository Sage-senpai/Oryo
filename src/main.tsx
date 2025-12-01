import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WalletProvider } from "./utils/walletContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import Profile from "./components/profile.tsx";
import HomePage from "./pages/homepage.tsx";
import CreatorPage from "./pages/creatorPage.tsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { OAuthCallback } from "./pages/callback.tsx";

// New imports
import { OryoHomeFeed } from './pages/HomeFeed';
import { WalletDashboard } from './pages/WalletDashboard';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { EventMode } from './pages/EventMode';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { CollectiblesPage } from './pages/CollectiblesPage';

import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // -------------------
      // Existing Routes
      // -------------------
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
        element: <OAuthCallback />,
      },

      // -------------------
      // NEW ROUTES ADDED
      // -------------------
      {
        path: "/feed",
        element: <OryoHomeFeed />,
      },
      {
        path: "/wallet",
        element: <WalletDashboard />,
      },
      {
        path: "/discover",
        element: <DiscoveryPage />,
      },
      {
        path: "/events",
        element: <EventMode />,
      },
      {
        path: "/communities",
        element: <CommunitiesPage />,
      },
      {
        path: "/collectibles",
        element: <CollectiblesPage />,
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
          embeddedWallets: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </PrivyProvider>
    </StrictMode>
  </WalletProvider>
);
