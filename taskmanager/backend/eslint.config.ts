import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    files: ["src/**/*.ts"],
    languageOptions: { sourceType: "module" },
    rules: {
      "no-console": "warn",
      "prefer-const": "error",
      "no-unused-vars": "warn",
    },
  }
);
