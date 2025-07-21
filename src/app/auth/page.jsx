"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "@/context/ContextWrapper";
import Register from "@/components/Register";
import Login from "@/components/Login";

const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("You're already logged in! Redirecting...");
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  const handleToggle = (isLoginView) => {
    if (isLogin === isLoginView) return;

    setIsAnimating(true);
    toast.info(`Switched to ${isLoginView ? "Login" : "Register"} view`, {
      autoClose: 1500,
    });

    setTimeout(() => {
      setIsLogin(isLoginView);
      setIsAnimating(false);
    }, 300);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ToastContainer position="top-center" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Toggle buttons with animated underline */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 font-medium text-lg focus:outline-none transition-colors duration-200 ${
                isLogin
                  ? "text-indigo-600 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-indigo-600 after:animate-underline"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleToggle(true)}
              disabled={isAnimating}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 px-6 font-medium text-lg focus:outline-none transition-colors duration-200 ${
                !isLogin
                  ? "text-indigo-600 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-indigo-600 after:animate-underline"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleToggle(false)}
              disabled={isAnimating}
            >
              Register
            </button>
          </div>

          {/* Animated content area */}
          <div
            className={`p-6 sm:p-8 transition-opacity duration-300 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            {isLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
