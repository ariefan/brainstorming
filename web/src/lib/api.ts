import { client } from "contracts/client.gen";

// Configure the API client with the base URL
client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "x-organization-id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", // Default org for dev
  },
});

export { client };
