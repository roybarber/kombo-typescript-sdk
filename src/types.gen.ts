type ErrorResponse = {
	status: 'error'
	error: {
		message: string
	}
}

export type GetCheckApiKeySuccessfulResponse = {
	status: 'success'
	data: {
		environment_id: string
		/**
		 * **(⚠️ Deprecated)** Renamed to `environment_id`.
		 */
		customer_id: string
	}
}

export type PostForceSyncSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * We only allow 1 concurrent sync to be running or queued.
		 */
		already_queued: boolean
		/**
		 * ID of the newly-created or already-queued-or-running sync.
		 */
		sync_id: string
	}
}

/**
 * The ID of the tool whose passthrough API you want to call (e.g., `personio`).
 */


/**
 * The ID of the passthrough API you want to call (some tools provide multiple). Check the endpoint description for a list of all available APIs.
 */


export type PostPassthroughToolApiSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The full URL of the request that we automatically assemble for you based on the specified `api`, the specified `path`, and the integration's auth credentials. You can use this to debug path-related issues (e.g., the API returning 404 errors).
		 */
		url: string
		/**
		 * The HTTP status code returned from the remote system.
		 */
		status: number
		/**
		 * The HTTP headers returned from the remote system.
		 */
		headers: {
			[key: string]: string | Array<string>
		}
		/**
		 * The HTTP body returned from the remote system. This will either be an array or object (in the case that JSON was returned) or a string (in any other case).
		 */
		data?: unknown
	}
}

export type PostPassthroughToolApiRequestBody = {
	/**
	 * The HTTP method (e.g., `GET`) of the request.
	 */
	method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
	/**
	 * The path of the endpoint you want to call. We automatically prepend the base URL of the API (all base URLs are documented in the endpoint description).
	 */
	path: string
	/**
	 * The headers to send with the request. Note that we automatically supply any authentication-related headers.
	 */
	headers?: {
		[key: string]: string
	}
	/**
	 * The query parameters to send in addition to the ones in the `path`.
	 */
	params?: {
		[key: string]: string
	}
	/**
	 * The data to submit as part of the request body. This can either be an array or object (in which case we will forward it as JSON) or a string (in which case we will forward it raw).
	 */
	data?: unknown
	/**
	 * If set to `true`, the response will be returned as a base64-encoded string. This is useful for binary data (e.g., PDFs).
	 */
	response_as_base64?: boolean
	/**
	 * The data to submit as part of the request body if the request's `Content-Type` is `multipart/form-data`.
	 */
	multipart_form_data?: Array<{
		/**
		 * The key of the form data
		 */
		name: string
		value:
			| string
			| {
					/**
					 * Name of the file you want to upload.
					 */
					name: string
					/**
					 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
					 */
					content_type?: string
					/**
					 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
					 */
					data?: string
					/**
					 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
					 */
					data_url?: string
			  }
	}>
	/**
	 * Custom options interpreted by the passthrough API adapter you've selected. These options are not documented right now as they're only for very advanced use cases.
	 */
	api_options?: {
		[key: string]: string
	}
}

export type GetIntegrationsIntegrationIdSuccessfulResponse = {
	status: 'success'
	data: {
		id: string
		tool: {
			/**
			 * The ID of the connected tool in Kombo (e.g. `factorial`).
			 */
			id: string
			label: string
			/**
			 * Internal label that can help you debug specific variants of the integration. Only show the `label` to your users.
			 */
			internal_label: string | null
			/**
			 * URL to an SVG logo of the connected tool. The logo usually contains the tool name.
			 */
			logo_url: string
			/**
			 * URL to a square SVG icon of the connected tool.
			 */
			icon_url: string
		}
		category: 'HRIS' | 'ATS' | 'ASSESSMENT'
		/**
		 * The current status of the integration.
		 *
		 * - `ACTIVE`: The integration is syncing data as expected.
		 * - `INVALID`: The integration has stopped syncing data because of invalid credentials. To fix this, reach out to your customer to [reconnect the integration](../guides/integration-states#credentials-invalid).
		 * - `INACTIVE`: The integration has stopped syncing as it's been manually set to inactive. You can [enable it again](../guides/integration-states#inactive) in the integration's page.
		 */
		status: 'ACTIVE' | 'INVALID' | 'INACTIVE'
		/**
		 * The setup_status is used in conjunction with the filtering and field mapping features. If these are enabled in the connection flow, the integration will start in an "INCOMPLETE" state and move to "COMPLETE" once all steps are finished.
		 *
		 * - `INCOMPLETE`: Setup is still in progress. Some steps aren’t finished, so no data is available yet. Syncs only run as needed for setup.
		 * - `FINAL_SYNC_PENDING`: Setup is complete, and the final sync is running. Data will be available after this sync is done.
		 * - `COMPLETED`: Setup is fully finished, and the integration is ready to use.
		 */
		setup_status: 'INCOMPLETE' | 'FINAL_SYNC_PENDING' | 'COMPLETED'
		end_user: {
			organization_name: string
			creator_email: string | null
			/**
			 * The ID you have passed initially to the connection flow to create this integration.
			 */
			origin_id: string | null
		}
		scope_config: {
			id: string
			name: string | null
		}
		/**
		 * YYYY-MM-DDTHH:mm:ss.sssZ
		 */
		created_at: Date
		beta: boolean
		read_models: Array<{
			/**
			 * ID of the model (e.g. hris_employees).
			 */
			id: string
			/**
			 * Label of the model (e.g. Employees).
			 */
			label: string
			/**
			 * Whether the datapoint is available and enabled and not opted out of.
			 */
			is_available: boolean
			/**
			 * The status of a datapoint of an integrated tool:
			 *
			 * - `SUPPORTED`: the tool supports the datapoint and it can be used through Kombo.
			 * - `UNSUPPORTED`: the tool does not support the datapoint.
			 * - `NOT_IMPLEMENTED`: tool supports the datapoint but it was not integrated by Kombo for a given reason (see coverage grid).
			 * - `UNKNOWN`: the datapoint is not integrated yet and Kombo has no information about it's availability in the tool.
			 */
			coverage_status: 'SUPPORTED' | 'UNSUPPORTED' | 'NOT_IMPLEMENTED' | 'UNKNOWN'
			/**
			 * The setting of the datapoint in the scope config that you configured in the Kombo dashboard.
			 */
			scope_config_setting: 'ENABLED' | 'DISABLED' | 'OPTIONAL'
			/**
			 * Whether the datapoint is opted out by your customer in the connection flow.
			 */
			opted_out_by_customer: boolean
			fields: Array<{
				/**
				 * Key of the field in the API (e.g. first_name).
				 */
				id: string
				/**
				 * Whether the datapoint is available and enabled and not opted out of.
				 */
				is_available: boolean
				/**
				 * The status of a datapoint of an integrated tool:
				 *
				 * - `SUPPORTED`: the tool supports the datapoint and it can be used through Kombo.
				 * - `UNSUPPORTED`: the tool does not support the datapoint.
				 * - `NOT_IMPLEMENTED`: tool supports the datapoint but it was not integrated by Kombo for a given reason (see coverage grid).
				 * - `UNKNOWN`: the datapoint is not integrated yet and Kombo has no information about it's availability in the tool.
				 */
				coverage_status: 'SUPPORTED' | 'UNSUPPORTED' | 'NOT_IMPLEMENTED' | 'UNKNOWN'
				/**
				 * The setting of the datapoint in the scope config that you configured in the Kombo dashboard.
				 */
				scope_config_setting: 'ENABLED' | 'DISABLED' | 'OPTIONAL'
				/**
				 * Whether the datapoint is opted out by your customer in the connection flow.
				 */
				opted_out_by_customer: boolean
			}>
		}>
	}
}



export type PostIntegrationsIntegrationIdRelinkSuccessfulResponse = {
	status: 'success'
	data: {
		link: string
	}
}

export type PostIntegrationsIntegrationIdRelinkRequestBody = {
	/**
	 * Language of the connection flow UI.
	 */
	language?: 'en' | 'de' | 'fr' | 'it' | 'es'
	/**
	 * Specify a scope config which the integration will start using once the reconnection flow has been completed.
	 *
	 * This can be useful if you want to update the permissions of an integration, but only want the change to take effect once the user has updated their API credentials to prevent sync issues.
	 */
	scope_config_id?: string | null
	/**
	 * The type of link you want to create. `EMBEDDED` is for the [embedded flow](../guides/connect/embedded-flow) using the Kombo Connect SDK (these links are valid for 1 hour) and `MAGIC_LINK` is for [magic links](../guides/connect/magic-links) which you send out manually to customers (there are valid for 1 year).
	 *
	 * This defaults to `EMBEDDED`, which is our recommended method of implementing the connection flow for a seamless user experience.
	 */
	link_type?: 'EMBEDDED' | 'MAGIC_LINK'
}



/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 2000.
 */
export type GetIntegrationsIntegrationIdIntegrationFieldsParameterPageSize = number

export type GetIntegrationsIntegrationIdIntegrationFieldsSuccessfulResponse = {
	status: 'success'
	data: {
		results: Array<{
			/**
			 * The unique ID of the field.
			 */
			id: string
			/**
			 * The key of the field in the remote system.
			 */
			key: string
			/**
			 * The model the field is associated with.
			 */
			model: string
			/**
			 * The type of the integration field. There is a type to avoid collisions between DEFAULT fields and CUSTOM fields with the same key.
			 */
			type: 'DEFAULT' | 'CUSTOM'
			/**
			 * The label of the field in the remote system.
			 */
			label: string | null
			/**
			 * Whether the field is included in the integrations_fields array of the corresponding model.
			 */
			is_passthrough_enabled: boolean
			/**
			 * Whether the field is writable or not through endpoints such as `PATCH /employees/{employee_id}/integration-fields/{integration_field_id}`.
			 */
			is_writable: boolean
		}>
		/**
		 * **(⚠️ Deprecated - Use `next` instead.)** Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next_cursor: string | null
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
	}
}





export type PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The unique ID of the field.
		 */
		id: string
		/**
		 * The key of the field in the remote system.
		 */
		key: string
		/**
		 * The model the field is associated with.
		 */
		model: string
		/**
		 * The type of the integration field. There is a type to avoid collisions between DEFAULT fields and CUSTOM fields with the same key.
		 */
		type: 'DEFAULT' | 'CUSTOM'
		/**
		 * The label of the field in the remote system.
		 */
		label: string | null
		/**
		 * Whether the field is included in the integrations_fields array of the corresponding model.
		 */
		is_passthrough_enabled: boolean
		/**
		 * Whether the field is writable or not through endpoints such as `PATCH /employees/{employee_id}/integration-fields/{integration_field_id}`.
		 */
		is_writable: boolean
	}
}

export type PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdRequestBody = {
	enable_passthrough: boolean | null
}



/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetIntegrationsIntegrationIdCustomFieldsParameterPageSize = number

export type GetIntegrationsIntegrationIdCustomFieldsSuccessfulResponse = {
	status: 'success'
	data: {
		results: Array<{
			/**
			 * The unique ID of the field
			 */
			id: string
			/**
			 * The key of the custom field as it will be used in the custom_field object of the corresponding model
			 */
			key: string
			/**
			 * The integration field the custom field is mapped to. Null if not mapped.
			 */
			integration_field: {
				/**
				 * The integration field's unique ID
				 */
				id: string
				/**
				 * The key of the integration field in the remote system
				 */
				key: string
				/**
				 * The type of the integration field. There is a type to avoid collisions between DEFAULT fields and CUSTOM fields with the same key.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The label of the integration field in the remote system
				 */
				label: string | null
			} | null
			/**
			 * The model the field is associated with
			 */
			model: string
			/**
			 * The label of the custom field
			 */
			label: string | null
			/**
			 * The description of the custom field
			 */
			description: string | null
		}>
		/**
		 * **(⚠️ Deprecated - Use `next` instead.)** Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next_cursor: string | null
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
	}
}

/**
 * The unique ID of the integration where the custom field mapping should be updated
 */


/**
 * The unique ID of the custom field that should be updated
 */


export type PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The unique ID of the field
		 */
		id: string
		/**
		 * The key of the custom field as it will be used in the custom_field object of the corresponding model
		 */
		key: string
		/**
		 * The integration field the custom field is mapped to. Null if not mapped.
		 */
		integration_field: {
			/**
			 * The integration field's unique ID
			 */
			id: string
			/**
			 * The key of the integration field in the remote system
			 */
			key: string
			/**
			 * The type of the integration field. There is a type to avoid collisions between DEFAULT fields and CUSTOM fields with the same key.
			 */
			type: 'DEFAULT' | 'CUSTOM'
			/**
			 * The label of the integration field in the remote system
			 */
			label: string | null
		} | null
		/**
		 * The model the field is associated with
		 */
		model: string
		/**
		 * The label of the custom field
		 */
		label: string | null
		/**
		 * The description of the custom field
		 */
		description: string | null
	}
}

export type PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdRequestBody = {
	/**
	 * The integration field's unique ID which the custom field should be mapped to. Null to remove a mapping.
	 */
	integration_field_id: string | null
}

export type GetToolsCategoryParameterCategory = 'hris' | 'ats' | 'assessment'

export const GetToolsCategoryParameterCategory = {
	HRIS: 'hris',
	ATS: 'ats',
	ASSESSMENT: 'assessment'
} as const

export type GetToolsCategorySuccessfulResponse = {
	status: 'success'
	data: {
		tools: Array<{
			id: string
			label: string
			/**
			 * Internal label that can help you debug specific variants of the integration. Only show the `label` to your users.
			 */
			internal_label: string | null
			assets: {
				logo_url: string
				icon_url: string
				icon_black_url: string
			}
			/**
			 * This describes the supported models and actions of this tool.
			 */
			coverage: {
				read_models: Array<{
					/**
					 * ID of the model (e.g. hris_employees).
					 */
					id: string
					/**
					 * Label of the model (e.g. Employees).
					 */
					label: string
					/**
					 * The status of a datapoint of an integrated tool:
					 *
					 * - `SUPPORTED`: the tool supports the datapoint and it can be used through Kombo.
					 * - `UNSUPPORTED`: the tool does not support the datapoint.
					 * - `NOT_IMPLEMENTED`: tool supports the datapoint but it was not integrated by Kombo for a given reason (see coverage grid).
					 * - `UNKNOWN`: the datapoint is not integrated yet and Kombo has no information about it's availability in the tool.
					 */
					coverage_status: 'SUPPORTED' | 'UNSUPPORTED' | 'NOT_IMPLEMENTED' | 'UNKNOWN'
					fields: Array<{
						/**
						 * Key of the field in the model (e.g. first_name).
						 */
						id: string
						/**
						 * The status of a datapoint of an integrated tool:
						 *
						 * - `SUPPORTED`: the tool supports the datapoint and it can be used through Kombo.
						 * - `UNSUPPORTED`: the tool does not support the datapoint.
						 * - `NOT_IMPLEMENTED`: tool supports the datapoint but it was not integrated by Kombo for a given reason (see coverage grid).
						 * - `UNKNOWN`: the datapoint is not integrated yet and Kombo has no information about it's availability in the tool.
						 */
						coverage_status: 'SUPPORTED' | 'UNSUPPORTED' | 'NOT_IMPLEMENTED' | 'UNKNOWN'
					}>
				}>
				write_actions: Array<{
					id: string
					label: string
					/**
					 * The status of a datapoint of an integrated tool:
					 *
					 * - `SUPPORTED`: the tool supports the datapoint and it can be used through Kombo.
					 * - `UNSUPPORTED`: the tool does not support the datapoint.
					 * - `NOT_IMPLEMENTED`: tool supports the datapoint but it was not integrated by Kombo for a given reason (see coverage grid).
					 * - `UNKNOWN`: the datapoint is not integrated yet and Kombo has no information about it's availability in the tool.
					 */
					coverage_status: 'SUPPORTED' | 'UNSUPPORTED' | 'NOT_IMPLEMENTED' | 'UNKNOWN'
				}>
				features: Array<{
					id: string
					label: string
					/**
					 * The status of a datapoint of an integrated tool:
					 *
					 * - `SUPPORTED`: the tool supports the datapoint and it can be used through Kombo.
					 * - `UNSUPPORTED`: the tool does not support the datapoint.
					 * - `NOT_IMPLEMENTED`: tool supports the datapoint but it was not integrated by Kombo for a given reason (see coverage grid).
					 * - `UNKNOWN`: the datapoint is not integrated yet and Kombo has no information about it's availability in the tool.
					 */
					coverage_status: 'SUPPORTED' | 'UNSUPPORTED' | 'NOT_IMPLEMENTED' | 'UNKNOWN'
				}>
			}
		}>
	}
}

/**
 * ID of the provisioning group (currently only `default` is allowed).
 */


export type PostHrisProvisioningGroupsGroupIdDiffSuccessfulResponse = {
	status: 'success'
	/**
	 * The users to provision, deprovision, and optionally update.
	 */
	data: {
		users: {
			/**
			 * The users we've found in the HR systems who match the provisioning filters but haven't been provisioned in your system yet.
			 */
			to_provision: Array<{
				/**
				 * The email address of the user.
				 */
				email: string | null
				/**
				 * The field of the underlying employee (which ones are included depends on the `employee_fields` array you supplied).
				 */
				employee: {
					id?: string
					remote_id?: string | null
					first_name?: string | null
					last_name?: string | null
					groups?: Array<{
						id: string
						remote_id: string | null
						name: string | null
					}>
					avatar?: string | null
					work_location_id?: string | null
					legal_entity_id?: string | null
				}
			}>
			/**
			 * The users who've been provisioned in your system but couldn't be found in the HR system or don't match the provisioning filters.
			 */
			to_deprovision: Array<{
				/**
				 * _Your_ ID for this user (that you submitted through `origin_id`).
				 */
				origin_id: string
				/**
				 * The email address of the user.
				 */
				email: string
			}>
			/**
			 * The users who are in the HR system and match the provisioning filters but have already been provisioned in your system.
			 */
			already_provisioned: Array<{
				/**
				 * _Your_ ID for this user (that you submitted through `origin_id`).
				 */
				origin_id: string
				/**
				 * The email address of the user.
				 */
				email: string
				/**
				 * The field of the underlying employee (which ones are included depends on the `employee_fields` array you supplied).
				 */
				employee: {
					id?: string
					remote_id?: string | null
					first_name?: string | null
					last_name?: string | null
					groups?: Array<{
						id: string
						remote_id: string | null
						name: string | null
					}>
					avatar?: string | null
					work_location_id?: string | null
					legal_entity_id?: string | null
				}
			}>
		}
	}
}

export type PostHrisProvisioningGroupsGroupIdDiffRequestBody = {
	/**
	 * Array of the already provisioned users in your system.
	 */
	provisioned_users: Array<{
		/**
		 * _Your_ ID for this user (_not_ an ID retrieved from Kombo).
		 */
		origin_id: string
		/**
		 * This user's email address.
		 */
		email: string
	}>
	/**
	 * Options to customize what we return.
	 */
	options: {
		/**
		 * The employee fields relevant for your use case.
		 */
		employee_fields: Array<'id' | 'remote_id' | 'first_name' | 'last_name' | 'groups' | 'avatar' | 'work_location_id' | 'legal_entity_id'>
	}
}

/**
 * ID of the provisioning group (currently only `default` is allowed).
 */


export type PostHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The setup link URL to pass to the Kombo Connect SDK.
		 */
		url: string
		/**
		 * When this link expires.
		 */
		expires_at: Date
	}
}

export type PostHrisProvisioningGroupsGroupIdSetupLinksRequestBody = {
	/**
	 * Language of the UI. Please note that the provisioning setup UI is _not_ translated yet but we're working on it and setting this already will make sure the translations appear once released.
	 */
	language?: 'en' | 'de' | 'fr' | 'it' | 'es'
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisEmployeesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisEmployeesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisEmployeesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisEmployeesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


/**
 * **(⚠️ Deprecated - Use the `employment_statuses` filter instead.)** Filter by the `employment_status` field.
 */
export type GetHrisEmployeesParameterEmploymentStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'LEAVE'

/**
 * **(⚠️ Deprecated - Use the `employment_statuses` filter instead.)** Filter by the `employment_status` field.
 */
export const GetHrisEmployeesParameterEmploymentStatus = {
	ACTIVE: 'ACTIVE',
	PENDING: 'PENDING',
	INACTIVE: 'INACTIVE',
	LEAVE: 'LEAVE'
} as const

/**
 * Filter by a comma-separated list of `ACTIVE`, `PENDING`, `INACTIVE`, `LEAVE`
 * * `ACTIVE`: the employee is **actively employed**
 * * `PENDING`: the employee is **not actively employed yet** (but they signed their contract or are part of an onboarding process)
 * * `INACTIVE`: a full-time employee is no longer employed, or, for a contract worker when their contract runs out
 * * `LEAVE`: the employee is still employed but **currently on leave** (note that not all HR systems support this status — use our absences API for detailed information)
 *
 *
 * Leave this blank to get results matching all values.
 */


/**
 * Filter by a comma-separated list of group IDs. We will only return employees that are members of _any_ of the groups.
 */


/**
 * Filter by a comma-separated list of legal entity IDs. We will only return employees that are members of _any_ of the legal entities.
 */


/**
 * Filter by a comma-separated list of work location IDs. We will only return employees who are at _any_ of the work locations.
 */


/**
 * Filter by a comma-separated list of work emails. We will only return employees who have _any_ of the work emails. The format of the emails is case-insensitive.
 */


/**
 * Filter by a comma-separated list of personal emails. We will only return employees who have _any_ of the personal emails. The format of the emails is case-insensitive.
 */


export type GetHrisEmployeesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * The employee’s organization-internal employee number.
			 */
			employee_number: string | null
			/**
			 * The employee’s first name.
			 */
			first_name: string | null
			/**
			 * The employee’s last name.
			 */
			last_name: string | null
			/**
			 * The employee’s nationality.
			 */
			nationality: string | null
			/**
			 * The employee’s full name, including any middle names. Not all HR systems provide an explicit display name, so we recommend falling back to `first_name` and `last_name`.
			 */
			display_full_name: string | null
			/**
			 * The employee’s job title.
			 */
			job_title: string | null
			/**
			 * The employee’s work email address. If the email address is invalid, we will set this to `null`.
			 */
			work_email?: string | null
			/**
			 * The employee’s personal email address. If the email address is invalid, we will set this to `null`.
			 */
			personal_email?: string | null
			/**
			 * The employee’s mobile phone number.
			 */
			mobile_phone_number: string | null
			/**
			 * The employee’s social security number
			 */
			ssn: string | null
			/**
			 * The employee’s tax ID.
			 */
			tax_id: string | null
			/**
			 * The employee’s gender.
			 */
			gender?: ('MALE' | 'FEMALE' | 'NON_BINARY' | 'NOT_SPECIFIED') | string | null
			/**
			 * The employee’s ethnicity. In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			ethnicity?: ('WHITE' | 'ASIAN' | 'HISPANIC_LATINO' | 'HAWAIIAN' | 'NATIVE_AMERICAN' | 'BLACK_AFRICAN_AMERICAN' | 'MULTIPLE_ETHNICITIES' | 'DECLINE_TO_SPECIFY') | string | null
			/**
			 * The employee’s current marital status. In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			marital_status?: ('SINGLE' | 'MARRIED' | 'DOMESTIC_PARTNERSHIP' | 'WIDOWED' | 'DIVORCED' | 'SEPARATED' | 'NOT_MARRIED') | string | null
			/**
			 * The employee’s current employment status:
			 *
			 * - `ACTIVE`: the employee is **actively employed**
			 * - `PENDING`: the employee is **not actively employed yet** (but they signed their contract or are part of an onboarding process)
			 * - `INACTIVE`: the employee is **not actively employed** anymore
			 * - `LEAVE`: the employee is still employed but **currently on leave** (note that not all HR systems support this status — use our absences API for detailed information)
			 *
			 * In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			employment_status?: ('ACTIVE' | 'PENDING' | 'INACTIVE' | 'LEAVE') | string | null
			/**
			 * The employee’s current employment type:
			 *
			 * - `FULL_TIME`: the employee is actively employed
			 * - `PART_TIME`: the employee is working only part of the usual working hours
			 * - `CONTRACT`: the employee is working temporarily under a contract
			 * - `INTERNSHIP`: the employee is working as an intern
			 * - `FREELANCE`: the employee is working as a freelancer
			 * - `WORKING_STUDENT`: the employee is working as a working student
			 * - `APPRENTICESHIP`: the employee is working in an apprenticeship
			 * - `TRAINING`: the employee is working in a training program
			 *
			 * In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			employment_type?: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE' | 'WORKING_STUDENT' | 'APPRENTICESHIP' | 'TRAINING') | string | null
			/**
			 * The employee’s weekly working hours.
			 */
			weekly_hours: number | null
			/**
			 * URL to the employee’s avatar. This is either the raw URL from the HR system (in cases where it can be requested without short-lived authentication) _or_ a URL to a temporarily cached version of the file hosted by Kombo. Kombo will delete the cached file after its deletion in the source system.
			 */
			avatar: string | null
			/**
			 * The Kombo ID of the employee’s work location. The ID can be used to retrieve the work location from the `get work locations` endpoint.
			 */
			work_location_id: string | null
			/**
			 * The Kombo ID of the employee’s legal entity. The ID can be used to retrieve the legal entity from the `get legal entities` endpoint.
			 */
			legal_entity_id: string | null
			/**
			 * The Kombo ID of the employee’s manager. The ID can be used to retrieve the manager from the `get employees` endpoint.
			 */
			manager_id: string | null
			/**
			 * The employee’s home address.
			 */
			home_address?: {
				city?: string | null
				/**
				 * Contains the ISO2 country code if possible. If not, it contains the original value.
				 */
				country?: string | null
				/**
				 * If we have address data, this is filled with the raw address string.
				 */
				raw?: string | null
				state?: string | null
				/**
				 * If we can parse the address data, this field contains the first part of the street information.
				 */
				street_1?: string | null
				street_2?: string | null
				zip_code?: string | null
			} | null
			/**
			 * The employee’s bank accounts.
			 */
			bank_accounts?: Array<{
				/**
				 * The internationally unique IBAN identifying this account. If we detect a valid IBAN from the account number and this field would otherwise be empty, we will automatically populate this field.
				 */
				iban?: string | null
				/**
				 * The internationally unique BIC/SWIFT code identifying the bank behind this account. If we detect a valid BIC from the domestic bank routing number and this field would otherwise be empty, we will automatically populate this field.
				 */
				bic?: string | null
				/**
				 * The bank-specific account number. Some companies use the account number field to put the IBAN here.
				 */
				account_number?: string | null
				/**
				 * The name of the holder of this account.
				 */
				holder_name?: string | null
				/**
				 * The name of the bank behind this account.
				 */
				bank_name?: string | null
				domestic_bank_routing?: {
					/**
					 * Bank routing number (e.g. DE Bankleitzahl, GB Sort Code, US ABA routing number, AU BSB code). This field is not formatted and therefore might contain delimiters (eg. 01-23-45).
					 */
					number: string
					/**
					 * Enum of the routing type, prefixed with the iso-3166-1-alpha-2 banks origin country. If there is uncertainty about the type, it will be set to null.
					 */
					type: 'GB_SORT_CODE' | 'DE_BANKLEITZAHL' | 'US_ABA_ROUTING_TRANSIT_NUMBER' | 'CA_ROUTING_NUMBER' | 'AU_BSB_CODE' | 'FR_RIB'
				} | null
			}> | null
			/**
			 * The employee’s date of birth.
			 */
			date_of_birth: Date | null
			/**
			 * The date the employee started working for the organization.
			 */
			start_date: Date | null
			/**
			 * The date when the employment ends. Can be in the past or future.
			 */
			termination_date: Date | null
			/**
			 * The date and time the object was created in the remote system.
			 */
			remote_created_at: Date | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
			 */
			custom_fields: {} | null
			/**
			 * An array of selected pass-through integration fields. [Read more](/integration-fields)
			 */
			integration_fields: Array<{
				/**
				 * The globally unique ID of this object.
				 */
				id: string
				/**
				 * The key of the field in the remote system.
				 */
				key: string
				/**
				 * - `DEFAULT`: static fields in the remote system.
				 * - `CUSTOM`: fields that are created/editable by the user.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The field's value.
				 */
				value?: unknown
				/**
				 * The label of the field. (not always available)
				 */
				label: string | null
			}>
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			employments: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The Kombo ID of the employment’s employee. The ID can be used to retrieve the employee from the `get employees` endpoint.
				 */
				employee_id: string
				/**
				 * This field can contain historic job titles. Please use the `job_title` field on the employee for the active job title of an employee.
				 */
				job_title: string | null
				/**
				 * The monetary amount paid to an employee.
				 */
				pay_rate: number | null
				/**
				 * The time interval which the `pay_rate` is describing.
				 *
				 * A `pay_rate` value of `12000` with a `pay_period` of `YEAR` would indicate that the employee receives 12000 over the course of a year. In rare cases where we can’t find a clear mapping, the original string is passed through.
				 */
				pay_period: ('HOUR' | 'DAY' | 'WEEK' | 'TWO_WEEKS' | 'HALF_MONTH' | 'MONTH' | 'TWO_MONTHS' | 'QUARTER' | 'HALF_YEAR' | 'YEAR') | string | null
				/**
				 * The time interval at which the employee receives payment.
				 *
				 * A `pay_rate` of `12000`, with a `pay_period` of `YEAR`, and a `pay_frequency` of `MONTHLY` would indicate that the employee is paid 1000 every month. In rare cases where we can’t find a clear mapping, the original string is passed through.
				 */
				pay_frequency: ('DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'SEMIMONTHLY' | 'QUARTERLY' | 'SEMIANNUALLY' | 'ANNUALLY' | 'PRO_RATA') | string | null
				/**
				 * The employee’s current employment type:
				 *
				 * - `FULL_TIME`: the employee is actively employed
				 * - `PART_TIME`: the employee is working only part of the usual working hours
				 * - `CONTRACT`: the employee is working temporarily under a contract
				 * - `INTERNSHIP`: the employee is working as an intern
				 * - `FREELANCE`: the employee is working as a freelancer
				 * - `WORKING_STUDENT`: the employee is working as a working student
				 * - `APPRENTICESHIP`: the employee is working in an apprenticeship
				 * - `TRAINING`: the employee is working in a training program
				 *
				 * In rare cases where we can’t find a clear mapping, the original string is passed through.
				 */
				employment_type: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE' | 'WORKING_STUDENT' | 'APPRENTICESHIP' | 'TRAINING') | string | null
				/**
				 * The currency that the employee is paid in. Usually returned in [ISO 4217 currency codes](https://www.iso.org/iso-4217-currency-codes.html).
				 */
				pay_currency: string | null
				/**
				 * The date of when the employment started.
				 */
				effective_date: Date | null
				/**
				 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
				 */
				changed_at: Date
				/**
				 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
				 */
				remote_deleted_at: Date | null
				/**
				 * Includes the data fetched from the remote system.
				 * Please be aware that including this in you scope config might violate other
				 * scopes that are set.
				 *
				 * Remote data always has the endpoint path that we got the data from as the
				 * top level key. For example, it could look like: `{ "/companies": { ... }}`
				 *
				 * This is not available on all plans. Reach out to Kombo if you need it.
				 */
				remote_data: {} | null
				/**
				 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
				 */
				custom_fields: {} | null
				/**
				 * An array of selected pass-through integration fields. [Read more](/integration-fields)
				 */
				integration_fields: Array<{
					/**
					 * The globally unique ID of this object.
					 */
					id: string
					/**
					 * The key of the field in the remote system.
					 */
					key: string
					/**
					 * - `DEFAULT`: static fields in the remote system.
					 * - `CUSTOM`: fields that are created/editable by the user.
					 */
					type: 'DEFAULT' | 'CUSTOM'
					/**
					 * The field's value.
					 */
					value?: unknown
					/**
					 * The label of the field. (not always available)
					 */
					label: string | null
				}>
			}>
			time_off_balances: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The Kombo ID of the employee to which the balance belongs to. The ID can be used to retrieve the employee from the `get employees` endpoint.
				 */
				employee_id: string
				type_id: string
				/**
				 * The amount of time available to the employee.
				 */
				balance: number | null
				/**
				 * The time-unit of the balance.
				 */
				balance_unit: 'HOURS' | 'DAYS'
				/**
				 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
				 */
				changed_at: Date
				/**
				 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
				 */
				remote_deleted_at: Date | null
				/**
				 * The amount of time used by the employee.
				 */
				used: number | null
				/**
				 * The time-unit of the used time.
				 */
				used_unit: 'HOURS' | 'DAYS'
				/**
				 * Includes the data fetched from the remote system.
				 * Please be aware that including this in you scope config might violate other
				 * scopes that are set.
				 *
				 * Remote data always has the endpoint path that we got the data from as the
				 * top level key. For example, it could look like: `{ "/companies": { ... }}`
				 *
				 * This is not available on all plans. Reach out to Kombo if you need it.
				 */
				remote_data: {} | null
			}>
			manager: {
				/**
				 * The employee’s first name.
				 */
				first_name: string | null
				/**
				 * The employee’s last name.
				 */
				last_name: string | null
				/**
				 * The employee’s full name, including any middle names. Not all HR systems provide an explicit display name, so we recommend falling back to `first_name` and `last_name`.
				 */
				display_full_name: string | null
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The employee’s work email address. If the email address is invalid, we will set this to `null`.
				 */
				work_email: string | null
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
				/**
				 * The employee’s current employment status:
				 *
				 * - `ACTIVE`: the employee is **actively employed**
				 * - `PENDING`: the employee is **not actively employed yet** (but they signed their contract or are part of an onboarding process)
				 * - `INACTIVE`: the employee is **not actively employed** anymore
				 * - `LEAVE`: the employee is still employed but **currently on leave** (note that not all HR systems support this status — use our absences API for detailed information)
				 *
				 * In rare cases where we can’t find a clear mapping, the original string is passed through.
				 */
				employment_status: ('ACTIVE' | 'PENDING' | 'INACTIVE' | 'LEAVE') | string | null
				/**
				 * The date when the employment ends. Can be in the past or future.
				 */
				termination_date: Date | null
			} | null
			groups: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
				/**
				 * The name of the group.
				 */
				name: string | null
				/**
				 * Type of the group.
				 */
				type: 'DEPARTMENT' | 'TEAM' | 'COST_CENTER'
			}>
			legal_entity: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The legal entity’s name.
				 */
				name: string | null
				/**
				 * The legal entity’s address.
				 */
				address: {
					city?: string | null
					/**
					 * Contains the ISO2 country code if possible. If not, it contains the original value.
					 */
					country?: string | null
					/**
					 * If we have address data, this is filled with the raw address string.
					 */
					raw?: string | null
					state?: string | null
					/**
					 * If we can parse the address data, this field contains the first part of the street information.
					 */
					street_1?: string | null
					street_2?: string | null
					zip_code?: string | null
				} | null
			} | null
			/**
			 * **(⚠️ Deprecated - Please use `groups` instead.  It includes the same data and the naming is less confusing.)** Maintained field for backwards compatibility.
			 */
			teams: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
				/**
				 * The name of the group.
				 */
				name: string | null
				/**
				 * Type of the group.
				 */
				type: 'DEPARTMENT' | 'TEAM' | 'COST_CENTER'
			}>
			work_location: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The work location’s name
				 */
				name: string | null
				/**
				 * The work location’s address
				 */
				address: {
					city?: string | null
					/**
					 * Contains the ISO2 country code if possible. If not, it contains the original value.
					 */
					country?: string | null
					/**
					 * If we have address data, this is filled with the raw address string.
					 */
					raw?: string | null
					state?: string | null
					/**
					 * If we can parse the address data, this field contains the first part of the street information.
					 */
					street_1?: string | null
					street_2?: string | null
					zip_code?: string | null
				} | null
				/**
				 * The work location’s type. A freeform string.
				 */
				type: string | null
				/**
				 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
				 */
				changed_at: Date
				/**
				 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
				 */
				remote_deleted_at: Date | null
				/**
				 * Includes the data fetched from the remote system.
				 * Please be aware that including this in you scope config might violate other
				 * scopes that are set.
				 *
				 * Remote data always has the endpoint path that we got the data from as the
				 * top level key. For example, it could look like: `{ "/companies": { ... }}`
				 *
				 * This is not available on all plans. Reach out to Kombo if you need it.
				 */
				remote_data: {} | null
			} | null
		}>
	}
}

