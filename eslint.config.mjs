import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Inherit Next.js defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable errors for unused variables
      "@typescript-eslint/no-unused-vars": "off",
      // Turn missing effect dependencies into warnings
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];