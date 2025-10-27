import React from "react";
import { Link } from "react-router-dom";

function Home() {
  // style={{ backgroundImage: "url('/src/assets/images/Layout.png')" }}
  return (
    <div className="flex min-h-screen items-center justify-center align-middle">
        <div className="flex-col align-middle justify-center text-center m-7">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-600 sm:text-5xl mb-4">
            Login and Sign up
          </h1>
          <h1 className="text-4xl tracking-tight font-extrabold text-green-400 sm:text-5xl ">
            Face Recognition
          </h1>
          <p className="mt-8 text-md text-gray-600 max-w-3xl mx-4 md:mx-16 lg:mx-auto">
            For New Registration go for Sign Up and for Detction go for Login
          </p>
          <div className="flex gap-4 justify-center mt-12">
            <Link
              to={"/signup"}
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="text-white">Sign Up</span>
            </Link>
            <Link
              to={"/login"}
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
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
              <span className="text-white">Log In</span>
            </Link>
          </div>
        </div>
        </div>
  );
}

export default Home;
