export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/+$/,
  "",
);

export const IMG_URL = (
  process.env.NEXT_PUBLIC_IMG_URL ?? process.env.NEXT_PUBLIC_API_URL ?? ""
).replace(/\/+$/, "");