export type PostHrisEmployeesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
		 */
		id: string
		/**
		 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
		 */
		remote_id: string
		/**
		 * The employee’s organization-internal employee number.
		 */
		employee_number: string | null
		/**
		 * The employee’s first name.
		 */
		first_name: string | null
		/**
		 * The employee’s last name.
		 */
		last_name: string | null
		/**
		 * The employee’s nationality.
		 */
		nationality: string | null
		/**
		 * The employee’s full name, including any middle names. Not all HR systems provide an explicit display name, so we recommend falling back to `first_name` and `last_name`.
		 */
		display_full_name: string | null
		/**
		 * The employee’s job title.
		 */
		job_title: string | null
		/**
		 * The employee’s work email address. If the email address is invalid, we will set this to `null`.
		 */
		work_email: string | null
		/**
		 * The employee’s personal email address. If the email address is invalid, we will set this to `null`.
		 */
		personal_email: string | null
		/**
		 * The employee’s mobile phone number.
		 */
		mobile_phone_number: string | null
		/**
		 * The employee’s social security number
		 */
		ssn: string | null
		/**
		 * The employee’s tax ID.
		 */
		tax_id: string | null
		/**
		 * The employee’s gender.
		 */
		gender: ('MALE' | 'FEMALE' | 'NON_BINARY' | 'NOT_SPECIFIED') | string | null
		/**
		 * The employee’s ethnicity. In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		ethnicity: ('WHITE' | 'ASIAN' | 'HISPANIC_LATINO' | 'HAWAIIAN' | 'NATIVE_AMERICAN' | 'BLACK_AFRICAN_AMERICAN' | 'MULTIPLE_ETHNICITIES' | 'DECLINE_TO_SPECIFY') | string | null
		/**
		 * The employee’s current marital status. In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		marital_status: ('SINGLE' | 'MARRIED' | 'DOMESTIC_PARTNERSHIP' | 'WIDOWED' | 'DIVORCED' | 'SEPARATED' | 'NOT_MARRIED') | string | null
		/**
		 * The employee’s current employment status:
		 *
		 * - `ACTIVE`: the employee is **actively employed**
		 * - `PENDING`: the employee is **not actively employed yet** (but they signed their contract or are part of an onboarding process)
		 * - `INACTIVE`: the employee is **not actively employed** anymore
		 * - `LEAVE`: the employee is still employed but **currently on leave** (note that not all HR systems support this status — use our absences API for detailed information)
		 *
		 * In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		employment_status: ('ACTIVE' | 'PENDING' | 'INACTIVE' | 'LEAVE') | string | null
		/**
		 * The employee’s current employment type:
		 *
		 * - `FULL_TIME`: the employee is actively employed
		 * - `PART_TIME`: the employee is working only part of the usual working hours
		 * - `CONTRACT`: the employee is working temporarily under a contract
		 * - `INTERNSHIP`: the employee is working as an intern
		 * - `FREELANCE`: the employee is working as a freelancer
		 * - `WORKING_STUDENT`: the employee is working as a working student
		 * - `APPRENTICESHIP`: the employee is working in an apprenticeship
		 * - `TRAINING`: the employee is working in a training program
		 *
		 * In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		employment_type: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE' | 'WORKING_STUDENT' | 'APPRENTICESHIP' | 'TRAINING') | string | null
		/**
		 * The employee’s weekly working hours.
		 */
		weekly_hours: number | null
		/**
		 * URL to the employee’s avatar. This is either the raw URL from the HR system (in cases where it can be requested without short-lived authentication) _or_ a URL to a temporarily cached version of the file hosted by Kombo. Kombo will delete the cached file after its deletion in the source system.
		 */
		avatar: string | null
		/**
		 * The Kombo ID of the employee’s work location. The ID can be used to retrieve the work location from the `get work locations` endpoint.
		 */
		work_location_id: string | null
		/**
		 * The Kombo ID of the employee’s legal entity. The ID can be used to retrieve the legal entity from the `get legal entities` endpoint.
		 */
		legal_entity_id: string | null
		/**
		 * The Kombo ID of the employee’s manager. The ID can be used to retrieve the manager from the `get employees` endpoint.
		 */
		manager_id: string | null
		/**
		 * The employee’s home address.
		 */
		home_address: {
			city?: string | null
			/**
			 * Contains the ISO2 country code if possible. If not, it contains the original value.
			 */
			country?: string | null
			/**
			 * If we have address data, this is filled with the raw address string.
			 */
			raw?: string | null
			state?: string | null
			/**
			 * If we can parse the address data, this field contains the first part of the street information.
			 */
			street_1?: string | null
			street_2?: string | null
			zip_code?: string | null
		} | null
		/**
		 * The employee’s bank accounts.
		 */
		bank_accounts: Array<{
			/**
			 * The internationally unique IBAN identifying this account. If we detect a valid IBAN from the account number and this field would otherwise be empty, we will automatically populate this field.
			 */
			iban?: string | null
			/**
			 * The internationally unique BIC/SWIFT code identifying the bank behind this account. If we detect a valid BIC from the domestic bank routing number and this field would otherwise be empty, we will automatically populate this field.
			 */
			bic?: string | null
			/**
			 * The bank-specific account number. Some companies use the account number field to put the IBAN here.
			 */
			account_number?: string | null
			/**
			 * The name of the holder of this account.
			 */
			holder_name?: string | null
			/**
			 * The name of the bank behind this account.
			 */
			bank_name?: string | null
			domestic_bank_routing?: {
				/**
				 * Bank routing number (e.g. DE Bankleitzahl, GB Sort Code, US ABA routing number, AU BSB code). This field is not formatted and therefore might contain delimiters (eg. 01-23-45).
				 */
				number: string
				/**
				 * Enum of the routing type, prefixed with the iso-3166-1-alpha-2 banks origin country. If there is uncertainty about the type, it will be set to null.
				 */
				type: 'GB_SORT_CODE' | 'DE_BANKLEITZAHL' | 'US_ABA_ROUTING_TRANSIT_NUMBER' | 'CA_ROUTING_NUMBER' | 'AU_BSB_CODE' | 'FR_RIB'
			} | null
		}> | null
		/**
		 * The employee’s date of birth.
		 */
		date_of_birth: Date | null
		/**
		 * The date the employee started working for the organization.
		 */
		start_date: Date | null
		/**
		 * The date when the employment ends. Can be in the past or future.
		 */
		termination_date: Date | null
		/**
		 * The date and time the object was created in the remote system.
		 */
		remote_created_at: Date | null
		/**
		 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
		 */
		changed_at: Date
		/**
		 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
		 */
		remote_deleted_at: Date | null
		/**
		 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
		 */
		custom_fields: {} | null
		/**
		 * An array of selected pass-through integration fields. [Read more](/integration-fields)
		 */
		integration_fields: Array<{
			/**
			 * The globally unique ID of this object.
			 */
			id: string
			/**
			 * The key of the field in the remote system.
			 */
			key: string
			/**
			 * - `DEFAULT`: static fields in the remote system.
			 * - `CUSTOM`: fields that are created/editable by the user.
			 */
			type: 'DEFAULT' | 'CUSTOM'
			/**
			 * The field's value.
			 */
			value?: unknown
			/**
			 * The label of the field. (not always available)
			 */
			label: string | null
		}>
		/**
		 * Includes the data fetched from the remote system.
		 * Please be aware that including this in you scope config might violate other
		 * scopes that are set.
		 *
		 * Remote data always has the endpoint path that we got the data from as the
		 * top level key. For example, it could look like: `{ "/companies": { ... }}`
		 *
		 * This is not available on all plans. Reach out to Kombo if you need it.
		 */
		remote_data: {} | null
	}
}

export type PostHrisEmployeesRequestBody = {
	/**
	 * The first name of the employee.
	 */
	first_name: string
	/**
	 * The last name of the employee.
	 */
	last_name: string
	/**
	 * The email address of the employee to be created. For tools where the personal email address is required, we map this input to the personal email. This is documented on a per-tool basis.
	 */
	work_email?: string
	/**
	 * The gender of the employee.
	 */
	gender?: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'NOT_SPECIFIED'
	/**
	 * The title of the position this person is working in.
	 */
	job_title?: string
	/**
	 * The employee's home address.
	 */
	home_address?: {
		street_1?: string
		street_2?: string
		city?: string
		state?: string
		zip_code?: string
		/**
		 * The uppercase two-letter ISO country (e.g., `DE`). For systems that use codes in formats other than `ISO 3166-1 alpha-2`, Kombo transforms the ISO Codes to the appropriate value.
		 */
		country?: string
	}
	/**
	 * The employee's date of birth. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
	 */
	date_of_birth?: Date
	mobile_phone_number?: string
	/**
	 * The uppercase two-letter ISO country (e.g., `DE`). For systems that use codes in formats other than `ISO 3166-1 alpha-2`, Kombo transforms the ISO Codes to the appropriate value.
	 */
	nationality?: string
	/**
	 * Start date of the employee. Also considered to be the hire date. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
	 */
	start_date?: Date
	/**
	 * The Kombo ID of the legal entity the employee should be in. This field is required for certain integrations.
	 */
	legal_entity_id?: string
	/**
	 * The Kombo ID of the location the employee should be in. This field is required for certain integrations.
	 */
	location_id?: string
	/**
	 * Additional fields that we will pass through to specific HRIS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Humaans.
		 */
		humaans?: {
			/**
			 * Fields that we will pass through to Humaans `Employee` object.
			 */
			employee?: {}
		}
		/**
		 * Fields specific to Hibob.
		 */
		hibob?: {
			/**
			 * Fields that we will pass through to Hibob's `Person` endpoint.
			 */
			employee?: {}
		}
		/**
		 * Fields specific to Silae.
		 */
		silae?: {
			/**
			 * The siret of the company. The siret can be found as the remote ID of a Silae legal entity.
			 */
			siret?: string
			/**
			 * Fields that we will passed through to Silae `Employee` object.
			 */
			employee?: {}
			/**
			 * Fields that we will passed through to Silae `Employment` object.
			 */
			employment?: {}
		}
		/**
		 * Fields specific to PeopleHR.
		 */
		peoplehr?: {
			/**
			 * The effective date of the employee's current role. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
			 */
			job_role_effective_date?: Date
			department?: string
		}
		/**
		 * Fields specific to Zoho People.
		 */
		zohopeople?: {
			/**
			 * A personnel code used to identify individuals working for the business.
			 */
			employee_id?: string
		}
		/**
		 * Fields specific to Workday.
		 */
		workday?: {
			/**
			 * Workday job requisition ID of that the employee belongs to.
			 */
			job_requisition_id: string
			/**
			 * The social security number of the employee.
			 */
			ssn?: string
			/**
			 * The employee's bank account.
			 */
			bank_account?: {
				iban: string
				bic: string
				bank_name: string
			}
		}
		/**
		 * Fields specific to Deel.
		 */
		deel?: {
			/**
			 * The unique identifier of the candidate in the ATS.
			 */
			candidate_id: string
			/**
			 * The link to the candidate's profile in the ATS.
			 */
			candidate_link: string
		}
		/**
		 * Fields specific to BambooHR.
		 */
		bamboohr?: {
			/**
			 * Fields that we will pass through to BambooHR `Employee` object.
			 */
			employee?: {}
		}
		/**
		 * Fields specific to Oracle HCM.
		 */
		oracle?: {
			/**
			 * The business unit group ID for which the employee should be created. It can be found as a group with the type `null`.
			 */
			group_id: string
			/**
			 * The department group ID for which the employee should be created. It can be found as a group with thre type "DEPARTMENT".
			 */
			department_id: string
		}
		/**
		 * Fields specific to Oracle HCM.
		 */
		adpworkforcenow?: {
			/**
			 * The onboarding template to be used for the created employee. View the possible values in the Kombo dashboard by clicking on the ADP Workforce Now integration and viewing the field report in the settings tab.
			 */
			onboarding_template_code: string
			/**
			 * The payroll group code (a.k.a. "Company Code") to be used for the created employee. View the possible values in the Kombo dashboard by clicking on the ADP Workforce Now integration and viewing the field report in the settings tab.
			 */
			applicant_payroll_profile_group_code: string
		}
		/**
		 * Fields specific to Oracle HCM.
		 */
		azuread?: {
			/**
			 * Azure / entra requires a password to be set when creating a user. The user has to use the password on his initial sign-in and will be forced to change the password once signed in.
			 */
			password: string
		}
	}
}

/**
 * The ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
 */


export type PatchHrisEmployeesEmployeeIdSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
		 */
		id: string
		/**
		 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
		 */
		remote_id: string
		/**
		 * The employee’s organization-internal employee number.
		 */
		employee_number: string | null
		/**
		 * The employee’s first name.
		 */
		first_name: string | null
		/**
		 * The employee’s last name.
		 */
		last_name: string | null
		/**
		 * The employee’s nationality.
		 */
		nationality: string | null
		/**
		 * The employee’s full name, including any middle names. Not all HR systems provide an explicit display name, so we recommend falling back to `first_name` and `last_name`.
		 */
		display_full_name: string | null
		/**
		 * The employee’s job title.
		 */
		job_title: string | null
		/**
		 * The employee’s work email address. If the email address is invalid, we will set this to `null`.
		 */
		work_email: string | null
		/**
		 * The employee’s personal email address. If the email address is invalid, we will set this to `null`.
		 */
		personal_email: string | null
		/**
		 * The employee’s mobile phone number.
		 */
		mobile_phone_number: string | null
		/**
		 * The employee’s social security number
		 */
		ssn: string | null
		/**
		 * The employee’s tax ID.
		 */
		tax_id: string | null
		/**
		 * The employee’s gender.
		 */
		gender: ('MALE' | 'FEMALE' | 'NON_BINARY' | 'NOT_SPECIFIED') | string | null
		/**
		 * The employee’s ethnicity. In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		ethnicity: ('WHITE' | 'ASIAN' | 'HISPANIC_LATINO' | 'HAWAIIAN' | 'NATIVE_AMERICAN' | 'BLACK_AFRICAN_AMERICAN' | 'MULTIPLE_ETHNICITIES' | 'DECLINE_TO_SPECIFY') | string | null
		/**
		 * The employee’s current marital status. In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		marital_status: ('SINGLE' | 'MARRIED' | 'DOMESTIC_PARTNERSHIP' | 'WIDOWED' | 'DIVORCED' | 'SEPARATED' | 'NOT_MARRIED') | string | null
		/**
		 * The employee’s current employment status:
		 *
		 * - `ACTIVE`: the employee is **actively employed**
		 * - `PENDING`: the employee is **not actively employed yet** (but they signed their contract or are part of an onboarding process)
		 * - `INACTIVE`: the employee is **not actively employed** anymore
		 * - `LEAVE`: the employee is still employed but **currently on leave** (note that not all HR systems support this status — use our absences API for detailed information)
		 *
		 * In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		employment_status: ('ACTIVE' | 'PENDING' | 'INACTIVE' | 'LEAVE') | string | null
		/**
		 * The employee’s current employment type:
		 *
		 * - `FULL_TIME`: the employee is actively employed
		 * - `PART_TIME`: the employee is working only part of the usual working hours
		 * - `CONTRACT`: the employee is working temporarily under a contract
		 * - `INTERNSHIP`: the employee is working as an intern
		 * - `FREELANCE`: the employee is working as a freelancer
		 * - `WORKING_STUDENT`: the employee is working as a working student
		 * - `APPRENTICESHIP`: the employee is working in an apprenticeship
		 * - `TRAINING`: the employee is working in a training program
		 *
		 * In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		employment_type: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE' | 'WORKING_STUDENT' | 'APPRENTICESHIP' | 'TRAINING') | string | null
		/**
		 * The employee’s weekly working hours.
		 */
		weekly_hours: number | null
		/**
		 * URL to the employee’s avatar. This is either the raw URL from the HR system (in cases where it can be requested without short-lived authentication) _or_ a URL to a temporarily cached version of the file hosted by Kombo. Kombo will delete the cached file after its deletion in the source system.
		 */
		avatar: string | null
		/**
		 * The Kombo ID of the employee’s work location. The ID can be used to retrieve the work location from the `get work locations` endpoint.
		 */
		work_location_id: string | null
		/**
		 * The Kombo ID of the employee’s legal entity. The ID can be used to retrieve the legal entity from the `get legal entities` endpoint.
		 */
		legal_entity_id: string | null
		/**
		 * The Kombo ID of the employee’s manager. The ID can be used to retrieve the manager from the `get employees` endpoint.
		 */
		manager_id: string | null
		/**
		 * The employee’s home address.
		 */
		home_address: {
			city?: string | null
			/**
			 * Contains the ISO2 country code if possible. If not, it contains the original value.
			 */
			country?: string | null
			/**
			 * If we have address data, this is filled with the raw address string.
			 */
			raw?: string | null
			state?: string | null
			/**
			 * If we can parse the address data, this field contains the first part of the street information.
			 */
			street_1?: string | null
			street_2?: string | null
			zip_code?: string | null
		} | null
		/**
		 * The employee’s bank accounts.
		 */
		bank_accounts: Array<{
			/**
			 * The internationally unique IBAN identifying this account. If we detect a valid IBAN from the account number and this field would otherwise be empty, we will automatically populate this field.
			 */
			iban?: string | null
			/**
			 * The internationally unique BIC/SWIFT code identifying the bank behind this account. If we detect a valid BIC from the domestic bank routing number and this field would otherwise be empty, we will automatically populate this field.
			 */
			bic?: string | null
			/**
			 * The bank-specific account number. Some companies use the account number field to put the IBAN here.
			 */
			account_number?: string | null
			/**
			 * The name of the holder of this account.
			 */
			holder_name?: string | null
			/**
			 * The name of the bank behind this account.
			 */
			bank_name?: string | null
			domestic_bank_routing?: {
				/**
				 * Bank routing number (e.g. DE Bankleitzahl, GB Sort Code, US ABA routing number, AU BSB code). This field is not formatted and therefore might contain delimiters (eg. 01-23-45).
				 */
				number: string
				/**
				 * Enum of the routing type, prefixed with the iso-3166-1-alpha-2 banks origin country. If there is uncertainty about the type, it will be set to null.
				 */
				type: 'GB_SORT_CODE' | 'DE_BANKLEITZAHL' | 'US_ABA_ROUTING_TRANSIT_NUMBER' | 'CA_ROUTING_NUMBER' | 'AU_BSB_CODE' | 'FR_RIB'
			} | null
		}> | null
		/**
		 * The employee’s date of birth.
		 */
		date_of_birth: Date | null
		/**
		 * The date the employee started working for the organization.
		 */
		start_date: Date | null
		/**
		 * The date when the employment ends. Can be in the past or future.
		 */
		termination_date: Date | null
		/**
		 * The date and time the object was created in the remote system.
		 */
		remote_created_at: Date | null
		/**
		 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
		 */
		changed_at: Date
		/**
		 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
		 */
		remote_deleted_at: Date | null
		/**
		 * Includes the data fetched from the remote system.
		 * Please be aware that including this in you scope config might violate other
		 * scopes that are set.
		 *
		 * Remote data always has the endpoint path that we got the data from as the
		 * top level key. For example, it could look like: `{ "/companies": { ... }}`
		 *
		 * This is not available on all plans. Reach out to Kombo if you need it.
		 */
		remote_data: {} | null
	}
}

export type PatchHrisEmployeesEmployeeIdRequestBody = {
	/**
	 * The first name of the employee.
	 */
	first_name?: string
	/**
	 * The last name of the employee.
	 */
	last_name?: string
	/**
	 * The email address of the employee to be created. For tools where the personal email address is required, we map this input to the personal email. This is documented on a per-tool basis.
	 */
	work_email: string
	/**
	 * The gender of the employee.
	 */
	gender?: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'NOT_SPECIFIED'
	/**
	 * The title of the position this person is working in.
	 */
	job_title?: string
	/**
	 * The employee's home address.
	 */
	home_address?: {
		street_1?: string
		street_2?: string
		city?: string
		state?: string
		zip_code?: string
		/**
		 * The uppercase two-letter ISO country (e.g., `DE`). For systems that use codes in formats other than `ISO 3166-1 alpha-2`, Kombo transforms the ISO Codes to the appropriate value.
		 */
		country?: string
	}
	/**
	 * The employee's date of birth. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
	 */
	date_of_birth?: Date
	mobile_phone_number?: string
	/**
	 * The uppercase two-letter ISO country (e.g., `DE`). For systems that use codes in formats other than `ISO 3166-1 alpha-2`, Kombo transforms the ISO Codes to the appropriate value.
	 */
	nationality?: string
	/**
	 * Start date of the employee. Also considered to be the hire date. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
	 */
	start_date?: Date
	/**
	 * The Kombo ID of the legal entity the employee should be in. This field is required for certain integrations.
	 */
	legal_entity_id?: string
	/**
	 * The Kombo ID of the location the employee should be in. This field is required for certain integrations.
	 */
	location_id?: string
	/**
	 * Additional fields that we will pass through to specific HRIS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Humaans.
		 */
		humaans?: {
			/**
			 * Fields that we will pass through to Humaans `Employee` object.
			 */
			employee?: {}
		}
		/**
		 * Fields specific to Hibob.
		 */
		hibob?: {
			/**
			 * Fields that we will pass through to Hibob's `Person` endpoint.
			 */
			employee?: {}
		}
		/**
		 * Fields specific to Silae.
		 */
		silae?: {
			/**
			 * The siret of the company. The siret can be found as the remote ID of a Silae legal entity.
			 */
			siret?: string
			/**
			 * Fields that we will passed through to Silae `Employee` object.
			 */
			employee?: {}
			/**
			 * Fields that we will passed through to Silae `Employment` object.
			 */
			employment?: {}
		}
		/**
		 * Fields specific to PeopleHR.
		 */
		peoplehr?: {
			/**
			 * The effective date of the employee's current role. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
			 */
			job_role_effective_date?: Date
			department?: string
		}
		/**
		 * Fields specific to Zoho People.
		 */
		zohopeople?: {
			/**
			 * A personnel code used to identify individuals working for the business.
			 */
			employee_id?: string
		}
		/**
		 * Fields specific to Workday.
		 */
		workday?: {
			/**
			 * Workday job requisition ID of that the employee belongs to.
			 */
			job_requisition_id: string
			/**
			 * The social security number of the employee.
			 */
			ssn?: string
			/**
			 * The employee's bank account.
			 */
			bank_account?: {
				iban: string
				bic: string
				bank_name: string
			}
		}
		/**
		 * Fields specific to Deel.
		 */
		deel?: {
			/**
			 * The unique identifier of the candidate in the ATS.
			 */
			candidate_id: string
			/**
			 * The link to the candidate's profile in the ATS.
			 */
			candidate_link: string
		}
		/**
		 * Fields specific to BambooHR.
		 */
		bamboohr?: {
			/**
			 * Fields that we will pass through to BambooHR `Employee` object.
			 */
			employee?: {}
		}
		/**
		 * Fields specific to Oracle HCM.
		 */
		oracle?: {
			/**
			 * The business unit group ID for which the employee should be created. It can be found as a group with the type `null`.
			 */
			group_id: string
			/**
			 * The department group ID for which the employee should be created. It can be found as a group with thre type "DEPARTMENT".
			 */
			department_id: string
		}
		/**
		 * Fields specific to Oracle HCM.
		 */
		adpworkforcenow?: {
			/**
			 * The onboarding template to be used for the created employee. View the possible values in the Kombo dashboard by clicking on the ADP Workforce Now integration and viewing the field report in the settings tab.
			 */
			onboarding_template_code: string
			/**
			 * The payroll group code (a.k.a. "Company Code") to be used for the created employee. View the possible values in the Kombo dashboard by clicking on the ADP Workforce Now integration and viewing the field report in the settings tab.
			 */
			applicant_payroll_profile_group_code: string
		}
		/**
		 * Fields specific to Oracle HCM.
		 */
		azuread?: {
			/**
			 * Azure / entra requires a password to be set when creating a user. The user has to use the password on his initial sign-in and will be forced to change the password once signed in.
			 */
			password: string
		}
	}
} & {
	/**
	 * The social security number of the employee.
	 */
	ssn?: string
	/**
	 * The marital status of an employee.
	 */
	marital_status?: 'SINGLE' | 'MARRIED' | 'DOMESTIC_PARTNERSHIP' | 'WIDOWED' | 'DIVORCED' | 'SEPARATED' | 'NOT_MARRIED'
	/**
	 * The date on which the employment ends. This date can be in the past or in the future. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
	 */
	termination_date?: Date
	/**
	 * Tax ID of the employee. Most contries have different formats of that. In Germany, this is the `Steuer ID` and in the US it's the `TIN`.
	 */
	tax_id?: string
	/**
	 * The uppercase two-letter ISO country (e.g., `DE`). For systems that use codes in formats other than `ISO 3166-1 alpha-2`, Kombo transforms the ISO Codes to the appropriate value.
	 */
	nationality?: string
}



