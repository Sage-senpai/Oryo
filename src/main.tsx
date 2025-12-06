import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { WalletProvider } from "./utils/walletContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppWithNav from "./AppWithNav";

import { CreatorProfile } from "./pages/creatorProfile.tsx";
import HomePage from "./pages/homepage.tsx";
import CreatorPage from "./pages/creatorPage.tsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { OAuthCallback } from "./pages/callback.tsx";
import ProfilePage from "./components/profile.tsx";

// New pages
import { EkeneHomeFeed } from "./pages/HomeFeed";
import { WalletDashboard } from "./pages/WalletDashboard";
import { SearchPage } from './pages/SearchPage';
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { EventMode } from "./pages/EventMode";
import { CommunitiesPage } from "./pages/CommunitiesPage";
import { CollectiblesPage } from "./pages/CollectiblesPage";

import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithNav />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "creator-profile", element: <CreatorProfile /> },
      { path: "search", element: <SearchPage /> },
      { path: "creator/:id", element: <CreatorPage /> },
      { path: "oauth/callback", element: <OAuthCallback /> },
      { path: "feed", element: <EkeneHomeFeed /> },
      { path: "wallet", element: <WalletDashboard /> },
      { path: "discover", element: <DiscoveryPage /> },
      { path: "events", element: <EventMode /> },
      { path: "communities", element: <CommunitiesPage /> },
      { path: "collectibles", element: <CollectiblesPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <StrictMode>
      <PrivyProvider
        appId={import.meta.env.VITE_PRIVY_APPID}
        clientId={import.meta.env.VITE_PRIVY_CLIENTID}
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