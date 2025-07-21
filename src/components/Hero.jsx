"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Context } from "@/context/ContextWrapper";

const Hero = () => {
  const { user } = useContext(Context);

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 to-blue-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image section */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-full md:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-all duration-300">
              <Image
                src="/hero-img.png"
                alt="Project showcase"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content section */}
          <div className="w-full md:w-1/2 lg:w-3/5 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <span> Project Highlights</span>
            </div>

            <h4 className="text-lg font-medium text-gray-600">
              Hello,{" "}
              <span className="font-semibold text-indigo-600">
                {user ? user.name : "User"}
              </span>
            </h4>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Welcome to My <span className="text-indigo-600">Full-Stack</span>{" "}
              Project
            </h1>

            <div className="prose prose-indigo max-w-none text-gray-600 space-y-4">
              <p>
                In this project, I built a full-stack web application using
                Next.js for the frontend and a separate backend server powered
                by Node.js and Express.js. I implemented a complete custom
                authentication system, which includes user registration, login,
                logout, OTP verification, and a secure forgot/reset password
                flow.
              </p>

              <p>
                The authentication was built entirely from scratch using JSON
                Web Tokens (JWT) and encrypted password handling, rather than
                relying on third-party libraries like Auth0 or Firebase.
              </p>

              <p>
                For server-side logging and monitoring, I integrated both
                Winston and Morgan. Morgan is a lightweight HTTP request logger
                middleware that helps track incoming requests in real time,
                making debugging and request tracking easier during development.
              </p>

              <p>
                Additionally, I implemented OTP-based email verification and
                password recovery functionalities using Nodemailer, allowing
                secure communication through automated emails. The system
                ensures that only verified users can access the protected
                routes, improving the overall security and reliability of the
                application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
