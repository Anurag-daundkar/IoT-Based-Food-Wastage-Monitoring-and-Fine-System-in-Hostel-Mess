import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, set } from "firebase/database";
import { database } from "../config/firebase";

function Home() {
  // Ensure dustbin is closed when viewing the landing page
  useEffect(() => {
    const checkRef = ref(database, "lastDetected/check");
    set(checkRef, false).catch((err) => {
      console.error("Error setting check=false on Home:", err);
    });
  }, []);
  // style={{ backgroundImage: "url('/src/assets/images/Layout.png')" }}
  return (
    <div className="flex min-h-screen items-center justify-center align-middle">
        <div className="flex-col align-middle justify-center text-center m-7">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-600 sm:text-5xl mb-4">
            Smart Waste Management
          </h1>
          <h1 className="text-4xl tracking-tight font-extrabold text-green-400 sm:text-5xl ">
            Face Recognition Authentication
          </h1>
          <p className="mt-8 text-md text-gray-600 max-w-3xl mx-4 md:mx-16 lg:mx-auto">
            Dispose waste responsibly with automatic face recognition. Click below to access the waste disposal system.
          </p>
          <div className="flex gap-4 justify-center mt-12">
            <Link
              to="/login"
              className="flex gap-2 w-fit cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-green-300 to-green-600"
            >
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
              <span className="text-white">Dispose Waste</span>
            </Link>
          </div>
        </div>
        </div>
  );
}

export default Home;