export type PostHrisEmployeesEmployeeIdDocumentsRequestBody = {
	category_id: string
	document: {
		/**
		 * Name of the file you want to upload.
		 */
		name: string
		/**
		 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
		 */
		content_type?: string
		/**
		 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
		 */
		data?: string
		/**
		 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
		 */
		data_url?: string
	}
}

/**
 * The Kombo ID of the Employee you want to update.
 */


/**
 * The Kombo ID of the integration field you want to update.
 */


export type PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdRequestBody = {
	value: string | number | null
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisEmployeeDocumentCategoriesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisEmployeeDocumentCategoriesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisEmployeeDocumentCategoriesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisEmployeeDocumentCategoriesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetHrisEmployeeDocumentCategoriesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The employee document category name. For example, "Employment contract".
			 */
			name: string | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisTeamsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisTeamsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisTeamsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisTeamsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetHrisTeamsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * The name of the group.
			 */
			name: string | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Type of the group.
			 */
			type: 'DEPARTMENT' | 'TEAM' | 'COST_CENTER'
			/**
			 * The Kombo ID of the group’s parent group in the organizational structure. The ID can be used to retrieve the group from the `get groups` endpoint.
			 */
			parent_id: string | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisGroupsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisGroupsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisGroupsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisGroupsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetHrisGroupsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * The name of the group.
			 */
			name: string | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Type of the group.
			 */
			type: 'DEPARTMENT' | 'TEAM' | 'COST_CENTER'
			/**
			 * The Kombo ID of the group’s parent group in the organizational structure. The ID can be used to retrieve the group from the `get groups` endpoint.
			 */
			parent_id: string | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisEmploymentsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisEmploymentsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisEmploymentsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisEmploymentsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetHrisEmploymentsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The Kombo ID of the employment’s employee. The ID can be used to retrieve the employee from the `get employees` endpoint.
			 */
			employee_id: string
			/**
			 * This field can contain historic job titles. Please use the `job_title` field on the employee for the active job title of an employee.
			 */
			job_title: string | null
			/**
			 * The monetary amount paid to an employee.
			 */
			pay_rate: number | null
			/**
			 * The time interval which the `pay_rate` is describing.
			 *
			 * A `pay_rate` value of `12000` with a `pay_period` of `YEAR` would indicate that the employee receives 12000 over the course of a year. In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			pay_period: ('HOUR' | 'DAY' | 'WEEK' | 'TWO_WEEKS' | 'HALF_MONTH' | 'MONTH' | 'TWO_MONTHS' | 'QUARTER' | 'HALF_YEAR' | 'YEAR') | string | null
			/**
			 * The time interval at which the employee receives payment.
			 *
			 * A `pay_rate` of `12000`, with a `pay_period` of `YEAR`, and a `pay_frequency` of `MONTHLY` would indicate that the employee is paid 1000 every month. In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			pay_frequency: ('DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'SEMIMONTHLY' | 'QUARTERLY' | 'SEMIANNUALLY' | 'ANNUALLY' | 'PRO_RATA') | string | null
			/**
			 * The employee’s current employment type:
			 *
			 * - `FULL_TIME`: the employee is actively employed
			 * - `PART_TIME`: the employee is working only part of the usual working hours
			 * - `CONTRACT`: the employee is working temporarily under a contract
			 * - `INTERNSHIP`: the employee is working as an intern
			 * - `FREELANCE`: the employee is working as a freelancer
			 * - `WORKING_STUDENT`: the employee is working as a working student
			 * - `APPRENTICESHIP`: the employee is working in an apprenticeship
			 * - `TRAINING`: the employee is working in a training program
			 *
			 * In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			employment_type: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE' | 'WORKING_STUDENT' | 'APPRENTICESHIP' | 'TRAINING') | string | null
			/**
			 * The currency that the employee is paid in. Usually returned in [ISO 4217 currency codes](https://www.iso.org/iso-4217-currency-codes.html).
			 */
			pay_currency: string | null
			/**
			 * The date of when the employment started.
			 */
			effective_date: Date | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
			 */
			custom_fields: {} | null
			/**
			 * An array of selected pass-through integration fields. [Read more](/integration-fields)
			 */
			integration_fields: Array<{
				/**
				 * The globally unique ID of this object.
				 */
				id: string
				/**
				 * The key of the field in the remote system.
				 */
				key: string
				/**
				 * - `DEFAULT`: static fields in the remote system.
				 * - `CUSTOM`: fields that are created/editable by the user.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The field's value.
				 */
				value?: unknown
				/**
				 * The label of the field. (not always available)
				 */
				label: string | null
			}>
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisLocationsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisLocationsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisLocationsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisLocationsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetHrisLocationsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The work location’s name
			 */
			name: string | null
			/**
			 * The work location’s address
			 */
			address: {
				city?: string | null
				/**
				 * Contains the ISO2 country code if possible. If not, it contains the original value.
				 */
				country?: string | null
				/**
				 * If we have address data, this is filled with the raw address string.
				 */
				raw?: string | null
				state?: string | null
				/**
				 * If we can parse the address data, this field contains the first part of the street information.
				 */
				street_1?: string | null
				street_2?: string | null
				zip_code?: string | null
			} | null
			/**
			 * The work location’s type. A freeform string.
			 */
			type: string | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisAbsenceTypesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisAbsenceTypesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisAbsenceTypesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisAbsenceTypesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetHrisAbsenceTypesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * The absence’s name.
			 */
			name: string | null
			/**
			 * The time-unit of the absence.
			 */
			unit: 'HOURS' | 'DAYS'
			/**
			 * Whether the integration supports half-day absences (represented through `start_half_day` and `end_half_day`) for this absence type.
			 */
			half_days_supported: boolean | null
			/**
			 * `true` if the system supports exact times (absences with a `start_time` and an `end_time`) for this absence, `false` if not.
			 */
			exact_times_supported: boolean | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisTimeOffBalancesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisTimeOffBalancesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisTimeOffBalancesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisTimeOffBalancesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


/**
 * Filter by a specific employee using their ID.
 */


export type GetHrisTimeOffBalancesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The Kombo ID of the employee to which the balance belongs to. The ID can be used to retrieve the employee from the `get employees` endpoint.
			 */
			employee_id: string
			type_id: string
			/**
			 * The amount of time available to the employee.
			 */
			balance: number | null
			/**
			 * The time-unit of the balance.
			 */
			balance_unit: 'HOURS' | 'DAYS'
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * The amount of time used by the employee.
			 */
			used: number | null
			/**
			 * The time-unit of the used time.
			 */
			used_unit: 'HOURS' | 'DAYS'
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			type: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
				/**
				 * The absence’s name.
				 */
				name: string | null
				/**
				 * The time-unit of the absence.
				 */
				unit: 'HOURS' | 'DAYS'
				/**
				 * Whether the integration supports half-day absences (represented through `start_half_day` and `end_half_day`) for this absence type.
				 */
				half_days_supported: boolean | null
				/**
				 * `true` if the system supports exact times (absences with a `start_time` and an `end_time`) for this absence, `false` if not.
				 */
				exact_times_supported: boolean | null
				/**
				 * Includes the data fetched from the remote system.
				 * Please be aware that including this in you scope config might violate other
				 * scopes that are set.
				 *
				 * Remote data always has the endpoint path that we got the data from as the
				 * top level key. For example, it could look like: `{ "/companies": { ... }}`
				 *
				 * This is not available on all plans. Reach out to Kombo if you need it.
				 */
				remote_data: {} | null
				/**
				 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
				 */
				changed_at: Date
				/**
				 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
				 */
				remote_deleted_at: Date | null
			}
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisAbsencesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisAbsencesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisAbsencesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisAbsencesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


/**
 * Filter for all the absences that either start _or_ haven't ended yet on/after this day. If you imagine a calendar displaying absences, this defines the left-most visible day. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
 */
export type GetHrisAbsencesParameterDateFrom = Date

/**
 * Filter for absences that start on or before this day (but might continue after). If you imagine a calendar displaying absences, this defines the right-most visible day. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
 */
export type GetHrisAbsencesParameterDateUntil = Date

/**
 * Filter by a comma-separated list of absence type IDs.
 */


/**
 * Filter by a specific employee using their ID.
 */


/**
 * **(⚠️ Deprecated - Use the `date_from` filter instead.)** Filter for absences that either start after or start before and end after a certain time.
 */
export type GetHrisAbsencesParameterTimeFrom = Date

/**
 * **(⚠️ Deprecated - Use the `date_until` filter instead.)** Filter for absences that start before a certain time.
 */
export type GetHrisAbsencesParameterTimeUntil = Date

export type GetHrisAbsencesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The Kombo ID of the employee to which the absence belongs to. The ID can be used to retrieve the employee from the `get employees` endpoint.
			 */
			employee_id: string
			/**
			 * **(⚠️ Deprecated - We won't increase coverage for this feature)** The Kombo ID of the employee who is responsible for approving this absence.
			 */
			approver_id: string | null
			/**
			 * The date this absence starts in the `yyyy-MM-dd` format.
			 */
			start_date: string | null
			/**
			 * The date this absence ends in the `yyyy-MM-dd` format.
			 */
			end_date: string | null
			/**
			 * `true` if the absence starts in the middle of the day, `false` if not, and `null` if the absence type doesn't support half-day absences. For multi-day absences, this only applies to the first day of the absence.
			 */
			start_half_day: boolean | null
			/**
			 * `true` if the absence ends in the middle of the day, `false` if not, and `null` if the absence type doesn't support half-day absences. For multi-day absences, this only applies to the last day of the absence.
			 */
			end_half_day: boolean | null
			/**
			 * The time at which this absence starts. Follows the format `HH:mm:ss` (e.g., `14:45:15`).
			 */
			start_time: string | null
			/**
			 * The time at which this absence ends. Follows the format `HH:mm:ss` (e.g., `14:45:15`).
			 */
			end_time: string | null
			/**
			 * The amount of time this absence takes.
			 */
			amount: number | null
			/**
			 * The unit of time for this absence. Can be `HOURS` or `DAYS`.
			 */
			unit: 'HOURS' | 'DAYS'
			/**
			 * The absence’s current status. In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			status?: ('REQUESTED' | 'APPROVED' | 'DECLINED' | 'CANCELLED' | 'DELETED') | string | null
			/**
			 * A note the employee has added to this absence.
			 */
			employee_note: string | null
			/**
			 * The Kombo absence type ID of this absence.
			 */
			type_id: string | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			type: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
				/**
				 * The absence’s name.
				 */
				name: string | null
				/**
				 * The time-unit of the absence.
				 */
				unit: 'HOURS' | 'DAYS'
				/**
				 * Whether the integration supports half-day absences (represented through `start_half_day` and `end_half_day`) for this absence type.
				 */
				half_days_supported: boolean | null
				/**
				 * `true` if the system supports exact times (absences with a `start_time` and an `end_time`) for this absence, `false` if not.
				 */
				exact_times_supported: boolean | null
				/**
				 * Includes the data fetched from the remote system.
				 * Please be aware that including this in you scope config might violate other
				 * scopes that are set.
				 *
				 * Remote data always has the endpoint path that we got the data from as the
				 * top level key. For example, it could look like: `{ "/companies": { ... }}`
				 *
				 * This is not available on all plans. Reach out to Kombo if you need it.
				 */
				remote_data: {} | null
				/**
				 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
				 */
				changed_at: Date
				/**
				 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
				 */
				remote_deleted_at: Date | null
			} | null
		}>
	}
}

export type PostHrisAbsencesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
		 */
		id: string
		/**
		 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
		 */
		remote_id: string | null
		/**
		 * The Kombo ID of the employee to which the absence belongs to. The ID can be used to retrieve the employee from the `get employees` endpoint.
		 */
		employee_id: string
		/**
		 * **(⚠️ Deprecated - We won't increase coverage for this feature)** The Kombo ID of the employee who is responsible for approving this absence.
		 */
		approver_id: string | null
		/**
		 * The date this absence starts in the `yyyy-MM-dd` format.
		 */
		start_date: string | null
		/**
		 * The date this absence ends in the `yyyy-MM-dd` format.
		 */
		end_date: string | null
		/**
		 * `true` if the absence starts in the middle of the day, `false` if not, and `null` if the absence type doesn't support half-day absences. For multi-day absences, this only applies to the first day of the absence.
		 */
		start_half_day: boolean | null
		/**
		 * `true` if the absence ends in the middle of the day, `false` if not, and `null` if the absence type doesn't support half-day absences. For multi-day absences, this only applies to the last day of the absence.
		 */
		end_half_day: boolean | null
		/**
		 * The time at which this absence starts. Follows the format `HH:mm:ss` (e.g., `14:45:15`).
		 */
		start_time: string | null
		/**
		 * The time at which this absence ends. Follows the format `HH:mm:ss` (e.g., `14:45:15`).
		 */
		end_time: string | null
		/**
		 * The amount of time this absence takes.
		 */
		amount: number | null
		/**
		 * The unit of time for this absence. Can be `HOURS` or `DAYS`.
		 */
		unit: 'HOURS' | 'DAYS'
		/**
		 * The absence’s current status. In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		status: ('REQUESTED' | 'APPROVED' | 'DECLINED' | 'CANCELLED' | 'DELETED') | string | null
		/**
		 * A note the employee has added to this absence.
		 */
		employee_note: string | null
		/**
		 * The Kombo absence type ID of this absence.
		 */
		type_id: string | null
		/**
		 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
		 */
		changed_at: Date
		/**
		 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
		 */
		remote_deleted_at: Date | null
		/**
		 * Includes the data fetched from the remote system.
		 * Please be aware that including this in you scope config might violate other
		 * scopes that are set.
		 *
		 * Remote data always has the endpoint path that we got the data from as the
		 * top level key. For example, it could look like: `{ "/companies": { ... }}`
		 *
		 * This is not available on all plans. Reach out to Kombo if you need it.
		 */
		remote_data: {} | null
	}
}

export type PostHrisAbsencesRequestBody = {
	/**
	 * The ID of the employee in Kombo or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
	 */
	employee_id: string
	/**
	 * The ID of the absence type in Kombo (not its `remote_id`).
	 */
	absence_type_id: string
	/**
	 * The state that the absence should be created in. Some tools may approve absences automatically if they were created for an absence type that does not require approval.
	 */
	status?: 'REQUESTED' | 'APPROVED'
	/**
	 * The date that the absence starts. This is a plain date (i.e., `yyyy-MM-dd`), with all time information discarded.
	 */
	start_date: Date
	/**
	 * When the absence ends.The date that the absence ends. This is a plain date (i.e., `yyyy-MM-dd`), with all time information discarded.
	 */
	end_date: Date
	/**
	 * `true` if the absence should start in the middle of the day.
	 */
	start_half_day?: boolean
	/**
	 * `true` if the absence should end in the middle of the day.
	 */
	end_half_day?: boolean
	/**
	 * The amount of time of the absence. Specifying this also requires specifying `unit`. This is supported by very few tools.
	 */
	amount?: number
	/**
	 * The time unit of the `amount` value. Specifying this also requires specifying `amount`.
	 */
	unit?: 'HOURS' | 'DAYS'
	/**
	 * A note describing the reason for this absence.
	 */
	employee_note: string | null
	/**
	 * The time of when the absence begins. Follows the format `HH:mm` or `HH:mm:ss` (e.g., `14:45:15`). If `start_time` is specified, `end_time` has to be specified as well.
	 */
	start_time?: string
	/**
	 * The time of when the absence ends. Follows the format `HH:mm` or `HH:mm:ss` (e.g., `14:45:15`). If `end_time` is specified, `start_time` has to be specified as well.
	 */
	end_time?: string
	/**
	 * Additional fields that we will pass through to specific HRIS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to ADP Workforce Now.
		 */
		adpworkforcenow?: {
			/**
			 * [Required] The employment ID of the employee that the absence will be added to.
			 */
			employment_id?: string
			/**
			 * Whether the absence is paid or not.
			 */
			paid_leave?: boolean
		}
	}
}

/**
 * The Kombo ID of the absence
 */


export type DeleteHrisAbsencesAbsenceIdSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
		 */
		id: string
		/**
		 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
		 */
		remote_id: string | null
		/**
		 * The Kombo ID of the employee to which the absence belongs to. The ID can be used to retrieve the employee from the `get employees` endpoint.
		 */
		employee_id: string
		/**
		 * **(⚠️ Deprecated - We won't increase coverage for this feature)** The Kombo ID of the employee who is responsible for approving this absence.
		 */
		approver_id: string | null
		/**
		 * The date this absence starts in the `yyyy-MM-dd` format.
		 */
		start_date: string | null
		/**
		 * The date this absence ends in the `yyyy-MM-dd` format.
		 */
		end_date: string | null
		/**
		 * `true` if the absence starts in the middle of the day, `false` if not, and `null` if the absence type doesn't support half-day absences. For multi-day absences, this only applies to the first day of the absence.
		 */
		start_half_day: boolean | null
		/**
		 * `true` if the absence ends in the middle of the day, `false` if not, and `null` if the absence type doesn't support half-day absences. For multi-day absences, this only applies to the last day of the absence.
		 */
		end_half_day: boolean | null
		/**
		 * The time at which this absence starts. Follows the format `HH:mm:ss` (e.g., `14:45:15`).
		 */
		start_time: string | null
		/**
		 * The time at which this absence ends. Follows the format `HH:mm:ss` (e.g., `14:45:15`).
		 */
		end_time: string | null
		/**
		 * The amount of time this absence takes.
		 */
		amount: number | null
		/**
		 * The unit of time for this absence. Can be `HOURS` or `DAYS`.
		 */
		unit: 'HOURS' | 'DAYS'
		/**
		 * The absence’s current status. In rare cases where we can’t find a clear mapping, the original string is passed through.
		 */
		status: ('REQUESTED' | 'APPROVED' | 'DECLINED' | 'CANCELLED' | 'DELETED') | string | null
		/**
		 * A note the employee has added to this absence.
		 */
		employee_note: string | null
		/**
		 * The Kombo absence type ID of this absence.
		 */
		type_id: string | null
		/**
		 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
		 */
		changed_at: Date
		/**
		 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
		 */
		remote_deleted_at: Date | null
		/**
		 * Includes the data fetched from the remote system.
		 * Please be aware that including this in you scope config might violate other
		 * scopes that are set.
		 *
		 * Remote data always has the endpoint path that we got the data from as the
		 * top level key. For example, it could look like: `{ "/companies": { ... }}`
		 *
		 * This is not available on all plans. Reach out to Kombo if you need it.
		 */
		remote_data: {} | null
	}
}

export type DeleteHrisAbsencesAbsenceIdRequestBody = {
	/**
	 * Additional fields that we will pass through to specific HRIS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to ADP Workforce Now.
		 */
		adpworkforcenow?: {
			/**
			 * [Required] The employment ID of the employee that the absence will be deleted from.
			 */
			employment_id?: string
		}
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetHrisLegalEntitiesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetHrisLegalEntitiesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetHrisLegalEntitiesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetHrisLegalEntitiesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetHrisLegalEntitiesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The legal entity’s name.
			 */
			name: string | null
			/**
			 * The legal entity’s address.
			 */
			address: {
				city?: string | null
				/**
				 * Contains the ISO2 country code if possible. If not, it contains the original value.
				 */
				country?: string | null
				/**
				 * If we have address data, this is filled with the raw address string.
				 */
				raw?: string | null
				state?: string | null
				/**
				 * If we can parse the address data, this field contains the first part of the street information.
				 */
				street_1?: string | null
				street_2?: string | null
				zip_code?: string | null
			} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsApplicationsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsApplicationsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsApplicationsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsApplicationsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


/**
 * **(⚠️ Deprecated - Use the `outcomes` filter instead.)** Filter applications by outcome. This allows you to get applications that are for example `PENDING`, `HIRED`, or `DECLINED`.
 */
export type GetAtsApplicationsParameterOutcome = 'PENDING' | 'HIRED' | 'DECLINED'

/**
 * **(⚠️ Deprecated - Use the `outcomes` filter instead.)** Filter applications by outcome. This allows you to get applications that are for example `PENDING`, `HIRED`, or `DECLINED`.
 */
export const GetAtsApplicationsParameterOutcome = {
	PENDING: 'PENDING',
	HIRED: 'HIRED',
	DECLINED: 'DECLINED'
} as const

/**
 * Filter by a comma-separated list of `PENDING`, `HIRED`, `DECLINED`
 * * `PENDING`: The application is still being processed.
 * * `HIRED`: The candidate was hired.
 * * `DECLINED`: The candidate was declined.
 *
 *
 * Leave this blank to get results matching all values.
 */


/**
 * Filter by a comma-separated list of job IDs. We will only return applications that are related to _any_ of the jobs.
 */


/**
 * Filter by a comma-separated list of job remote IDs. We will only return applications that are related to _any_ of the jobs.
 */


/**
 * Filter applications by the day they were created in the remote system. This allows you to get applications that were created on or after a certain day.
 */
export type GetAtsApplicationsParameterRemoteCreatedAfter = Date

export type GetAtsApplicationsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * Parsed status of the application. If Kombo identifies that the application was accepted and the candidate hired, it will be `HIRED`. If the application was rejected or the candidate declined, it will be `DECLINED`. If the application is still in process, it will be `PENDING`.
			 * Kombo will always try to deliver this information as reliably as possible.
			 */
			outcome: 'PENDING' | 'HIRED' | 'DECLINED'
			/**
			 * Reason for the rejection of the candidate.
			 */
			rejection_reason_name: string | null
			/**
			 * ID of the current application stage
			 */
			current_stage_id: string | null
			/**
			 * The Kombo ID of the job which the candidate applied to. The ID can be used to retrieve the job from the `get jobs` endpoint.
			 */
			job_id: string | null
			/**
			 * The Kombo ID of the candidate who applied to the job. The ID can be used to retrieve the candidate from the `get candidates` endpoint.
			 */
			candidate_id: string | null
			screening_question_answers?: Array<
				| {
						answer: {
							content: string | null
						}
						question: {
							remote_id: string | null
							title: string
							type: 'TEXT'
						}
				  }
				| {
						answer: {
							choice: string | null
						}
						question: {
							remote_id: string | null
							title: string
							type: 'SINGLE_SELECT'
						}
				  }
				| {
						answer: {
							choices?: Array<string>
						}
						question: {
							remote_id: string | null
							title: string
							type: 'MULTI_SELECT'
						}
				  }
				| {
						answer: {
							checked: boolean | null
						}
						question: {
							remote_id: string | null
							title: string
							type: 'BOOLEAN'
						}
				  }
				| {
						answer: {
							number: number | null
						}
						question: {
							remote_id: string | null
							title: string
							type: 'NUMBER'
						}
				  }
				| {
						answer: {
							date: Date | null
						}
						question: {
							remote_id: string | null
							title: string
							type: 'DATE'
						}
				  }
				| {
						answer: {
							/**
							 * We pass the original question data along so you can handle it.
							 */
							raw?: unknown
						}
						question: {
							remote_id: string | null
							title: string
							/**
							 * When we're not able to map a specific question type yet, we will return this type. Every `UNKNOWN` question will also be parsed and unified by us at some point.
							 */
							type: 'UNKNOWN'
						}
				  }
			> | null
			/**
			 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
			 */
			custom_fields: {} | null
			/**
			 * An array of selected pass-through integration fields. [Read more](/integration-fields)
			 */
			integration_fields: Array<{
				/**
				 * The globally unique ID of this object.
				 */
				id: string
				/**
				 * The key of the field in the remote system.
				 */
				key: string
				/**
				 * - `DEFAULT`: static fields in the remote system.
				 * - `CUSTOM`: fields that are created/editable by the user.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The field's value.
				 */
				value?: unknown
				/**
				 * The label of the field. (not always available)
				 */
				label: string | null
			}>
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * The date and time the object was created in the remote system.
			 */
			remote_created_at: Date | null
			/**
			 * A timestamp retrieved from the remote system, describing when the resource was last updated.
			 */
			remote_updated_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			candidate: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
				/**
				 * First name of the candidate.
				 */
				first_name: string | null
				/**
				 * Last name of the candidate.
				 */
				last_name: string | null
				/**
				 * A list of email addresses of the candidate with an optional type. If an email address is invalid, it will be filtered out.
				 */
				email_addresses?: Array<{
					email_address?: string | null
					/**
					 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
					 */
					type: string | null
				}> | null
				/**
				 * The hiring source of the candidate. If you're a job board or recruiting service, you can use this to validate which candidates applied through your service and ensure that the correct referral compensation is paid out.
				 */
				source: string | null
				tags: Array<{
					/**
					 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
					 */
					id: string
					/**
					 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
					 */
					remote_id: string | null
					name: string | null
				}>
			} | null
			current_stage: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The application stage name. For example, "Initial Screening".
				 */
				name: string | null
				index: number | null
			} | null
			job: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
				/**
				 * Title of the job.
				 */
				name: string | null
			} | null
			interviews: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The title of the interview.
				 */
				title: string | null
				/**
				 * The start time of the interview.
				 */
				starting_at: Date | null
				/**
				 * The end time of the interview.
				 */
				ending_at: Date | null
				/**
				 * Location of the interview.
				 */
				location: {
					city?: string | null
					/**
					 * Contains the ISO2 country code if possible. If not, it contains the original value.
					 */
					country?: string | null
					/**
					 * If we have address data, this is filled with the raw address string.
					 */
					raw?: string | null
					state?: string | null
					/**
					 * If we can parse the address data, this field contains the first part of the street information.
					 */
					street_1?: string | null
					street_2?: string | null
					zip_code?: string | null
				} | null
			}>
			offers: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The offer’s current status. The usual flow of statuses is as follows:
				 * `DRAFT` -> `APPROVED` -> `SENT` -> `ACCEPTED` or `DECLINED`.
				 *
				 * Please note that not all systems will expose all statuses. For example, most systems do not include the `APPROVED` status
				 *
				 * - `ACCEPTED`: The offer was accepted by the candidate.
				 * - `DECLINED`: The offer was declined by the candidate.
				 * - `SENT`: The offer was sent to the candidate.
				 * - `APPROVED`: The draft was approved.
				 * - `DRAFT`: The offer is a draft and has not yet been sent to the candidate.
				 * - `ABANDONED`: The offer has expired or is no longer valid and should not be considered.
				 *
				 */
				status: 'ACCEPTED' | 'DECLINED' | 'SENT' | 'APPROVED' | 'DRAFT' | 'ABANDONED'
			}>
		}>
	}
}

/**
 * The Kombo ID of the application you want to move to a different stage.
 */


