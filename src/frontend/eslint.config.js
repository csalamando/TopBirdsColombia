import tseslintParser from "@typescript-eslint/parser";
import securityPlugin from "eslint-plugin-security";

export default [
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      security: securityPlugin,
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
    },
  },
];
