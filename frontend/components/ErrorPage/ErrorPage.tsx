import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";

interface ErrorPageProps {
  message: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
  return (
    <section className="borderless flex h-[calc(100dvh-52px)] w-full flex-col items-center justify-center gap-2 bg-white lg:h-[calc(100dvh-160px)]">
      <ErrorOutlineIcon className="text-green" sx={{ fontSize: 48 }} />
      <p className="text-green">{message}</p>
    </section>
  );
}
