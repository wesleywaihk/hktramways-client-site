export function buildPopulate(fields: string[]) {
  return fields.map((field) => `populate[${field}][populate]=*`).join("&");
}
