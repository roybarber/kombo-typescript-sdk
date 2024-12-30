import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
	client: {
		bundle: true,
		name: '@hey-api/client-fetch'
	},
	experimentalParser: true,
	input: 'https://api.kombo.dev/openapi.json',
	output: {
		format: 'prettier',
		lint: 'eslint',
		path: './src'
	},
	plugins: [
		...defaultPlugins,
		{
			dates: true,
			name: '@hey-api/transformers'
		},
		{
			asClass: false,
			name: '@hey-api/sdk'
		},
		{
			enums: 'javascript',
			name: '@hey-api/typescript'
		},
		'@tanstack/react-query', 
	]
})
