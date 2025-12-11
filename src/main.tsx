// File: src/main.tsx
// Application bootstrap with routing - PRODUCTION READY
// All routes properly configured with correct theme

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./styles/main.scss";

// Context Providers
import { WalletProvider } from "./contexts/WalletContext";

// App Shell
import AppWithNav from "./AppWithNav";

// Entry & Auth Pages
import {EntryScreen} from "./pages/EntryScreen";
import AuthScreen from "./pages/AuthScreen";

// Main App Pages
import VillageFeed from "./components/Feed/VillageFeed";
import DiscoveryPage from "./components/Explore/DiscoveryPage";
import BalanceCard from "./components/Wallet/BalanceCard";
import CreatorProfile from "./components/Profile/CreatorProfile";
import EventMode from "./components/Events/EventMode";
import RewardsHub from "./components/Rewards/RewardsHub";
import SettingsPage from "./components/Settings/SettingsPage";
import NotificationsPanel from "./components/Notifications/NotificationsPanel";

// ============================================================================
// ROUTER CONFIGURATION
// ============================================================================

const router = createBrowserRouter([
  // Entry point - Landing page
  {
    path: "/",
    element: <EntryScreen />,
  },
  
  // Authentication flow
  {
    path: "/auth",
    element: <AuthScreen />,
  },
  
  // Main application with navigation
  {
    path: "/app",
    element: <AppWithNav />,
    children: [
      // Village Feed (Home)
      {
        index: true,
        element: <VillageFeed />,
      },
      {
        path: "feed",
        element: <VillageFeed />,
      },
      
      // Discovery & Explore
      {
        path: "discover",
        element: <DiscoveryPage />,
      },
      
      // Wallet (Gift House)
      {
        path: "wallet",
        element: <BalanceCard />,
      },
      
      // User Profile
      {
        path: "profile",
        element: <SettingsPage />,
      },
      
      // Creator Profile (Dynamic)
      {
        path: "creator/:address",
        element: <CreatorProfile />,
      },
      
      // Events
      {
        path: "events",
        element: <EventMode />,
      },
      {
        path: "events/:eventId",
        element: <EventMode />,
      },
      
      // Rewards & Warmth
      {
        path: "rewards",
        element: <RewardsHub />,
      },
      
      // Settings
      {
        path: "settings",
        element: <SettingsPage />,
      },
      
      // Notifications (Can be modal or page)
      {
        path: "notifications",
        element: <NotificationsPanel />,
      },
    ],
  },
]);

// ============================================================================
// APP BOOTSTRAP
// ============================================================================

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
  </StrictMode>
);

/**
 * ============================================================================
 * ROUTING STRUCTURE
 * ============================================================================
 * 
 * PUBLIC ROUTES (No Auth Required):
 * - / (Entry Screen) - Landing page with "Enter Ekene" button
 * - /auth - Authentication flow (walletless onboarding)
 * 
 * PROTECTED ROUTES (Requires Auth):
 * All under /app with persistent navigation
 * 
 * - /app (Village Feed) - Home feed with posts and tips
 * - /app/feed - Alias for home
 * - /app/discover - Explore creators, circles, events
 * - /app/wallet - Wallet dashboard (The Gift House)
 * - /app/profile - Current user profile & settings
 * - /app/creator/:address - View creator profile
 * - /app/events - Browse events
 * - /app/events/:eventId - Specific event details
 * - /app/rewards - Warmth system & achievements
 * - /app/settings - Account settings
 * - /app/notifications - Notifications panel
 * 
 * ============================================================================
 * NAVIGATION FLOW
 * ============================================================================
 * 
 * 1. User lands on "/" (Entry Screen)
 *    - Shows Ekene branding with cultural elements
 *    - "Enter Ekene" button → checks auth state
 *      - Authenticated → /app
 *      - Not authenticated → /auth
 *    - "Continue as Guest" → /app (read-only mode)
 * 
 * 2. "/auth" (Authentication)
 *    - Walletless onboarding with temporary account
 *    - Or connect existing wallet
 *    - On success → /app
 * 
 * 3. "/app/*" (Main Application)
 *    - Persistent header with logo, warmth, notifications, avatar
 *    - Sidebar navigation (desktop)
 *    - Bottom navigation (mobile)
 *    - Content area renders child routes
 * 
 * ============================================================================
 * THEME COMPLIANCE
 * ============================================================================
 * 
 * All components use official Ekene colors:
 * - Deep Earth Brown (#3A2A1A) - backgrounds
 * - Sunrise Gold (#E5A039) - primary actions
 * - Terracotta Clay (#D96B3C) - accents
 * - Palm Green (#2B6E3E) - secondary actions
 * - Warm Sand (#F3E7D3) - text/borders
 * - Ochre Yellow (#DAA520) - highlights
 * 
 * ============================================================================
 */