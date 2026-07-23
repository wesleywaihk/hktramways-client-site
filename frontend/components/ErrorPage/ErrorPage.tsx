import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";

interface ErrorPageProps {
  message: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-2 w-full h-[calc(100dvh-52px)] lg:h-[calc(100dvh-160px)] bg-white">
      <ErrorOutlineIcon className="text-redDark" sx={{ fontSize: 48 }} />
      <p className="text-redDark">{message}</p>
    </section>
  );
}
