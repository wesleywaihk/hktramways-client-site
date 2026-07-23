"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type HeaderStyle = "default" | "transparent" | "white";

interface HeaderStyleContextValue {
  headerStyle: HeaderStyle;
  setHeaderStyle: (style: HeaderStyle) => void;
}

const HeaderStyleContext = createContext<HeaderStyleContextValue | null>(null);

export function HeaderStyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>("default");

  return (
    <HeaderStyleContext.Provider value={{ headerStyle, setHeaderStyle }}>
      {children}
    </HeaderStyleContext.Provider>
  );
}

export function useHeaderStyle() {
  const context = useContext(HeaderStyleContext);
  if (!context) {
    throw new Error("useHeaderStyle must be used within a HeaderStyleProvider");
  }
  return context;
}
