import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export type StoredUser = {
  fullName?: string;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  businessName?: string;
  city?: string;
  state?: string;
  industrySector?: string;
  sector?: string;
  businessType?: string;
  annualTurnover?: string;
  turnover?: string;
  numberOfEmployees?: string;
  employees?: string;
  plantInvestment?: string;
  womenOwned?: boolean;
  scStOwned?: boolean;
  exporter?: boolean;
};

type AuthGuardResult = {
  name: string;
  email: string;
  user: StoredUser | null;
  loading: boolean;
};

const AUTH_KEYS = [
  "bharat-udyam-authenticated",
  "bharat-udyam-auth",
  "isAuthenticated",
  "authenticated",
  "isLoggedIn",
];

const USER_KEYS = [
  "bharat-udyam-user",
  "currentUser",
  "user",
];

function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  for (const key of USER_KEYS) {
    const value = window.localStorage.getItem(key);

    if (!value) {
      continue;
    }

    try {
      const parsed: unknown = JSON.parse(value);

      if (
        parsed !== null &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed as StoredUser;
      }
    } catch {
      // Ignore malformed localStorage data.
    }
  }

  return null;
}

function isTruthyAuthValue(value: string | null): boolean {
  if (!value) {
    return false;
  }

  return ["true", "1", "yes"].includes(value.toLowerCase());
}

function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  for (const key of AUTH_KEYS) {
    if (isTruthyAuthValue(window.localStorage.getItem(key))) {
      return true;
    }
  }

  // Your current frontend signup stores the user object.
  // Treating a valid user object as authenticated keeps the
  // frontend-only login/signup flow working.
  return getStoredUser() !== null;
}

export function useAuthGuard(): AuthGuardResult {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let cancelled = false;

    const checkAuthentication = () => {
      if (cancelled) {
        return;
      }

      const authenticated = isAuthenticated();

      if (!authenticated) {
        setUser(null);
        setLoading(false);

        navigate({
          to: "/login",
          replace: true,
        });

        return;
      }

      const storedUser = getStoredUser();

      if (cancelled) {
        return;
      }

      setUser(storedUser);
      setLoading(false);
    };

    checkAuthentication();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const name =
    user?.fullName ||
    user?.name ||
    "there";

  const email =
    user?.email ||
    "";

  return {
    name,
    email,
    user,
    loading,
  };
}