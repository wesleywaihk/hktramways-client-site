import { useEffect, useRef } from "react";
import { unstable_useContentManagerContext as useContentManagerContext } from "@strapi/strapi/admin";

// Fills `slug` from `title` (dash-case) as the title is typed while creating an
// entry, until the editor types into the slug field themselves.
// Existing entries are left alone.
// Registered as a header action that renders nothing, since header actions are
// mounted inside the edit form on every screen size.
const MODELS = ["api::announcement.announcement"];

const toDashCase = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

type HeaderAction = ((props: { model: string }) => null) & { type?: string };

const slugAutoFill: HeaderAction = ({ model }) => {
  const { id, form } = useContentManagerContext() as {
    id?: string;
    form: {
      values: { title?: string; slug?: string };
      onChange: (field: string, value: string) => void;
    };
  };
  const title = form.values.title ?? "";
  const slug = form.values.slug ?? "";
  // Last slug we generated; a different slug means the editor edited it
  const lastAutoSlug = useRef(slug);
  const dirty = useRef(false);

  // Strapi's own `isCreatingEntry` is always false (it checks id === "create"
  // after useDoc has already mapped "create" to undefined), so check the id.
  const enabled = !id && MODELS.includes(model);

  useEffect(() => {
    if (!enabled || dirty.current) return;
    if (slug !== lastAutoSlug.current) {
      dirty.current = true;
      return;
    }
    const next = toDashCase(title);
    if (next !== slug) {
      lastAutoSlug.current = next;
      form.onChange("slug", next);
    }
  }, [enabled, title, slug, form]);

  return null;
};
slugAutoFill.type = "slug-auto-fill";

export default slugAutoFill;
