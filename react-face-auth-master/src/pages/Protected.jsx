import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { database } from "../config/firebase";

function Protected() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("faceAuth")) {
      navigate("/login");
      return;
    }

    // Read account directly (fix for async state update issue)
    const stored = JSON.parse(localStorage.getItem("faceAuth"));
    const user = stored.account;
    setAccount(user);

    // Only run check logic if user exists
    if (user?.id) {
      const checkRef = ref(database, "lastDetected/check");

      // When entering protected page → OPEN dustbin
      set(checkRef, true)
        .then(() => console.log("✅ Check set TRUE on Protected page"))
        .catch((err) => console.error("❌ Error setting check TRUE:", err));
    }

    // Cleanup: When leaving Protected page → CLOSE dustbin
    return () => {
      if (user?.id) {
        const checkRef = ref(database, "lastDetected/check");
        set(checkRef, false)
          .then(() => console.log("🚨 Leaving Protected - check set FALSE"))
          .catch((err) => console.error("❌ Error setting FALSE:", err));
      }
    };
  }, []);

  if (!account) return null;

  return (
    <div className="bg-white pt-40 md:pt-60">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">
          You have successfully logged in!
        </h2>
        <div className="text-center mb-24">
          <img
            className="mx-auto mb-8 object-cover h-48 w-48 rounded-full"
            src={
              account?.type === "CUSTOM"
                ? account.picture
                : `/temp-accounts/${account.picture}`
            }
            alt={account.fullName}
          />

          <h1
            className="block text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800"
            style={{ lineHeight: "1.5" }}
          >
            {account?.fullName}
          </h1>

          <div
            onClick={async () => {
              const studentId = account?.id;

              localStorage.removeItem("faceAuth");

              if (studentId) {
                try {
                  const response = await fetch(
                    `http://localhost:5000/api/sync/logout`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ studentId }),
                    }
                  );

                  if (response.ok) {
                    console.log("✅ Logout sync successful");
                  } else {
                    console.error("❌ Logout sync failed");
                  }
                } catch (error) {
                  console.error("❌ Logout sync error:", error);
                }
              }

              navigate("/");
            }}
            className="flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600"
          >
            <span className="text-white">Log Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protected;
