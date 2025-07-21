"use client"; // This directive makes this component a Client Component

import { createContext, useState } from "react";

// Define your Context here
export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

// This component will wrap your application to provide the context
export default function ContextWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </Context.Provider>
  );
}
