import { BottomNav } from "./components/ekene/BottomNav";
import App from "./App";
import { useLocation, useNavigate } from "react-router";

export default function AppWithNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const routeToNav = {
    "/": "home",
    "/search": "search",
    "/discover": "discover",
    "/wallet": "wallet",
    "/communities": "communities",
    "/profile": "profile",
    "/creator-profile": "profile",
  } as const;

  const currentActive = (routeToNav as any)[location.pathname] ?? "home";

  const navToRoute = {
    home: "/",
    search: "/search",
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