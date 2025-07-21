"use client"; // This directive is crucial for client-side functionality in Next.js App Router

import React, { useContext, useEffect } from "react"; // Import useEffect
import Hero from "@/components/Hero"; // Update path using alias
import "@/styles/Home.css"; // Assuming your CSS path is correctly set up with an alias
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "@/context/ContextWrapper"; // Update this path to your Context file in Next.js
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "@/app/globals.css";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const router = useRouter(); // Initialize useRouter

  // Use useEffect for redirection logic
  useEffect(() => {
    // If not authenticated, redirect to the authentication page
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]); // Dependency array: re-run effect if isAuthenticated or router changes

  const logout = async () => {
    try {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setUser(null);
      setIsAuthenticated(false);
      // After logout, the useEffect above will automatically redirect to /auth
    } catch (err) {
      console.error("Logout error:", err); // Log the full error
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred during logout.");
      }
    }
  };

  // If not authenticated, return null or a loading state to prevent flickering
  // The useEffect handles the actual redirection.
  if (!isAuthenticated) {
    return null; // Or a loading spinner if desired
  }

  return (
    <>
      <section className="home">
        <Hero />

        <button onClick={logout}>Logout</button>
      </section>
    </>
  );
};

export default Home;
