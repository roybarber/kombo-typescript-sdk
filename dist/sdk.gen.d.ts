import { type Options } from './client';
import type { GetCheckApiKeyData, PostForceSyncData, PostPassthroughToolApiData, DeleteIntegrationsIntegrationIdData, GetIntegrationsIntegrationIdData, PostIntegrationsIntegrationIdRelinkData, GetIntegrationsIntegrationIdIntegrationFieldsData, PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdData, GetIntegrationsIntegrationIdCustomFieldsData, PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdData, GetToolsCategoryData, PostHrisProvisioningGroupsGroupIdDiffData, PostHrisProvisioningGroupsGroupIdSetupLinksData, GetHrisEmployeesData, PostHrisEmployeesData, PatchHrisEmployeesEmployeeIdData, PostHrisEmployeesEmployeeIdDocumentsData, PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdData, GetHrisEmployeeDocumentCategoriesData, GetHrisTeamsData, GetHrisGroupsData, GetHrisEmploymentsData, GetHrisLocationsData, GetHrisAbsenceTypesData, GetHrisTimeOffBalancesData, GetHrisAbsencesData, PostHrisAbsencesData, DeleteHrisAbsencesAbsenceIdData, GetHrisLegalEntitiesData, GetHrisAttendanceData, GetHrisTimesheetsData, GetAtsApplicationsData, PutAtsApplicationsApplicationIdStageData, PostAtsApplicationsApplicationIdResultLinksData, PostAtsApplicationsApplicationIdNotesData, GetAtsApplicationsApplicationIdAttachmentsData, PostAtsApplicationsApplicationIdAttachmentsData, PostAtsApplicationsApplicationIdRejectData, GetAtsCandidatesData, PostAtsCandidatesData, PatchAtsCandidatesCandidateIdData, GetAtsCandidatesCandidateIdAttachmentsData, PostAtsCandidatesCandidateIdAttachmentsData, PostAtsCandidatesCandidateIdResultLinksData, DeleteAtsCandidatesCandidateIdTagsData, PostAtsCandidatesCandidateIdTagsData, PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdData, GetAtsTagsData, GetAtsApplicationStagesData, GetAtsJobsData, PostAtsJobsJobIdApplicationsData, GetAtsUsersData, GetAtsOffersData, GetAtsRejectionReasonsData, GetAssessmentPackagesData, PutAssessmentPackagesData, GetAssessmentOrdersOpenData, PutAssessmentOrdersAssessmentOrderIdResultData, PostConnectCreateLinkData, GetConnectIntegrationByTokenTokenData, PostConnectActivateIntegrationData, GetCustomDatevSystemInformationData, PostCustomDatevPassthroughData, GetCustomDatevCheckEauPermissionData, GetCustomDatevEauRequestsEauIdData, GetCustomDatevCheckDocumentPermissionData, GetCustomDatevAvailableDocumentsData, PostCustomDatevDownloadDocumentData, PostCustomDatevEmployeesEmployeeIdDownloadDocumentData, PostCustomDatevEmployeesEmployeeIdEauRequestsData, PutCustomDatevEmployeesEmployeeIdPreparePayrollData, PutCustomDatevEmployeesEmployeeIdCompensationsData, GetCustomDatevCheckWritePermissionData, GetCustomDatevDataPushesData, PostCustomDatevPushDataGeneralData, PostCustomDatevPushDataPayrollData, PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData } from './types.gen';
export declare const client: import("./client").Client<Request, Response, unknown, import("./client").RequestOptions<boolean, string>>;
/**
 * Check API key
 * Check whether your API key is working properly.
 */
