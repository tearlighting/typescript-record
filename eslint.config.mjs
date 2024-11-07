import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: { sourceType: "script" },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
