/**
 * ============================================================================
 * Ekene - Main Entry Point
 * ============================================================================
 * Location: src/main.tsx
 * 
 * Application bootstrap with Afrocentric routing
 * ============================================================================
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { WalletProvider } from "./utils/walletContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppWithNav from "./AppWithNav";

// Pages - Afrocentric naming
import { EntryScreen } from "./pages/EntryScreen.tsx";
import { AuthScreen } from "./pages/AuthScreen.tsx";
import { HomeFeed } from "./pages/HomeFeed.tsx";
import { CreatorProfile } from "./pages/creatorProfile.tsx";
import CreatorPage from "./pages/creatorPage.tsx";
import ProfilePage from "./components/profile.tsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { OAuthCallback } from "./pages/callback.tsx";

// New Ekene pages
import { WalletDashboard } from "./pages/WalletDashboard";
import { SearchPage } from './pages/SearchPage';
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { EventMode } from "./pages/EventMode";
import { CommunitiesPage } from "./pages/CommunitiesPage";
import { CollectiblesPage } from "./pages/CollectiblesPage";

import "./styles/main.scss";

// ============================================================================
// ROUTER CONFIGURATION
// ============================================================================

const router = createBrowserRouter([
  {
    path: "/",
    element: <EntryScreen />, // Entry gateway (no nav)
  },
  {
    path: "/auth",
    element: <AuthScreen />, // Auth flow (no nav)
  },
  {
    path: "/app",
    element: <AppWithNav />, // Main app with bottom nav
    children: [
      { index: true, element: <HomeFeed /> }, // Village Hearth
      { path: "feed", element: <HomeFeed /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "creator-profile", element: <CreatorProfile /> },
      { path: "search", element: <SearchPage /> },
      { path: "creator/:id", element: <CreatorPage /> },
      { path: "wallet", element: <WalletDashboard /> }, // Ekene Vault
      { path: "discover", element: <DiscoveryPage /> },
      { path: "events", element: <EventMode /> },
      { path: "communities", element: <CommunitiesPage /> }, // Circles
      { path: "collectibles", element: <CollectiblesPage /> }, // Badges
    ],
  },
  {
    path: "/oauth/callback",
    element: <OAuthCallback />,
  },
]);

// ============================================================================
// APP BOOTSTRAP
// ============================================================================

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <StrictMode>
      <PrivyProvider
        appId={import.meta.env.VITE_PRIVY_APPID}
        clientId={import.meta.env.VITE_PRIVY_CLIENTID}
        config={{
          embeddedWallets: {
            createOnLogin: "users-without-wallets", // Walletless onboarding
          },
          appearance: {
            // Afrocentric theme for Privy modal
            theme: "light",
            accentColor: "#E5A039", // Sunrise gold
            logo: "/ekene-logo.svg",
          },
        }}
      >
        <RouterProvider router={router} />
      </PrivyProvider>
    </StrictMode>
  </WalletProvider>
);

/**
 * ============================================================================
 * ROUTING FLOW
 * ============================================================================
 * 
 * 1. "/" (Entry Screen)
 *    - User sees calabash emblem and "Enter Ekene" button
 *    - Click "Enter Ekene" → Check auth status
 *      - If authenticated → /app (Home Feed)
 *      - If not authenticated → /auth
 *    - Click "Continue as Guest" → /app (limited view)
 * 
 * 2. "/auth" (Auth Screen)
 *    - Phone/Email input + OTP
 *    - On success → /app (Home Feed)
 *    - Creates smart account automatically
 * 
 * 3. "/app" (Main App with Bottom Nav)
 *    - /app (Home Feed - Village Hearth)
 *    - /app/search (Search & follow creators)
 *    - /app/discover (Explore categories)
 *    - /app/wallet (Ekene Vault)
 *    - /app/communities (Circles)
 *    - /app/profile (User profile)
 * 
 * 4. "/oauth/callback"
 *    - X/Twitter OAuth redirect
 *    - Links account → /app
 * 
 * ============================================================================
 */