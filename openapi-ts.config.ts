import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./contracts/tsp-output/openapi/openapi.yaml",
  output: {
    path: "./contracts/src",
    format: "prettier",
  },
  client: "@hey-api/client-fetch",
  plugins: [
    "@hey-api/typescript",
    "@hey-api/schemas",
    {
      name: "@hey-api/sdk",
      asClass: true,
      operationId: true,
    },
    {
      name: "@tanstack/react-query",
      output: "./contracts/src/react-query",
    },
  ],
});