export type PutAtsApplicationsApplicationIdStageRequestBody = {
	/**
	 * The Kombo ID of the stage to move the application to. This stage must be allowed for the job that the application is connected to.
	 */
	stage_id: string
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the application you want to create the link for.
 */


export type PostAtsApplicationsApplicationIdResultLinksRequestBody = {
	/**
	 * If we can display a display name for the link, we will use this label.
	 */
	label: string
	/**
	 * URL of the link.
	 */
	url: string
	/**
	 * Additional details with attributes that will be added to the result. This can be percentages, scores, or any text.
	 *
	 * We generally recommend using short attribute keys and a short custom_field_name_prefix to avoid overflowing the ATS UI.
	 */
	details?: {
		/**
		 * That will be added to the attribute labels if they are used for custom fields. If you specify `Acme:` as the prefix, the custom field will be named `Acme: Score`. Putting in the name of your company/product is a good idea.
		 */
		custom_field_name_prefix: string
		attributes: Array<{
			/**
			 * The name of the attribute
			 */
			key: string
			/**
			 * The value of the attribute
			 */
			value: string
		}>
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to iCIMS.
		 */
		icims?: {
			/**
			 * The package ID of the assessment that the result link will be added to.
			 */
			assessment_package_id?: string
		}
	} & {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the application you want to create the note for.
 */


export type PostAtsApplicationsApplicationIdNotesRequestBody = {
	/**
	 * UTF-8 content of the note.
	 */
	content: string
	/**
	 * Content type of the note. Currently only `PLAIN_TEXT` is supported.
	 */
	content_type: 'PLAIN_TEXT'
	/**
	 * Tool specific remote fields for the note.
	 */
	remote_fields?: {
		/**
		 * Teamtailor specific remote fields for the note.
		 */
		teamtailor?: {
			/**
			 * ID of the user that created the note. Defaults to the first admin user found.
			 */
			user_id?: string
		}
		/**
		 * Greenhouse specific remote fields for the note.
		 */
		greenhouse?: {
			/**
			 * Visibility of the created note.
			 */
			visibility?: 'admin_only' | 'private' | 'public'
		}
		/**
		 * Recruitee specific remote fields for the note.
		 */
		recruitee?: {
			/**
			 * Visibility of the created note.
			 */
			visibility?: unknown
			/**
			 * Whether the note is in a stringified JSON format. If true, content should contain a valid JSON as per the [Recruitee API documentation](https://docs.recruitee.com/reference/candidatesidnotes) (body_json field). If false we add the note as a plain text.
			 */
			is_json?: boolean
		}
	} & {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the application you want to obtain attachments for.
 */


export type GetAtsApplicationsApplicationIdAttachmentsSuccessfulResponse = {
	status: 'success'
	data: {
		results: Array<{
			type: 'CV' | 'COVER_LETTER' | 'OTHER'
			id: string
			remote_id: string
			data_url: string
			file_name: string
			content_type: string
			/**
			 * The date when the attachment was created.
			 */
			remote_created_at: Date | null
			/**
			 * The date when the attachment was last updated.
			 */
			remote_updated_at: Date | null
		}>
	}
}



export type PostAtsApplicationsApplicationIdAttachmentsRequestBody = {
	attachment: {
		/**
		 * Name of the file you want to upload.
		 */
		name: string
		/**
		 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
		 */
		content_type?: string
		/**
		 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
		 */
		data?: string
		/**
		 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
		 */
		data_url?: string
	} & {
		type: 'CV' | 'COVER_LETTER' | 'OTHER'
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the application you want to reject.
 */


export type PostAtsApplicationsApplicationIdRejectRequestBody = {
	/**
	 * The Kombo ID of the rejection reason.
	 */
	rejection_reason_id: string
	/**
	 * A optional free text rejection note. Passed through if possible.
	 */
	note?: string
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Additional data fields that we will pass through to the `rejection_email` field of Greenhouse's [reject application](https://developers.greenhouse.io/harvest.html#post-reject-application) endpoint.
			 */
			rejection_email?: {}
		}
	} & {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsCandidatesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsCandidatesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsCandidatesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsCandidatesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


/**
 * Filter the candidates based on an email address. When set, returns only the candidates where the given `email` is in `email_addresses`. This filter is case-insensitive.
 */


/**
 * Filter by a comma-separated list of job IDs. We will only return candidates that have applied to _any_ of the jobs.
 */


export type GetAtsCandidatesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * First name of the candidate.
			 */
			first_name: string | null
			/**
			 * Last name of the candidate.
			 */
			last_name: string | null
			/**
			 * The current company of the candidate.
			 */
			company: string | null
			/**
			 * The current job title of the candidate.
			 */
			title: string | null
			/**
			 * Whether the candidate’s profile is confidential in the ATS.
			 */
			confidential: boolean | null
			/**
			 * The hiring source of the candidate. If you're a job board or recruiting service, you can use this to validate which candidates applied through your service and ensure that the correct referral compensation is paid out.
			 */
			source: string | null
			/**
			 * A list of phone numbers of the candidate.
			 */
			phone_numbers?: Array<{
				phone_number: string
				/**
				 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
				 */
				type?: string | null
			}> | null
			/**
			 * A list of email addresses of the candidate with an optional type. If an email address is invalid, it will be filtered out.
			 */
			email_addresses?: Array<{
				email_address?: string | null
				/**
				 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
				 */
				type: string | null
			}> | null
			/**
			 * List of social media accounts of the candidate.
			 */
			social_media?: Array<{
				link?: string | null
				type?: string | null
				username?: string | null
			}> | null
			/**
			 * Location of the candidate.
			 */
			location?: {
				city?: string | null
				/**
				 * Contains the ISO2 country code if possible. If not, it contains the original value.
				 */
				country?: string | null
				/**
				 * If we have address data, this is filled with the raw address string.
				 */
				raw?: string | null
				state?: string | null
				/**
				 * If we can parse the address data, this field contains the first part of the street information.
				 */
				street_1?: string | null
				street_2?: string | null
				zip_code?: string | null
			} | null
			/**
			 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
			 */
			custom_fields: {} | null
			/**
			 * An array of selected pass-through integration fields. [Read more](/integration-fields)
			 */
			integration_fields: Array<{
				/**
				 * The globally unique ID of this object.
				 */
				id: string
				/**
				 * The key of the field in the remote system.
				 */
				key: string
				/**
				 * - `DEFAULT`: static fields in the remote system.
				 * - `CUSTOM`: fields that are created/editable by the user.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The field's value.
				 */
				value?: unknown
				/**
				 * The label of the field. (not always available)
				 */
				label: string | null
			}>
			/**
			 * The date and time the object was created in the remote system.
			 */
			remote_created_at: Date | null
			/**
			 * A timestamp retrieved from the remote system, describing when the resource was last updated.
			 */
			remote_updated_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			applications: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * Parsed status of the application. If Kombo identifies that the application was accepted and the candidate hired, it will be `HIRED`. If the application was rejected or the candidate declined, it will be `DECLINED`. If the application is still in process, it will be `PENDING`.
				 * Kombo will always try to deliver this information as reliably as possible.
				 */
				outcome: 'PENDING' | 'HIRED' | 'DECLINED'
				/**
				 * Reason for the rejection of the candidate.
				 */
				rejection_reason_name: string | null
				current_stage: {
					/**
					 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
					 */
					id: string
					/**
					 * The application stage name. For example, "Initial Screening".
					 */
					name: string | null
					/**
					 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
					 */
					remote_id: string | null
					index: number | null
				} | null
				job: {
					/**
					 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
					 */
					id: string
					/**
					 * Title of the job.
					 */
					name: string | null
					/**
					 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
					 */
					remote_id: string
				} | null
			}>
			tags: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				name: string | null
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
			}>
		}>
	}
}

export type PostAtsCandidatesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
		 */
		id: string
		/**
		 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
		 */
		remote_id: string
		/**
		 * First name of the candidate.
		 */
		first_name: string | null
		/**
		 * Last name of the candidate.
		 */
		last_name: string | null
		/**
		 * The current company of the candidate.
		 */
		company: string | null
		/**
		 * The current job title of the candidate.
		 */
		title: string | null
		/**
		 * Whether the candidate’s profile is confidential in the ATS.
		 */
		confidential: boolean | null
		/**
		 * The hiring source of the candidate. If you're a job board or recruiting service, you can use this to validate which candidates applied through your service and ensure that the correct referral compensation is paid out.
		 */
		source: string | null
		/**
		 * A list of phone numbers of the candidate.
		 */
		phone_numbers?: Array<{
			phone_number: string
			/**
			 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
			 */
			type?: string | null
		}> | null
		/**
		 * A list of email addresses of the candidate with an optional type. If an email address is invalid, it will be filtered out.
		 */
		email_addresses?: Array<{
			email_address?: string | null
			/**
			 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
			 */
			type: string | null
		}> | null
		/**
		 * List of social media accounts of the candidate.
		 */
		social_media?: Array<{
			link?: string | null
			type?: string | null
			username?: string | null
		}> | null
		/**
		 * Location of the candidate.
		 */
		location?: {
			city?: string | null
			/**
			 * Contains the ISO2 country code if possible. If not, it contains the original value.
			 */
			country?: string | null
			/**
			 * If we have address data, this is filled with the raw address string.
			 */
			raw?: string | null
			state?: string | null
			/**
			 * If we can parse the address data, this field contains the first part of the street information.
			 */
			street_1?: string | null
			street_2?: string | null
			zip_code?: string | null
		} | null
		/**
		 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
		 */
		custom_fields: {} | null
		/**
		 * An array of selected pass-through integration fields. [Read more](/integration-fields)
		 */
		integration_fields: Array<{
			/**
			 * The globally unique ID of this object.
			 */
			id: string
			/**
			 * The key of the field in the remote system.
			 */
			key: string
			/**
			 * - `DEFAULT`: static fields in the remote system.
			 * - `CUSTOM`: fields that are created/editable by the user.
			 */
			type: 'DEFAULT' | 'CUSTOM'
			/**
			 * The field's value.
			 */
			value?: unknown
			/**
			 * The label of the field. (not always available)
			 */
			label: string | null
		}>
		/**
		 * The date and time the object was created in the remote system.
		 */
		remote_created_at: Date | null
		/**
		 * A timestamp retrieved from the remote system, describing when the resource was last updated.
		 */
		remote_updated_at: Date | null
		/**
		 * Includes the data fetched from the remote system.
		 * Please be aware that including this in you scope config might violate other
		 * scopes that are set.
		 *
		 * Remote data always has the endpoint path that we got the data from as the
		 * top level key. For example, it could look like: `{ "/companies": { ... }}`
		 *
		 * This is not available on all plans. Reach out to Kombo if you need it.
		 */
		remote_data: {} | null
		/**
		 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
		 */
		changed_at: Date
		/**
		 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
		 */
		remote_deleted_at: Date | null
		applications: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * Parsed status of the application. If Kombo identifies that the application was accepted and the candidate hired, it will be `HIRED`. If the application was rejected or the candidate declined, it will be `DECLINED`. If the application is still in process, it will be `PENDING`.
			 * Kombo will always try to deliver this information as reliably as possible.
			 */
			outcome: 'PENDING' | 'HIRED' | 'DECLINED'
			/**
			 * Reason for the rejection of the candidate.
			 */
			rejection_reason_name: string | null
			current_stage: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The application stage name. For example, "Initial Screening".
				 */
				name: string | null
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				index: number | null
			} | null
			job: {
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * Title of the job.
				 */
				name: string | null
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string
			} | null
		}>
		tags: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			name: string | null
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
		}>
	}
	warnings: Array<{
		message: string
	}>
}

