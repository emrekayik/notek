module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  tailwindConfig: "./tailwind.config.js",
  formatOnSave: true,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@/app/components/(.*)$",
    "^@/app/utils/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
