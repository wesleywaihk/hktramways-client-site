export default function Loading() {
  return (
    <section className="flex items-center justify-center w-full h-[calc(100dvh-52px)] lg:h-[calc(100dvh-160px)] bg-white">
      <div
        className="w-12 h-12 rounded-full border-4 border-green/20 border-t-green animate-spin"
        role="status"
        aria-label="Loading"
      />
    </section>
  );
}
