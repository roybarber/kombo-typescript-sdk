# Kombo Typescript SDK

The **Kombo Typescript SDK** simplifies the integration with Kombo's ATS, HRIS, and assessment APIs. It provides prebuilt API methods and models with full TypeScript support, making it easy to build scalable and type-safe applications.

---

## Key Features

- **Simplified API Access**: Predefined methods for all major endpoints.
- **TypeScript Support**: Built-in types and models for better developer experience.
- **Centralized Namespace**: Access all APIs and models through the unified `Kombo` namespace.
- **Configurable**: Support for global configuration (e.g., base URL, access tokens).

---

## Installation

Install the SDK using NPM or Yarn:

```bash
npm install @roybarber/kombo-typescript-sdk

Or with Yarn:

yarn add @roybarber/kombo-typescript-sdk
```

## Configuration

You can configure the SDK globally with reusable settings like baseURL and accessToken.

**Example Configuration:**
```typescript
import { client, getAtsJobs } from '@roybarber/kombo-typescript-sdk';

// You can make the below reusable
client.setConfig({
  baseUrl: 'https://api.kombo.dev/v1',
  headers: {
    Authorization: 'Bearer process.env.KOMBO_API_TOKEN',
  },
});

const { data, error } = await getAtsJobs({
  headers: {
    'X-Integration-Id': 'your-integration-id'
  },
  query: {
    statuses: 'OPEN,DRAFT',
    employment_types: 'FULL_TIME,PART_TIME',
    updated_after: '2024-01-01T00:00:00.000Z',
    name_contains: 'Developer'
  }
});
console.log('Integration Details:', data);
```

---

### API Reference

**TODO**