export type PostAtsCandidatesRequestBody = {
	candidate: {
		/**
		 * The first name of the candidate.
		 */
		first_name: string
		/**
		 * The last name of the candidate.
		 */
		last_name: string
		/**
		 * The primary email address this application will be created with.
		 */
		email_address: string
		/**
		 * The company where the candidate is currently working.
		 */
		company?: string
		/**
		 * The current job title of the candidate.
		 */
		title?: string
		/**
		 * The phone number of the candidate.
		 */
		phone_number?: string
		/**
		 * The location of the candidate.
		 */
		location?: {
			city?: string
			/**
			 * The uppercase two-letter ISO country (e.g., `DE`). For systems that use codes in formats other than `ISO 3166-1 alpha-2`, Kombo transforms the ISO Codes to the appropriate value.
			 */
			country: string
			zip_code?: string
		}
		/**
		 * The gender of the candidate. Must be one of `MALE`, `FEMALE`, or `OTHER`.
		 */
		gender?: 'MALE' | 'FEMALE' | 'OTHER'
		/**
		 * The date the candidate is available to start working.
		 */
		availability_date?: Date
		/**
		 * The salary expectations of the applicant. We will automatically convert the amount to a format that is suitable for the ATS you are using. For example, if you are using monthly salary expectations, we will convert the amount to a yearly salary if the ATS expects yearly salary expectations.
		 */
		salary_expectations?: {
			/**
			 * The period of the salary expectations. Must be one of `MONTH` or `YEAR`.
			 */
			period: 'MONTH' | 'YEAR'
			/**
			 * The amount of the salary expectations.
			 */
			amount: number
		}
		/**
		 * A list of social media links of the candidate. The links must be valid URLs.
		 */
		social_links?: Array<{
			url: string
		}>
	}
	/**
	 * Currently, every candidate has one application. If you are interested in talent pools, please contact Kombo.
	 */
	application: {
		/**
		 * The Kombo ID or Remote ID of the Job this candidate should apply to. If you want to use the ID of the integrated system (remote_id) you need to prefix the ID with "remote:". You can use the remote ID if you do not want to sync jobs.
		 */
		job_id: string
		/**
		 * Stage this candidate should be in. If left out, the default stage for this job will be used.
		 */
		stage_id?: string
	}
	/**
	 * Array of answers to screening questions. Currently, not all question types are supported and unsupported ones will not be submitted.
	 *
	 * The available questions a job can be retrieved from the get jobs endpoint. The answers will be validated based on the format of the the questions. Make sure to follow this schema to avoid errors.
	 */
	screening_question_answers?: Array<{
		/**
		 * ID of the question returned by the Kombo API. We'll report a warning in the logs if the question can't be found on the job.
		 */
		question_id: string
		/**
		 * Answer to a question. This will be validated based on the question format and throw an error if the answer is invalid. Here is a description of each question type and the required answer format:
		 *
		 * `TEXT` - Simply provide a "string" answer.
		 *
		 * `SINGLE_SELECT` - Provide the ID of the answer as a string.
		 *
		 * `MULTI_SELECT` - Provide a string array containing the question IDs of the selected options.
		 *
		 * `BOOLEAN` - Either `true` or `false`.
		 *
		 * `NUMBER` - A number.
		 *
		 * `DATE` - Provide the answer as an ISO 8601 date string.
		 *
		 * `FILE` - Please select Option 6 in the dropdown above to see the required format.
		 */
		answer:
			| string
			| boolean
			| number
			| Array<string>
			| {
					/**
					 * Name of the file you want to upload.
					 */
					name: string
					/**
					 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
					 */
					content_type?: string
					/**
					 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
					 */
					data?: string
					/**
					 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
					 */
					data_url?: string
			  }
	}>
	/**
	 * An array of the attachments you would like upload.
	 */
	attachments?: Array<
		{
			/**
			 * Name of the file you want to upload.
			 */
			name: string
			/**
			 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
			 */
			content_type?: string
			/**
			 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
			 */
			data?: string
			/**
			 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
			 */
			data_url?: string
		} & {
			type: 'CV' | 'COVER_LETTER' | 'OTHER'
		}
	>
	/**
	 * **(⚠️ Deprecated - Use [automatic source writing](/ats/features/application-attribution#automatic-attribution) instead)** Optional source information that will be attached to the candidate. If
	 * you're a job board or recruiting service, you can use this to make sure your
	 * customers can see which candidates came from you.
	 *
	 * This is deprecated because writing sources requires users to do some setup in most ATSs.
	 */
	source?: {
		/**
		 * Name of the source (e.g., `"Example Job Board"`).
		 */
		name?: string
	}
	/**
	 * Optional GDPR consent information required in some jurisdictions (like the Czech Republic or Slovakia).
	 */
	gdpr_consent?: {
		/**
		 * Until when the candidate has granted the company they're applying to permission to process their personal data.
		 */
		expires_at?: Date
		/**
		 * Whether the candidate has given consent.
		 */
		given?: boolean
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to SAP SuccessFactors.
		 */
		successfactors?: {
			/**
			 * Fields that we will pass through to SuccessFactor's `Candidate` object.
			 */
			Candidate?: {}
			/**
			 * Fields that we will pass through to SuccessFactor's `JobApplication` object.
			 */
			JobApplication?: {}
			/**
			 * If set to true, we will copy custom attachments from the JobApplication to the Candidate.
			 */
			copyJobApplicationAttachments?: boolean
			/**
			 * When the candidate already exists, whether to update the Candidate with the remote fields found under the Candidate entity.
			 */
			update_existing_candidate?: boolean
		}
		/**
		 * Fields specific to TalentSoft.
		 */
		talentsoft?: {
			/**
			 * Fields that we will pass through to TalentSoft's `applicant` object.
			 */
			applicant?: {}
			/**
			 * Fields that we will pass through to TalentSoft's `application` object.
			 */
			application?: {}
		}
		teamtailor?: {
			/**
			 * Fields that we will pass through to Teamtailor's `Candidate` object.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Fields that we will pass through to Greenhouse's `Candidate` object.
			 */
			candidate?: {}
			/**
			 * Fields that we will pass through to Greenhouse's `Application` object.
			 */
			application?: {}
		}
		/**
		 * Fields specific to Lever.
		 */
		lever?: {
			/**
			 * Fields that we will pass through to Lever's `Candidate` object. Note: make sure to submit the keys and values in the correct form data format.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to Workable.
		 */
		workable?: {
			/**
			 * Fields that we will pass through to Workable's `Candidate` object.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to Workday. The remote fields schema follows the documentation at https://community.workday.com/sites/default/files/file-hosting/productionapi/Recruiting/v43.0/Put_Candidate.html. Only defined fields are supported, if you need additional field support please reach out to Kombo support.
		 */
		workday?: {
			Candidate_Data?: {
				Job_Application_Data?: {
					Job_Applied_To_Data?: {
						Global_Personal_Information_Data?: {
							Date_of_Birth?: string
						}
					}
					Resume_Data?: {
						Language_Data?: Array<{
							Language_Reference?: {
								WID?: string
							}
							Language?: {
								Language_Ability: Array<{
									Language_Ability_Data?: {
										Language_Ability_Type_Reference?: {
											WID: string
										}
									}
								}>
							}
						}>
					}
				}
			}
		}
		/**
		 * Fields specific to Bullhorn.
		 */
		bullhorn?: {
			/**
			 * Fields that we will pass through to Bullhorn's `Candidate` object.
			 */
			candidate?: {}
			/**
			 * Fields that we will pass through to Bullhorn's `JobSubmission` object.
			 */
			job_submission?: {}
		}
		/**
		 * Fields specific to SmartRecruiters.
		 */
		smartrecruiters?: {
			/**
			 * Fields that we will pass through to the SmartRecruiters's `Candidate` object when created with screening question answers. This API is used: https://developers.smartrecruiters.com/reference/createcandidate-1
			 */
			candidate_with_questions?: {}
			/**
			 * Fields that we will pass through to the SmartRecruiters's `Candidate` object when created with screening question answers. This API is used: https://developers.smartrecruiters.com/reference/candidatesaddtojob-1
			 */
			candidate_without_questions?: {}
		}
		/**
		 * Fields specific to Talentadore.
		 */
		talentadore?: {
			/**
			 * Fields that we will pass through to the Talentadore's when creating applications.
			 */
			applications?: {}
		}
		/**
		 * Fields specific to GuideCom.
		 */
		guidecom?: {
			/**
			 * Fields that we will pass through to GuideCom's `Candidate` object.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to d.vinci.
		 */
		dvinci?: {
			/**
			 * Fields that we will pass through to d.vinci's application object. This API is used: https://static.dvinci-easy.com/files/d.vinci%20application-apply-api.html#jobs__id__applyApi_post
			 */
			application?: {}
		}
	} & {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the candidate you want to obtain attachments for.
 */
export type GetAtsCandidatesCandidateIdAttachmentsSuccessfulResponse = {
	status: 'success'
	data: {
		results: Array<{
			id: string
			/**
			 * The Kombo ID of the application this attachment belongs to. When this is null, the attachment is not specific to any application but the candidate.
			 */
			application_id: string | null
			/**
			 * The Kombo ID of the candidate this attachment belongs to.
			 */
			candidate_id: string
			type: 'CV' | 'COVER_LETTER' | 'OTHER'
			remote_id: string
			data_url: string
			file_name: string
			/**
			 * The MIME type of the attachment.
			 */
			content_type: string
			/**
			 * The date when the attachment was created.
			 */
			remote_created_at: Date | null
			/**
			 * The date when the attachment was last updated.
			 */
			remote_updated_at: Date | null
		}>
	}
}

/**
 * The Kombo ID of the candidate you want to add the attachment to.
 */


export type PostAtsCandidatesCandidateIdAttachmentsRequestBody = {
	attachment: {
		/**
		 * Name of the file you want to upload.
		 */
		name: string
		/**
		 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
		 */
		content_type?: string
		/**
		 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
		 */
		data?: string
		/**
		 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
		 */
		data_url?: string
	} & {
		type: 'CV' | 'COVER_LETTER' | 'OTHER'
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the candidate you want to add the result link to.
 */


export type PostAtsCandidatesCandidateIdResultLinksRequestBody = {
	/**
	 * If the system allows us to display a display name for the link, we will use this label.
	 */
	label: string
	/**
	 * URL of the link.
	 */
	url: string
	/**
	 * Additional details with attributes that will be added to the result. This can be percentages, scores, or any text.
	 *
	 * We generally recommend using short attribute keys and a short custom_field_name_prefix to avoid overflowing the ATS UI.
	 */
	details?: {
		/**
		 * That will be added to the attribute labels if they are used for custom fields. If you specify `Acme:` as the prefix, the custom field will be named `Acme: Score`. Putting in the name of your company/product is a good idea.
		 */
		custom_field_name_prefix: string
		attributes: Array<{
			/**
			 * The name of the attribute
			 */
			key: string
			/**
			 * The value of the attribute
			 */
			value: string
		}>
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to iCIMS.
		 */
		icims?: {
			/**
			 * The package ID of the assessment that the result link will be added to.
			 */
			assessment_package_id?: string
		}
	} & {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the candidate you want to add the tag to.
 */


export type PostAtsCandidatesCandidateIdTagsRequestBody = {
	tag: {
		/**
		 * The name of the tag you would like to add. We will automatically find the matching ID of the tag in the system.
		 */
		name: string
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the candidate you want to remove the tag from.
 */


export type DeleteAtsCandidatesCandidateIdTagsRequestBody = {
	tag: {
		/**
		 * The name of the tag you would like to remove.
		 */
		name: string
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
}

/**
 * The Kombo ID of the Candidate you want to update.
 */


/**
 * The Kombo ID of the integration field you want to update.
 */


export type PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdRequestBody = {
	value: string | number | null
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsTagsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsTagsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsTagsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsTagsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetAtsTagsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			name: string | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsApplicationStagesParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsApplicationStagesParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsApplicationStagesParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsApplicationStagesParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetAtsApplicationStagesSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The application stage name. For example, "Initial Screening".
			 */
			name: string | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsJobsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsJobsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsJobsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsJobsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


/**
 * Filter by a comma-separated list of job codes.
 */


/**
 * Filter by the `post_url` field. Can be used to find a job based on its public posting URL.
 */


/**
 * **(⚠️ Deprecated - Use the `statuses` filter instead.)** Filter by the `status` field. Can be used to find a job based on its status.
 */
export type GetAtsJobsParameterStatus = 'OPEN' | 'CLOSED' | 'DRAFT' | 'ARCHIVED'

/**
 * **(⚠️ Deprecated - Use the `statuses` filter instead.)** Filter by the `status` field. Can be used to find a job based on its status.
 */
export const GetAtsJobsParameterStatus = {
	OPEN: 'OPEN',
	CLOSED: 'CLOSED',
	DRAFT: 'DRAFT',
	ARCHIVED: 'ARCHIVED'
} as const

/**
 * Filter by a comma-separated list of `OPEN`, `CLOSED`, `DRAFT`, `ARCHIVED`
 *
 * Leave this blank to get results matching all values.
 */


/**
 * Filter by a comma-separated list of `FULL_TIME`, `PART_TIME`, `CONTRACT`, `SEASONAL`, `INTERNSHIP`
 *
 * Leave this blank to get results matching all values.
 */


/**
 * Filter by a comma-separated list of `PUBLIC`, `INTERNAL`, `UNLISTED`, `CONFIDENTIAL`
 *
 * Leave this blank to get results matching all values.
 */


/**
 * Filter jobs by the day they were created in the remote system. This allows you to get jobs that were created on or after a certain day.
 */
export type GetAtsJobsParameterRemoteCreatedAfter = Date

/**
 * Filter by the `name` field. Can be used to find a job by keywords present in the job name.
 */


export type GetAtsJobsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * Title of the job.
			 */
			name: string | null
			/**
			 * The human readable job code. Some systems expose this as the Requisition Code/ID.
			 */
			job_code: string | null
			/**
			 * Description of the job. This field is usually returned as HTML.
			 */
			description: string | null
			/**
			 * **(⚠️ Deprecated)** It makes more sense to store the visibility of a job in an enum. Therefore, we introduced the `visibility` enum on jobs.
			 */
			confidential: boolean | null
			/**
			 * The number of hours per week an employee is expected to work.
			 */
			weekly_hours: number | null
			/**
			 * The type of employment contract. In rare cases where can't find a clear mapping, the original string is passed through.
			 */
			employment_type?: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'SEASONAL' | 'INTERNSHIP') | string | null
			/**
			 * The job’s current status. In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			status?: ('OPEN' | 'CLOSED' | 'DRAFT' | 'ARCHIVED') | string | null
			/**
			 * Describes the visibility of the job:
			 *
			 * - `PUBLIC`: visible to everyone, published on a job board
			 * - `INTERNAL`: only visible to employees of the company itself
			 * - `UNLISTED`: anyone can apply but only if they have the link to it
			 * - `CONFIDENTIAL`: nobody can apply and it's only visible in the ATS to people who were invited to it
			 *
			 * In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			visibility?: ('PUBLIC' | 'INTERNAL' | 'UNLISTED' | 'CONFIDENTIAL') | string | null
			/**
			 * The category of the job (often the job industry).
			 */
			category: string | null
			department: string | null
			/**
			 * The public job posting URL of the ATS itself. This can be used by external job boards to redirect applicants.
			 */
			post_url: string | null
			experience_level: string | null
			/**
			 * Defines if the job supports remote work and if so, to what extent.
			 */
			remote_work_status?: ('REMOTE' | 'HYBRID' | 'TEMPORARY' | 'ON_SITE') | string | null
			/**
			 * The salary amount in the given currency.
			 */
			salary_amount: number | null
			/**
			 * The lower bound of the salary range.
			 */
			salary_amount_from: number | null
			/**
			 * The upper bound of the salary range.
			 */
			salary_amount_to: number | null
			/**
			 * Salary currency usually returned in [ISO 4217 currency codes](https://www.iso.org/iso-4217-currency-codes.html).
			 */
			salary_currency: string | null
			/**
			 * The period of time over which the salary amount is paid (not equal to the pay frequency). In rare cases where we can’t find a clear mapping, the original string is passed through.
			 */
			salary_period?: ('YEAR' | 'MONTH' | 'TWO_WEEKS' | 'WEEK' | 'DAY' | 'HOUR') | string | null
			/**
			 * The location of the listed job.
			 */
			location?: {
				city?: string | null
				/**
				 * Contains the ISO2 country code if possible. If not, it contains the original value.
				 */
				country?: string | null
				/**
				 * If we have address data, this is filled with the raw address string.
				 */
				raw?: string | null
				state?: string | null
				/**
				 * If we can parse the address data, this field contains the first part of the street information.
				 */
				street_1?: string | null
				street_2?: string | null
				zip_code?: string | null
			} | null
			/**
			 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
			 */
			custom_fields: {} | null
			/**
			 * An array of selected pass-through integration fields. [Read more](/integration-fields)
			 */
			integration_fields: Array<{
				/**
				 * The globally unique ID of this object.
				 */
				id: string
				/**
				 * The key of the field in the remote system.
				 */
				key: string
				/**
				 * - `DEFAULT`: static fields in the remote system.
				 * - `CUSTOM`: fields that are created/editable by the user.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The field's value.
				 */
				value?: unknown
				/**
				 * The label of the field. (not always available)
				 */
				label: string | null
			}>
			/**
			 * YYYY-MM-DDTHH:mm:ss.sssZ
			 */
			opened_at: Date | null
			/**
			 * YYYY-MM-DDTHH:mm:ss.sssZ
			 */
			closed_at: Date | null
			/**
			 * The date and time the object was created in the remote system.
			 */
			remote_created_at: Date | null
			/**
			 * A timestamp retrieved from the remote system, describing when the resource was last updated.
			 */
			remote_updated_at: Date | null
			/**
			 * **(⚠️ Deprecated)** The user ID of the contact person for this job. We strongly recommend using the new `hiring_team` property instead as it provides more complete and accurate information about the ATS users connected to a job.
			 */
			contact_id: string | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Application stages a candidate can be in for this particular job.
			 */
			stages: Array<
				{
					/**
					 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
					 */
					id: string
					/**
					 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
					 */
					remote_id: string | null
					/**
					 * The application stage name. For example, "Initial Screening".
					 */
					name: string | null
				} & {
					/**
					 * Numeric index following the order of the stages if they are ordered in the underlying tool.
					 */
					index: number | null
				}
			>
			screening_questions: Array<
				{
					/**
					 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
					 */
					id: string
					/**
					 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
					 */
					remote_id: string | null
					title: string | null
					description: string | null
					format:
						| {
								/**
								 * If unavailable, we recommend displaying a single-line input.
								 */
								display_type?: 'SINGLE_LINE' | 'MULTI_LINE' | 'EMAIL' | 'URL'
								max_length?: number | null
								type: 'TEXT'
						  }
						| {
								display_type?: 'SLIDER' | 'FIELD'
								max?: number | null
								min?: number | null
								type: 'NUMBER'
						  }
						| {
								type: 'FILE'
						  }
						| {
								display_type?: 'DROPDOWN' | 'RADIO'
								options: Array<{
									/**
									 * The Kombo ID of this question option. Use this ID to specify the answer to this question.
									 */
									id: string
									/**
									 * ID in the connected ATS. This might be null as some systems only use the name to identify the option.
									 */
									remote_id?: string | null
									/**
									 * Content of the question option.
									 */
									name: string
								}>
								type: 'SINGLE_SELECT'
						  }
						| {
								type: 'BOOLEAN'
						  }
						| {
								type: 'DATE'
						  }
						| {
								options: Array<{
									/**
									 * The Kombo ID of this question option. Use this ID to specify the answer to this question.
									 */
									id: string
									/**
									 * ID in the connected ATS. This might be null as some systems only use the name to identify the option.
									 */
									remote_id?: string | null
									/**
									 * Content of the question option.
									 */
									name: string
								}>
								type: 'MULTI_SELECT'
						  }
						| {
								/**
								 * This is just a text block.
								 */
								type: 'INFORMATION'
						  }
						| {
								/**
								 * We pass the original question data along so you can handle it.
								 */
								raw_question?: unknown
								/**
								 * When we're not able to map a specific question type yet, we will return this type. Every `UNKNOWN` question will also be parsed and unified by us at some point.
								 */
								type: 'UNKNOWN'
						  }
						| null
				} & {
					index: number | null
					required: boolean | null
					/**
					 * The Kombo ID of another screening question. Only display this question if the specified "precondition question" is answered with one of the values in `precondition_options`.
					 */
					precondition_question_id: string | null
					/**
					 * Where the screening question specified by `precondition_question_id` is of type `MULTI_SELECT` or `SINGLE_SELECT`, this is an array of Kombo IDs describing the valid options. If the question is of type `BOOLEAN`, this is an array containing either `true` or `false`.
					 */
					precondition_options: Array<string> | Array<boolean> | null
				}
			>
			job_postings: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * The job posting’s title.
				 */
				title: string | null
				/**
				 * The job posting’s description in HTML format.
				 */
				description_html: string | null
				/**
				 * The job posting’s current status.
				 */
				status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
				visibility: 'PUBLIC' | 'INTERNAL' | 'UNLISTED'
				/**
				 * The public URL to the job posting on the ATS platform.
				 */
				url: string | null
				/**
				 * Includes the data fetched from the remote system.
				 * Please be aware that including this in you scope config might violate other
				 * scopes that are set.
				 *
				 * Remote data always has the endpoint path that we got the data from as the
				 * top level key. For example, it could look like: `{ "/companies": { ... }}`
				 *
				 * This is not available on all plans. Reach out to Kombo if you need it.
				 */
				remote_data: {} | null
			}>
			/**
			 * The hiring team allows you to sync users into your system who can access the job and its applications.
			 */
			hiring_team: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
				/**
				 * First name of the user.
				 */
				first_name: string | null
				/**
				 * Last name of the user.
				 */
				last_name: string | null
				/**
				 * Email of the user. If the email address is invalid, it will be set to null.
				 */
				email?: string | null
				/**
				 * Array of the roles of the user for this specific job. Currently only `RECRUITER` and `HIRING_MANAGER` are mapped into our unified schema.
				 */
				hiring_team_roles: Array<'RECRUITER' | 'HIRING_MANAGER'>
			}>
		}>
	}
}

/**
 * The Kombo ID or Remote ID of the Job this candidate should apply for. If you want to use the ID of the integrated system (remote_id) you need to prefix the id with "remote:". You can use the remote ID if you do not want to sync jobs.
 */


export type PostAtsJobsJobIdApplicationsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
		 */
		id: string
		/**
		 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
		 */
		remote_id: string | null
		/**
		 * Parsed status of the application. If Kombo identifies that the application was accepted and the candidate hired, it will be `HIRED`. If the application was rejected or the candidate declined, it will be `DECLINED`. If the application is still in process, it will be `PENDING`.
		 * Kombo will always try to deliver this information as reliably as possible.
		 */
		outcome: 'PENDING' | 'HIRED' | 'DECLINED'
		/**
		 * Reason for the rejection of the candidate.
		 */
		rejection_reason_name: string | null
		/**
		 * ID of the current application stage
		 */
		current_stage_id: string | null
		/**
		 * The Kombo ID of the job which the candidate applied to. The ID can be used to retrieve the job from the `get jobs` endpoint.
		 */
		job_id: string | null
		/**
		 * The Kombo ID of the candidate who applied to the job. The ID can be used to retrieve the candidate from the `get candidates` endpoint.
		 */
		candidate_id: string | null
		screening_question_answers?: Array<
			| {
					answer: {
						content: string | null
					}
					question: {
						remote_id: string | null
						title: string
						type: 'TEXT'
					}
			  }
			| {
					answer: {
						choice: string | null
					}
					question: {
						remote_id: string | null
						title: string
						type: 'SINGLE_SELECT'
					}
			  }
			| {
					answer: {
						choices?: Array<string>
					}
					question: {
						remote_id: string | null
						title: string
						type: 'MULTI_SELECT'
					}
			  }
			| {
					answer: {
						checked: boolean | null
					}
					question: {
						remote_id: string | null
						title: string
						type: 'BOOLEAN'
					}
			  }
			| {
					answer: {
						number: number | null
					}
					question: {
						remote_id: string | null
						title: string
						type: 'NUMBER'
					}
			  }
			| {
					answer: {
						date: Date | null
					}
					question: {
						remote_id: string | null
						title: string
						type: 'DATE'
					}
			  }
			| {
					answer: {
						/**
						 * We pass the original question data along so you can handle it.
						 */
						raw?: unknown
					}
					question: {
						remote_id: string | null
						title: string
						/**
						 * When we're not able to map a specific question type yet, we will return this type. Every `UNKNOWN` question will also be parsed and unified by us at some point.
						 */
						type: 'UNKNOWN'
					}
			  }
		> | null
		/**
		 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
		 */
		custom_fields: {} | null
		/**
		 * An array of selected pass-through integration fields. [Read more](/integration-fields)
		 */
		integration_fields: Array<{
			/**
			 * The globally unique ID of this object.
			 */
			id: string
			/**
			 * The key of the field in the remote system.
			 */
			key: string
			/**
			 * - `DEFAULT`: static fields in the remote system.
			 * - `CUSTOM`: fields that are created/editable by the user.
			 */
			type: 'DEFAULT' | 'CUSTOM'
			/**
			 * The field's value.
			 */
			value?: unknown
			/**
			 * The label of the field. (not always available)
			 */
			label: string | null
		}>
		/**
		 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
		 */
		changed_at: Date
		/**
		 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
		 */
		remote_deleted_at: Date | null
		/**
		 * The date and time the object was created in the remote system.
		 */
		remote_created_at: Date | null
		/**
		 * A timestamp retrieved from the remote system, describing when the resource was last updated.
		 */
		remote_updated_at: Date | null
		/**
		 * Includes the data fetched from the remote system.
		 * Please be aware that including this in you scope config might violate other
		 * scopes that are set.
		 *
		 * Remote data always has the endpoint path that we got the data from as the
		 * top level key. For example, it could look like: `{ "/companies": { ... }}`
		 *
		 * This is not available on all plans. Reach out to Kombo if you need it.
		 */
		remote_data: {} | null
		current_stage: {
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The application stage name. For example, "Initial Screening".
			 */
			name: string | null
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			index: number | null
		} | null
		job: {
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * Title of the job.
			 */
			name: string | null
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
		} | null
		candidate: {
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * First name of the candidate.
			 */
			first_name: string | null
			/**
			 * Last name of the candidate.
			 */
			last_name: string | null
			/**
			 * The current company of the candidate.
			 */
			company: string | null
			/**
			 * The current job title of the candidate.
			 */
			title: string | null
			/**
			 * Whether the candidate’s profile is confidential in the ATS.
			 */
			confidential: boolean | null
			/**
			 * The hiring source of the candidate. If you're a job board or recruiting service, you can use this to validate which candidates applied through your service and ensure that the correct referral compensation is paid out.
			 */
			source: string | null
			/**
			 * A list of phone numbers of the candidate.
			 */
			phone_numbers?: Array<{
				phone_number: string
				/**
				 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
				 */
				type?: string | null
			}> | null
			/**
			 * A list of email addresses of the candidate with an optional type. If an email address is invalid, it will be filtered out.
			 */
			email_addresses?: Array<{
				email_address?: string | null
				/**
				 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
				 */
				type: string | null
			}> | null
			/**
			 * List of social media accounts of the candidate.
			 */
			social_media?: Array<{
				link?: string | null
				type?: string | null
				username?: string | null
			}> | null
			/**
			 * Location of the candidate.
			 */
			location?: {
				city?: string | null
				/**
				 * Contains the ISO2 country code if possible. If not, it contains the original value.
				 */
				country?: string | null
				/**
				 * If we have address data, this is filled with the raw address string.
				 */
				raw?: string | null
				state?: string | null
				/**
				 * If we can parse the address data, this field contains the first part of the street information.
				 */
				street_1?: string | null
				street_2?: string | null
				zip_code?: string | null
			} | null
			/**
			 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
			 */
			custom_fields: {} | null
			/**
			 * An array of selected pass-through integration fields. [Read more](/integration-fields)
			 */
			integration_fields: Array<{
				/**
				 * The globally unique ID of this object.
				 */
				id: string
				/**
				 * The key of the field in the remote system.
				 */
				key: string
				/**
				 * - `DEFAULT`: static fields in the remote system.
				 * - `CUSTOM`: fields that are created/editable by the user.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The field's value.
				 */
				value?: unknown
				/**
				 * The label of the field. (not always available)
				 */
				label: string | null
			}>
			/**
			 * The date and time the object was created in the remote system.
			 */
			remote_created_at: Date | null
			/**
			 * A timestamp retrieved from the remote system, describing when the resource was last updated.
			 */
			remote_updated_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			tags: Array<{
				/**
				 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
				 */
				id: string
				name: string | null
				/**
				 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
				 */
				remote_id: string | null
			}>
		} | null
	}
	warnings: Array<{
		message: string
	}>
}

export type PostAtsJobsJobIdApplicationsRequestBody = {
	/**
	 * Stage this candidate should be in. If left out, the default stage for this job will be used. You can obtain the possible `stage_id`s from the `get-jobs` endpoint.
	 */
	stage_id?: string
	candidate: {
		/**
		 * The first name of the candidate.
		 */
		first_name: string
		/**
		 * The last name of the candidate.
		 */
		last_name: string
		/**
		 * The primary email address this application will be created with.
		 */
		email_address: string
		/**
		 * The company where the candidate is currently working.
		 */
		company?: string
		/**
		 * The current job title of the candidate.
		 */
		title?: string
		/**
		 * The phone number of the candidate.
		 */
		phone_number?: string
		/**
		 * The location of the candidate.
		 */
		location?: {
			city?: string
			/**
			 * The uppercase two-letter ISO country (e.g., `DE`). For systems that use codes in formats other than `ISO 3166-1 alpha-2`, Kombo transforms the ISO Codes to the appropriate value.
			 */
			country: string
			zip_code?: string
		}
		/**
		 * The gender of the candidate. Must be one of `MALE`, `FEMALE`, or `OTHER`.
		 */
		gender?: 'MALE' | 'FEMALE' | 'OTHER'
		/**
		 * The date the candidate is available to start working.
		 */
		availability_date?: Date
		/**
		 * The salary expectations of the applicant. We will automatically convert the amount to a format that is suitable for the ATS you are using. For example, if you are using monthly salary expectations, we will convert the amount to a yearly salary if the ATS expects yearly salary expectations.
		 */
		salary_expectations?: {
			/**
			 * The period of the salary expectations. Must be one of `MONTH` or `YEAR`.
			 */
			period: 'MONTH' | 'YEAR'
			/**
			 * The amount of the salary expectations.
			 */
			amount: number
		}
		/**
		 * A list of social media links of the candidate. The links must be valid URLs.
		 */
		social_links?: Array<{
			url: string
		}>
	}
	/**
	 * Array of the attachments you would like to upload. The first CV in the attachments will be treated as the resume of the candidate when the tool allows previewing a resume.
	 */
	attachments?: Array<
		{
			/**
			 * Name of the file you want to upload.
			 */
			name: string
			/**
			 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
			 */
			content_type?: string
			/**
			 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
			 */
			data?: string
			/**
			 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
			 */
			data_url?: string
		} & {
			type: 'CV' | 'COVER_LETTER' | 'OTHER'
		}
	>
	/**
	 * **(⚠️ Deprecated - Use [automatic source writing](/ats/features/application-attribution#automatic-attribution) instead)** Optional source information that will be attached to the candidate. If
	 * you're a job board or recruiting service, you can use this to make sure your
	 * customers can see which candidates came from you.
	 *
	 * This is deprecated because writing sources requires users to do some setup in most ATSs.
	 */
	source?: {
		/**
		 * Name of the source (e.g., `"Example Job Board"`).
		 */
		name?: string
	}
	/**
	 * Optional GDPR consent information required in some jurisdictions (like the Czech Republic or Slovakia).
	 */
	gdpr_consent?: {
		/**
		 * Until when the candidate has granted the company they're applying to permission to process their personal data.
		 */
		expires_at?: Date
		/**
		 * Whether the candidate has given consent.
		 */
		given?: boolean
	}
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		/**
		 * Fields specific to SAP SuccessFactors.
		 */
		successfactors?: {
			/**
			 * Fields that we will pass through to SuccessFactor's `Candidate` object.
			 */
			Candidate?: {}
			/**
			 * Fields that we will pass through to SuccessFactor's `JobApplication` object.
			 */
			JobApplication?: {}
			/**
			 * If set to true, we will copy custom attachments from the JobApplication to the Candidate.
			 */
			copyJobApplicationAttachments?: boolean
			/**
			 * When the candidate already exists, whether to update the Candidate with the remote fields found under the Candidate entity.
			 */
			update_existing_candidate?: boolean
		}
		/**
		 * Fields specific to TalentSoft.
		 */
		talentsoft?: {
			/**
			 * Fields that we will pass through to TalentSoft's `applicant` object.
			 */
			applicant?: {}
			/**
			 * Fields that we will pass through to TalentSoft's `application` object.
			 */
			application?: {}
		}
		teamtailor?: {
			/**
			 * Fields that we will pass through to Teamtailor's `Candidate` object.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Fields that we will pass through to Greenhouse's `Candidate` object.
			 */
			candidate?: {}
			/**
			 * Fields that we will pass through to Greenhouse's `Application` object.
			 */
			application?: {}
		}
		/**
		 * Fields specific to Lever.
		 */
		lever?: {
			/**
			 * Fields that we will pass through to Lever's `Candidate` object. Note: make sure to submit the keys and values in the correct form data format.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to Workable.
		 */
		workable?: {
			/**
			 * Fields that we will pass through to Workable's `Candidate` object.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to Workday. The remote fields schema follows the documentation at https://community.workday.com/sites/default/files/file-hosting/productionapi/Recruiting/v43.0/Put_Candidate.html. Only defined fields are supported, if you need additional field support please reach out to Kombo support.
		 */
		workday?: {
			Candidate_Data?: {
				Job_Application_Data?: {
					Job_Applied_To_Data?: {
						Global_Personal_Information_Data?: {
							Date_of_Birth?: string
						}
					}
					Resume_Data?: {
						Language_Data?: Array<{
							Language_Reference?: {
								WID?: string
							}
							Language?: {
								Language_Ability: Array<{
									Language_Ability_Data?: {
										Language_Ability_Type_Reference?: {
											WID: string
										}
									}
								}>
							}
						}>
					}
				}
			}
		}
		/**
		 * Fields specific to Bullhorn.
		 */
		bullhorn?: {
			/**
			 * Fields that we will pass through to Bullhorn's `Candidate` object.
			 */
			candidate?: {}
			/**
			 * Fields that we will pass through to Bullhorn's `JobSubmission` object.
			 */
			job_submission?: {}
		}
		/**
		 * Fields specific to SmartRecruiters.
		 */
		smartrecruiters?: {
			/**
			 * Fields that we will pass through to the SmartRecruiters's `Candidate` object when created with screening question answers. This API is used: https://developers.smartrecruiters.com/reference/createcandidate-1
			 */
			candidate_with_questions?: {}
			/**
			 * Fields that we will pass through to the SmartRecruiters's `Candidate` object when created with screening question answers. This API is used: https://developers.smartrecruiters.com/reference/candidatesaddtojob-1
			 */
			candidate_without_questions?: {}
		}
		/**
		 * Fields specific to Talentadore.
		 */
		talentadore?: {
			/**
			 * Fields that we will pass through to the Talentadore's when creating applications.
			 */
			applications?: {}
		}
		/**
		 * Fields specific to GuideCom.
		 */
		guidecom?: {
			/**
			 * Fields that we will pass through to GuideCom's `Candidate` object.
			 */
			candidate?: {}
		}
		/**
		 * Fields specific to d.vinci.
		 */
		dvinci?: {
			/**
			 * Fields that we will pass through to d.vinci's application object. This API is used: https://static.dvinci-easy.com/files/d.vinci%20application-apply-api.html#jobs__id__applyApi_post
			 */
			application?: {}
		}
	} & {
		/**
		 * Fields specific to Greenhouse.
		 */
		greenhouse?: {
			/**
			 * Headers we will pass with `POST` requests to Greenhouse.
			 */
			post_headers?: {
				/**
				 * ID of the the user that will show up as having performed the action in Greenhouse. We already pass a value by default, but you can use this to override it.
				 */
				'On-Behalf-Of'?: string | null
			}
		}
	}
	/**
	 * Array of answers to screening questions. Currently, not all question types are supported and unsupported ones will not be submitted.
	 *
	 * The available questions a job can be retrieved from the get jobs endpoint. The answers will be validated based on the format of the the questions. Make sure to follow this schema to avoid errors.
	 */
	screening_question_answers?: Array<{
		/**
		 * ID of the question returned by the Kombo API. We'll report a warning in the logs if the question can't be found on the job.
		 */
		question_id: string
		/**
		 * Answer to a question. This will be validated based on the question format and throw an error if the answer is invalid. Here is a description of each question type and the required answer format:
		 *
		 * `TEXT` - Simply provide a "string" answer.
		 *
		 * `SINGLE_SELECT` - Provide the ID of the answer as a string.
		 *
		 * `MULTI_SELECT` - Provide a string array containing the question IDs of the selected options.
		 *
		 * `BOOLEAN` - Either `true` or `false`.
		 *
		 * `NUMBER` - A number.
		 *
		 * `DATE` - Provide the answer as an ISO 8601 date string.
		 *
		 * `FILE` - Please select Option 6 in the dropdown above to see the required format.
		 */
		answer:
			| string
			| boolean
			| number
			| Array<string>
			| {
					/**
					 * Name of the file you want to upload.
					 */
					name: string
					/**
					 * Content/MIME type of the file (e.g., `application/pdf`). This is required if you provide `data` and optional if you provide `data_url`.
					 */
					content_type?: string
					/**
					 * Base64-encoded contents of the file you want to upload. You must provide either this or `data_url`.
					 */
					data?: string
					/**
					 * Publicly accessible URL to the file you want to upload. You must provide either this or `data`.
					 */
					data_url?: string
			  }
	}>
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsUsersParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsUsersParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsUsersParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsUsersParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetAtsUsersSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * First name of the user.
			 */
			first_name: string | null
			/**
			 * Last name of the user.
			 */
			last_name: string | null
			/**
			 * Email of the user. If the email address is invalid, it will be set to null.
			 */
			email: string | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsOffersParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsOffersParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsOffersParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsOffersParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetAtsOffersSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string | null
			/**
			 * The offer’s current status. The usual flow of statuses is as follows:
			 * `DRAFT` -> `APPROVED` -> `SENT` -> `ACCEPTED` or `DECLINED`.
			 *
			 * Please note that not all systems will expose all statuses. For example, most systems do not include the `APPROVED` status
			 *
			 * - `ACCEPTED`: The offer was accepted by the candidate.
			 * - `DECLINED`: The offer was declined by the candidate.
			 * - `SENT`: The offer was sent to the candidate.
			 * - `APPROVED`: The draft was approved.
			 * - `DRAFT`: The offer is a draft and has not yet been sent to the candidate.
			 * - `ABANDONED`: The offer has expired or is no longer valid and should not be considered.
			 *
			 */
			status: 'ACCEPTED' | 'DECLINED' | 'SENT' | 'APPROVED' | 'DRAFT' | 'ABANDONED'
			/**
			 * The date when the employment described by the offer starts. Can be in the past or future.
			 */
			employment_start_date: Date | null
			/**
			 * The Kombo ID of the application this interview belongs to. The ID can be used to retrieve the application from the `get applications` endpoint.
			 */
			application_id: string | null
			/**
			 * A key-value store of fields not covered by the schema. [Read more](/custom-fields)
			 */
			custom_fields: {} | null
			/**
			 * An array of selected pass-through integration fields. [Read more](/integration-fields)
			 */
			integration_fields: Array<{
				/**
				 * The globally unique ID of this object.
				 */
				id: string
				/**
				 * The key of the field in the remote system.
				 */
				key: string
				/**
				 * - `DEFAULT`: static fields in the remote system.
				 * - `CUSTOM`: fields that are created/editable by the user.
				 */
				type: 'DEFAULT' | 'CUSTOM'
				/**
				 * The field's value.
				 */
				value?: unknown
				/**
				 * The label of the field. (not always available)
				 */
				label: string | null
			}>
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * The date and time the object was created in the remote system.
			 */
			remote_created_at: Date | null
			/**
			 * A timestamp retrieved from the remote system, describing when the resource was last updated.
			 */
			remote_updated_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
			application: {
				candidate: {
					/**
					 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
					 */
					id: string
					/**
					 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
					 */
					remote_id: string
					/**
					 * First name of the candidate.
					 */
					first_name: string | null
					/**
					 * Last name of the candidate.
					 */
					last_name: string | null
					/**
					 * A list of email addresses of the candidate with an optional type. If an email address is invalid, it will be filtered out.
					 */
					email_addresses: Array<{
						email_address?: string | null
						/**
						 * Kombo exposes type information through this field. If we don't get any information from the tool, we will set this to `null`.
						 */
						type: string | null
					}> | null
				} | null
				job: {
					/**
					 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
					 */
					id: string
					/**
					 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
					 */
					remote_id: string
					/**
					 * Title of the job.
					 */
					name: string | null
				} | null
			} | null
		}>
	}
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAtsRejectionReasonsParameterPageSize = number

/**
 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
 */
export type GetAtsRejectionReasonsParameterUpdatedAfter = Date

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export type GetAtsRejectionReasonsParameterIncludeDeleted = 'true' | 'false'

/**
 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
 */
export const GetAtsRejectionReasonsParameterIncludeDeleted = {
	TRUE: 'true',
	FALSE: 'false'
} as const

/**
 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
 */


/**
 * Filter by a comma-separated list of remote IDs.
 */


export type GetAtsRejectionReasonsSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * Cursor string that can be passed to the `cursor` query parameter to get the next page. If this is `null`, then there are no more pages.
		 */
		next: string | null
		results: Array<{
			/**
			 * The globally unique ID of this object generated by Kombo. We recommend using this as a stable primary key for syncing.
			 */
			id: string
			/**
			 * The raw ID of the object in the remote system. We don't recommend using this as a primary key on your side as it might sometimes be compromised of multiple identifiers if a system doesn't provide a clear primary key.
			 */
			remote_id: string
			/**
			 * The title of the rejection reason.
			 */
			name: string | null
			/**
			 * The timestamp when this object was last changed. This value is tracked by Kombo based on changes in the data.
			 */
			changed_at: Date
			/**
			 * The date and time the object was deleted in the remote system. Objects are automatically marked as deleted when Kombo can't retrieve them from the remote system anymore. Kombo will also anonymize entries 14 days after they disappear.
			 */
			remote_deleted_at: Date | null
			/**
			 * Includes the data fetched from the remote system.
			 * Please be aware that including this in you scope config might violate other
			 * scopes that are set.
			 *
			 * Remote data always has the endpoint path that we got the data from as the
			 * top level key. For example, it could look like: `{ "/companies": { ... }}`
			 *
			 * This is not available on all plans. Reach out to Kombo if you need it.
			 */
			remote_data: {} | null
		}>
	}
}

export type GetAssessmentPackagesSuccessfulResponse = {
	status: 'success'
	data: {
		packages: Array<{
			id: string
			name: string
			description: string
			/**
			 * YYYY-MM-DDTHH:mm:ss.sssZ
			 */
			updated_at: Date | null
			type: 'BEHAVIORAL' | 'VIDEO_INTERVIEW' | 'SKILLS_TEST' | 'BACKGROUND_CHECK' | 'REFERENCE_CHECK'
		}>
	}
}

export type PutAssessmentPackagesRequestBody = {
	packages: Array<{
		/**
		 * A unique identifier for the assessment package.
		 */
		id: string
		type: 'BEHAVIORAL' | 'VIDEO_INTERVIEW' | 'SKILLS_TEST' | 'BACKGROUND_CHECK' | 'REFERENCE_CHECK'
		/**
		 * The name of the assessment package.
		 */
		name: string
		/**
		 * Description about the package. Some ATSs will display this in their UI.
		 */
		description: string
	}>
}

/**
 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
 */


/**
 * The number of results to return per page. Maximum is 250.
 */
export type GetAssessmentOrdersOpenParameterPageSize = number

export type GetAssessmentOrdersOpenSuccessfulResponse = {
	status: 'success'
	data: {
		next: string | null
		results: Array<{
			id: string
			package_id: string
			candidate: {
				email: string
				first_name?: string | null
				last_name?: string | null
				phone?: string | null
				remote_id?: string | null
			}
		}>
	}
}



export type PutAssessmentOrdersAssessmentOrderIdResultRequestBody = {
	/**
	 * Status of the assessment.
	 *
	 * **Please note only the orders with the status of `OPEN` can be updated.**
	 */
	status: 'COMPLETED' | 'CANCELLED'
	result_url: string
	/**
	 * YYYY-MM-DDTHH:mm:ss.sssZ
	 */
	completed_at: Date
	score?: number
	max_score?: number
	attributes?: Array<{
		field: string
		value: string
	}>
	sub_results?: Array<{
		id: string
		title: string
		score: number
		max_score: number
		status: 'COMPLETED' | 'CANCELLED'
	}>
	/**
	 * Additional fields that we will pass through to specific ATS systems.
	 */
	remote_fields?: {
		smartrecruiters?: {
			/**
			 * Value that we will pass through to SmartRecruiters' `scoreLabel` field.
			 */
			scoreLabel?: string
		}
	}
}

export type PostConnectCreateLinkSuccessfulResponse = {
	status: 'success'
	data: {
		link: string
	}
}

export type PostConnectCreateLinkRequestBody = {
	/**
	 * The email of the user this link is meant for.
	 */
	end_user_email: string
	/**
	 * The name of the user's organization.
	 */
	end_user_organization_name: string
	/**
	 * The id the user/organization has in your own database.
	 */
	end_user_origin_id?: string | null
	/**
	 * If the tool you want to connect offers different environments, you can specify which one you want to connect to here. If you don't specify this, we'll assume you want to use the production environment. Note that this can only be used if you've also specified a tool through `integration_tool`.
	 */
	remote_environment?: string | null
	/**
	 * Category of the integration you want your customer to create.
	 */
	integration_category?: 'HRIS' | 'ATS' | 'ASSESSMENT'
	/**
	 * Pre-define a tool this integration link can be used for.
	 */
	integration_tool?:
		| 'personio'
		| 'workday'
		| 'workdaycustomreport'
		| 'workdaycustomreportsftp'
		| 'successfactors'
		| 'smartrecruiters'
		| 'factorial'
		| 'oraclerecruiting'
		| 'lever'
		| 'icims'
		| 'cornerstonetalentlink'
		| 'recruitee'
		| 'greenhouse'
		| 'greenhousejobboard'
		| 'teamtailor'
		| 'ashby'
		| 'talentsoft'
		| 'talentsoftcustomer'
		| 'concludis'
		| 'piloga'
		| 'onlyfy'
		| 'ukgpro'
		| 'adpworkforcenow'
		| 'rexx'
		| 'afas'
		| 'bamboohr'
		| 'bullhorn'
		| 'bullhornlogin'
		| 'workable'
		| 'payfitcustomer'
		| 'payfitpartner'
		| 'payfit'
		| 'jobvite'
		| 'employmenthero'
		| 'fountain'
		| 'kenjo'
		| 'heavenhr'
		| 'hibob'
		| 'softgarden'
		| 'cezannehr'
		| 'entraid'
		| 'azuread'
		| 'googleworkspace'
		| 'nmbrs'
		| 'pinpoint'
		| 'welcometothejungle'
		| 'dvinci'
		| 'join'
		| 'deel'
		| 'remotecom'
		| 'iriscascade'
		| 'okta'
		| 'sagehr'
		| 'sagepeople'
		| 'humaans'
		| 'traffit'
		| 'erecruiter'
		| 'eurecia'
		| 'abacusumantis'
		| 'umantis'
		| 'jobylon'
		| 'oraclehcm'
		| 'taleez'
		| 'officient'
		| 'sesamehr'
		| 'charliehr'
		| 'hrworks'
		| 'abacus'
		| 'otys'
		| 'zohopeople'
		| 'zohorecruit'
		| 'gusto'
		| 'breathehr'
		| 'catalystone'
		| 'mirus'
		| 'alexishr'
		| 'eploy'
		| 'jobdiva'
		| 'peple'
		| 'careerplug'
		| 'trinet'
		| 'paylocity'
		| 'paycor'
		| 'namely'
		| 'paycom'
		| 'insperity'
		| 'paychex'
		| 'avature'
		| 'rippling'
		| 'sapling'
		| 'heyrecruit'
		| 'peoplehr'
		| 'recruhr'
		| 'jazzhr'
		| 'lucca'
		| 'bite'
		| 'zelt'
		| 'planday'
		| 'boondmanager'
		| 'homerun'
		| 'haileyhr'
		| 'silae'
		| 'mysolution'
		| 'carerix'
		| 'hroffice'
		| 'talentclue'
		| 'inrecruiting'
		| 'ubeeo'
		| 'oysterhr'
		| 'kiwihr'
		| 'connexys'
		| 'hr4you'
		| 'cornerstoneondemand'
		| 'zvooverecruit'
		| 'square'
		| 'perbilityhelix'
		| 'comeet'
		| 'leapsome'
		| 'compleet'
		| 'datevhr'
		| 'datev'
		| 'datevlug'
		| 'sympa'
		| 'breezyhr'
		| 'flatchr'
		| 'applicantstack'
		| 'reachmee'
		| 'talentadore'
		| 'youforce'
		| 'nibelis'
		| 'sandbox'
		| 'guidecom'
		| 'sftp'
		| 'sftpfetch'
	/**
	 * Language of the connection flow UI.
	 */
	language?: 'en' | 'de' | 'fr' | 'it' | 'es'
	/**
	 * Specify a scope config that should be used for this integration. This is an advanced feature, only use it if you know what you're doing!
	 */
	scope_config_id?: string | null
	/**
	 * Enable the [filtering feature](https://docs.kombo.dev/other/filtering) for the integration. HRIS only.
	 */
	enable_filtering?: boolean
	/**
	 * Enable the [field mapping feature](https://docs.kombo.dev/hris/features/setup-flow/introduction#field-mapping) for this integration.
	 */
	enable_field_mapping?: boolean
	/**
	 * The type of link you want to create. `EMBEDDED` is for the [embedded flow](../guides/connect/embedded-flow) using the Kombo Connect SDK (these links are valid for 1 hour) and `MAGIC_LINK` is for [magic links](../guides/connect/magic-links) which you send out manually to customers (there are valid for 1 year).
	 *
	 * This defaults to `EMBEDDED`, which is our recommended method of implementing the connection flow for a seamless user experience.
	 */
	link_type?: 'EMBEDDED' | 'MAGIC_LINK'
}



export type GetConnectIntegrationByTokenTokenSuccessfulResponse = {
	status: 'success'
	data: {
		tool: string
		id: string
		end_user_origin_id: string | null
		end_user_organization_name: string
		end_user_email: string | null
		/**
		 * The setup_status is used in conjunction with the filtering and field mapping features. If these are enabled in the connection flow, the integration will start in an "INCOMPLETE" state and move to "COMPLETE" once all steps are finished.
		 *
		 * - `INCOMPLETE`: Setup is still in progress. Some steps aren’t finished, so no data is available yet. Syncs only run as needed for setup.
		 * - `FINAL_SYNC_PENDING`: Setup is complete, and the final sync is running. Data will be available after this sync is done.
		 * - `COMPLETED`: Setup is fully finished, and the integration is ready to use.
		 */
		setup_status: 'INCOMPLETE' | 'FINAL_SYNC_PENDING' | 'COMPLETED'
	}
}

export type PostConnectActivateIntegrationSuccessfulResponse = {
	status: 'success'
	data: {
		tool: string
		id: string
		end_user_origin_id: string | null
		end_user_organization_name: string
		end_user_email: string | null
		/**
		 * The setup_status is used in conjunction with the filtering and field mapping features. If these are enabled in the connection flow, the integration will start in an "INCOMPLETE" state and move to "COMPLETE" once all steps are finished.
		 *
		 * - `INCOMPLETE`: Setup is still in progress. Some steps aren’t finished, so no data is available yet. Syncs only run as needed for setup.
		 * - `FINAL_SYNC_PENDING`: Setup is complete, and the final sync is running. Data will be available after this sync is done.
		 * - `COMPLETED`: Setup is fully finished, and the integration is ready to use.
		 */
		setup_status: 'INCOMPLETE' | 'FINAL_SYNC_PENDING' | 'COMPLETED'
	}
}

export type PostConnectActivateIntegrationRequestBody = {
	token: string
}

export type GetCustomDatevSystemInformationSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The consultant number used for this DATEV integration (BeraterNr).
		 */
		consultant_number: number
		/**
		 * The client number used for this DATEV integration (MandantenNr).
		 */
		client_number: number
		/**
		 * The target system's name (Ziel).
		 */
		target_system: 'LODAS' | 'LuG'
	}
}

export type PostCustomDatevPassthroughRequestBody = {
	file_content: string
	/**
	 * YYYY-MM-DDTHH:mm:ss.sssZ
	 */
	accounting_month: Date
	target_system: 'LODAS' | 'LuG'
	file_type: 'STAMMDATEN' | 'BEWEGUNGSDATEN'
	file_name: string
}

export type GetCustomDatevCheckEauPermissionSuccessfulResponse = {
	status: 'success'
	data: {
		ready: boolean
		error?: string
	}
}



export type GetCustomDatevEauRequestsEauIdSuccessfulResponse = {
	status: 'success'
	data: {
		raw?: unknown
	}
}

export type GetCustomDatevCheckDocumentPermissionSuccessfulResponse = {
	status: 'success'
	data:
		| {
				ready: boolean
				documents_granted: Array<string>
		  }
		| {
				ready: boolean
				error: string
		  }
}

/**
 * Provide the period in the format YYYY-MM for which to check for available documents.
 */


export type GetCustomDatevAvailableDocumentsSuccessfulResponse = {
	status: 'success'
	data: {
		results: Array<{
			/**
			 * The document's type.
			 */
			document_type: string
			/**
			 * List of employees this document is available for.
			 */
			available_for_employees: Array<{
				id: string | null
				remote_id: string
			}>
			/**
			 * Is true if the document is a company document.
			 */
			is_company_document: boolean
		}>
	}
}

export type PostCustomDatevDownloadDocumentSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The URL to download the document from.
		 */
		data_url: string
		file_name: string
		content_type: string
	}
}

