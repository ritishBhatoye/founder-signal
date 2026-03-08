import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },

      globals: {
        __DEV__: "readonly",
        console: "readonly",
        process: "readonly",
        React: "readonly",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      "react-native": reactNative,
      import: importPlugin,
      prettier,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: true,
      },
    },

    rules: {
      /*
      =====================================
      REACT RULES
      =====================================
      */

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-direct-mutation-state": "error",

      /*
      =====================================
      REACT HOOKS
      =====================================
      */

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /*
      =====================================
      REACT NATIVE
      =====================================
      */

      "react-native/no-unused-styles": "error",

      // NativeWind requires inline styles
      "react-native/no-inline-styles": "off",

      "react-native/no-raw-text": "off",
      "react-native/no-color-literals": "off",

      /*
      =====================================
      TYPESCRIPT
      =====================================
      */

      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      "@typescript-eslint/no-shadow": "error",

      "@typescript-eslint/no-empty-function": [
        "warn",
        { allow: ["arrowFunctions"] },
      ],

      "@typescript-eslint/no-non-null-assertion": "warn",

      "@typescript-eslint/prefer-optional-chain": "error",

      "@typescript-eslint/no-unnecessary-type-assertion": "error",

      /*
      =====================================
      IMPORTS
      =====================================
      */

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "error",

      /*
      =====================================
      BEST PRACTICES
      =====================================
      */

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",

      "prefer-const": "error",
      "no-var": "error",

      "object-shorthand": "error",
      "prefer-template": "error",

      eqeqeq: ["error", "always", { null: "ignore" }],

      "no-return-await": "error",

      /*
      =====================================
      CLEAN CODE
      =====================================
      */

      "arrow-body-style": ["error", "as-needed"],
      "prefer-arrow-callback": "error",
      "no-useless-return": "error",
      "no-else-return": "error",

      /*
      =====================================
      PRETTIER
      =====================================
      */

      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: false,
          trailingComma: "all",
          tabWidth: 2,
          printWidth: 90,
          arrowParens: "always",
          plugins: ["prettier-plugin-tailwindcss"],
        },
      ],
    },
  },

  /*
  =====================================
  CONFIG FILES
  =====================================
  */

  {
    files: [
      "eslint.config.*",
      "metro.config.*",
      "babel.config.*",
      "tailwind.config.*",
    ],

    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  /*
  =====================================
  IGNORE
  =====================================
  */

  {
    ignores: [
      "node_modules",
      ".expo",
      "dist",
      "build",
      "coverage",
      "ios",
      "android",
      "web-build",
    ],
  },
];
