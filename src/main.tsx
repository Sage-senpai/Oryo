import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WalletProvider } from "./utils/walletContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import {CreatorProfile} from "./pages/creatorProfile.tsx";
import HomePage from "./pages/homepage.tsx";
import CreatorPage from "./pages/creatorPage.tsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { OAuthCallback } from "./pages/callback.tsx";

// Import new pages
import { OryoHomeFeed } from './pages/HomeFeed';
import { WalletDashboard } from './pages/WalletDashboard';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { EventMode } from './pages/EventMode';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { CollectiblesPage } from './pages/CollectiblesPage';

// ⭐ ADD THIS — BottomNav + hooks
import { BottomNav } from "./components/oryo/BottomNav";
import { useLocation, useNavigate } from "react-router";

import "./styles/main.scss";


// ⭐ ADD THIS WRAPPER — it injects BottomNav into the router
function AppWithNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Route → Nav mapping
  const routeToNav = {
    "/": "home",
    "/discover": "discover",
    "/wallet": "wallet",
    "/communities": "communities",
    "/CreatorProfile": "profile",
  } as const;

  const currentActive =
    (routeToNav as any)[location.pathname] ?? "home";

  const navToRoute = {
    home: "/",
    discover: "/discover",
    wallet: "/wallet",
    communities: "/communities",
    profile: "/profile",
  } as const;

  const handleNavigate = (item: keyof typeof navToRoute) => {
    navigate(navToRoute[item]);
  };

  return (
    <>
      <App />
      <BottomNav active={currentActive} onNavigate={handleNavigate} />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithNav />, // ⭐ REPLACE App WITH WRAPPER (ONLY CHANGE)
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "CreatorProfile",
        element: <CreatorProfile />,
      },
      {
        path: "creator/:id",
        element: <CreatorPage />,
      },
      {
        path: "OAuth/callback",
        element: <OAuthCallback />,
      },
      {
        path: "feed",
        element: <OryoHomeFeed />,
      },
      {
        path: "wallet",
        element: <WalletDashboard />,
      },
      {
        path: "discover",
        element: <DiscoveryPage />,
      },
      {
        path: "events",
        element: <EventMode />,
      },
      {
        path: "communities",
        element: <CommunitiesPage />,
      },
      {
        path: "collectibles",
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