/**
 * The data to request an electronic certificate of incapacity for work (eAU).
 */
export type PostCustomDatevDownloadDocumentRequestBody = {
	/**
	 * The month to request the document for.
	 */
	accounting_month: Date
	/**
	 * Brutto/Netto (LOBN)
	 *
	 * Lohnsteuerbescheinigung (german/english) (LSTB/LSTE)
	 *
	 * SV-Nachweis (SVNW)
	 *
	 * A1-Bescheinigung (ABEG)
	 *
	 * Antragsbestätigung A1-Bescheinigung (AANB)
	 *
	 * Buchungsbeleg (BUBE)
	 *
	 * Lohnjournal (german/english) (LOJO/LJOE)
	 *
	 * Lohnsteueranmeldung (LSTA)
	 *
	 * Beitragsnachweis (KBNW)
	 *
	 * Beitragsnachweis-Erläuterung (SBNW)
	 *
	 * Übersicht Zahlungen (ZAKF)
	 *
	 * DÜ Zahlungen (PRZA)
	 *
	 * Barauszahlungswerte (ZABR)
	 *
	 * Überzahlungen-Werte (ZAUW)
	 *
	 * Personalkostenübersicht (german/english) (LOPS/LOPE)
	 *
	 * Kostenstellenwerte (KOST)
	 *
	 * Kostenträgerwerte (KOTR)
	 *
	 * Lohnartenwerte einfach/erweitert (LOWE/LOPN)
	 *
	 * Lohnkonto (LKTO)
	 *
	 * Personalreport (LORE)
	 *
	 * Mitarbeiterstammdaten (PDAT)
	 *
	 * Pfändungswerte (PFAN)
	 *
	 * Darlehenswerte (DAWE)
	 *
	 * Wertguthaben je Arbeitnehmer (WEAN)
	 */
	document_type: 'AANB' | 'ABEG' | 'BUBE' | 'DAWE' | 'KBNW' | 'KOST' | 'KOTR' | 'LKTO' | 'LOBN' | 'LJOE' | 'LOJE' | 'LOJO' | 'LOPE' | 'LOPN' | 'LOPS' | 'LORE' | 'LOWE' | 'LSTA' | 'LSTB' | 'LSTE' | 'PDAT' | 'PFAN' | 'PRZA' | 'SBNW' | 'SVNW' | 'WEAN' | 'ZABR' | 'ZAKF' | 'ZAUW'
	employee_id: string | null
}

 | null

export type PostCustomDatevEmployeesEmployeeIdDownloadDocumentSuccessfulResponse = {
	status: 'success'
	data: {
		/**
		 * The URL to download the document from.
		 */
		data_url: string
		file_name: string
		content_type: string
	}
}

/**
 * The data to request an electronic certificate of incapacity for work (eAU).
 */
export type PostCustomDatevEmployeesEmployeeIdDownloadDocumentRequestBody = {
	/**
	 * The month to request the document for.
	 */
	accounting_month: Date
	/**
	 * Brutto/Netto (LOBN)
	 *
	 * Lohnsteuerbescheinigung (german/english) (LSTB/LSTE)
	 *
	 * SV-Nachweis (SVNW)
	 *
	 * A1-Bescheinigung (ABEG)
	 *
	 * Antragsbestätigung A1-Bescheinigung (AANB)
	 *
	 * Buchungsbeleg (BUBE)
	 *
	 * Lohnjournal (german/english) (LOJO/LJOE)
	 *
	 * Lohnsteueranmeldung (LSTA)
	 *
	 * Beitragsnachweis (KBNW)
	 *
	 * Beitragsnachweis-Erläuterung (SBNW)
	 *
	 * Übersicht Zahlungen (ZAKF)
	 *
	 * DÜ Zahlungen (PRZA)
	 *
	 * Barauszahlungswerte (ZABR)
	 *
	 * Überzahlungen-Werte (ZAUW)
	 *
	 * Personalkostenübersicht (german/english) (LOPS/LOPE)
	 *
	 * Kostenstellenwerte (KOST)
	 *
	 * Kostenträgerwerte (KOTR)
	 *
	 * Lohnartenwerte einfach/erweitert (LOWE/LOPN)
	 *
	 * Lohnkonto (LKTO)
	 *
	 * Personalreport (LORE)
	 *
	 * Mitarbeiterstammdaten (PDAT)
	 *
	 * Pfändungswerte (PFAN)
	 *
	 * Darlehenswerte (DAWE)
	 *
	 * Wertguthaben je Arbeitnehmer (WEAN)
	 */
	document_type: 'AANB' | 'ABEG' | 'BUBE' | 'DAWE' | 'KBNW' | 'KOST' | 'KOTR' | 'LKTO' | 'LOBN' | 'LJOE' | 'LOJE' | 'LOJO' | 'LOPE' | 'LOPN' | 'LOPS' | 'LORE' | 'LOWE' | 'LSTA' | 'LSTB' | 'LSTE' | 'PDAT' | 'PFAN' | 'PRZA' | 'SBNW' | 'SVNW' | 'WEAN' | 'ZABR' | 'ZAKF' | 'ZAUW'
}

/**
 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
 */


export type PostCustomDatevEmployeesEmployeeIdEauRequestsSuccessfulResponse = {
	status: 'success'
	data: {
		eau_id: string
	}
}

/**
 * The data to request an electronic certificate of incapacity for work (eAU).
 */
export type PostCustomDatevEmployeesEmployeeIdEauRequestsRequestBody = {
	/**
	 * Date "start_work_incapacity" from the original eAU-Request.
	 */
	start_work_incapacity: string
	notification?: {
		/**
		 * This is the email address that should be notified as soon as a feedback is received.
		 */
		email: string
	}
	/**
	 * The data-section for the contact person which is responsible for feedback from the health insurance.
	 */
	contact_person?: {
		gender: 'M' | 'W' | 'X' | 'D'
		name: string
		telephone: string
		fax: string
		email: string
		company_name: string
		postal_code: string
		city: string
		street: string
		house_number: string
	}
}

/**
 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
 */


export type PutCustomDatevEmployeesEmployeeIdPreparePayrollRequestBody = {
	payroll_run: {
		/**
		 * YYYY-MM-DDTHH:mm:ss.sssZ
		 */
		date: Date
	}
	/**
	 * Add entries for all the hourly calculated supplements here. For example you can write "Overtime" or "Work on Holidays" (in hours here). Unfortunately, DATEV doens't allow showing a lable for the entries.
	 */
	hourly_payments: Array<{
		/**
		 * Number of hours this employee has worked.
		 */
		hours: number
		/**
		 * The "Lohnart" (payment-type) in DATEV. Make sure a Lohnart is selected that actually supports hours.
		 */
		lohnart: number
	}>
	/**
	 * Add entries for all the fixed supplements here. For example you can write "Bonuses" (in Euros here). Unfortunately, DATEV doens't allow showing a lable for the entries.
	 */
	fixed_payments: Array<{
		amount: number
		/**
		 * The "Lohnart" (payment-type) in DATEV. Make sure a Lohnart is selected that actually supports fixed payments (no hourly modifier).
		 */
		lohnart: number
	}>
	/**
	 * Add custom entries to the DATEV Lodas Standard Erfassungstabelle.
	 */
	custom_lodas?: Array<{
		/**
		 * This amount value will be mapped to Datev "Wert" field.
		 */
		amount: number
		/**
		 * Choose a valid Lodas Lohnart.
		 */
		lohnart: number
		/**
		 * Choose a valid Lodas Bearbeitungsschlüssel. We list the valid Bearbeitungsschlüssel [here](https://storage.googleapis.com/kombo-assets/integrations/datev/lodas_bs.json).
		 */
		bearbeitungsschluessel: number
	}>
}

/**
 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
 */


export type PutCustomDatevEmployeesEmployeeIdCompensationsRequestBody = {
	/**
	 * Date from which the submitted compensations should be valid. Please note that it might not be possible to set compensations for the past if the payroll was already run.
	 */
	effective_date: Date
	compensations: Array<{
		/**
		 * The amount that this employee will be paid.
		 */
		amount: number
		/**
		 * The currency in which the employee gets paid. Currently, only euro is supported as integrated systems only work with Euro.
		 */
		currency: 'EUR'
		/**
		 * The period for which the specified amount is paid. Currently, integrated systems only support "HOUR" and "MONTH".
		 */
		period: 'HOUR' | 'MONTH'
		/**
		 * The Lohnart that should be used for this compensation. If not specified, the default Lohnart that was requested in the connection flow will be used. Generally Lohnart is only available for monthly compensations.
		 */
		lohnart?: number
	}>
}

export type GetCustomDatevCheckWritePermissionSuccessfulResponse = {
	status: 'success'
	data: {
		ready: boolean
		error?: string
	}
}

export type GetCustomDatevDataPushesSuccessfulResponse = {
	status: 'success'
	data: {
		data_pushes: Array<{
			id: string
			/**
			 * Type of the executed data push.
			 */
			type: 'GENERAL' | 'PAYROLL'
			/**
			 * Date when the push-data endpoint was called.
			 */
			created_at: Date
			/**
			 * List of all the submitted files. This can include multiple files if data was edited for multiple months.
			 */
			upload_jobs: Array<{
				id: string
				file_name: string
				/**
				 * If we were not able to send the file to DATEV, we will set the state "FAILED". The other values are synced from DATEV for the respective import jobs.
				 */
				state: 'FAILED' | 'UPLOADED' | 'IMPORTED' | 'CORRUPTED' | 'DELETED' | 'AUTO_DELETED'
				/**
				 * Actual content of the file.
				 */
				file: string
			}>
		}>
	}
}

export type PostCustomDatevPushDataGeneralSuccessfulResponse = {
	status: 'success'
	data: {
		files: Array<{
			name: string
			content: string
		}>
	}
}

export type PostCustomDatevPushDataPayrollSuccessfulResponse = {
	status: 'success'
	data: {
		files: Array<{
			name: string
			content: string
		}>
	}
}

export type PostCustomDatevPushDataPayrollRequestBody = {
	/**
	 * Specify the month for which the payroll data should be submitted. The date must be specified as the first day of a month (e.g. 2022-12-01).
	 */
	payroll_month: Date
}

/**
 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
 */


export type PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsRequestBody = {
	/**
	 * The ID code of the supplement that you want to add to Silae.
	 */
	supplement_code: string
	/**
	 * Date from which the submitted supplement should be active.
	 */
	effective_date: Date
	/**
	 * The amount of the supplement if it requires a number.
	 */
	element_amount?: number
	/**
	 * The string of the supplement if it requires a string.
	 */
	element_string?: string
}

export type GetCheckApiKeyData = {
	body?: never
	path?: never
	query?: never
	url: '/check-api-key'
}

export type GetCheckApiKeyErrors = {
	/**
	 * GET /check-api-key Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type GetCheckApiKeyError = GetCheckApiKeyErrors[keyof GetCheckApiKeyErrors]

export type GetCheckApiKeyResponses = {
	/**
	 * GET /check-api-key Successful response
	 */
	200: GetCheckApiKeySuccessfulResponse
}

export type GetCheckApiKeyResponse = GetCheckApiKeyResponses[keyof GetCheckApiKeyResponses]

export type PostForceSyncData = {
	/**
	 * POST /force-sync request body
	 */
	body?: {
		[key: string]: unknown
	}
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/force-sync'
}

export type PostForceSyncErrors = {
	/**
	 * POST /force-sync Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostForceSyncError = PostForceSyncErrors[keyof PostForceSyncErrors]

export type PostForceSyncResponses = {
	/**
	 * POST /force-sync Successful response
	 */
	200: PostForceSyncSuccessfulResponse
}

export type PostForceSyncResponse = PostForceSyncResponses[keyof PostForceSyncResponses]

export type PostPassthroughToolApiData = {
	/**
	 * POST /passthrough/:tool/:api request body
	 */
	body?: PostPassthroughToolApiRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The ID of the tool whose passthrough API you want to call (e.g., `personio`).
		 */
		tool: string
		/**
		 * The ID of the passthrough API you want to call (some tools provide multiple). Check the endpoint description for a list of all available APIs.
		 */
		api: string
	}
	query?: never
	url: '/passthrough/{tool}/{api}'
}

export type PostPassthroughToolApiErrors = {
	/**
	 * POST /passthrough/:tool/:api Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostPassthroughToolApiError = PostPassthroughToolApiErrors[keyof PostPassthroughToolApiErrors]

export type PostPassthroughToolApiResponses = {
	/**
	 * POST /passthrough/:tool/:api Successful response
	 */
	200: PostPassthroughToolApiSuccessfulResponse
}

export type PostPassthroughToolApiResponse = PostPassthroughToolApiResponses[keyof PostPassthroughToolApiResponses]

export type DeleteIntegrationsIntegrationIdData = {
	/**
	 * DELETE /integrations/:integration_id request body
	 */
	body?: {
		[key: string]: unknown
	}
	path: {
		/**
		 * DELETE /integrations/:integration_id parameter
		 */
		integration_id: string
	}
	query?: never
	url: '/integrations/{integration_id}'
}

export type DeleteIntegrationsIntegrationIdErrors = {
	/**
	 * DELETE /integrations/:integration_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type DeleteIntegrationsIntegrationIdError = DeleteIntegrationsIntegrationIdErrors[keyof DeleteIntegrationsIntegrationIdErrors]

export type DeleteIntegrationsIntegrationIdResponses = {
	/**
	 * DELETE /integrations/:integration_id Successful response
	 */
	200: string
}

export type DeleteIntegrationsIntegrationIdResponse = DeleteIntegrationsIntegrationIdResponses[keyof DeleteIntegrationsIntegrationIdResponses]

export type GetIntegrationsIntegrationIdData = {
	body?: never
	path: {
		/**
		 * GET /integrations/:integration_id parameter
		 */
		integration_id: string
	}
	query?: never
	url: '/integrations/{integration_id}'
}

export type GetIntegrationsIntegrationIdErrors = {
	/**
	 * GET /integrations/:integration_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type GetIntegrationsIntegrationIdError = GetIntegrationsIntegrationIdErrors[keyof GetIntegrationsIntegrationIdErrors]

export type GetIntegrationsIntegrationIdResponses = {
	/**
	 * GET /integrations/:integration_id Successful response
	 */
	200: GetIntegrationsIntegrationIdSuccessfulResponse
}

export type GetIntegrationsIntegrationIdResponse = GetIntegrationsIntegrationIdResponses[keyof GetIntegrationsIntegrationIdResponses]

export type PostIntegrationsIntegrationIdRelinkData = {
	/**
	 * POST /integrations/:integration_id/relink request body
	 */
	body?: PostIntegrationsIntegrationIdRelinkRequestBody
	path: {
		/**
		 * POST /integrations/:integration_id/relink parameter
		 */
		integration_id: string
	}
	query?: never
	url: '/integrations/{integration_id}/relink'
}

export type PostIntegrationsIntegrationIdRelinkErrors = {
	/**
	 * POST /integrations/:integration_id/relink Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type PostIntegrationsIntegrationIdRelinkError = PostIntegrationsIntegrationIdRelinkErrors[keyof PostIntegrationsIntegrationIdRelinkErrors]

export type PostIntegrationsIntegrationIdRelinkResponses = {
	/**
	 * POST /integrations/:integration_id/relink Successful response
	 */
	200: PostIntegrationsIntegrationIdRelinkSuccessfulResponse
}

export type PostIntegrationsIntegrationIdRelinkResponse = PostIntegrationsIntegrationIdRelinkResponses[keyof PostIntegrationsIntegrationIdRelinkResponses]

export type GetIntegrationsIntegrationIdIntegrationFieldsData = {
	body?: never
	path: {
		/**
		 * GET /integrations/:integration_id/integration-fields parameter
		 */
		integration_id: string
	}
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 2000.
		 */
		page_size?: GetIntegrationsIntegrationIdIntegrationFieldsParameterPageSize
	}
	url: '/integrations/{integration_id}/integration-fields'
}

export type GetIntegrationsIntegrationIdIntegrationFieldsErrors = {
	/**
	 * GET /integrations/:integration_id/integration-fields Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetIntegrationsIntegrationIdIntegrationFieldsError = GetIntegrationsIntegrationIdIntegrationFieldsErrors[keyof GetIntegrationsIntegrationIdIntegrationFieldsErrors]

export type GetIntegrationsIntegrationIdIntegrationFieldsResponses = {
	/**
	 * GET /integrations/:integration_id/integration-fields Successful response
	 */
	200: GetIntegrationsIntegrationIdIntegrationFieldsSuccessfulResponse
}

export type GetIntegrationsIntegrationIdIntegrationFieldsResponse = GetIntegrationsIntegrationIdIntegrationFieldsResponses[keyof GetIntegrationsIntegrationIdIntegrationFieldsResponses]

export type PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdData = {
	/**
	 * PATCH /integrations/:integration_id/integration-fields/:integration_field_id request body
	 */
	body?: PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdRequestBody
	path: {
		/**
		 * PATCH /integrations/:integration_id/integration-fields/:integration_field_id parameter
		 */
		integration_id: string
		/**
		 * PATCH /integrations/:integration_id/integration-fields/:integration_field_id parameter
		 */
		integration_field_id: string
	}
	query?: never
	url: '/integrations/{integration_id}/integration-fields/{integration_field_id}'
}

export type PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdErrors = {
	/**
	 * PATCH /integrations/:integration_id/integration-fields/:integration_field_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdError = PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdErrors[keyof PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdErrors]

export type PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdResponses = {
	/**
	 * PATCH /integrations/:integration_id/integration-fields/:integration_field_id Successful response
	 */
	200: PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdSuccessfulResponse
}

export type PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdResponse = PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdResponses[keyof PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdResponses]

export type GetIntegrationsIntegrationIdCustomFieldsData = {
	body?: never
	path: {
		/**
		 * GET /integrations/:integration_id/custom-fields parameter
		 */
		integration_id: string
	}
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetIntegrationsIntegrationIdCustomFieldsParameterPageSize
	}
	url: '/integrations/{integration_id}/custom-fields'
}

export type GetIntegrationsIntegrationIdCustomFieldsErrors = {
	/**
	 * GET /integrations/:integration_id/custom-fields Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetIntegrationsIntegrationIdCustomFieldsError = GetIntegrationsIntegrationIdCustomFieldsErrors[keyof GetIntegrationsIntegrationIdCustomFieldsErrors]

export type GetIntegrationsIntegrationIdCustomFieldsResponses = {
	/**
	 * GET /integrations/:integration_id/custom-fields Successful response
	 */
	200: GetIntegrationsIntegrationIdCustomFieldsSuccessfulResponse
}

export type GetIntegrationsIntegrationIdCustomFieldsResponse = GetIntegrationsIntegrationIdCustomFieldsResponses[keyof GetIntegrationsIntegrationIdCustomFieldsResponses]

export type PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdData = {
	/**
	 * PUT /integrations/:integration_id/custom-fields/:custom_field_id request body
	 */
	body?: PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdRequestBody
	path: {
		/**
		 * The unique ID of the integration where the custom field mapping should be updated
		 */
		integration_id: string
		/**
		 * The unique ID of the custom field that should be updated
		 */
		custom_field_id: string
	}
	query?: never
	url: '/integrations/{integration_id}/custom-fields/{custom_field_id}'
}

export type PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdErrors = {
	/**
	 * PUT /integrations/:integration_id/custom-fields/:custom_field_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdError = PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdErrors[keyof PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdErrors]

export type PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdResponses = {
	/**
	 * PUT /integrations/:integration_id/custom-fields/:custom_field_id Successful response
	 */
	200: PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdSuccessfulResponse
}

export type PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdResponse = PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdResponses[keyof PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdResponses]

export type GetToolsCategoryData = {
	body?: never
	path: {
		/**
		 * GET /tools/:category parameter
		 */
		category: GetToolsCategoryParameterCategory
	}
	query?: never
	url: '/tools/{category}'
}

export type GetToolsCategoryErrors = {
	/**
	 * GET /tools/:category Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type GetToolsCategoryError = GetToolsCategoryErrors[keyof GetToolsCategoryErrors]

export type GetToolsCategoryResponses = {
	/**
	 * GET /tools/:category Successful response
	 */
	200: GetToolsCategorySuccessfulResponse
}

export type GetToolsCategoryResponse = GetToolsCategoryResponses[keyof GetToolsCategoryResponses]

export type PostHrisProvisioningGroupsGroupIdDiffData = {
	/**
	 * POST /hris/provisioning-groups/:group_id/diff request body
	 */
	body?: PostHrisProvisioningGroupsGroupIdDiffRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * ID of the provisioning group (currently only `default` is allowed).
		 */
		group_id: string
	}
	query?: never
	url: '/hris/provisioning-groups/{group_id}/diff'
}

export type PostHrisProvisioningGroupsGroupIdDiffErrors = {
	/**
	 * POST /hris/provisioning-groups/:group_id/diff Error response
	 */
	400: ErrorResponse
}

export type PostHrisProvisioningGroupsGroupIdDiffError = PostHrisProvisioningGroupsGroupIdDiffErrors[keyof PostHrisProvisioningGroupsGroupIdDiffErrors]

export type PostHrisProvisioningGroupsGroupIdDiffResponses = {
	/**
	 * POST /hris/provisioning-groups/:group_id/diff Successful response
	 */
	200: PostHrisProvisioningGroupsGroupIdDiffSuccessfulResponse
}

export type PostHrisProvisioningGroupsGroupIdDiffResponse = PostHrisProvisioningGroupsGroupIdDiffResponses[keyof PostHrisProvisioningGroupsGroupIdDiffResponses]

export type PostHrisProvisioningGroupsGroupIdSetupLinksData = {
	/**
	 * POST /hris/provisioning-groups/:group_id/setup-links request body
	 */
	body?: PostHrisProvisioningGroupsGroupIdSetupLinksRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * ID of the provisioning group (currently only `default` is allowed).
		 */
		group_id: string
	}
	query?: never
	url: '/hris/provisioning-groups/{group_id}/setup-links'
}

export type PostHrisProvisioningGroupsGroupIdSetupLinksErrors = {
	/**
	 * POST /hris/provisioning-groups/:group_id/setup-links Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostHrisProvisioningGroupsGroupIdSetupLinksError = PostHrisProvisioningGroupsGroupIdSetupLinksErrors[keyof PostHrisProvisioningGroupsGroupIdSetupLinksErrors]

export type PostHrisProvisioningGroupsGroupIdSetupLinksResponses = {
	/**
	 * POST /hris/provisioning-groups/:group_id/setup-links Successful response
	 */
	200: PostHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponse
}

export type PostHrisProvisioningGroupsGroupIdSetupLinksResponse = PostHrisProvisioningGroupsGroupIdSetupLinksResponses[keyof PostHrisProvisioningGroupsGroupIdSetupLinksResponses]

