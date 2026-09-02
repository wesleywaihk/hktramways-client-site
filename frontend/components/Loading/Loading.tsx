import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { devClassName } from "@/lib/devClassName";

interface LoadingProps {
  fullPage?: boolean;
}

export default function Loading({ fullPage = false }: LoadingProps) {
  return (
    <Box
      className={`${devClassName("loading")}bg-green flex w-full items-center justify-center ${
        fullPage ? "h-dvh" : "h-[calc(100dvh-76px)] lg:h-[calc(100dvh-100px)]"
      }`}
      role="status"
      aria-label="Loading"
    >
      <CircularProgress size={70} className="text-white/70!" />
    </Box>
  );
}
