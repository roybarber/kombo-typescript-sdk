# Kombo Typescript SDK

Typescript SDK for the [Kombo.dev](https://kombo.dev) API's for HRIS, ATS & Candidates

## Installation

In order to install the package, please run the following command:

```bash
npm install @roybarber/kombo-typescript-sdk
```

## Usage

```typescript
import { Api } from '@roybarber/kombo-typescript-sdk'

const authorizationToken = process.env.KOMBO_API_KEY

// Create client
const komboApi = new Api<string>({
  securityWorker: (accessToken) =>
    accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
})
// Set API Key
komboApi.setSecurityData(authorizationToken);

// Use client to e.g. fetch all absence types, don't forget to set the integration id in the headers
const integrationId = 'workday:1234567890'
const result = await komboApi.hris.getHrisAbsenceTypes(
  { page_size: 250 }, // 250 MAX
  { headers: { 'X-Integration-Id': integrationId } }
)
console.log(result.data.data.results)
```

## Development

### How to build a new version of the Kombo Typescript SDK 

When the Kombo api changes we need to ensure we are building a new version of this package

Step 1: Download the openapi schema (`openapi.json`) from [Kombo](https://api.kombo.dev/openapi.json). And put it into this folder here

Step 2: Build the Api.ts file with new open api schema
`npm run generate`

Step 3: Update package.json and bump version e.g. `1.X.0`

Step 4: Run `npm run build` to build new Api.js file in dist folder
