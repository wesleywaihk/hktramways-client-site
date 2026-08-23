import { Outfit, Noto_Sans_HK, Noto_Sans_SC } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import StoreProvider from "@/store/StoreProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
});

const notoSansHK = Noto_Sans_HK({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans-hk",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans-sc",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${outfit.variable} ${notoSansHK.variable} ${notoSansSC.variable}`}
    >
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <StoreProvider>{children}</StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
