import {defineManifest} from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const {version, name: packageName} = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === "staging"
      ? `[INTERNAL] ${packageName}`
      : packageName,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  content_scripts: [{
    js: ["src/pages/content.tsx"],
    matches: ["https://*.lionelhorn.com/*"],
  }],
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  action: {
    "default_popup": "popup.html",
  },
  permissions: [
    "storage",
  ],
}));
