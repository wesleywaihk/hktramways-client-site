import {
  unstable_useContentManagerContext as useContentManagerContext,
  useNotification,
} from "@strapi/strapi/admin";

// Blocks Save / Publish on the interactive map when stations repeat a locCode.
// Checked in the browser so the unsaved form is kept; the server-side check in
// src/index.ts rejects the save too, but Strapi resets the form when it does.
const MODEL = "api::interactive-map.interactive-map";
const GUARDED_ACTIONS = ["update", "publish"];

type ActionDescription = { onClick?: (e: unknown) => unknown } & Record<string, unknown>;
type DocumentAction = ((props: { model: string }) => ActionDescription | null) & {
  type?: string;
  position?: unknown;
};

const findDuplicateLocCodes = (stations: unknown): string[] => {
  if (!Array.isArray(stations)) return [];
  const seen = new Set<string>();
  const dups = new Set<string>();
  for (const station of stations) {
    const locCode = station?.locCode;
    if (!locCode) continue;
    if (seen.has(locCode)) dups.add(locCode);
    seen.add(locCode);
  }
  return [...dups];
};

const withLocCodeGuard = (Action: DocumentAction): DocumentAction => {
  const Guarded: DocumentAction = (props) => {
    const description = Action(props);
    const { form } = useContentManagerContext();
    const { toggleNotification } = useNotification();

    if (!description || props.model !== MODEL) return description;

    return {
      ...description,
      onClick: async (e: unknown) => {
        const dups = findDuplicateLocCodes((form.values as { station?: unknown }).station);
        if (dups.length) {
          toggleNotification({
            type: "danger",
            message: `Duplicate station locCode: ${dups.join(", ")}`,
          });
          // Truthy return mutes the action's confirm dialog
          return true;
        }
        return description.onClick?.(e);
      },
    };
  };
  Guarded.type = Action.type;
  Guarded.position = Action.position;
  return Guarded;
};

export const guardStationLocCodes = (actions: DocumentAction[]) =>
  actions.map((action) =>
    action.type && GUARDED_ACTIONS.includes(action.type) ? withLocCodeGuard(action) : action
  );