export type GetHrisEmployeesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisEmployeesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisEmployeesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisEmployeesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
		/**
		 * **(⚠️ Deprecated - Use the `employment_statuses` filter instead.)** Filter by the `employment_status` field.
		 */
		employment_status?: GetHrisEmployeesParameterEmploymentStatus
		/**
		 * Filter by a comma-separated list of `ACTIVE`, `PENDING`, `INACTIVE`, `LEAVE`
		 * * `ACTIVE`: the employee is **actively employed**
		 * * `PENDING`: the employee is **not actively employed yet** (but they signed their contract or are part of an onboarding process)
		 * * `INACTIVE`: a full-time employee is no longer employed, or, for a contract worker when their contract runs out
		 * * `LEAVE`: the employee is still employed but **currently on leave** (note that not all HR systems support this status — use our absences API for detailed information)
		 *
		 *
		 * Leave this blank to get results matching all values.
		 */
		employment_statuses?: string
		/**
		 * Filter by a comma-separated list of group IDs. We will only return employees that are members of _any_ of the groups.
		 */
		group_ids?: string
		/**
		 * Filter by a comma-separated list of legal entity IDs. We will only return employees that are members of _any_ of the legal entities.
		 */
		legal_entity_ids?: string
		/**
		 * Filter by a comma-separated list of work location IDs. We will only return employees who are at _any_ of the work locations.
		 */
		work_location_ids?: string
		/**
		 * Filter by a comma-separated list of work emails. We will only return employees who have _any_ of the work emails. The format of the emails is case-insensitive.
		 */
		work_emails?: string
		/**
		 * Filter by a comma-separated list of personal emails. We will only return employees who have _any_ of the personal emails. The format of the emails is case-insensitive.
		 */
		personal_emails?: string
	}
	url: '/hris/employees'
}

export type GetHrisEmployeesErrors = {
	/**
	 * GET /hris/employees Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisEmployeesError = GetHrisEmployeesErrors[keyof GetHrisEmployeesErrors]

export type GetHrisEmployeesResponses = {
	/**
	 * GET /hris/employees Successful response
	 */
	200: GetHrisEmployeesSuccessfulResponse
}

export type GetHrisEmployeesResponse = GetHrisEmployeesResponses[keyof GetHrisEmployeesResponses]

export type PostHrisEmployeesData = {
	/**
	 * POST /hris/employees request body
	 */
	body?: PostHrisEmployeesRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/hris/employees'
}

export type PostHrisEmployeesErrors = {
	/**
	 * POST /hris/employees Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostHrisEmployeesError = PostHrisEmployeesErrors[keyof PostHrisEmployeesErrors]

export type PostHrisEmployeesResponses = {
	/**
	 * POST /hris/employees Successful response
	 */
	200: PostHrisEmployeesSuccessfulResponse
}

export type PostHrisEmployeesResponse = PostHrisEmployeesResponses[keyof PostHrisEmployeesResponses]

export type PatchHrisEmployeesEmployeeIdData = {
	/**
	 * PATCH /hris/employees/:employee_id request body
	 */
	body?: PatchHrisEmployeesEmployeeIdRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
		 */
		employee_id: string
	}
	query?: never
	url: '/hris/employees/{employee_id}'
}

export type PatchHrisEmployeesEmployeeIdErrors = {
	/**
	 * PATCH /hris/employees/:employee_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PatchHrisEmployeesEmployeeIdError = PatchHrisEmployeesEmployeeIdErrors[keyof PatchHrisEmployeesEmployeeIdErrors]

export type PatchHrisEmployeesEmployeeIdResponses = {
	/**
	 * PATCH /hris/employees/:employee_id Successful response
	 */
	200: PatchHrisEmployeesEmployeeIdSuccessfulResponse
}

export type PatchHrisEmployeesEmployeeIdResponse = PatchHrisEmployeesEmployeeIdResponses[keyof PatchHrisEmployeesEmployeeIdResponses]

export type PostHrisEmployeesEmployeeIdDocumentsData = {
	/**
	 * POST /hris/employees/:employee_id/documents request body
	 */
	body?: PostHrisEmployeesEmployeeIdDocumentsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * POST /hris/employees/:employee_id/documents parameter
		 */
		employee_id: string
	}
	query?: never
	url: '/hris/employees/{employee_id}/documents'
}

export type PostHrisEmployeesEmployeeIdDocumentsErrors = {
	/**
	 * POST /hris/employees/:employee_id/documents Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostHrisEmployeesEmployeeIdDocumentsError = PostHrisEmployeesEmployeeIdDocumentsErrors[keyof PostHrisEmployeesEmployeeIdDocumentsErrors]

export type PostHrisEmployeesEmployeeIdDocumentsResponses = {
	/**
	 * POST /hris/employees/:employee_id/documents Successful response
	 */
	200: string
}

export type PostHrisEmployeesEmployeeIdDocumentsResponse = PostHrisEmployeesEmployeeIdDocumentsResponses[keyof PostHrisEmployeesEmployeeIdDocumentsResponses]

export type PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdData = {
	/**
	 * PATCH /hris/employees/:employee_id/integration-fields/:integration_field_id request body
	 */
	body?: PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the Employee you want to update.
		 */
		employee_id: string
		/**
		 * The Kombo ID of the integration field you want to update.
		 */
		integration_field_id: string
	}
	query?: never
	url: '/hris/employees/{employee_id}/integration-fields/{integration_field_id}'
}

export type PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdErrors = {
	/**
	 * PATCH /hris/employees/:employee_id/integration-fields/:integration_field_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdError = PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdErrors[keyof PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdErrors]

export type PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdResponses = {
	/**
	 * PATCH /hris/employees/:employee_id/integration-fields/:integration_field_id Successful response
	 */
	200: string
}

export type PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdResponse = PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdResponses[keyof PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdResponses]

export type GetHrisEmployeeDocumentCategoriesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisEmployeeDocumentCategoriesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisEmployeeDocumentCategoriesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisEmployeeDocumentCategoriesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/hris/employee-document-categories'
}

export type GetHrisEmployeeDocumentCategoriesErrors = {
	/**
	 * GET /hris/employee-document-categories Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisEmployeeDocumentCategoriesError = GetHrisEmployeeDocumentCategoriesErrors[keyof GetHrisEmployeeDocumentCategoriesErrors]

export type GetHrisEmployeeDocumentCategoriesResponses = {
	/**
	 * GET /hris/employee-document-categories Successful response
	 */
	200: GetHrisEmployeeDocumentCategoriesSuccessfulResponse
}

export type GetHrisEmployeeDocumentCategoriesResponse = GetHrisEmployeeDocumentCategoriesResponses[keyof GetHrisEmployeeDocumentCategoriesResponses]

export type GetHrisTeamsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisTeamsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisTeamsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisTeamsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/hris/teams'
}

export type GetHrisTeamsErrors = {
	/**
	 * GET /hris/teams Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisTeamsError = GetHrisTeamsErrors[keyof GetHrisTeamsErrors]

export type GetHrisTeamsResponses = {
	/**
	 * GET /hris/teams Successful response
	 */
	200: GetHrisTeamsSuccessfulResponse
}

export type GetHrisTeamsResponse = GetHrisTeamsResponses[keyof GetHrisTeamsResponses]

export type GetHrisGroupsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisGroupsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisGroupsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisGroupsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/hris/groups'
}

export type GetHrisGroupsErrors = {
	/**
	 * GET /hris/groups Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisGroupsError = GetHrisGroupsErrors[keyof GetHrisGroupsErrors]

export type GetHrisGroupsResponses = {
	/**
	 * GET /hris/groups Successful response
	 */
	200: GetHrisGroupsSuccessfulResponse
}

export type GetHrisGroupsResponse = GetHrisGroupsResponses[keyof GetHrisGroupsResponses]

export type GetHrisEmploymentsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisEmploymentsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisEmploymentsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisEmploymentsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/hris/employments'
}

export type GetHrisEmploymentsErrors = {
	/**
	 * GET /hris/employments Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisEmploymentsError = GetHrisEmploymentsErrors[keyof GetHrisEmploymentsErrors]

export type GetHrisEmploymentsResponses = {
	/**
	 * GET /hris/employments Successful response
	 */
	200: GetHrisEmploymentsSuccessfulResponse
}

export type GetHrisEmploymentsResponse = GetHrisEmploymentsResponses[keyof GetHrisEmploymentsResponses]

export type GetHrisLocationsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisLocationsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisLocationsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisLocationsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/hris/locations'
}

export type GetHrisLocationsErrors = {
	/**
	 * GET /hris/locations Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisLocationsError = GetHrisLocationsErrors[keyof GetHrisLocationsErrors]

export type GetHrisLocationsResponses = {
	/**
	 * GET /hris/locations Successful response
	 */
	200: GetHrisLocationsSuccessfulResponse
}

export type GetHrisLocationsResponse = GetHrisLocationsResponses[keyof GetHrisLocationsResponses]

export type GetHrisAbsenceTypesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisAbsenceTypesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisAbsenceTypesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisAbsenceTypesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/hris/absence-types'
}

export type GetHrisAbsenceTypesErrors = {
	/**
	 * GET /hris/absence-types Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisAbsenceTypesError = GetHrisAbsenceTypesErrors[keyof GetHrisAbsenceTypesErrors]

export type GetHrisAbsenceTypesResponses = {
	/**
	 * GET /hris/absence-types Successful response
	 */
	200: GetHrisAbsenceTypesSuccessfulResponse
}

export type GetHrisAbsenceTypesResponse = GetHrisAbsenceTypesResponses[keyof GetHrisAbsenceTypesResponses]

export type GetHrisTimeOffBalancesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisTimeOffBalancesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisTimeOffBalancesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisTimeOffBalancesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
		/**
		 * Filter by a specific employee using their ID.
		 */
		employee_id?: string
	}
	url: '/hris/time-off-balances'
}

export type GetHrisTimeOffBalancesErrors = {
	/**
	 * GET /hris/time-off-balances Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisTimeOffBalancesError = GetHrisTimeOffBalancesErrors[keyof GetHrisTimeOffBalancesErrors]

export type GetHrisTimeOffBalancesResponses = {
	/**
	 * GET /hris/time-off-balances Successful response
	 */
	200: GetHrisTimeOffBalancesSuccessfulResponse
}

export type GetHrisTimeOffBalancesResponse = GetHrisTimeOffBalancesResponses[keyof GetHrisTimeOffBalancesResponses]

export type GetHrisAbsencesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisAbsencesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisAbsencesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisAbsencesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
		/**
		 * Filter for all the absences that either start _or_ haven't ended yet on/after this day. If you imagine a calendar displaying absences, this defines the left-most visible day. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
		 */
		date_from?: GetHrisAbsencesParameterDateFrom
		/**
		 * Filter for absences that start on or before this day (but might continue after). If you imagine a calendar displaying absences, this defines the right-most visible day. This is a plain date (i.e., `yyyy-MM-dd`), all time information is discarded.
		 */
		date_until?: GetHrisAbsencesParameterDateUntil
		/**
		 * Filter by a comma-separated list of absence type IDs.
		 */
		type_ids?: string
		/**
		 * Filter by a specific employee using their ID.
		 */
		employee_id?: string
		/**
		 * **(⚠️ Deprecated - Use the `date_from` filter instead.)** Filter for absences that either start after or start before and end after a certain time.
		 */
		time_from?: GetHrisAbsencesParameterTimeFrom
		/**
		 * **(⚠️ Deprecated - Use the `date_until` filter instead.)** Filter for absences that start before a certain time.
		 */
		time_until?: GetHrisAbsencesParameterTimeUntil
	}
	url: '/hris/absences'
}

export type GetHrisAbsencesErrors = {
	/**
	 * GET /hris/absences Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisAbsencesError = GetHrisAbsencesErrors[keyof GetHrisAbsencesErrors]

export type GetHrisAbsencesResponses = {
	/**
	 * GET /hris/absences Successful response
	 */
	200: GetHrisAbsencesSuccessfulResponse
}

export type GetHrisAbsencesResponse = GetHrisAbsencesResponses[keyof GetHrisAbsencesResponses]

export type PostHrisAbsencesData = {
	/**
	 * POST /hris/absences request body
	 */
	body?: PostHrisAbsencesRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/hris/absences'
}

export type PostHrisAbsencesErrors = {
	/**
	 * POST /hris/absences Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostHrisAbsencesError = PostHrisAbsencesErrors[keyof PostHrisAbsencesErrors]

export type PostHrisAbsencesResponses = {
	/**
	 * POST /hris/absences Successful response
	 */
	200: PostHrisAbsencesSuccessfulResponse
}

export type PostHrisAbsencesResponse = PostHrisAbsencesResponses[keyof PostHrisAbsencesResponses]

export type DeleteHrisAbsencesAbsenceIdData = {
	/**
	 * DELETE /hris/absences/:absence_id request body
	 */
	body?: DeleteHrisAbsencesAbsenceIdRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the absence
		 */
		absence_id: string
	}
	query?: never
	url: '/hris/absences/{absence_id}'
}

export type DeleteHrisAbsencesAbsenceIdErrors = {
	/**
	 * DELETE /hris/absences/:absence_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type DeleteHrisAbsencesAbsenceIdError = DeleteHrisAbsencesAbsenceIdErrors[keyof DeleteHrisAbsencesAbsenceIdErrors]

export type DeleteHrisAbsencesAbsenceIdResponses = {
	/**
	 * DELETE /hris/absences/:absence_id Successful response
	 */
	200: DeleteHrisAbsencesAbsenceIdSuccessfulResponse
}

export type DeleteHrisAbsencesAbsenceIdResponse = DeleteHrisAbsencesAbsenceIdResponses[keyof DeleteHrisAbsencesAbsenceIdResponses]

export type GetHrisLegalEntitiesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetHrisLegalEntitiesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetHrisLegalEntitiesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetHrisLegalEntitiesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/hris/legal-entities'
}

export type GetHrisLegalEntitiesErrors = {
	/**
	 * GET /hris/legal-entities Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisLegalEntitiesError = GetHrisLegalEntitiesErrors[keyof GetHrisLegalEntitiesErrors]

export type GetHrisLegalEntitiesResponses = {
	/**
	 * GET /hris/legal-entities Successful response
	 */
	200: GetHrisLegalEntitiesSuccessfulResponse
}

export type GetHrisLegalEntitiesResponse = GetHrisLegalEntitiesResponses[keyof GetHrisLegalEntitiesResponses]

export type GetHrisAttendanceData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/hris/attendance'
}

export type GetHrisAttendanceErrors = {
	/**
	 * GET /hris/attendance Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisAttendanceError = GetHrisAttendanceErrors[keyof GetHrisAttendanceErrors]

export type GetHrisAttendanceResponses = {
	/**
	 * GET /hris/attendance Successful response
	 */
	200: string
}

export type GetHrisAttendanceResponse = GetHrisAttendanceResponses[keyof GetHrisAttendanceResponses]

export type GetHrisTimesheetsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/hris/timesheets'
}

export type GetHrisTimesheetsErrors = {
	/**
	 * GET /hris/timesheets Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetHrisTimesheetsError = GetHrisTimesheetsErrors[keyof GetHrisTimesheetsErrors]

export type GetHrisTimesheetsResponses = {
	/**
	 * GET /hris/timesheets Successful response
	 */
	200: string
}

export type GetHrisTimesheetsResponse = GetHrisTimesheetsResponses[keyof GetHrisTimesheetsResponses]

export type GetAtsApplicationsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsApplicationsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsApplicationsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsApplicationsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
		/**
		 * **(⚠️ Deprecated - Use the `outcomes` filter instead.)** Filter applications by outcome. This allows you to get applications that are for example `PENDING`, `HIRED`, or `DECLINED`.
		 */
		outcome?: GetAtsApplicationsParameterOutcome
		/**
		 * Filter by a comma-separated list of `PENDING`, `HIRED`, `DECLINED`
		 * * `PENDING`: The application is still being processed.
		 * * `HIRED`: The candidate was hired.
		 * * `DECLINED`: The candidate was declined.
		 *
		 *
		 * Leave this blank to get results matching all values.
		 */
		outcomes?: string
		/**
		 * Filter by a comma-separated list of job IDs. We will only return applications that are related to _any_ of the jobs.
		 */
		job_ids?: string
		/**
		 * Filter by a comma-separated list of job remote IDs. We will only return applications that are related to _any_ of the jobs.
		 */
		job_remote_ids?: string
		/**
		 * Filter applications by the day they were created in the remote system. This allows you to get applications that were created on or after a certain day.
		 */
		remote_created_after?: GetAtsApplicationsParameterRemoteCreatedAfter
	}
	url: '/ats/applications'
}

export type GetAtsApplicationsErrors = {
	/**
	 * GET /ats/applications Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsApplicationsError = GetAtsApplicationsErrors[keyof GetAtsApplicationsErrors]

export type GetAtsApplicationsResponses = {
	/**
	 * GET /ats/applications Successful response
	 */
	200: GetAtsApplicationsSuccessfulResponse
}

export type GetAtsApplicationsResponse = GetAtsApplicationsResponses[keyof GetAtsApplicationsResponses]

export type PutAtsApplicationsApplicationIdStageData = {
	/**
	 * PUT /ats/applications/:application_id/stage request body
	 */
	body?: PutAtsApplicationsApplicationIdStageRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the application you want to move to a different stage.
		 */
		application_id: string
	}
	query?: never
	url: '/ats/applications/{application_id}/stage'
}

export type PutAtsApplicationsApplicationIdStageErrors = {
	/**
	 * PUT /ats/applications/:application_id/stage Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PutAtsApplicationsApplicationIdStageError = PutAtsApplicationsApplicationIdStageErrors[keyof PutAtsApplicationsApplicationIdStageErrors]

export type PutAtsApplicationsApplicationIdStageResponses = {
	/**
	 * PUT /ats/applications/:application_id/stage Successful response
	 */
	200: string
}

export type PutAtsApplicationsApplicationIdStageResponse = PutAtsApplicationsApplicationIdStageResponses[keyof PutAtsApplicationsApplicationIdStageResponses]

export type PostAtsApplicationsApplicationIdResultLinksData = {
	/**
	 * POST /ats/applications/:application_id/result-links request body
	 */
	body?: PostAtsApplicationsApplicationIdResultLinksRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the application you want to create the link for.
		 */
		application_id: string
	}
	query?: never
	url: '/ats/applications/{application_id}/result-links'
}

export type PostAtsApplicationsApplicationIdResultLinksErrors = {
	/**
	 * POST /ats/applications/:application_id/result-links Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsApplicationsApplicationIdResultLinksError = PostAtsApplicationsApplicationIdResultLinksErrors[keyof PostAtsApplicationsApplicationIdResultLinksErrors]

export type PostAtsApplicationsApplicationIdResultLinksResponses = {
	/**
	 * POST /ats/applications/:application_id/result-links Successful response
	 */
	200: string
}

export type PostAtsApplicationsApplicationIdResultLinksResponse = PostAtsApplicationsApplicationIdResultLinksResponses[keyof PostAtsApplicationsApplicationIdResultLinksResponses]

export type PostAtsApplicationsApplicationIdNotesData = {
	/**
	 * POST /ats/applications/:application_id/notes request body
	 */
	body?: PostAtsApplicationsApplicationIdNotesRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the application you want to create the note for.
		 */
		application_id: string
	}
	query?: never
	url: '/ats/applications/{application_id}/notes'
}

export type PostAtsApplicationsApplicationIdNotesErrors = {
	/**
	 * POST /ats/applications/:application_id/notes Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsApplicationsApplicationIdNotesError = PostAtsApplicationsApplicationIdNotesErrors[keyof PostAtsApplicationsApplicationIdNotesErrors]

export type PostAtsApplicationsApplicationIdNotesResponses = {
	/**
	 * POST /ats/applications/:application_id/notes Successful response
	 */
	200: string
}

export type PostAtsApplicationsApplicationIdNotesResponse = PostAtsApplicationsApplicationIdNotesResponses[keyof PostAtsApplicationsApplicationIdNotesResponses]

export type GetAtsApplicationsApplicationIdAttachmentsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the application you want to obtain attachments for.
		 */
		application_id: string
	}
	query?: never
	url: '/ats/applications/{application_id}/attachments'
}

export type GetAtsApplicationsApplicationIdAttachmentsErrors = {
	/**
	 * GET /ats/applications/:application_id/attachments Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsApplicationsApplicationIdAttachmentsError = GetAtsApplicationsApplicationIdAttachmentsErrors[keyof GetAtsApplicationsApplicationIdAttachmentsErrors]

export type GetAtsApplicationsApplicationIdAttachmentsResponses = {
	/**
	 * GET /ats/applications/:application_id/attachments Successful response
	 */
	200: GetAtsApplicationsApplicationIdAttachmentsSuccessfulResponse
}

export type GetAtsApplicationsApplicationIdAttachmentsResponse = GetAtsApplicationsApplicationIdAttachmentsResponses[keyof GetAtsApplicationsApplicationIdAttachmentsResponses]

export type PostAtsApplicationsApplicationIdAttachmentsData = {
	/**
	 * POST /ats/applications/:application_id/attachments request body
	 */
	body?: PostAtsApplicationsApplicationIdAttachmentsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * POST /ats/applications/:application_id/attachments parameter
		 */
		application_id: string
	}
	query?: never
	url: '/ats/applications/{application_id}/attachments'
}

export type PostAtsApplicationsApplicationIdAttachmentsErrors = {
	/**
	 * POST /ats/applications/:application_id/attachments Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsApplicationsApplicationIdAttachmentsError = PostAtsApplicationsApplicationIdAttachmentsErrors[keyof PostAtsApplicationsApplicationIdAttachmentsErrors]

export type PostAtsApplicationsApplicationIdAttachmentsResponses = {
	/**
	 * POST /ats/applications/:application_id/attachments Successful response
	 */
	200: string
}

export type PostAtsApplicationsApplicationIdAttachmentsResponse = PostAtsApplicationsApplicationIdAttachmentsResponses[keyof PostAtsApplicationsApplicationIdAttachmentsResponses]

export type PostAtsApplicationsApplicationIdRejectData = {
	/**
	 * POST /ats/applications/:application_id/reject request body
	 */
	body?: PostAtsApplicationsApplicationIdRejectRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the application you want to reject.
		 */
		application_id: string
	}
	query?: never
	url: '/ats/applications/{application_id}/reject'
}

export type PostAtsApplicationsApplicationIdRejectErrors = {
	/**
	 * POST /ats/applications/:application_id/reject Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsApplicationsApplicationIdRejectError = PostAtsApplicationsApplicationIdRejectErrors[keyof PostAtsApplicationsApplicationIdRejectErrors]

export type PostAtsApplicationsApplicationIdRejectResponses = {
	/**
	 * POST /ats/applications/:application_id/reject Successful response
	 */
	200: string
}

export type PostAtsApplicationsApplicationIdRejectResponse = PostAtsApplicationsApplicationIdRejectResponses[keyof PostAtsApplicationsApplicationIdRejectResponses]

export type GetAtsCandidatesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsCandidatesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsCandidatesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsCandidatesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
		/**
		 * Filter the candidates based on an email address. When set, returns only the candidates where the given `email` is in `email_addresses`. This filter is case-insensitive.
		 */
		email?: string
		/**
		 * Filter by a comma-separated list of job IDs. We will only return candidates that have applied to _any_ of the jobs.
		 */
		job_ids?: string
	}
	url: '/ats/candidates'
}

export type GetAtsCandidatesErrors = {
	/**
	 * GET /ats/candidates Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsCandidatesError = GetAtsCandidatesErrors[keyof GetAtsCandidatesErrors]

export type GetAtsCandidatesResponses = {
	/**
	 * GET /ats/candidates Successful response
	 */
	200: GetAtsCandidatesSuccessfulResponse
}

export type GetAtsCandidatesResponse = GetAtsCandidatesResponses[keyof GetAtsCandidatesResponses]

export type PostAtsCandidatesData = {
	/**
	 * POST /ats/candidates request body
	 */
	body?: PostAtsCandidatesRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/ats/candidates'
}

export type PostAtsCandidatesErrors = {
	/**
	 * POST /ats/candidates Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsCandidatesError = PostAtsCandidatesErrors[keyof PostAtsCandidatesErrors]

export type PostAtsCandidatesResponses = {
	/**
	 * POST /ats/candidates Successful response
	 */
	200: PostAtsCandidatesSuccessfulResponse
}

export type PostAtsCandidatesResponse = PostAtsCandidatesResponses[keyof PostAtsCandidatesResponses]

export type PatchAtsCandidatesCandidateIdData = {
	/**
	 * PATCH /ats/candidates/:candidate_id request body
	 */
	body?: {
		[key: string]: unknown
	}
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * PATCH /ats/candidates/:candidate_id parameter
		 */
		candidate_id: string
	}
	query?: never
	url: '/ats/candidates/{candidate_id}'
}

export type PatchAtsCandidatesCandidateIdErrors = {
	/**
	 * PATCH /ats/candidates/:candidate_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PatchAtsCandidatesCandidateIdError = PatchAtsCandidatesCandidateIdErrors[keyof PatchAtsCandidatesCandidateIdErrors]

export type PatchAtsCandidatesCandidateIdResponses = {
	/**
	 * PATCH /ats/candidates/:candidate_id Successful response
	 */
	200: string
}

export type PatchAtsCandidatesCandidateIdResponse = PatchAtsCandidatesCandidateIdResponses[keyof PatchAtsCandidatesCandidateIdResponses]

export type GetAtsCandidatesCandidateIdAttachmentsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the candidate you want to obtain attachments for.
		 */
		candidate_id: string
	}
	query?: never
	url: '/ats/candidates/{candidate_id}/attachments'
}

export type GetAtsCandidatesCandidateIdAttachmentsErrors = {
	/**
	 * GET /ats/candidates/:candidate_id/attachments Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsCandidatesCandidateIdAttachmentsError = GetAtsCandidatesCandidateIdAttachmentsErrors[keyof GetAtsCandidatesCandidateIdAttachmentsErrors]

export type GetAtsCandidatesCandidateIdAttachmentsResponses = {
	/**
	 * GET /ats/candidates/:candidate_id/attachments Successful response
	 */
	200: GetAtsCandidatesCandidateIdAttachmentsSuccessfulResponse
}

export type GetAtsCandidatesCandidateIdAttachmentsResponse = GetAtsCandidatesCandidateIdAttachmentsResponses[keyof GetAtsCandidatesCandidateIdAttachmentsResponses]

export type PostAtsCandidatesCandidateIdAttachmentsData = {
	/**
	 * POST /ats/candidates/:candidate_id/attachments request body
	 */
	body?: PostAtsCandidatesCandidateIdAttachmentsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the candidate you want to add the attachment to.
		 */
		candidate_id: string
	}
	query?: never
	url: '/ats/candidates/{candidate_id}/attachments'
}

export type PostAtsCandidatesCandidateIdAttachmentsErrors = {
	/**
	 * POST /ats/candidates/:candidate_id/attachments Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsCandidatesCandidateIdAttachmentsError = PostAtsCandidatesCandidateIdAttachmentsErrors[keyof PostAtsCandidatesCandidateIdAttachmentsErrors]

export type PostAtsCandidatesCandidateIdAttachmentsResponses = {
	/**
	 * POST /ats/candidates/:candidate_id/attachments Successful response
	 */
	200: string
}

export type PostAtsCandidatesCandidateIdAttachmentsResponse = PostAtsCandidatesCandidateIdAttachmentsResponses[keyof PostAtsCandidatesCandidateIdAttachmentsResponses]

export type PostAtsCandidatesCandidateIdResultLinksData = {
	/**
	 * POST /ats/candidates/:candidate_id/result-links request body
	 */
	body?: PostAtsCandidatesCandidateIdResultLinksRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the candidate you want to add the result link to.
		 */
		candidate_id: string
	}
	query?: never
	url: '/ats/candidates/{candidate_id}/result-links'
}

export type PostAtsCandidatesCandidateIdResultLinksErrors = {
	/**
	 * POST /ats/candidates/:candidate_id/result-links Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsCandidatesCandidateIdResultLinksError = PostAtsCandidatesCandidateIdResultLinksErrors[keyof PostAtsCandidatesCandidateIdResultLinksErrors]

export type PostAtsCandidatesCandidateIdResultLinksResponses = {
	/**
	 * POST /ats/candidates/:candidate_id/result-links Successful response
	 */
	200: string
}

export type PostAtsCandidatesCandidateIdResultLinksResponse = PostAtsCandidatesCandidateIdResultLinksResponses[keyof PostAtsCandidatesCandidateIdResultLinksResponses]

export type DeleteAtsCandidatesCandidateIdTagsData = {
	/**
	 * DELETE /ats/candidates/:candidate_id/tags request body
	 */
	body?: DeleteAtsCandidatesCandidateIdTagsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the candidate you want to remove the tag from.
		 */
		candidate_id: string
	}
	query?: never
	url: '/ats/candidates/{candidate_id}/tags'
}

export type DeleteAtsCandidatesCandidateIdTagsErrors = {
	/**
	 * DELETE /ats/candidates/:candidate_id/tags Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type DeleteAtsCandidatesCandidateIdTagsError = DeleteAtsCandidatesCandidateIdTagsErrors[keyof DeleteAtsCandidatesCandidateIdTagsErrors]

export type DeleteAtsCandidatesCandidateIdTagsResponses = {
	/**
	 * DELETE /ats/candidates/:candidate_id/tags Successful response
	 */
	200: string
}

export type DeleteAtsCandidatesCandidateIdTagsResponse = DeleteAtsCandidatesCandidateIdTagsResponses[keyof DeleteAtsCandidatesCandidateIdTagsResponses]

