export function devClassName(name: string): string {
  return process.env.NODE_ENV === "development" ? `${name} ` : "";
}
