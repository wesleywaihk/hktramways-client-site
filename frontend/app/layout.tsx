import StoreProvider from "@/store/StoreProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
