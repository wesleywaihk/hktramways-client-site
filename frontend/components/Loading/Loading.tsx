export default function Loading() {
  return (
    <section className="flex h-[calc(100dvh-52px)] w-full items-center justify-center bg-white lg:h-[calc(100dvh-160px)]">
      <div
        className="border-green/20 border-t-green h-12 w-12 animate-spin rounded-full border-4"
        role="status"
        aria-label="Loading"
      />
    </section>
  );
}