export declare const getCheckApiKey: <ThrowOnError extends boolean = false>(options?: Options<GetCheckApiKeyData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCheckApiKeySuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Trigger sync
 * Trigger a sync for a specific integration.
 *
 * <Warning>Please note that it is **not** necessary nor recommended to call this endpoint periodically on your side. Kombo already performs period syncs for you and you should only trigger syncs yourself in special cases (like when a user clicks on a "Sync" button in your app).</Warning>
 */
export declare const postForceSync: <ThrowOnError extends boolean = false>(options: Options<PostForceSyncData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostForceSyncSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Send passthrough request
 * Send a request to the specified integration's native API.
 *
 * At Kombo we put a lot of work into making sure that our unified API covers all our customers' use cases and that they never have to think about integration-specific logic again. There are cases, however, where our customers want to build features that are very integration-specific. That's where this endpoint comes in.
 *
 * Pass in details about the request you want to make to the integration's API and we'll forward it for you. We'll also take care of setting the right base URL and authenticating your requests.
 *
 * To get started, please pick the relevant API (some tools provide multiple to due different base URLs or authentication schemes) from the table below and pass in the `{tool}/{api}` identifier as part of the path.
 *
 * |Integration|`{tool}/{api}`|Description|
 * |---|---|---|
 * |Personio|`personio/personnel`|Personio's [Personnel Data API](https://developer.personio.de/reference/get_company-employees). We automatically authenticate all requests using the client ID and secret and use `https://api.personio.de/v1` as the base URL.|
 * |Workday|`workday/soap`|[Workday's SOAP API](https://community.workday.com/sites/default/files/file-hosting/productionapi/index.html). We automatically authenticate all requests. Set `data` to your raw xml string. Use `/` as your `path`, as we will always send requests to `https://{domain}/ccx/service/{tenant}/{service_name}`. Set your `method` to `POST`. You need to specify the `api_options` object and set `service_name` to the name of the service you want to call. Find all available services [here](https://community.workday.com/sites/default/files/file-hosting/productionapi/versions/v41.0/index.html). The string that you submit as `data` will be the content of the `soapenv:Body` tag in the request.|
 * |SAP SuccessFactors|`successfactors/odata-v2`|[SuccessFactors' OData V2 API](https://help.sap.com/doc/74597e67f54d4f448252bad4c2b601c9/2211/en-US/SF_HCM_OData_API_REF_en.pdf). We automatically authenticate all requests and use `https://{api_domain}/odata/v2` as the base URL.|
 * |SmartRecruiters|`smartrecruiters/default`|Smartrecruiters [API](https://developers.smartrecruiters.com/reference/apply-api). We automatically authenticate all requests using OAuth and use `https://api.smartrecruiters.com` as the base URL.|
 * |SmartRecruiters|`smartrecruiters/default`|Smartrecruiters [API](https://developers.smartrecruiters.com/reference/apply-api). We automatically authenticate all requests using the credentials supplied by the customer and use `https://api.smartrecruiters.com` as the base URL.|
 * |Oracle Recruiting Cloud|`oraclerecruiting/rest`|[Oracles's REST API](https://docs.oracle.com/en/cloud/saas/human-resources/24d/farws/rest-endpoints.html). We automatically authenticate all requests and use 'https://{company_url}' as the base url.|
 * |Lever|`lever/v1`|[Lever's v1 API](https://hire.lever.co/developer/documentation). We automatically authenticate all requests using the partner credentials which have been configured in the Lever tool settings (this uses Kombo's partner credentials by default).|
 * |Recruitee|`recruitee/default`|The [Recruitee API](https://api.recruitee.com/docs/index.html). We automatically authenticate all requests and use `https://api.recruitee.com/c/{company_id}` as the base URL.|
 * |Greenhouse|`greenhouse/harvest`|Greenhouse [Harvest API](https://developers.greenhouse.io/harvest.html). We automatically authenticate all requests using the API key and use `https://harvest.greenhouse.io/v1` as the base URL.|
 * |Teamtailor|`teamtailor/v1`|Teamtailor's [JSON-API](https://docs.teamtailor.com/). We authenticate all request with the Teamtailor API key and use the base URL `https://api.teamtailor.com/v1`.|
 * |Onlyfy|`onlyfy/v1`|Onlyfy's [Public v1 REST API](https://onlyfy.io/doc/v1#section/Introduction). We automatically authenticate all requests using the `apikey` header and use `https://api.prescreenapp.io/v1` as the base URL.|
 * |Personio|`personio/recruiting`|Personio's [Recruiting API](https://developer.personio.de/reference/get_company-employees). We automatically authenticate all requests using the Recruiting access token and use `https://api.personio.de/v1/recruiting` as the base URL.|
 * |Personio|`personio/jobboard`|API endpoints exposed on Personio's public job board pages ([currently just the XML feed](https://developer.personio.de/reference/get_xml)). We automatically use the right `https://{company}.jobs.personio.de` base URL.|
 * |UKG Pro|`ukgpro/recruting`|[UKG Pro's Recruiting API](https://developer.ukg.com/hcm/reference/retrieveapplications). We automatically authenticate all requests and use  `https://{hostname}/talent/recruiting/v2/{tenantalias}/api` as the base URL.|
 * |ADP Workforce Now|`adpworkforcenow/default`|[ADP Workforce Now API v2](https://developers.adp.com/build/api-explorer/hcm-offrg-wfn). We automatically authenticate all requests and use the correct subdomain.|
 * |BambooHR|`bamboohr/v1`|BambooHR's [API](https://documentation.bamboohr.com/reference/get-employee). We automatically authenticate all requests using the customer credentials `https://api.bamboohr.com/api/gateway.php/{subdomain}/v1` as the base URL.|
 * |Bullhorn|`bullhorn/default`|[Bullhorn's API](https://bullhorn.github.io/rest-api-docs/index.html). We automatically use the right `https://rest{swimlane#}.bullhornstaffing.com/rest-services/{corpToken}` base URL.|
 * |Workable|`workable/v1`|Workable's [API](https://workable.readme.io/reference/generate-an-access-token). We automatically authenticate all requests using the client ID and secret and use `https://subdomain.workable.com/spi/v3` as the base URL.|
 * |HiBob|`hibob/v1`|[HibBob's v1 API](https://apidocs.hibob.com/reference/get_people). We automatically authenticate all requests using the service user credentials (or, for old integrations, the API key) and use `https://api.hibob.com/v1` as the base URL.|
 * |Cezanne HR|`cezannehr/dataservice`|[CezanneHR's v7 dataservice API](https://api.cezannehr.com/).We automatically authenticate all requests and use the base URL `https://subdomain.cezanneondemand.com/cezanneondemand/v7/dataservice.svc`|
 * |Microsoft Entra ID|`entraid/v1`|[AzureAD's API](https://learn.microsoft.com/en-us/graph/api/resources/identity-network-access-overview?view=graph-rest-1.0). We automatically authenticate all requests.|
 * |Microsoft Azure AD|`azuread/v1`|[AzureAD's API](https://learn.microsoft.com/en-us/graph/api/resources/identity-network-access-overview?view=graph-rest-1.0). We automatically authenticate all requests.|
 * |Google Workspace|`googleworkspace/people`|[Googles's API](https://developers.google.com/people/api/rest). We automatically authenticate all requests and use 'https://people.googleapis.com' as the base URL.|
 * |Google Workspace|`googleworkspace/admin`|[Googles's API](https://developers.google.com/admin-sdk/directory/reference/rest). We automatically authenticate all requests and use 'https://admin.googleapis.com' as the base URL.|
 * |Pinpoint|`pinpoint/v1`|Pinpoint's [JSON:API](https://developers.pinpointhq.com/docs). We automatically authenticate all requests using the `X-API-KEY` header and use `https://{subdomain}.pinpointhq.com/api/v1` as the base URL.|
 * |Remote|`remotecom/default`|Remote's [API](https://remote.com/resources/api/getting-started). We automatically authenticate all requests using provided credentials.|
 * |Okta|`okta/v1`|[Okta's API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApiServiceIntegrations/). We automatically authenticate all request ans use 'https://<your-okta-domain>/api/v1' as the base URL.|
 * |TRAFFIT|`traffit/v2`|Traffit's [v2 API](https://api.traffit.com). We authenticate all requests with the Traffit API key and use the base URL `https://yourdomain.traffit.com/api/integration/v2`.|
 * |eRecruiter|`erecruiter/api`|[eRecruiter's API](https://api.erecruiter.net/swagger/ui/index). We automatically authenticate all requests and use `https://{domain}/Api` as the base URL.|
 * |Abacus Umantis|`abacusumantis/v1`|[Umantis API v1](https://recruitingapp-91005709.umantis.com/api/v1/swagger-ui). We automatically authenticate all requests and use `https://{subdomain}.umantis.com/api/v1` as the base URL.|
 * |Haufe Umantis|`umantis/v1`|[Umantis API v1](https://recruitingapp-91005709.umantis.com/api/v1/swagger-ui). We automatically authenticate all requests and use `https://{subdomain}.umantis.com/api/v1` as the base URL.|
 * |Taleez|`taleez/0`|[Taleez's API](https://api.taleez.com/swagger-ui/index.html). We automatically authenticate all requests and use `https://api.taleez.com/0` as the base URL.|
 * |HRworks|`hrworks/v2`|HRWorks's v2 [API](https://developers.hrworks.de/2.0/endpoints). We automatically authenticate all requests using the customer credentials.|
 * |JobDiva|`jobdiva/api`|We automatically authenticate all requests and use `https://api.jobdiva.com` as the base URL.|
 * |Paylocity|`paylocity/default`|[Paylocity's Weblink API](https://developer.paylocity.com/integrations/reference/authentication-weblink). We automatically authenticate all requests and use 'https://{api|dc1demogw}.paylocity.com/' as the base URL.|
 * |JazzHR|`jazzhr/v1`|[JazzHR's v1 API](https://www.resumatorapi.com/v1/#!`). We automatically authenticate all requests.|
 * |Lucca|`lucca/api`|[Luccas's API](https://developers.lucca.fr/api-reference/legacy/introduction). We automatically authenticate all requests and use 'https://{account}.{ilucca|ilucca-demo}.{region}/' as the base URL.|
 * |Silae|`silae/rest`|[Silae's REST API](https://silae-api.document360.io/docs). We automatically authenticate all requests and use 'https://payroll-api.silae.fr/payroll' as the base URL.|
 * |Connexys By Bullhorn|`connexys/api`|[Connexy's API](https://api.conexsys.com/client/v2/docs/#section/Overview). We automatically authenticate all requests and use `https://{connexys_domain}/` as the base URL.|
 * |HR4YOU|`hr4you/v2`|[HR4YOU's v2 API](https://apiprodemo.hr4you.org/api2/docs). We automatically authenticate all requests and use `https://{subdomain}.hr4you.org/api2/` as the base URL.|
 * |Leapsome|`leapsome/scim`|Leapsome [API](https://api.leapsome.com/scim/v1/api-docs/). We automatically authenticate all requests using the credentials supplied by the customer and use `https://api.leapsome.com/scim/v1` as the base URL.|
 * |DATEV|`datevhr/hr-exports`|DATEV's [hr-exports](https://developer.datev.de/en/product-detail/hr-exports/1.0.0/overview). We automatically authenticate all requests and use `https://hr-exports.api.datev.de/{platform|platform-sandbox}/v1/clients/{client-id}` as the base URL.|
 * |Breezy HR|`breezyhr/v3`|[BreezyHR's v3 API](https://developer.breezy.hr/reference/overview). We automatically authenticate all requests using the service user credentials|
 *
 * <Note>Please note that the passthrough API endpoints are only meant for edge cases. That's why we only expose them for new integrations after understanding a concrete customer use case. If you have such a use case in mind, please reach out to Kombo.</Note>
 */
export declare const postPassthroughToolApi: <ThrowOnError extends boolean = false>(options: Options<PostPassthroughToolApiData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostPassthroughToolApiSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Delete integration
 * Delete the specified integration.
 * **⚠️ This can not be undone!**
 */
export declare const deleteIntegrationsIntegrationId: <ThrowOnError extends boolean = false>(options: Options<DeleteIntegrationsIntegrationIdData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get integration details
 * Get the specified integration with everything you need to display it to your customer.
 */
export declare const getIntegrationsIntegrationId: <ThrowOnError extends boolean = false>(options: Options<GetIntegrationsIntegrationIdData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetIntegrationsIntegrationIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create reconnection link
 * Create a link that will allow the user to reconnect an integration. This is useful if you want to allow your users to update the credentials if the old ones for example expired.
 *
 * Embed this the same way you would [embed the connect link](/connect/embedded-flow). By default, the link will be valid for 1 hour.
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "language": "en",
 * "scope_config_id": "9Pv6aCFwNDEzPNmwjSsY9SQx",
 * "link_type": "EMBEDDED"
 * }
 * ```
 */
export declare const postIntegrationsIntegrationIdRelink: <ThrowOnError extends boolean = false>(options: Options<PostIntegrationsIntegrationIdRelinkData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostIntegrationsIntegrationIdRelinkSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get integration fields
 * Get all fields available on the specified integration.
 * **This includes the mapping to your custom fields**
 */
export declare const getIntegrationsIntegrationIdIntegrationFields: <ThrowOnError extends boolean = false>(options: Options<GetIntegrationsIntegrationIdIntegrationFieldsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetIntegrationsIntegrationIdIntegrationFieldsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Updates an integration fields passthrough setting
 * When enabled, the integration field will be passed as part of the `integration_fields` array on the specific model endpoint. Providing false will disable the passthrough for the specified field.
 */
export declare const patchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldId: <ThrowOnError extends boolean = false>(options: Options<PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get custom fields with current mappings
 * Get all custom fields available on the specified integration.
 * **This includes the mapping to the corresponding integration field if applicable*
 */
export declare const getIntegrationsIntegrationIdCustomFields: <ThrowOnError extends boolean = false>(options: Options<GetIntegrationsIntegrationIdCustomFieldsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetIntegrationsIntegrationIdCustomFieldsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Put custom field mappings
 * Updates the mapping of a given custom field. If the custom field is already mapped, it will be updated.
 */
export declare const putIntegrationsIntegrationIdCustomFieldsCustomFieldId: <ThrowOnError extends boolean = false>(options: Options<PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get tools
 * Get a list of the tools (i.e., integrations) enabled in your environment.
 * This can (in combination with the `integration_tool` parameter of [the "Create Link" endpoint](/v1/post-create-link)) be used to, for example, display a custom list or grid of available integrations to your end users instead of exposing Kombo Connect's standard tool selector.
 */
export declare const getToolsCategory: <ThrowOnError extends boolean = false>(options: Options<GetToolsCategoryData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetToolsCategorySuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get provisioning diff
 * Get the list of users to provision, deprovision, and optionally update based on the users you've already provisioned in your system.
 */
export declare const postHrisProvisioningGroupsGroupIdDiff: <ThrowOnError extends boolean = false>(options: Options<PostHrisProvisioningGroupsGroupIdDiffData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostHrisProvisioningGroupsGroupIdDiffSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create provisioning setup link
 * Create a new link that can be passed to the Kombo Connect SDK to open the provisioning setup UI.
 */
export declare const postHrisProvisioningGroupsGroupIdSetupLinks: <ThrowOnError extends boolean = false>(options: Options<PostHrisProvisioningGroupsGroupIdSetupLinksData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get employees
 * Retrieve all employees.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workdaycustomreport/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday Custom Reports</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitpartner/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Partner</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/employmenthero/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Employment Hero</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kenjo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kenjo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/entraid/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Entra ID</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/azuread/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Azure AD</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/googleworkspace/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Google Workspace</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/iriscascade/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />IRIS Cascade</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/okta/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Okta</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagepeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eurecia/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eurécia</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclehcm/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle HCM</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/officient/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Officient</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacus/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohopeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/gusto/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Gusto</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breathehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breathe HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/catalystone/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CatalystOne</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/mirus/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Mirus</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peple/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Peple</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/paylocity/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Paylocity</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sapling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kallidus (Sapling)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zelt/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zelt</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/planday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Planday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/haileyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Hailey HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oysterhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OysterHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kiwihr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />kiwiHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/square/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Square</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/perbilityhelix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Perbility Helix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/leapsome/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Leapsome</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datevhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sympa/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sympa</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/youforce/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Raet - Youforce</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nibelis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nibelis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>Not interested in most fields? You can use our [our Scopes feature](/scopes) to customize what data points are synced.</Note>
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisEmployees: <ThrowOnError extends boolean = false>(options: Options<GetHrisEmployeesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisEmployeesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create employee
 * Create a new employee.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/entraid/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Entra ID</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/azuread/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Azure AD</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/googleworkspace/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Google Workspace</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/okta/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Okta</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclehcm/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle HCM</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohopeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/gusto/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Gusto</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breathehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breathe HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/paylocity/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Paylocity</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sapling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kallidus (Sapling)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/square/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Square</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/leapsome/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Leapsome</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Create and manage employees** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "first_name": "John",
 * "last_name": "Doe",
 * "work_email": "john.doe@acme.com",
 * "gender": "MALE",
 * "date_of_birth": "1986-01-01",
 * "start_date": "2020-04-07",
 * "job_title": "Integrations Team Lead",
 * "home_address": {
 * "city": "Berlin",
 * "country": "DE",
 * "state": "Berlin",
 * "street_1": "Sonnenallee 63",
 * "zip_code": "12045"
 * }
 * }
 * ```
 */
export declare const postHrisEmployees: <ThrowOnError extends boolean = false>(options: Options<PostHrisEmployeesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostHrisEmployeesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Update employee
 * Update an employee.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 *
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Create and manage employees** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "employee_id": "BkgfzSr5muN9cUTMD4wDQFn4",
 * "first_name": "John",
 * "last_name": "Doe",
 * "work_email": "john.doe@acme.com",
 * "ssn": "555-32-6395",
 * "tax_id": "12 345 678 901",
 * "gender": "MALE",
 * "marital_status": "MARRIED",
 * "date_of_birth": "1986-01-01",
 * "start_date": "2020-04-07",
 * "termination_date": "2022-05-20",
 * "job_title": "Integrations Team Lead",
 * "nationality": "DE",
 * "home_address": {
 * "city": "Berlin",
 * "country": "DE",
 * "state": "Berlin",
 * "street_1": "Sonnenallee 63",
 * "zip_code": "12045"
 * }
 * }
 * ```
 */
export declare const patchHrisEmployeesEmployeeId: <ThrowOnError extends boolean = false>(options: Options<PatchHrisEmployeesEmployeeIdData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PatchHrisEmployeesEmployeeIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Add document to employee
 * Uploads an document file for the specified employee.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Manage documents** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "category_id": "3Cjwu7nA7pH5cX5X1NAPmb7M",
 * "document": {
 * "name": "Frank Doe Employment Contract.txt",
 * "data": "SGkgdGhlcmUsIEtvbWJvIGlzIGN1cnJlbnRseSBoaXJpbmcgZW5naW5lZXJzIHRoYXQgbG92ZSB0byB3b3JrIG9uIGRldmVsb3BlciBwcm9kdWN0cy4=",
 * "content_type": "text/plain"
 * }
 * }
 * ```
 */
export declare const postHrisEmployeesEmployeeIdDocuments: <ThrowOnError extends boolean = false>(options: Options<PostHrisEmployeesEmployeeIdDocumentsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Update fields on Employees
 * Update writable integrations fields on Employees in the remote system.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Create and manage employees** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "employee_id": "GVQYPEDvn4dBrJxHUPuxXJ9E",
 * "integration_field_id": "8icrU24RMhQo5hW3gsRY5YU9",
 * "value": "New integration field value!"
 * }
 * ```
 */
export declare const patchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldId: <ThrowOnError extends boolean = false>(options: Options<PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get employee document categories
 * Get employee document categories.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisEmployeeDocumentCategories: <ThrowOnError extends boolean = false>(options: Options<GetHrisEmployeeDocumentCategoriesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisEmployeeDocumentCategoriesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get teams (deprecated)
 * Get the teams.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workdaycustomreport/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday Custom Reports</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitpartner/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Partner</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/employmenthero/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Employment Hero</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kenjo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kenjo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/entraid/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Entra ID</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/azuread/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Azure AD</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/googleworkspace/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Google Workspace</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/iriscascade/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />IRIS Cascade</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/okta/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Okta</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagepeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eurecia/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eurécia</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclehcm/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle HCM</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/officient/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Officient</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacus/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohopeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/gusto/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Gusto</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breathehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breathe HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/mirus/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Mirus</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peple/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Peple</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/paylocity/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Paylocity</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sapling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kallidus (Sapling)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zelt/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zelt</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/planday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Planday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/haileyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Hailey HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oysterhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OysterHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kiwihr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />kiwiHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/perbilityhelix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Perbility Helix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/leapsome/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Leapsome</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datevhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/youforce/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Raet - Youforce</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Warning>
 * **This endpoint is deprecated!**
 *
 * Please use [the `/groups` endpoint](/hris/v1/get-groups) instead. It returns the same data but the naming makes more sense as the model not only includes teams but also departments and cost centers..
 * </Warning>
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisTeams: <ThrowOnError extends boolean = false>(options: Options<GetHrisTeamsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisTeamsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get groups
 * Retrieve all "groups" (teams, departments, and cost centers).
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workdaycustomreport/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday Custom Reports</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitpartner/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Partner</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/employmenthero/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Employment Hero</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kenjo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kenjo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/entraid/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Entra ID</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/azuread/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Azure AD</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/googleworkspace/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Google Workspace</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/iriscascade/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />IRIS Cascade</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/okta/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Okta</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagepeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eurecia/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eurécia</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclehcm/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle HCM</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/officient/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Officient</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacus/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohopeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/gusto/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Gusto</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breathehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breathe HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/mirus/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Mirus</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peple/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Peple</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/paylocity/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Paylocity</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sapling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kallidus (Sapling)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zelt/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zelt</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/planday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Planday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/haileyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Hailey HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oysterhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OysterHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kiwihr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />kiwiHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/perbilityhelix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Perbility Helix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/leapsome/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Leapsome</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datevhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/youforce/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Raet - Youforce</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisGroups: <ThrowOnError extends boolean = false>(options: Options<GetHrisGroupsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisGroupsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get employments
 * Retrieve all employments.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workdaycustomreport/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday Custom Reports</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitpartner/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Partner</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/employmenthero/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Employment Hero</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kenjo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kenjo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/iriscascade/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />IRIS Cascade</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagepeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eurecia/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eurécia</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclehcm/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle HCM</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/officient/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Officient</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/gusto/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Gusto</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breathehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breathe HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/catalystone/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CatalystOne</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peple/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Peple</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/paylocity/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Paylocity</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sapling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kallidus (Sapling)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zelt/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zelt</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/haileyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Hailey HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oysterhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OysterHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/square/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Square</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/perbilityhelix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Perbility Helix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datevhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sympa/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sympa</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/youforce/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Raet - Youforce</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nibelis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nibelis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisEmployments: <ThrowOnError extends boolean = false>(options: Options<GetHrisEmploymentsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisEmploymentsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get work locations
 * Retrieve all work locations.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workdaycustomreport/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday Custom Reports</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kenjo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kenjo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/entraid/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Entra ID</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/azuread/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Azure AD</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/googleworkspace/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Google Workspace</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclehcm/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle HCM</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/gusto/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Gusto</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breathehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breathe HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/catalystone/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CatalystOne</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sapling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kallidus (Sapling)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zelt/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zelt</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/haileyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Hailey HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kiwihr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />kiwiHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/square/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Square</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sympa/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sympa</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/youforce/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Visma Raet - Youforce</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisLocations: <ThrowOnError extends boolean = false>(options: Options<GetHrisLocationsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisLocationsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get absence types
 * Retrieve all absence types.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/employmenthero/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Employment Hero</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eurecia/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eurécia</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/officient/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Officient</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohopeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/perbilityhelix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Perbility Helix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datev/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV LODAS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datevlug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV Lohn & Gehalt</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisAbsenceTypes: <ThrowOnError extends boolean = false>(options: Options<GetHrisAbsenceTypesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisAbsenceTypesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get time off balances
 * Retrieve all time off balances.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eurecia/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eurécia</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisTimeOffBalances: <ThrowOnError extends boolean = false>(options: Options<GetHrisTimeOffBalancesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisTimeOffBalancesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get absences
 * Retrieve all absences.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/employmenthero/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Employment Hero</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/remotecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Remote</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eurecia/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eurécia</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/officient/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Officient</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohopeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rippling/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Rippling</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/haileyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Hailey HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/perbilityhelix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Perbility Helix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisAbsences: <ThrowOnError extends boolean = false>(options: Options<GetHrisAbsencesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisAbsencesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create absence
 * Create a new absence.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datev/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV LODAS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/datevlug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />DATEV Lohn & Gehalt</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Check [this page](/hris/features/creating-absences) for a detailed guide.
 *
 * <Note>
 * This endpoint requires the permission **Manage absences** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "employee_id": "wXJMxwDvPAjrJ4CyqdV9",
 * "absence_type_id": "3YKtQ7qedsrcCady1jSyAkY1",
 * "start_date": "2019-09-17",
 * "end_date": "2019-09-21",
 * "start_time": "08:30:00",
 * "end_time": "16:00:00",
 * "start_half_day": false,
 * "end_half_day": false,
 * "employee_note": "Visiting the aliens"
 * }
 * ```
 */
export declare const postHrisAbsences: <ThrowOnError extends boolean = false>(options: Options<PostHrisAbsencesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostHrisAbsencesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Delete absence
 * Delete this absence.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hibob/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HiBob</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sesamehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sesame HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Manage absences** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "absence_id": "wXJMxwDvPAjrJ4CyqdV9"
 * }
 * ```
 */
export declare const deleteHrisAbsencesAbsenceId: <ThrowOnError extends boolean = false>(options: Options<DeleteHrisAbsencesAbsenceIdData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").DeleteHrisAbsencesAbsenceIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get legal entities
 * Retrieve all legal entites.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workdaycustomreport/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday Custom Reports</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/adpworkforcenow/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ADP Workforce Now</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfitpartner/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit Partner</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/payfit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PayFit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/employmenthero/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Employment Hero</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/kenjo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kenjo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heavenhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HeavenHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cezannehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cezanne HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/entraid/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Entra ID</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/azuread/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Microsoft Azure AD</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/nmbrs/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Nmbrs</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/deel/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Deel</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/okta/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Okta</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagepeople/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage People</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/humaans/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Humaans</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclehcm/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle HCM</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/charliehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Charlie</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacus/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/gusto/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Gusto</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breathehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breathe HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/catalystone/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CatalystOne</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/alexishr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AlexisHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/trinet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TriNet (Zenefits)</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/peoplehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />PeopleHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lucca/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lucca</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/boondmanager/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BoondManager</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/haileyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Hailey HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oysterhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OysterHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftp/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sftpfetch/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SFTP Fetch</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getHrisLegalEntities: <ThrowOnError extends boolean = false>(options: Options<GetHrisLegalEntitiesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetHrisLegalEntitiesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get attendance 🦄
 * Currently in closed beta.
 * <Warning>**This endpoint is currently in closed beta!** We're testing it with selected customers before its public release. If you're interested in learning more or getting early access, please reach out.</Warning>
 */
export declare const getHrisAttendance: <ThrowOnError extends boolean = false>(options: Options<GetHrisAttendanceData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get timesheets 🦄
 * Currently in closed beta.
 * <Warning>**This endpoint is currently in closed beta!** We're testing it with selected customers before its public release. If you're interested in learning more or getting early access, please reach out.</Warning>
 */
export declare const getHrisTimesheets: <ThrowOnError extends boolean = false>(options: Options<GetHrisTimesheetsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get applications
 * Retrieve all applications.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstonetalentlink/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone TalentLink</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoft/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft FrontOffice</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoftcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/softgarden/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Softgarden</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/join/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JOIN</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/careerplug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CareerPlug</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BITE</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/connexys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Connexys By Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zvooverecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zvoove Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/comeet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Comeet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/compleet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Compleet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/flatchr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Flatchr</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/reachmee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ReachMee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 * Visit our in depth guide to learn more about:
 * - 💡 [Being aware of which applications are tracked](/ats/features/implementation-guide/tracking-created-applications#be-aware-of-which-applications-are-tracked)
 * - 🚦 [Hiring signals](/ats/features/implementation-guide/tracking-created-applications#hiring-signals)
 * - 📈 [Application stage changes](/ats/features/implementation-guide/tracking-created-applications#application-stage-changes)
 * - ❓ [ATS-specific limitations](/ats/features/implementation-guide/tracking-created-applications#ats-specific-limitations)
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsApplications: <ThrowOnError extends boolean = false>(options: Options<GetAtsApplicationsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsApplicationsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Move application to stage
 * Moves an application to a specified stage.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Set application stage** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "stage_id": "3PJ8PZhZZa1eEdd2DtPNtVup"
 * }
 * ```
 */
export declare const putAtsApplicationsApplicationIdStage: <ThrowOnError extends boolean = false>(options: Options<PutAtsApplicationsApplicationIdStageData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Add result link to application
 * Add a result link to an application.
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoftcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 * This can, for example, be used to link a candidate back to a test result/assessment in your application. As not all ATS tools have a "result link" feature, we sometimes repurpose other fields to expose it.
 *
 *
 * <Note>
 * This endpoint requires the permission **Add result links** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "application_id": "8Xi6iZrwusZqJmDGXs49GBmJ",
 * "label": "Assessment Result",
 * "url": "https://example.com/test-results/5BtP1WC1UboS7CF3yxjKcvjG",
 * "details": {
 * "custom_field_name_prefix": "Acme:",
 * "attributes": [
 * {
 * "key": "Score",
 * "value": "100%"
 * },
 * {
 * "key": "Time",
 * "value": "2:30h"
 * }
 * ]
 * },
 * "remote_fields": {}
 * }
 * ```
 */
export declare const postAtsApplicationsApplicationIdResultLinks: <ThrowOnError extends boolean = false>(options: Options<PostAtsApplicationsApplicationIdResultLinksData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Add note to application
 * Add a note to an application.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/comeet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Comeet</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Add extra information to an application. This can be any extra text information you want to add to an application.
 *
 * <Note>
 * This endpoint requires the permission **Add notes** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "content": "A new message from the candidate is available in YourChat!",
 * "content_type": "PLAIN_TEXT",
 * "remote_fields": {}
 * }
 * ```
 */
export declare const postAtsApplicationsApplicationIdNotes: <ThrowOnError extends boolean = false>(options: Options<PostAtsApplicationsApplicationIdNotesData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get application attachments
 * Get attachments from a candidate or application.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zvooverecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zvoove Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/reachmee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ReachMee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Get attachments from an application. If the ATS stores the attachments on the candidate, it will get the attachments from the corresponding candidate instead.
 *
 * In some ATS systems, applications may become archived, for example, upon a position being filled. If this is the case or an application is deleted for another reason, consider calling [get candidate attachments](/ats/v1/get-candidates-candidate-id-attachments) instead. [Get candidate attachments](/ats/v1/get-candidates-candidate-id-attachments) will return attachments related to a candidate, including all attachments from all of their applications.
 *
 * <Note>
 * This endpoint requires the permission **Read document attachments** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 */
export declare const getAtsApplicationsApplicationIdAttachments: <ThrowOnError extends boolean = false>(options: Options<GetAtsApplicationsApplicationIdAttachmentsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsApplicationsApplicationIdAttachmentsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Add attachment to application
 * Uploads an attachment file for the specified applicant.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstonetalentlink/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone TalentLink</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/reachmee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ReachMee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 * <Warning>
 * If adding an attachment to an application is not supported by the integration, the attachment will be [added to the candidate](/ats/v1/post-candidates-candidate-id-attachments) instead.
 * </Warning>
 *
 *
 * <Note>
 * This endpoint requires the permission **Add attachments** to be enabled in [your scope config](/scopes).
 * </Note>
 * ### Example Request Body
 *
 * ```json
 * {
 * "application_id": "GRKdd9dibYKKCrmGRSMJf3wu",
 * "attachment": {
 * "name": "Frank Doe CV.txt",
 * "data": "SGkgdGhlcmUsIEtvbWJvIGlzIGN1cnJlbnRseSBoaXJpbmcgZW5naW5lZXJzIHRoYXQgbG92ZSB0byB3b3JrIG9uIGRldmVsb3BlciBwcm9kdWN0cy4=",
 * "type": "CV",
 * "content_type": "text/plain"
 * }
 * }
 * ```
 */
export declare const postAtsApplicationsApplicationIdAttachments: <ThrowOnError extends boolean = false>(options: Options<PostAtsApplicationsApplicationIdAttachmentsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Reject application
 * Rejects an application with a provided reason.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Rejects an application with a provided reason. Optionally, you can provide a free text note. You can get the list of rejection reasons with our [Get rejection reasons endpoint](/ats/v1/get-rejection-reasons).
 *
 * <Note>
 * This endpoint requires the permission **Reject applications** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "rejection_reason_id": "3PJ8PZhZZa1eEdd2DtPNtVup",
 * "note": "Candidate was a great culture fit but didn't bring the hard skills we need.",
 * "remote_fields": {}
 * }
 * ```
 */
export declare const postAtsApplicationsApplicationIdReject: <ThrowOnError extends boolean = false>(options: Options<PostAtsApplicationsApplicationIdRejectData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get candidates
 * Retrieve all candidates.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstonetalentlink/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone TalentLink</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoft/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft FrontOffice</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoftcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/join/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JOIN</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/careerplug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CareerPlug</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BITE</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/connexys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Connexys By Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zvooverecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zvoove Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/comeet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Comeet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/compleet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Compleet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/flatchr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Flatchr</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/reachmee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ReachMee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsCandidates: <ThrowOnError extends boolean = false>(options: Options<GetAtsCandidatesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsCandidatesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create candidate
 * Create a new candidate and application for the specified job.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstonetalentlink/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone TalentLink</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhousejobboard/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse Job Board</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoft/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft FrontOffice</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/concludis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />concludis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/piloga/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />P&I Loga</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/softgarden/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Softgarden</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/join/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JOIN</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobylon/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobylon</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/careerplug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CareerPlug</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heyrecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Heyrecruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BITE</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/mysolution/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Mysolution</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hroffice/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR Office</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentclue/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Talent Clue</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ubeeo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ubeeo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/connexys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Connexys By Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zvooverecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zvoove Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/comeet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Comeet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/compleet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Compleet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/flatchr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Flatchr</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/reachmee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ReachMee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentadore/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TalentAdore</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/guidecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />GuideCom</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Warning>
 * **This endpoint is deprecated!**
 *
 * We realized that in practice it was always more about creating _applications_ instead of _candidates_, so we created a new, more aptly named one that you should use instead: [Create application](/ats/v1/post-jobs-job-id-applications)
 *
 * Using it also has the benefit that we return the newly created applicant at the root level, so you can easily store its ID.
 * </Warning>
 *
 * <Note>
 * This endpoint requires the permission **Create applications and candidates** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "candidate": {
 * "first_name": "Frank",
 * "last_name": "Doe",
 * "company": "Acme Inc.",
 * "title": "Head of Integrations",
 * "email_address": "frank.doe@example.com",
 * "phone_number": "+1-541-754-3010",
 * "gender": "MALE",
 * "salary_expectations": {
 * "amount": 100000,
 * "period": "YEAR"
 * },
 * "availability_date": "2021-01-01",
 * "location": {
 * "city": "New York",
 * "country": "US"
 * },
 * "social_links": [
 * {
 * "url": "https://www.linkedin.com/in/frank-doe-123456789/"
 * },
 * {
 * "url": "https://twitter.com/frankdoe"
 * }
 * ]
 * },
 * "application": {
 * "job_id": "BDpgnpZ148nrGh4mYHNxJBgx",
 * "stage_id": "8x3YKRDcuRnwShdh96ShBNn1"
 * },
 * "attachments": [
 * {
 * "name": "Frank Doe CV.txt",
 * "data": "SGkgdGhlcmUsIEtvbWJvIGlzIGN1cnJlbnRseSBoaXJpbmcgZW5naW5lZXJzIHRoYXQgbG92ZSB0byB3b3JrIG9uIGRldmVsb3BlciBwcm9kdWN0cy4=",
 * "type": "CV",
 * "content_type": "text/plain"
 * }
 * ],
 * "screening_question_answers": [
 * {
 * "question_id": "3phFBNXRweGnDmsU9o2vdPuQ",
 * "answer": "Yes"
 * },
 * {
 * "question_id": "EYJjhMQT3LtVKXnTbnRT8s6U",
 * "answer": [
 * "GUzE666zfyjeoCJX6A8n7wh6",
 * "5WPHzzKAv8cx97KtHRUV96U8",
 * "7yZfKGzWigXxxRTygqAfHvyE"
 * ]
 * }
 * ],
 * "remote_fields": {}
 * }
 * ```
 */
export declare const postAtsCandidates: <ThrowOnError extends boolean = false>(options: Options<PostAtsCandidatesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostAtsCandidatesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Update candidate 🦄
 * Currently in closed beta.
 * <Warning>**This endpoint is currently in closed beta!** We're testing it with selected customers before its public release. If you're interested in learning more or getting early access, please reach out.</Warning>
 */
export declare const patchAtsCandidatesCandidateId: <ThrowOnError extends boolean = false>(options: Options<PatchAtsCandidatesCandidateIdData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get candidate attachments
 * Get attachments from a candidate, including all attachments of all of their applications.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Read document attachments** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 */
export declare const getAtsCandidatesCandidateIdAttachments: <ThrowOnError extends boolean = false>(options: Options<GetAtsCandidatesCandidateIdAttachmentsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsCandidatesCandidateIdAttachmentsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Add attachment to candidate
 * Uploads an attachment file for the specified candidate.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Warning>
 * **This endpoint is deprecated!**
 *
 * Please use [Add attachment to application](/ats/v1/post-applications-application-id-attachments) instead.
 *
 * This action is deprecated because attachments usually concern applications and not candidates. Use endpoint nested under `/applications` instead..
 * </Warning>
 *
 * <Note>
 * This endpoint requires the permission **Add attachments** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "candidate_id": "GRKdd9dibYKKCrmGRSMJf3wu",
 * "attachment": {
 * "name": "Frank Doe CV.txt",
 * "data": "SGkgdGhlcmUsIEtvbWJvIGlzIGN1cnJlbnRseSBoaXJpbmcgZW5naW5lZXJzIHRoYXQgbG92ZSB0byB3b3JrIG9uIGRldmVsb3BlciBwcm9kdWN0cy4=",
 * "type": "CV",
 * "content_type": "text/plain"
 * }
 * }
 * ```
 */
export declare const postAtsCandidatesCandidateIdAttachments: <ThrowOnError extends boolean = false>(options: Options<PostAtsCandidatesCandidateIdAttachmentsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Add result link to candidate
 * Add a result link to a candidate.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Warning>
 * **This endpoint is deprecated!**
 *
 * Please use [add result link to application](/ats/v1/post-applications-application-id-result-links) instead.
 * This can, for example, be used to link a candidate back to a test result/assessment in your application. As not all ATS tools have a "result link" feature, we sometimes repurpose other fields to expose it.
 *
 * This action is deprecated because result links usually concern applications and not candidates. Use endpoint nested under `/applications` instead..
 * </Warning>
 *
 * <Note>
 * This endpoint requires the permission **Add result links** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "label": "Assessment Result",
 * "url": "https://example.com/test-results/5BtP1WC1UboS7CF3yxjKcvjG",
 * "details": {
 * "custom_field_name_prefix": "Acme:",
 * "attributes": [
 * {
 * "key": "Score",
 * "value": "100%"
 * },
 * {
 * "key": "Time",
 * "value": "2:30h"
 * }
 * ]
 * },
 * "remote_fields": {}
 * }
 * ```
 */
export declare const postAtsCandidatesCandidateIdResultLinks: <ThrowOnError extends boolean = false>(options: Options<PostAtsCandidatesCandidateIdResultLinksData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Remove tag from candidate
 * Remove a tag from a candidate based on its name.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * This will also succeed if the tag does not exist on the candidate.
 *
 * <Note>
 * This endpoint requires the permission **Manage tags** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "tag": {
 * "name": "Excellent Fit"
 * }
 * }
 * ```
 */
export declare const deleteAtsCandidatesCandidateIdTags: <ThrowOnError extends boolean = false>(options: Options<DeleteAtsCandidatesCandidateIdTagsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Add tag to candidate
 * Add a tag to a candidate.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Kombo takes care of creating the tag if required, finding out the right ID, and appending it to the list of tags.
 *
 * <Note>
 * This endpoint requires the permission **Manage tags** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "tag": {
 * "name": "Excellent Fit"
 * }
 * }
 * ```
 */
export declare const postAtsCandidatesCandidateIdTags: <ThrowOnError extends boolean = false>(options: Options<PostAtsCandidatesCandidateIdTagsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Update fields on Candidates
 * Update writable integrations fields on Candidates in the remote system.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Note>
 * This endpoint requires the permission **Write custom fields on candidates** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "value": "New integration field value!"
 * }
 * ```
 */
export declare const patchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldId: <ThrowOnError extends boolean = false>(options: Options<PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get tags
 * Retrieve all tags.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/join/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JOIN</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/flatchr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Flatchr</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsTags: <ThrowOnError extends boolean = false>(options: Options<GetAtsTagsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsTagsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get application stages
 * Get all application stages available in the ATS.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstonetalentlink/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone TalentLink</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoft/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft FrontOffice</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoftcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/softgarden/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Softgarden</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/careerplug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CareerPlug</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BITE</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zvooverecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zvoove Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/comeet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Comeet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/flatchr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Flatchr</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * <Warning>
 * **This endpoint is deprecated!**
 *
 * Get all application stages available in the ATS. This is deprecated because most ATS systems have separate sets of stages for each job. We'd recommend using the `stages` property on jobs instead..
 * </Warning>
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsApplicationStages: <ThrowOnError extends boolean = false>(options: Options<GetAtsApplicationStagesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsApplicationStagesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get jobs
 * Retrieve all jobs.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstonetalentlink/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone TalentLink</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhousejobboard/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse Job Board</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoft/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft FrontOffice</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoftcustomer/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft Customer</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/concludis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />concludis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/piloga/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />P&I Loga</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/softgarden/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Softgarden</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/join/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JOIN</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobylon/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobylon</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/careerplug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CareerPlug</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/paylocity/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Paylocity</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heyrecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Heyrecruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BITE</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/mysolution/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Mysolution</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hroffice/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR Office</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentclue/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Talent Clue</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ubeeo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ubeeo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/connexys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Connexys By Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zvooverecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zvoove Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/comeet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Comeet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/compleet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Compleet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/flatchr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Flatchr</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/reachmee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ReachMee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentadore/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TalentAdore</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/guidecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />GuideCom</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 * Visit our in depth guide to learn more about:
 * - 🔄 [Getting updates of the data](/ats/features/implementation-guide/reading-jobs#getting-updates-of-the-data)
 * - ❗ [Handling failing syncs](/ats/features/implementation-guide/reading-jobs#handling-failing-syncs)
 * - 🔍 [Letting your customer choose which jobs to expose](/ats/features/implementation-guide/reading-jobs#let-your-customer-choose-which-jobs-to-expose-to-you)
 * - 🔗 [Matching jobs in your database to ATS jobs](/ats/features/implementation-guide/reading-jobs#match-jobs-in-your-database-to-ats-jobs)
 * - 🗑️ [Reacting to deleted/closed jobs](/ats/features/implementation-guide/reading-jobs#reacting-to-deleted-closed-jobs)
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsJobs: <ThrowOnError extends boolean = false>(options: Options<GetAtsJobsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsJobsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create application
 * Create a new application and candidate for the specified job.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/factorial/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Factorial</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstonetalentlink/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone TalentLink</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhousejobboard/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse Job Board</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoft/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft FrontOffice</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/concludis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />concludis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/piloga/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />P&I Loga</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/personio/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Personio</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/rexx/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />rexx systems</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/afas/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />AFAS Software</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bamboohr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BambooHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/softgarden/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Softgarden</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/welcometothejungle/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Welcome to the Jungle</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/join/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JOIN</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sagehr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Sage HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/erecruiter/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />eRecruiter</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/abacusumantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Abacus Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobylon/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobylon</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/taleez/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Taleez</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/careerplug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CareerPlug</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/heyrecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Heyrecruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />BITE</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/homerun/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Homerun</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/mysolution/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Mysolution</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hroffice/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR Office</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentclue/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Talent Clue</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ubeeo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ubeeo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/connexys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Connexys By Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zvooverecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zvoove Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/comeet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Comeet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/compleet/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Compleet</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/flatchr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Flatchr</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/reachmee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />ReachMee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentadore/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TalentAdore</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/guidecom/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />GuideCom</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 * Visit our in depth guide to learn more about:
 * - 🌐 [Setting the source of the application](/ats/features/implementation-guide/creating-applications#set-the-source-of-the-application)
 * - 📎 [Uploading attachments with the application](/ats/features/implementation-guide/creating-applications#upload-attachments-with-the-application)
 * - ♻️ [Retry behaviour](/ats/features/implementation-guide/creating-applications#retry-behaviour)
 * - ✏️ [Writing answers to screening questions](/ats/features/implementation-guide/creating-applications#write-answers-to-screening-questions)
 * - ⚠️ [Handling ATS-specific limitations](/ats/features/implementation-guide/creating-applications#handle-ats-specific-limitations)
 *
 *
 * <Note>
 * This endpoint requires the permission **Create applications and candidates** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "candidate": {
 * "first_name": "Frank",
 * "last_name": "Doe",
 * "company": "Acme Inc.",
 * "title": "Head of Integrations",
 * "email_address": "frank.doe@example.com",
 * "phone_number": "+1-541-754-3010",
 * "gender": "MALE",
 * "salary_expectations": {
 * "amount": 100000,
 * "period": "YEAR"
 * },
 * "availability_date": "2021-01-01",
 * "location": {
 * "city": "New York",
 * "country": "US"
 * }
 * },
 * "stage_id": "8x3YKRDcuRnwShdh96ShBNn1",
 * "attachments": [
 * {
 * "name": "Frank Doe CV.txt",
 * "data": "SGkgdGhlcmUsIEtvbWJvIGlzIGN1cnJlbnRseSBoaXJpbmcgZW5naW5lZXJzIHRoYXQgbG92ZSB0byB3b3JrIG9uIGRldmVsb3BlciBwcm9kdWN0cy4=",
 * "type": "CV",
 * "content_type": "text/plain"
 * }
 * ],
 * "screening_question_answers": [
 * {
 * "question_id": "3phFBNXRweGnDmsU9o2vdPuQ",
 * "answer": "Yes"
 * },
 * {
 * "question_id": "EYJjhMQT3LtVKXnTbnRT8s6U",
 * "answer": [
 * "GUzE666zfyjeoCJX6A8n7wh6",
 * "5WPHzzKAv8cx97KtHRUV96U8",
 * "7yZfKGzWigXxxRTygqAfHvyE"
 * ]
 * }
 * ],
 * "remote_fields": {}
 * }
 * ```
 */
export declare const postAtsJobsJobIdApplications: <ThrowOnError extends boolean = false>(options: Options<PostAtsJobsJobIdApplicationsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostAtsJobsJobIdApplicationsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get users
 * Retrieve all users.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/icims/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />iCIMS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/talentsoft/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CEGID TalentSoft FrontOffice</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/onlyfy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Onlyfy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhorn/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/bullhornlogin/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Bullhorn Login</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobvite/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Jobvite</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/fountain/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Fountain</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/softgarden/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Softgarden</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/pinpoint/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Pinpoint</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/dvinci/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />d.vinci</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/join/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JOIN</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/traffit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />TRAFFIT</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hrworks/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HRworks</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/otys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />OTYS</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/zohorecruit/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Zoho Recruit</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/eploy/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Eploy</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jobdiva/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JobDiva</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/careerplug/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />CareerPlug</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />RECRU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/jazzhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />JazzHR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/carerix/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Carerix</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/inrecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />InRecruiting</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ubeeo/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ubeeo</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/connexys/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Connexys By Bullhorn</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/hr4you/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />HR4YOU</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/cornerstoneondemand/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Cornerstone OnDemand</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/breezyhr/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Breezy HR</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsUsers: <ThrowOnError extends boolean = false>(options: Options<GetAtsUsersData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsUsersSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get offers
 * Retrieve all offers.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsOffers: <ThrowOnError extends boolean = false>(options: Options<GetAtsOffersData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsOffersSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get rejection reasons
 * Retrieve all rejection reasons.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/lever/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Lever</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ukgpro/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />UKG Pro</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workable/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workable</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/umantis/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Haufe Umantis</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 *
 * Get all rejection reasons available in the system. The Kombo ID is required in the associated [reject application action](/ats/v1/post-applications-application-id-reject).
 *
 * Top level filters use AND, while individual filters use OR if they accept multiple arguments. That means filters will be resolved like this: `(id IN ids) AND (remote_id IN remote_ids)`
 */
export declare const getAtsRejectionReasons: <ThrowOnError extends boolean = false>(options: Options<GetAtsRejectionReasonsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAtsRejectionReasonsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get packages
 * Get all available assessment packages for an integration.
 *
 * This is mainly intended for debugging. As you always need to submit the full list of available packages when using ["set packages"](/assessment/v1/put-packages), there shouldn't ever be a need to call this endpoint in production.
 */
export declare const getAssessmentPackages: <ThrowOnError extends boolean = false>(options: Options<GetAssessmentPackagesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAssessmentPackagesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Set packages
 * Replaces the list of available assessment packages.
 *
 * Packages that have been previously submitted through this endpoint but aren't included again will be marked as deleted.
 */
export declare const putAssessmentPackages: <ThrowOnError extends boolean = false>(options: Options<PutAssessmentPackagesData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get open orders
 * Get all open assessment orders of an integration.
 */
export declare const getAssessmentOrdersOpen: <ThrowOnError extends boolean = false>(options: Options<GetAssessmentOrdersOpenData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetAssessmentOrdersOpenSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Update order result
 * Updates an assessment order result.
 *
 * <Accordion title="Supported integrations" icon="list-check">
 * This feature is currently available for the following integrations:
 *
 * <ul>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/workday/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Workday</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/successfactors/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SAP SuccessFactors</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/smartrecruiters/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />SmartRecruiters</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/oraclerecruiting/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Oracle Recruiting Cloud</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/recruitee/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Recruitee</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/greenhouse/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Greenhouse</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/teamtailor/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Teamtailor</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/ashby/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Ashby</li>
 * <li class="flex items-center"><img
 * src="https://storage.googleapis.com/kombo-assets/integrations/sandbox/icon.svg"
 * height="16px"
 * width="16px"
 * class="m-0 mr-2"
 * />Kombo Sandbox</li>
 * </ul>
 *
 * You'd like to see this feature for another integration? Please reach out!
 * We're always happy to discuss extending our coverage.
 * </Accordion>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "status": "COMPLETED",
 * "score": 90,
 * "max_score": 100,
 * "result_url": "https://example.com",
 * "completed_at": "2023-04-04T00:00:00.000Z",
 * "attributes": [
 * {
 * "field": "remarks",
 * "value": "Test completed with passing score"
 * }
 * ],
 * "sub_results": [
 * {
 * "id": "xyz",
 * "title": "Title of the test",
 * "score": 75,
 * "max_score": 100,
 * "status": "COMPLETED"
 * }
 * ]
 * }
 * ```
 */
export declare const putAssessmentOrdersAssessmentOrderIdResult: <ThrowOnError extends boolean = false>(options: Options<PutAssessmentOrdersAssessmentOrderIdResultData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create connection link
 * Generate a unique link that allows your user to enter the embedded Kombo Connect flow.
 *
 * > Check out [our full guide](/connect/embedded-flow) for more details about implementing the connection flow into your app.
 *
 * > Kombo will not deduplicate integrations for you that are created with this endpoint. You are responsible for keeping track of integrations in your system and prevent customers from connecting the same tool again. Use the [reconnection link](/v1/post-integrations-integration-id-relink) endpoint if you want a customer to update their credentials.
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "end_user_email": "test@example.com",
 * "end_user_organization_name": "Test Inc.",
 * "integration_category": "HRIS",
 * "integration_tool": "personio",
 * "end_user_origin_id": "123",
 * "language": "en",
 * "link_type": "EMBEDDED"
 * }
 * ```
 */
export declare const postConnectCreateLink: <ThrowOnError extends boolean = false>(options?: Options<PostConnectCreateLinkData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostConnectCreateLinkSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get integration by token
 * Use this endpoint with the token you get from the connection flow to retrieve information about the created integration.
 *
 * It works in a similar way as the OAuth2 code flow to securely retrieve information and connect the integration to your user.
 *
 * > Check out [our full guide](/connect/embedded-flow) for more details about implementing the connection flow into your app.
 *
 * This endpoint is used to ensure users can't trick your system connecting their
 * account in your system to another customers integration. You don't get the integration ID
 * from the `showKomboConnect(link)` function but only the short lived token used
 * for this endpoint so that users can't send you arbitrary data that you would put
 * into your system.
 */
export declare const getConnectIntegrationByTokenToken: <ThrowOnError extends boolean = false>(options: Options<GetConnectIntegrationByTokenTokenData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetConnectIntegrationByTokenTokenSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Activate integration (optional)
 * Use this endpoint with the token you get from the connection flow to retrieve information about the created integration. It works in a similar way as the OAuth2 code flow to securely retrieve information and connect the integration to your user. You do not need to call this endpoint for an integration to become active.
 *
 * <Warning>We are deprecating this endpoint in favour of the [get integration by code endpoint](/v1/get-integration-by-token-token). To migrate you only have to change to the new API endpoint.</Warning>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiVGhpcyBpcyBub3QgYW4gYWN0dWFsIHRva2VuLiJ9.JulqgOZBMKceI8vh9YLpVX51efND0ZyfUNHDXLrPz_4"
 * }
 * ```
 */
export declare const postConnectActivateIntegration: <ThrowOnError extends boolean = false>(options?: Options<PostConnectActivateIntegrationData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostConnectActivateIntegrationSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get DATEV system information
 * This endpoint returns BeraterNr (consultant_number), MandantenNr (client_number) and the payroll system (LODAS or Lohn und Gehalt). Useful to generate a DATEV ASCII file for the passthrough endpoint.
 */
export declare const getCustomDatevSystemInformation: <ThrowOnError extends boolean = false>(options: Options<GetCustomDatevSystemInformationData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCustomDatevSystemInformationSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Write raw DATEV ASCII file
 * This action allows to send an arbitrary ASCII file directly to DATEV LODAS or Lohn und Gehalt. Kombo adds validation for the file format but not on the content. This action allows you to implement any use case that you might have with DATEV payroll ASCII imports.
 */
export declare const postCustomDatevPassthrough: <ThrowOnError extends boolean = false>(options: Options<PostCustomDatevPassthroughData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Verify service is enabled
 * This endpoint validates that this DATEV integration is ready to use the eAU feature.
 */
export declare const getCustomDatevCheckEauPermission: <ThrowOnError extends boolean = false>(options: Options<GetCustomDatevCheckEauPermissionData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCustomDatevCheckEauPermissionSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Query the status of the eAU request
 * This endpoint queries the status of the eAU request for the given DATEV integration.
 */
export declare const getCustomDatevEauRequestsEauId: <ThrowOnError extends boolean = false>(options: Options<GetCustomDatevEauRequestsEauIdData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCustomDatevEauRequestsEauIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Verify service is enabled
 * This endpoint returns the available document types for this DATEV integration.
 */
export declare const getCustomDatevCheckDocumentPermission: <ThrowOnError extends boolean = false>(options: Options<GetCustomDatevCheckDocumentPermissionData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCustomDatevCheckDocumentPermissionSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Retrieve available documents
 * Use this endpoint to get all available documents for a specific period.
 */
export declare const getCustomDatevAvailableDocuments: <ThrowOnError extends boolean = false>(options: Options<GetCustomDatevAvailableDocumentsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCustomDatevAvailableDocumentsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Download Payroll Document
 * Download a document from DATEV
 *
 *
 *
 * <Note>
 * This endpoint requires the permission **Manage documents** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "accounting_month": "2001-12-01",
 * "document_type": "LOJE",
 * "employee_id": null
 * }
 * ```
 */
export declare const postCustomDatevDownloadDocument: <ThrowOnError extends boolean = false>(options: Options<PostCustomDatevDownloadDocumentData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostCustomDatevDownloadDocumentSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Download Payroll Document
 * Download a document from DATEV
 *
 *
 *
 * <Note>
 * This endpoint requires the permission **Manage documents** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "accounting_month": "2001-12-01",
 * "document_type": "LOJE"
 * }
 * ```
 */
export declare const postCustomDatevEmployeesEmployeeIdDownloadDocument: <ThrowOnError extends boolean = false>(options: Options<PostCustomDatevEmployeesEmployeeIdDownloadDocumentData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostCustomDatevEmployeesEmployeeIdDownloadDocumentSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Create eAU Request
 * Create a request for an electronic certificate of incapacity for work (eAU).
 *
 *
 *
 * <Note>
 * This endpoint requires the permission **Manage eAU** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "start_work_incapacity": "2022-01-01"
 * }
 * ```
 */
export declare const postCustomDatevEmployeesEmployeeIdEauRequests: <ThrowOnError extends boolean = false>(options: Options<PostCustomDatevEmployeesEmployeeIdEauRequestsData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostCustomDatevEmployeesEmployeeIdEauRequestsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Prepare DATEV Payroll
 * What DATEV requires to prepare payroll is very specific and currently, as DATEV is not providing "read", this is not part of the unified model.
 *
 *
 *
 * <Note>
 * This endpoint requires the permission **Manage payroll** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "employee_id": "EvLV61zdahkN4ftPJbmPCkdv",
 * "payroll_run": {
 * "date": "2022-05-01"
 * },
 * "fixed_payments": [
 * {
 * "amount": 560,
 * "lohnart": 100
 * }
 * ],
 * "hourly_payments": [
 * {
 * "hours": 14,
 * "lohnart": 200
 * },
 * {
 * "hours": 16,
 * "lohnart": 232
 * }
 * ],
 * "custom_lodas": [
 * {
 * "amount": 8,
 * "lohnart": 300,
 * "bearbeitungsschluessel": 4
 * }
 * ]
 * }
 * ```
 */
export declare const putCustomDatevEmployeesEmployeeIdPreparePayroll: <ThrowOnError extends boolean = false>(options: Options<PutCustomDatevEmployeesEmployeeIdPreparePayrollData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Set DATEV compensations
 * Sets the compensations for an employee on the specified effective date.
 *
 *
 *
 * Other compensations will end at the effective date. That means, if you would like to add a compensation, you also have to include the compensations that you would like to keep.
 *
 * <Note>
 * This endpoint requires the permission **Manage payroll** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "employee_id": "3bdhemmSP1TPQDGWtRveRot9",
 * "effective_date": "2022-12-01",
 * "compensations": [
 * {
 * "amount": 4500,
 * "currency": "EUR",
 * "period": "MONTH",
 * "lohnart": 200
 * },
 * {
 * "amount": 30,
 * "currency": "EUR",
 * "period": "HOUR"
 * }
 * ]
 * }
 * ```
 */
export declare const putCustomDatevEmployeesEmployeeIdCompensations: <ThrowOnError extends boolean = false>(options: Options<PutCustomDatevEmployeesEmployeeIdCompensationsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Verify service is enabled
 * This endpoint returns whether you can write to this DATEV integration.
 */
export declare const getCustomDatevCheckWritePermission: <ThrowOnError extends boolean = false>(options: Options<GetCustomDatevCheckWritePermissionData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCustomDatevCheckWritePermissionSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Get DATEV data pushes
 * Returns all "DATEV Data Pushes" of the last 2 months. You can use this endpoint to give your users transparency about submitted "ASCII-Files" and their status. Each data push can contain multiple files that were submitted.
 */
export declare const getCustomDatevDataPushes: <ThrowOnError extends boolean = false>(options: Options<GetCustomDatevDataPushesData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").GetCustomDatevDataPushesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Push general data to DATEV
 * Uploads the currently relevant general data (employees, compensations, and time offs) to DATEV. This will create so called ASCII files that the accountant has to import in DATEV. You can call this endpoint to implement an on-demand sync to DATEV, for example if you want to offer your users a button to do that in your application.
 */
export declare const postCustomDatevPushDataGeneral: <ThrowOnError extends boolean = false>(options: Options<PostCustomDatevPushDataGeneralData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostCustomDatevPushDataGeneralSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Push payroll data to DATEV
 * Uploads the currently relevant payroll data (supplements) to DATEV. This will create so called ASCII files that the accountant has to import in DATEV. After finishing the payroll preparation or after correcting payroll, you can call this.
 */
export declare const postCustomDatevPushDataPayroll: <ThrowOnError extends boolean = false>(options: Options<PostCustomDatevPushDataPayrollData, ThrowOnError>) => import("./client").RequestResult<import("./types.gen").PostCustomDatevPushDataPayrollSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
/**
 * Write Payroll Supplement
 * Write a payroll supplement to Silae using the supplement code.
 *
 *
 *
 * <Note>
 * This endpoint requires the permission **Manage payroll** to be enabled in [your scope config](/scopes).
 * </Note>
 *
 * ### Example Request Body
 *
 * ```json
 * {
 * "employee_id": "EvLV61zdahkN4ftPJbmPCkdv",
 * "supplement_code": "200",
 * "effective_date": "2024-01-14",
 * "element_amount": 6
 * }
 * ```
 */
export declare const postCustomSilaeEmployeesEmployeeIdPayrollSupplements: <ThrowOnError extends boolean = false>(options: Options<PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData, ThrowOnError>) => import("./client").RequestResult<string, {
    status: "error";
    error: {
        message: string;
    };
}, ThrowOnError>;
//# sourceMappingURL=sdk.gen.d.ts.map