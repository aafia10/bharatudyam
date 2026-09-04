import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

    const checkAuthentication = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (cancelled) {
        return;
      }

      if (!session) {
        setUser(null);
        setLoading(false);

        navigate({
          to: "/login",
          replace: true,
        });

        return;
      }

      // Sync metadata to local storage user object to prevent breaking pages
      let storedUser = getStoredUser();
      if (!storedUser || storedUser.email !== session.user.email) {
        storedUser = {
          fullName: session.user.user_metadata?.fullName || session.user.user_metadata?.name || session.user.email?.split('@')[0] || "User",
          name: session.user.user_metadata?.fullName || session.user.user_metadata?.name || session.user.email?.split('@')[0] || "User",
          email: session.user.email,
          mobile: session.user.user_metadata?.mobile || "",
          businessName: session.user.user_metadata?.businessName || "",
          city: session.user.user_metadata?.city || "",
          state: session.user.user_metadata?.state || "",
        };
        window.localStorage.setItem("bharat-udyam-user", JSON.stringify(storedUser));
        window.localStorage.setItem("bharat-udyam-authenticated", "true");
        window.localStorage.setItem("bharat-udyam-user-name", storedUser.fullName || "");

        if (session.user.user_metadata?.userType === "NBFC") {
          const nbfcUser = {
            fullName: session.user.user_metadata?.fullName || storedUser.fullName || "NBFC User",
            employeeId: session.user.user_metadata?.employeeId || "",
            email: session.user.email,
            mobile: session.user.user_metadata?.mobile || storedUser.mobile || "",
            role: session.user.user_metadata?.role || "RM / Field Officer",
            branch: session.user.user_metadata?.branch || "",
            region: session.user.user_metadata?.region || "",
            userType: "NBFC",
          };
          window.localStorage.setItem("bharat-udyam-nbfc-user", JSON.stringify(nbfcUser));
        }
      }

      setUser(storedUser);
      setLoading(false);
    };

    checkAuthentication();

    // Listen for auth changes (like logouts)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          navigate({ to: "/login", replace: true });
        } else if (event === "SIGNED_IN" && session) {
          checkAuthentication();
        }
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
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