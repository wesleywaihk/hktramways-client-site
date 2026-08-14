import { Outfit } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import StoreProvider from "@/store/StoreProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={outfit.variable}>
      <body>
        <AppRouterCacheProvider>
          <StoreProvider>{children}</StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
