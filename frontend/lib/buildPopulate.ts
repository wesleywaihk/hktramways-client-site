type PopulateNode = "*" | { [key: string]: PopulateNode };

export function buildPopulate(fields: string[]) {
  const root: { [key: string]: PopulateNode } = {};

  for (const field of fields) {
    const parts = field.split(".");
    let node = root;
    parts.forEach((part, i) => {
      const isLast = i === parts.length - 1;
      if (node[part] === undefined || node[part] === "*") {
        node[part] = isLast ? "*" : {};
      }
      if (!isLast) {
        node = node[part] as { [key: string]: PopulateNode };
      }
    });
  }

  function serialize(
    node: { [key: string]: PopulateNode },
    prefix: string,
  ): string[] {
    return Object.entries(node).flatMap(([key, value]) => {
      const path = `${prefix}[${key}]`;
      if (value === "*") return [`${path}[populate]=*`];
      return serialize(value, `${path}[populate]`);
    });
  }

  return serialize(root, "populate").join("&");
}
