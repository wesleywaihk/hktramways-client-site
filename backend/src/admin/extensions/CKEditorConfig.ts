import { GeneralHtmlSupport, Style } from "ckeditor5";
import {
  defaultHtmlPreset,
  setPluginConfig,
  type Preset,
} from "@_sh/strapi-plugin-ckeditor";

// Default HTML preset plus a "Style" dropdown for our own text styles.
// Each style wraps the selection in `element` with `classes`; the frontend
// styles them by class. Keep the preset name so existing field schemas
// (`options.preset: "defaultHtml"`) still resolve.
const htmlPreset: Preset = {
  ...defaultHtmlPreset,
  // Editor preview only — headings are stored as plain <h1>–<h6>, so the
  // frontend applies its own heading colour.
  styles: `
    .ck-content :is(h1, h2, h3, h4, h5, h6) {
      color: #007549;
    }
  `,
  editorConfig: {
    ...defaultHtmlPreset.editorConfig,
    plugins: [
      ...(defaultHtmlPreset.editorConfig.plugins ?? []),
      GeneralHtmlSupport,
      Style,
    ],
    toolbar: ["style", "|", ...(defaultHtmlPreset.editorConfig.toolbar as string[])],
    style: {
      definitions: [
        { name: "Small text", element: "small", classes: ["small-text"] },
      ],
    },
    htmlSupport: {
      allow: [{ name: "small", classes: ["small-text"] }],
    },
  },
};

export function configureCKEditor() {
  setPluginConfig({ presets: [htmlPreset] });
}
