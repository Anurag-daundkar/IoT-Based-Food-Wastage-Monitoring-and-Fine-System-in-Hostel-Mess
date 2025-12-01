import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { database } from "../config/firebase";

const whiteList = ["/protected"];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely read faceAuth from localStorage
  let storedAuth = null;
  try {
    storedAuth = JSON.parse(localStorage.getItem("faceAuth") || "null");
  } catch {
    storedAuth = null;
  }
  const account = storedAuth?.account;

  // Listen to solve flag to redirect into/out of login
  useEffect(() => {
    const solveRef = ref(database, "solve");
    const unsub = onValue(solveRef, async (snap) => {
      const val = snap.val();

      // Always read latest auth from localStorage to avoid stale closures
      let currentAuth = null;
      try {
        currentAuth = JSON.parse(localStorage.getItem("faceAuth") || "null");
      } catch {
        currentAuth = null;
      }
      const hasAccount = !!currentAuth?.account;

      if (val === true) {
        // Only force /login when no authenticated face is stored
        if (!hasAccount && location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      } else if (val === false) {
        try {
          const studentId = currentAuth?.account?.id;
          localStorage.removeItem("faceAuth");
          if (studentId) {
            // trigger backend logout sync (best effort)
            fetch(`http://localhost:5000/api/sync/logout`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ studentId })
            }).catch(() => {});
          }
        } finally {
          if (location.pathname !== "/") navigate("/", { replace: true });
        }
      }
    });
    return () => unsub();
  }, [location.pathname, navigate]);

  // 🔹 Ensure check=false on every route change (any page in this app)
  useEffect(() => {
    const checkRef = ref(database, "lastDetected/check");
    set(checkRef, false).catch((err) => {
      console.error("Error forcing check=false on route change:", err);
    });
  }, [location.pathname]);

  if (!account && whiteList.includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  if (account && !whiteList.includes(location.pathname)) {
    return <Navigate to="/protected" />;
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <Outlet className="grow" />
    </div>
  );
}

export default Layout;