export type PostAtsCandidatesCandidateIdTagsData = {
	/**
	 * POST /ats/candidates/:candidate_id/tags request body
	 */
	body?: PostAtsCandidatesCandidateIdTagsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the candidate you want to add the tag to.
		 */
		candidate_id: string
	}
	query?: never
	url: '/ats/candidates/{candidate_id}/tags'
}

export type PostAtsCandidatesCandidateIdTagsErrors = {
	/**
	 * POST /ats/candidates/:candidate_id/tags Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsCandidatesCandidateIdTagsError = PostAtsCandidatesCandidateIdTagsErrors[keyof PostAtsCandidatesCandidateIdTagsErrors]

export type PostAtsCandidatesCandidateIdTagsResponses = {
	/**
	 * POST /ats/candidates/:candidate_id/tags Successful response
	 */
	200: string
}

export type PostAtsCandidatesCandidateIdTagsResponse = PostAtsCandidatesCandidateIdTagsResponses[keyof PostAtsCandidatesCandidateIdTagsResponses]

export type PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdData = {
	/**
	 * PATCH /ats/candidates/:candidate_id/integration-fields/:integration_field_id request body
	 */
	body?: PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID of the Candidate you want to update.
		 */
		candidate_id: string
		/**
		 * The Kombo ID of the integration field you want to update.
		 */
		integration_field_id: string
	}
	query?: never
	url: '/ats/candidates/{candidate_id}/integration-fields/{integration_field_id}'
}

export type PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdErrors = {
	/**
	 * PATCH /ats/candidates/:candidate_id/integration-fields/:integration_field_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdError = PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdErrors[keyof PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdErrors]

export type PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdResponses = {
	/**
	 * PATCH /ats/candidates/:candidate_id/integration-fields/:integration_field_id Successful response
	 */
	200: string
}

export type PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdResponse = PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdResponses[keyof PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdResponses]

export type GetAtsTagsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsTagsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsTagsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsTagsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/ats/tags'
}

export type GetAtsTagsErrors = {
	/**
	 * GET /ats/tags Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsTagsError = GetAtsTagsErrors[keyof GetAtsTagsErrors]

export type GetAtsTagsResponses = {
	/**
	 * GET /ats/tags Successful response
	 */
	200: GetAtsTagsSuccessfulResponse
}

export type GetAtsTagsResponse = GetAtsTagsResponses[keyof GetAtsTagsResponses]

export type GetAtsApplicationStagesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsApplicationStagesParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsApplicationStagesParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsApplicationStagesParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/ats/application-stages'
}

export type GetAtsApplicationStagesErrors = {
	/**
	 * GET /ats/application-stages Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsApplicationStagesError = GetAtsApplicationStagesErrors[keyof GetAtsApplicationStagesErrors]

export type GetAtsApplicationStagesResponses = {
	/**
	 * GET /ats/application-stages Successful response
	 */
	200: GetAtsApplicationStagesSuccessfulResponse
}

export type GetAtsApplicationStagesResponse = GetAtsApplicationStagesResponses[keyof GetAtsApplicationStagesResponses]

export type GetAtsJobsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsJobsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsJobsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsJobsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
		/**
		 * Filter by a comma-separated list of job codes.
		 */
		job_codes?: string
		/**
		 * Filter by the `post_url` field. Can be used to find a job based on its public posting URL.
		 */
		post_url?: string
		/**
		 * **(⚠️ Deprecated - Use the `statuses` filter instead.)** Filter by the `status` field. Can be used to find a job based on its status.
		 */
		status?: GetAtsJobsParameterStatus
		/**
		 * Filter by a comma-separated list of `OPEN`, `CLOSED`, `DRAFT`, `ARCHIVED`
		 *
		 * Leave this blank to get results matching all values.
		 */
		statuses?: string
		/**
		 * Filter by a comma-separated list of `FULL_TIME`, `PART_TIME`, `CONTRACT`, `SEASONAL`, `INTERNSHIP`
		 *
		 * Leave this blank to get results matching all values.
		 */
		employment_types?: string
		/**
		 * Filter by a comma-separated list of `PUBLIC`, `INTERNAL`, `UNLISTED`, `CONFIDENTIAL`
		 *
		 * Leave this blank to get results matching all values.
		 */
		visibilities?: string
		/**
		 * Filter jobs by the day they were created in the remote system. This allows you to get jobs that were created on or after a certain day.
		 */
		remote_created_after?: GetAtsJobsParameterRemoteCreatedAfter
		/**
		 * Filter by the `name` field. Can be used to find a job by keywords present in the job name.
		 */
		name_contains?: string
	}
	url: '/ats/jobs'
}

export type GetAtsJobsErrors = {
	/**
	 * GET /ats/jobs Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsJobsError = GetAtsJobsErrors[keyof GetAtsJobsErrors]

export type GetAtsJobsResponses = {
	/**
	 * GET /ats/jobs Successful response
	 */
	200: GetAtsJobsSuccessfulResponse
}

export type GetAtsJobsResponse = GetAtsJobsResponses[keyof GetAtsJobsResponses]

export type PostAtsJobsJobIdApplicationsData = {
	/**
	 * POST /ats/jobs/:job_id/applications request body
	 */
	body?: PostAtsJobsJobIdApplicationsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * The Kombo ID or Remote ID of the Job this candidate should apply for. If you want to use the ID of the integrated system (remote_id) you need to prefix the id with "remote:". You can use the remote ID if you do not want to sync jobs.
		 */
		job_id: string
	}
	query?: never
	url: '/ats/jobs/{job_id}/applications'
}

export type PostAtsJobsJobIdApplicationsErrors = {
	/**
	 * POST /ats/jobs/:job_id/applications Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostAtsJobsJobIdApplicationsError = PostAtsJobsJobIdApplicationsErrors[keyof PostAtsJobsJobIdApplicationsErrors]

export type PostAtsJobsJobIdApplicationsResponses = {
	/**
	 * POST /ats/jobs/:job_id/applications Successful response
	 */
	200: PostAtsJobsJobIdApplicationsSuccessfulResponse
}

export type PostAtsJobsJobIdApplicationsResponse = PostAtsJobsJobIdApplicationsResponses[keyof PostAtsJobsJobIdApplicationsResponses]

export type GetAtsUsersData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsUsersParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsUsersParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsUsersParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/ats/users'
}

export type GetAtsUsersErrors = {
	/**
	 * GET /ats/users Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsUsersError = GetAtsUsersErrors[keyof GetAtsUsersErrors]

export type GetAtsUsersResponses = {
	/**
	 * GET /ats/users Successful response
	 */
	200: GetAtsUsersSuccessfulResponse
}

export type GetAtsUsersResponse = GetAtsUsersResponses[keyof GetAtsUsersResponses]

export type GetAtsOffersData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsOffersParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsOffersParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsOffersParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/ats/offers'
}

export type GetAtsOffersErrors = {
	/**
	 * GET /ats/offers Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsOffersError = GetAtsOffersErrors[keyof GetAtsOffersErrors]

export type GetAtsOffersResponses = {
	/**
	 * GET /ats/offers Successful response
	 */
	200: GetAtsOffersSuccessfulResponse
}

export type GetAtsOffersResponse = GetAtsOffersResponses[keyof GetAtsOffersResponses]

export type GetAtsRejectionReasonsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAtsRejectionReasonsParameterPageSize
		/**
		 * Filter the entries based on the modification date in format YYYY-MM-DDTHH:mm:ss.sssZ. If you want to track entry deletion, also set the `include_deleted=true` query parameter, because otherwise, deleted entries will be hidden.
		 */
		updated_after?: GetAtsRejectionReasonsParameterUpdatedAfter
		/**
		 * By default, deleted entries are not returned. Use the `include_deleted` query param to include deleted entries too.
		 */
		include_deleted?: GetAtsRejectionReasonsParameterIncludeDeleted
		/**
		 * Filter by a comma-separated list of IDs such as `222k7eCGyUdgt2JWZDNnkDs3,B5DVmypWENfU6eMe6gYDyJG3`. Those IDs are validated to be 24 characters long and to exist for this integration in the database. If any of the IDs don't exist, the endpoint will return a 404 error.
		 */
		ids?: string
		/**
		 * Filter by a comma-separated list of remote IDs.
		 */
		remote_ids?: string
	}
	url: '/ats/rejection-reasons'
}

export type GetAtsRejectionReasonsErrors = {
	/**
	 * GET /ats/rejection-reasons Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAtsRejectionReasonsError = GetAtsRejectionReasonsErrors[keyof GetAtsRejectionReasonsErrors]

export type GetAtsRejectionReasonsResponses = {
	/**
	 * GET /ats/rejection-reasons Successful response
	 */
	200: GetAtsRejectionReasonsSuccessfulResponse
}

export type GetAtsRejectionReasonsResponse = GetAtsRejectionReasonsResponses[keyof GetAtsRejectionReasonsResponses]

export type GetAssessmentPackagesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/assessment/packages'
}

export type GetAssessmentPackagesErrors = {
	/**
	 * GET /assessment/packages Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAssessmentPackagesError = GetAssessmentPackagesErrors[keyof GetAssessmentPackagesErrors]

export type GetAssessmentPackagesResponses = {
	/**
	 * GET /assessment/packages Successful response
	 */
	200: GetAssessmentPackagesSuccessfulResponse
}

export type GetAssessmentPackagesResponse = GetAssessmentPackagesResponses[keyof GetAssessmentPackagesResponses]

export type PutAssessmentPackagesData = {
	/**
	 * PUT /assessment/packages request body
	 */
	body?: PutAssessmentPackagesRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/assessment/packages'
}

export type PutAssessmentPackagesErrors = {
	/**
	 * PUT /assessment/packages Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PutAssessmentPackagesError = PutAssessmentPackagesErrors[keyof PutAssessmentPackagesErrors]

export type PutAssessmentPackagesResponses = {
	/**
	 * PUT /assessment/packages Successful response
	 */
	200: string
}

export type PutAssessmentPackagesResponse = PutAssessmentPackagesResponses[keyof PutAssessmentPackagesResponses]

export type GetAssessmentOrdersOpenData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: {
		/**
		 * An optional cursor string used for pagination. This can be retrieved from the `next` property of the previous page response.
		 */
		cursor?: string
		/**
		 * The number of results to return per page. Maximum is 250.
		 */
		page_size?: GetAssessmentOrdersOpenParameterPageSize
	}
	url: '/assessment/orders/open'
}

export type GetAssessmentOrdersOpenErrors = {
	/**
	 * GET /assessment/orders/open Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetAssessmentOrdersOpenError = GetAssessmentOrdersOpenErrors[keyof GetAssessmentOrdersOpenErrors]

export type GetAssessmentOrdersOpenResponses = {
	/**
	 * GET /assessment/orders/open Successful response
	 */
	200: GetAssessmentOrdersOpenSuccessfulResponse
}

export type GetAssessmentOrdersOpenResponse = GetAssessmentOrdersOpenResponses[keyof GetAssessmentOrdersOpenResponses]

export type PutAssessmentOrdersAssessmentOrderIdResultData = {
	/**
	 * PUT /assessment/orders/:assessment_order_id/result request body
	 */
	body?: PutAssessmentOrdersAssessmentOrderIdResultRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * PUT /assessment/orders/:assessment_order_id/result parameter
		 */
		assessment_order_id: string
	}
	query?: never
	url: '/assessment/orders/{assessment_order_id}/result'
}

export type PutAssessmentOrdersAssessmentOrderIdResultErrors = {
	/**
	 * PUT /assessment/orders/:assessment_order_id/result Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PutAssessmentOrdersAssessmentOrderIdResultError = PutAssessmentOrdersAssessmentOrderIdResultErrors[keyof PutAssessmentOrdersAssessmentOrderIdResultErrors]

export type PutAssessmentOrdersAssessmentOrderIdResultResponses = {
	/**
	 * PUT /assessment/orders/:assessment_order_id/result Successful response
	 */
	200: string
}

export type PutAssessmentOrdersAssessmentOrderIdResultResponse = PutAssessmentOrdersAssessmentOrderIdResultResponses[keyof PutAssessmentOrdersAssessmentOrderIdResultResponses]

export type PostConnectCreateLinkData = {
	/**
	 * POST /connect/create-link request body
	 */
	body?: PostConnectCreateLinkRequestBody
	path?: never
	query?: never
	url: '/connect/create-link'
}

export type PostConnectCreateLinkErrors = {
	/**
	 * POST /connect/create-link Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type PostConnectCreateLinkError = PostConnectCreateLinkErrors[keyof PostConnectCreateLinkErrors]

export type PostConnectCreateLinkResponses = {
	/**
	 * POST /connect/create-link Successful response
	 */
	200: PostConnectCreateLinkSuccessfulResponse
}

export type PostConnectCreateLinkResponse = PostConnectCreateLinkResponses[keyof PostConnectCreateLinkResponses]

export type GetConnectIntegrationByTokenTokenData = {
	body?: never
	path: {
		/**
		 * GET /connect/integration-by-token/:token parameter
		 */
		token: string
	}
	query?: never
	url: '/connect/integration-by-token/{token}'
}

export type GetConnectIntegrationByTokenTokenErrors = {
	/**
	 * GET /connect/integration-by-token/:token Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type GetConnectIntegrationByTokenTokenError = GetConnectIntegrationByTokenTokenErrors[keyof GetConnectIntegrationByTokenTokenErrors]

export type GetConnectIntegrationByTokenTokenResponses = {
	/**
	 * GET /connect/integration-by-token/:token Successful response
	 */
	200: GetConnectIntegrationByTokenTokenSuccessfulResponse
}

export type GetConnectIntegrationByTokenTokenResponse = GetConnectIntegrationByTokenTokenResponses[keyof GetConnectIntegrationByTokenTokenResponses]

export type PostConnectActivateIntegrationData = {
	/**
	 * POST /connect/activate-integration request body
	 */
	body?: PostConnectActivateIntegrationRequestBody
	path?: never
	query?: never
	url: '/connect/activate-integration'
}

export type PostConnectActivateIntegrationErrors = {
	/**
	 * POST /connect/activate-integration Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type PostConnectActivateIntegrationError = PostConnectActivateIntegrationErrors[keyof PostConnectActivateIntegrationErrors]

export type PostConnectActivateIntegrationResponses = {
	/**
	 * POST /connect/activate-integration Successful response
	 */
	200: PostConnectActivateIntegrationSuccessfulResponse
}

export type PostConnectActivateIntegrationResponse = PostConnectActivateIntegrationResponses[keyof PostConnectActivateIntegrationResponses]

export type GetCustomDatevSystemInformationData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/system-information'
}

export type GetCustomDatevSystemInformationErrors = {
	/**
	 * GET /custom/datev/system-information Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
}

export type GetCustomDatevSystemInformationError = GetCustomDatevSystemInformationErrors[keyof GetCustomDatevSystemInformationErrors]

export type GetCustomDatevSystemInformationResponses = {
	/**
	 * GET /custom/datev/system-information Successful response
	 */
	200: GetCustomDatevSystemInformationSuccessfulResponse
}

export type GetCustomDatevSystemInformationResponse = GetCustomDatevSystemInformationResponses[keyof GetCustomDatevSystemInformationResponses]

export type PostCustomDatevPassthroughData = {
	/**
	 * POST /custom/datev/passthrough request body
	 */
	body?: PostCustomDatevPassthroughRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/passthrough'
}

export type PostCustomDatevPassthroughErrors = {
	/**
	 * POST /custom/datev/passthrough Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostCustomDatevPassthroughError = PostCustomDatevPassthroughErrors[keyof PostCustomDatevPassthroughErrors]

export type PostCustomDatevPassthroughResponses = {
	/**
	 * POST /custom/datev/passthrough Successful response
	 */
	200: string
}

export type PostCustomDatevPassthroughResponse = PostCustomDatevPassthroughResponses[keyof PostCustomDatevPassthroughResponses]

export type GetCustomDatevCheckEauPermissionData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/check-eau-permission'
}

export type GetCustomDatevCheckEauPermissionErrors = {
	/**
	 * GET /custom/datev/check-eau-permission Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetCustomDatevCheckEauPermissionError = GetCustomDatevCheckEauPermissionErrors[keyof GetCustomDatevCheckEauPermissionErrors]

export type GetCustomDatevCheckEauPermissionResponses = {
	/**
	 * GET /custom/datev/check-eau-permission Successful response
	 */
	200: GetCustomDatevCheckEauPermissionSuccessfulResponse
}

export type GetCustomDatevCheckEauPermissionResponse = GetCustomDatevCheckEauPermissionResponses[keyof GetCustomDatevCheckEauPermissionResponses]

export type GetCustomDatevEauRequestsEauIdData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * GET /custom/datev/eau-requests/:eau_id parameter
		 */
		eau_id: string
	}
	query?: never
	url: '/custom/datev/eau-requests/{eau_id}'
}

export type GetCustomDatevEauRequestsEauIdErrors = {
	/**
	 * GET /custom/datev/eau-requests/:eau_id Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetCustomDatevEauRequestsEauIdError = GetCustomDatevEauRequestsEauIdErrors[keyof GetCustomDatevEauRequestsEauIdErrors]

export type GetCustomDatevEauRequestsEauIdResponses = {
	/**
	 * GET /custom/datev/eau-requests/:eau_id Successful response
	 */
	200: GetCustomDatevEauRequestsEauIdSuccessfulResponse
}

export type GetCustomDatevEauRequestsEauIdResponse = GetCustomDatevEauRequestsEauIdResponses[keyof GetCustomDatevEauRequestsEauIdResponses]

export type GetCustomDatevCheckDocumentPermissionData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/check-document-permission'
}

export type GetCustomDatevCheckDocumentPermissionErrors = {
	/**
	 * GET /custom/datev/check-document-permission Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetCustomDatevCheckDocumentPermissionError = GetCustomDatevCheckDocumentPermissionErrors[keyof GetCustomDatevCheckDocumentPermissionErrors]

export type GetCustomDatevCheckDocumentPermissionResponses = {
	/**
	 * GET /custom/datev/check-document-permission Successful response
	 */
	200: GetCustomDatevCheckDocumentPermissionSuccessfulResponse
}

export type GetCustomDatevCheckDocumentPermissionResponse = GetCustomDatevCheckDocumentPermissionResponses[keyof GetCustomDatevCheckDocumentPermissionResponses]

export type GetCustomDatevAvailableDocumentsData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query: {
		/**
		 * Provide the period in the format YYYY-MM for which to check for available documents.
		 */
		period: string
	}
	url: '/custom/datev/available-documents'
}

export type GetCustomDatevAvailableDocumentsErrors = {
	/**
	 * GET /custom/datev/available-documents Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetCustomDatevAvailableDocumentsError = GetCustomDatevAvailableDocumentsErrors[keyof GetCustomDatevAvailableDocumentsErrors]

export type GetCustomDatevAvailableDocumentsResponses = {
	/**
	 * GET /custom/datev/available-documents Successful response
	 */
	200: GetCustomDatevAvailableDocumentsSuccessfulResponse
}

export type GetCustomDatevAvailableDocumentsResponse = GetCustomDatevAvailableDocumentsResponses[keyof GetCustomDatevAvailableDocumentsResponses]

export type PostCustomDatevDownloadDocumentData = {
	/**
	 * POST /custom/datev/download-document request body
	 */
	body?: PostCustomDatevDownloadDocumentRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/download-document'
}

export type PostCustomDatevDownloadDocumentErrors = {
	/**
	 * POST /custom/datev/download-document Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostCustomDatevDownloadDocumentError = PostCustomDatevDownloadDocumentErrors[keyof PostCustomDatevDownloadDocumentErrors]

export type PostCustomDatevDownloadDocumentResponses = {
	/**
	 * POST /custom/datev/download-document Successful response
	 */
	200: PostCustomDatevDownloadDocumentSuccessfulResponse
}

export type PostCustomDatevDownloadDocumentResponse = PostCustomDatevDownloadDocumentResponses[keyof PostCustomDatevDownloadDocumentResponses]

export type PostCustomDatevEmployeesEmployeeIdDownloadDocumentData = {
	/**
	 * POST /custom/datev/employees/:employee_id/download-document request body
	 */
	body?: PostCustomDatevEmployeesEmployeeIdDownloadDocumentRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * POST /custom/datev/employees/:employee_id/download-document parameter
		 */
		employee_id: string
	}
	query?: never
	url: '/custom/datev/employees/{employee_id}/download-document'
}

export type PostCustomDatevEmployeesEmployeeIdDownloadDocumentErrors = {
	/**
	 * POST /custom/datev/employees/:employee_id/download-document Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostCustomDatevEmployeesEmployeeIdDownloadDocumentError = PostCustomDatevEmployeesEmployeeIdDownloadDocumentErrors[keyof PostCustomDatevEmployeesEmployeeIdDownloadDocumentErrors]

export type PostCustomDatevEmployeesEmployeeIdDownloadDocumentResponses = {
	/**
	 * POST /custom/datev/employees/:employee_id/download-document Successful response
	 */
	200: PostCustomDatevEmployeesEmployeeIdDownloadDocumentSuccessfulResponse
}

export type PostCustomDatevEmployeesEmployeeIdDownloadDocumentResponse = PostCustomDatevEmployeesEmployeeIdDownloadDocumentResponses[keyof PostCustomDatevEmployeesEmployeeIdDownloadDocumentResponses]

export type PostCustomDatevEmployeesEmployeeIdEauRequestsData = {
	/**
	 * POST /custom/datev/employees/:employee_id/eau-requests request body
	 */
	body?: PostCustomDatevEmployeesEmployeeIdEauRequestsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
		 */
		employee_id: string
	}
	query?: never
	url: '/custom/datev/employees/{employee_id}/eau-requests'
}

export type PostCustomDatevEmployeesEmployeeIdEauRequestsErrors = {
	/**
	 * POST /custom/datev/employees/:employee_id/eau-requests Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostCustomDatevEmployeesEmployeeIdEauRequestsError = PostCustomDatevEmployeesEmployeeIdEauRequestsErrors[keyof PostCustomDatevEmployeesEmployeeIdEauRequestsErrors]

export type PostCustomDatevEmployeesEmployeeIdEauRequestsResponses = {
	/**
	 * POST /custom/datev/employees/:employee_id/eau-requests Successful response
	 */
	200: PostCustomDatevEmployeesEmployeeIdEauRequestsSuccessfulResponse
}

export type PostCustomDatevEmployeesEmployeeIdEauRequestsResponse = PostCustomDatevEmployeesEmployeeIdEauRequestsResponses[keyof PostCustomDatevEmployeesEmployeeIdEauRequestsResponses]

export type PutCustomDatevEmployeesEmployeeIdPreparePayrollData = {
	/**
	 * PUT /custom/datev/employees/:employee_id/prepare-payroll request body
	 */
	body?: PutCustomDatevEmployeesEmployeeIdPreparePayrollRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
		 */
		employee_id: string
	}
	query?: never
	url: '/custom/datev/employees/{employee_id}/prepare-payroll'
}

export type PutCustomDatevEmployeesEmployeeIdPreparePayrollErrors = {
	/**
	 * PUT /custom/datev/employees/:employee_id/prepare-payroll Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PutCustomDatevEmployeesEmployeeIdPreparePayrollError = PutCustomDatevEmployeesEmployeeIdPreparePayrollErrors[keyof PutCustomDatevEmployeesEmployeeIdPreparePayrollErrors]

export type PutCustomDatevEmployeesEmployeeIdPreparePayrollResponses = {
	/**
	 * PUT /custom/datev/employees/:employee_id/prepare-payroll Successful response
	 */
	200: string
}

export type PutCustomDatevEmployeesEmployeeIdPreparePayrollResponse = PutCustomDatevEmployeesEmployeeIdPreparePayrollResponses[keyof PutCustomDatevEmployeesEmployeeIdPreparePayrollResponses]

export type PutCustomDatevEmployeesEmployeeIdCompensationsData = {
	/**
	 * PUT /custom/datev/employees/:employee_id/compensations request body
	 */
	body?: PutCustomDatevEmployeesEmployeeIdCompensationsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
		 */
		employee_id: string
	}
	query?: never
	url: '/custom/datev/employees/{employee_id}/compensations'
}

export type PutCustomDatevEmployeesEmployeeIdCompensationsErrors = {
	/**
	 * PUT /custom/datev/employees/:employee_id/compensations Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PutCustomDatevEmployeesEmployeeIdCompensationsError = PutCustomDatevEmployeesEmployeeIdCompensationsErrors[keyof PutCustomDatevEmployeesEmployeeIdCompensationsErrors]

export type PutCustomDatevEmployeesEmployeeIdCompensationsResponses = {
	/**
	 * PUT /custom/datev/employees/:employee_id/compensations Successful response
	 */
	200: string
}

export type PutCustomDatevEmployeesEmployeeIdCompensationsResponse = PutCustomDatevEmployeesEmployeeIdCompensationsResponses[keyof PutCustomDatevEmployeesEmployeeIdCompensationsResponses]

export type GetCustomDatevCheckWritePermissionData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/check-write-permission'
}

export type GetCustomDatevCheckWritePermissionErrors = {
	/**
	 * GET /custom/datev/check-write-permission Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetCustomDatevCheckWritePermissionError = GetCustomDatevCheckWritePermissionErrors[keyof GetCustomDatevCheckWritePermissionErrors]

export type GetCustomDatevCheckWritePermissionResponses = {
	/**
	 * GET /custom/datev/check-write-permission Successful response
	 */
	200: GetCustomDatevCheckWritePermissionSuccessfulResponse
}

export type GetCustomDatevCheckWritePermissionResponse = GetCustomDatevCheckWritePermissionResponses[keyof GetCustomDatevCheckWritePermissionResponses]

export type GetCustomDatevDataPushesData = {
	body?: never
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/data-pushes'
}

export type GetCustomDatevDataPushesErrors = {
	/**
	 * GET /custom/datev/data-pushes Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type GetCustomDatevDataPushesError = GetCustomDatevDataPushesErrors[keyof GetCustomDatevDataPushesErrors]

export type GetCustomDatevDataPushesResponses = {
	/**
	 * GET /custom/datev/data-pushes Successful response
	 */
	200: GetCustomDatevDataPushesSuccessfulResponse
}

export type GetCustomDatevDataPushesResponse = GetCustomDatevDataPushesResponses[keyof GetCustomDatevDataPushesResponses]

export type PostCustomDatevPushDataGeneralData = {
	/**
	 * POST /custom/datev/push-data/general request body
	 */
	body?: {
		[key: string]: unknown
	}
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/push-data/general'
}

export type PostCustomDatevPushDataGeneralErrors = {
	/**
	 * POST /custom/datev/push-data/general Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostCustomDatevPushDataGeneralError = PostCustomDatevPushDataGeneralErrors[keyof PostCustomDatevPushDataGeneralErrors]

export type PostCustomDatevPushDataGeneralResponses = {
	/**
	 * POST /custom/datev/push-data/general Successful response
	 */
	200: PostCustomDatevPushDataGeneralSuccessfulResponse
}

export type PostCustomDatevPushDataGeneralResponse = PostCustomDatevPushDataGeneralResponses[keyof PostCustomDatevPushDataGeneralResponses]

export type PostCustomDatevPushDataPayrollData = {
	/**
	 * POST /custom/datev/push-data/payroll request body
	 */
	body?: PostCustomDatevPushDataPayrollRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path?: never
	query?: never
	url: '/custom/datev/push-data/payroll'
}

export type PostCustomDatevPushDataPayrollErrors = {
	/**
	 * POST /custom/datev/push-data/payroll Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostCustomDatevPushDataPayrollError = PostCustomDatevPushDataPayrollErrors[keyof PostCustomDatevPushDataPayrollErrors]

export type PostCustomDatevPushDataPayrollResponses = {
	/**
	 * POST /custom/datev/push-data/payroll Successful response
	 */
	200: PostCustomDatevPushDataPayrollSuccessfulResponse
}

export type PostCustomDatevPushDataPayrollResponse = PostCustomDatevPushDataPayrollResponses[keyof PostCustomDatevPushDataPayrollResponses]

export type PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData = {
	/**
	 * POST /custom/silae/employees/:employee_id/payroll-supplements request body
	 */
	body?: PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsRequestBody
	headers: {
		/**
		 * ID of the integration you want to interact with.
		 */
		'X-Integration-Id': string
	}
	path: {
		/**
		 * ID of the employee that should be updated. You can use their Kombo `id` or their ID in the remote system by prefixing it with `remote:` (e.g., `remote:12312`)
		 */
		employee_id: string
	}
	query?: never
	url: '/custom/silae/employees/{employee_id}/payroll-supplements'
}

export type PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsErrors = {
	/**
	 * POST /custom/silae/employees/:employee_id/payroll-supplements Error response
	 */
	400: ErrorResponse
	/**
	 * Returned when the authentication header was invalid or missing.
	 */
	401: ErrorResponse
	/**
	 * Returned when the passed integration is inactive.
	 */
	403: ErrorResponse
	/**
	 * Returned when a requested resource is not found.
	 */
	404: ErrorResponse
	/**
	 * Returned when too many requests are received.
	 */
	429: ErrorResponse
	/**
	 * Returned when no sync has finished successfully yet
	 */
	503: ErrorResponse
}

export type PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsError = PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsErrors[keyof PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsErrors]

export type PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsResponses = {
	/**
	 * POST /custom/silae/employees/:employee_id/payroll-supplements Successful response
	 */
	200: string
}

export type PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsResponse = PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsResponses[keyof PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsResponses]
