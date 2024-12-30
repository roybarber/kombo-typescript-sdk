import type { Options } from '../client';
import type { GetCheckApiKeyData, PostForceSyncData, PostPassthroughToolApiData, DeleteIntegrationsIntegrationIdData, GetIntegrationsIntegrationIdData, PostIntegrationsIntegrationIdRelinkData, GetIntegrationsIntegrationIdIntegrationFieldsData, PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdData, GetIntegrationsIntegrationIdCustomFieldsData, PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdData, GetToolsCategoryData, PostHrisProvisioningGroupsGroupIdDiffData, PostHrisProvisioningGroupsGroupIdSetupLinksData, GetHrisEmployeesData, PostHrisEmployeesData, PatchHrisEmployeesEmployeeIdData, PostHrisEmployeesEmployeeIdDocumentsData, PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdData, GetHrisEmployeeDocumentCategoriesData, GetHrisTeamsData, GetHrisGroupsData, GetHrisEmploymentsData, GetHrisLocationsData, GetHrisAbsenceTypesData, GetHrisTimeOffBalancesData, GetHrisAbsencesData, PostHrisAbsencesData, DeleteHrisAbsencesAbsenceIdData, GetHrisLegalEntitiesData, GetHrisAttendanceData, GetHrisTimesheetsData, GetAtsApplicationsData, PutAtsApplicationsApplicationIdStageData, PostAtsApplicationsApplicationIdResultLinksData, PostAtsApplicationsApplicationIdNotesData, GetAtsApplicationsApplicationIdAttachmentsData, PostAtsApplicationsApplicationIdAttachmentsData, PostAtsApplicationsApplicationIdRejectData, GetAtsCandidatesData, PostAtsCandidatesData, PatchAtsCandidatesCandidateIdData, GetAtsCandidatesCandidateIdAttachmentsData, PostAtsCandidatesCandidateIdAttachmentsData, PostAtsCandidatesCandidateIdResultLinksData, DeleteAtsCandidatesCandidateIdTagsData, PostAtsCandidatesCandidateIdTagsData, PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdData, GetAtsTagsData, GetAtsApplicationStagesData, GetAtsJobsData, PostAtsJobsJobIdApplicationsData, GetAtsUsersData, GetAtsOffersData, GetAtsRejectionReasonsData, GetAssessmentPackagesData, PutAssessmentPackagesData, GetAssessmentOrdersOpenData, PutAssessmentOrdersAssessmentOrderIdResultData, PostConnectCreateLinkData, GetConnectIntegrationByTokenTokenData, PostConnectActivateIntegrationData, GetCustomDatevSystemInformationData, PostCustomDatevPassthroughData, GetCustomDatevCheckEauPermissionData, GetCustomDatevEauRequestsEauIdData, GetCustomDatevCheckDocumentPermissionData, GetCustomDatevAvailableDocumentsData, PostCustomDatevDownloadDocumentData, PostCustomDatevEmployeesEmployeeIdDownloadDocumentData, PostCustomDatevEmployeesEmployeeIdEauRequestsData, PutCustomDatevEmployeesEmployeeIdPreparePayrollData, PutCustomDatevEmployeesEmployeeIdCompensationsData, GetCustomDatevCheckWritePermissionData, GetCustomDatevDataPushesData, PostCustomDatevPushDataGeneralData, PostCustomDatevPushDataPayrollData, PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData } from '../types.gen';
type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];
export declare const getCheckApiKeyQueryKey: (options?: Options<GetCheckApiKeyData>) => (Pick<Options<GetCheckApiKeyData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCheckApiKeyOptions: (options?: Options<GetCheckApiKeyData>) => any;
export declare const postForceSyncQueryKey: (options: Options<PostForceSyncData>) => (Pick<Options<PostForceSyncData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postForceSyncOptions: (options: Options<PostForceSyncData>) => any;
export declare const postForceSyncMutation: (options?: Partial<Options<PostForceSyncData>>) => UseMutationOptions<import("../types.gen").PostForceSyncSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostForceSyncData>>;
export declare const postPassthroughToolApiQueryKey: (options: Options<PostPassthroughToolApiData>) => (Pick<Options<PostPassthroughToolApiData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postPassthroughToolApiOptions: (options: Options<PostPassthroughToolApiData>) => any;
export declare const postPassthroughToolApiMutation: (options?: Partial<Options<PostPassthroughToolApiData>>) => UseMutationOptions<import("../types.gen").PostPassthroughToolApiSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostPassthroughToolApiData>>;
export declare const deleteIntegrationsIntegrationIdMutation: (options?: Partial<Options<DeleteIntegrationsIntegrationIdData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<DeleteIntegrationsIntegrationIdData>>;
export declare const getIntegrationsIntegrationIdQueryKey: (options: Options<GetIntegrationsIntegrationIdData>) => (Pick<Options<GetIntegrationsIntegrationIdData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getIntegrationsIntegrationIdOptions: (options: Options<GetIntegrationsIntegrationIdData>) => any;
export declare const postIntegrationsIntegrationIdRelinkQueryKey: (options: Options<PostIntegrationsIntegrationIdRelinkData>) => (Pick<Options<PostIntegrationsIntegrationIdRelinkData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postIntegrationsIntegrationIdRelinkOptions: (options: Options<PostIntegrationsIntegrationIdRelinkData>) => any;
export declare const postIntegrationsIntegrationIdRelinkMutation: (options?: Partial<Options<PostIntegrationsIntegrationIdRelinkData>>) => UseMutationOptions<import("../types.gen").PostIntegrationsIntegrationIdRelinkSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostIntegrationsIntegrationIdRelinkData>>;
export declare const getIntegrationsIntegrationIdIntegrationFieldsQueryKey: (options: Options<GetIntegrationsIntegrationIdIntegrationFieldsData>) => (Pick<Options<GetIntegrationsIntegrationIdIntegrationFieldsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getIntegrationsIntegrationIdIntegrationFieldsOptions: (options: Options<GetIntegrationsIntegrationIdIntegrationFieldsData>) => any;
export declare const getIntegrationsIntegrationIdIntegrationFieldsInfiniteQueryKey: (options: Options<GetIntegrationsIntegrationIdIntegrationFieldsData>) => QueryKey<Options<GetIntegrationsIntegrationIdIntegrationFieldsData>>;
export declare const getIntegrationsIntegrationIdIntegrationFieldsInfiniteOptions: (options: Options<GetIntegrationsIntegrationIdIntegrationFieldsData>) => any;
export declare const patchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdMutation: (options?: Partial<Options<PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdData>>) => UseMutationOptions<import("../types.gen").PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PatchIntegrationsIntegrationIdIntegrationFieldsIntegrationFieldIdData>>;
export declare const getIntegrationsIntegrationIdCustomFieldsQueryKey: (options: Options<GetIntegrationsIntegrationIdCustomFieldsData>) => (Pick<Options<GetIntegrationsIntegrationIdCustomFieldsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getIntegrationsIntegrationIdCustomFieldsOptions: (options: Options<GetIntegrationsIntegrationIdCustomFieldsData>) => any;
export declare const getIntegrationsIntegrationIdCustomFieldsInfiniteQueryKey: (options: Options<GetIntegrationsIntegrationIdCustomFieldsData>) => QueryKey<Options<GetIntegrationsIntegrationIdCustomFieldsData>>;
export declare const getIntegrationsIntegrationIdCustomFieldsInfiniteOptions: (options: Options<GetIntegrationsIntegrationIdCustomFieldsData>) => any;
export declare const putIntegrationsIntegrationIdCustomFieldsCustomFieldIdMutation: (options?: Partial<Options<PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdData>>) => UseMutationOptions<import("../types.gen").PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PutIntegrationsIntegrationIdCustomFieldsCustomFieldIdData>>;
export declare const getToolsCategoryQueryKey: (options: Options<GetToolsCategoryData>) => (Pick<Options<GetToolsCategoryData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getToolsCategoryOptions: (options: Options<GetToolsCategoryData>) => any;
export declare const postHrisProvisioningGroupsGroupIdDiffQueryKey: (options: Options<PostHrisProvisioningGroupsGroupIdDiffData>) => (Pick<Options<PostHrisProvisioningGroupsGroupIdDiffData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postHrisProvisioningGroupsGroupIdDiffOptions: (options: Options<PostHrisProvisioningGroupsGroupIdDiffData>) => any;
export declare const postHrisProvisioningGroupsGroupIdDiffMutation: (options?: Partial<Options<PostHrisProvisioningGroupsGroupIdDiffData>>) => UseMutationOptions<import("../types.gen").PostHrisProvisioningGroupsGroupIdDiffSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostHrisProvisioningGroupsGroupIdDiffData>>;
export declare const postHrisProvisioningGroupsGroupIdSetupLinksQueryKey: (options: Options<PostHrisProvisioningGroupsGroupIdSetupLinksData>) => (Pick<Options<PostHrisProvisioningGroupsGroupIdSetupLinksData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postHrisProvisioningGroupsGroupIdSetupLinksOptions: (options: Options<PostHrisProvisioningGroupsGroupIdSetupLinksData>) => any;
export declare const postHrisProvisioningGroupsGroupIdSetupLinksMutation: (options?: Partial<Options<PostHrisProvisioningGroupsGroupIdSetupLinksData>>) => UseMutationOptions<import("../types.gen").PostHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostHrisProvisioningGroupsGroupIdSetupLinksData>>;
export declare const getHrisEmployeesQueryKey: (options: Options<GetHrisEmployeesData>) => (Pick<Options<GetHrisEmployeesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisEmployeesOptions: (options: Options<GetHrisEmployeesData>) => any;
export declare const getHrisEmployeesInfiniteQueryKey: (options: Options<GetHrisEmployeesData>) => QueryKey<Options<GetHrisEmployeesData>>;
export declare const getHrisEmployeesInfiniteOptions: (options: Options<GetHrisEmployeesData>) => any;
export declare const postHrisEmployeesQueryKey: (options: Options<PostHrisEmployeesData>) => (Pick<Options<PostHrisEmployeesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postHrisEmployeesOptions: (options: Options<PostHrisEmployeesData>) => any;
export declare const postHrisEmployeesMutation: (options?: Partial<Options<PostHrisEmployeesData>>) => UseMutationOptions<import("../types.gen").PostHrisEmployeesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostHrisEmployeesData>>;
export declare const patchHrisEmployeesEmployeeIdMutation: (options?: Partial<Options<PatchHrisEmployeesEmployeeIdData>>) => UseMutationOptions<import("../types.gen").PatchHrisEmployeesEmployeeIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PatchHrisEmployeesEmployeeIdData>>;
export declare const postHrisEmployeesEmployeeIdDocumentsQueryKey: (options: Options<PostHrisEmployeesEmployeeIdDocumentsData>) => (Pick<Options<PostHrisEmployeesEmployeeIdDocumentsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postHrisEmployeesEmployeeIdDocumentsOptions: (options: Options<PostHrisEmployeesEmployeeIdDocumentsData>) => any;
export declare const postHrisEmployeesEmployeeIdDocumentsMutation: (options?: Partial<Options<PostHrisEmployeesEmployeeIdDocumentsData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostHrisEmployeesEmployeeIdDocumentsData>>;
export declare const patchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdMutation: (options?: Partial<Options<PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PatchHrisEmployeesEmployeeIdIntegrationFieldsIntegrationFieldIdData>>;
export declare const getHrisEmployeeDocumentCategoriesQueryKey: (options: Options<GetHrisEmployeeDocumentCategoriesData>) => (Pick<Options<GetHrisEmployeeDocumentCategoriesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisEmployeeDocumentCategoriesOptions: (options: Options<GetHrisEmployeeDocumentCategoriesData>) => any;
export declare const getHrisEmployeeDocumentCategoriesInfiniteQueryKey: (options: Options<GetHrisEmployeeDocumentCategoriesData>) => QueryKey<Options<GetHrisEmployeeDocumentCategoriesData>>;
export declare const getHrisEmployeeDocumentCategoriesInfiniteOptions: (options: Options<GetHrisEmployeeDocumentCategoriesData>) => any;
export declare const getHrisTeamsQueryKey: (options: Options<GetHrisTeamsData>) => (Pick<Options<GetHrisTeamsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisTeamsOptions: (options: Options<GetHrisTeamsData>) => any;
export declare const getHrisTeamsInfiniteQueryKey: (options: Options<GetHrisTeamsData>) => QueryKey<Options<GetHrisTeamsData>>;
export declare const getHrisTeamsInfiniteOptions: (options: Options<GetHrisTeamsData>) => any;
export declare const getHrisGroupsQueryKey: (options: Options<GetHrisGroupsData>) => (Pick<Options<GetHrisGroupsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisGroupsOptions: (options: Options<GetHrisGroupsData>) => any;
export declare const getHrisGroupsInfiniteQueryKey: (options: Options<GetHrisGroupsData>) => QueryKey<Options<GetHrisGroupsData>>;
export declare const getHrisGroupsInfiniteOptions: (options: Options<GetHrisGroupsData>) => any;
export declare const getHrisEmploymentsQueryKey: (options: Options<GetHrisEmploymentsData>) => (Pick<Options<GetHrisEmploymentsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisEmploymentsOptions: (options: Options<GetHrisEmploymentsData>) => any;
export declare const getHrisEmploymentsInfiniteQueryKey: (options: Options<GetHrisEmploymentsData>) => QueryKey<Options<GetHrisEmploymentsData>>;
export declare const getHrisEmploymentsInfiniteOptions: (options: Options<GetHrisEmploymentsData>) => any;
export declare const getHrisLocationsQueryKey: (options: Options<GetHrisLocationsData>) => (Pick<Options<GetHrisLocationsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisLocationsOptions: (options: Options<GetHrisLocationsData>) => any;
export declare const getHrisLocationsInfiniteQueryKey: (options: Options<GetHrisLocationsData>) => QueryKey<Options<GetHrisLocationsData>>;
export declare const getHrisLocationsInfiniteOptions: (options: Options<GetHrisLocationsData>) => any;
export declare const getHrisAbsenceTypesQueryKey: (options: Options<GetHrisAbsenceTypesData>) => (Pick<Options<GetHrisAbsenceTypesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisAbsenceTypesOptions: (options: Options<GetHrisAbsenceTypesData>) => any;
export declare const getHrisAbsenceTypesInfiniteQueryKey: (options: Options<GetHrisAbsenceTypesData>) => QueryKey<Options<GetHrisAbsenceTypesData>>;
export declare const getHrisAbsenceTypesInfiniteOptions: (options: Options<GetHrisAbsenceTypesData>) => any;
export declare const getHrisTimeOffBalancesQueryKey: (options: Options<GetHrisTimeOffBalancesData>) => (Pick<Options<GetHrisTimeOffBalancesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisTimeOffBalancesOptions: (options: Options<GetHrisTimeOffBalancesData>) => any;
export declare const getHrisTimeOffBalancesInfiniteQueryKey: (options: Options<GetHrisTimeOffBalancesData>) => QueryKey<Options<GetHrisTimeOffBalancesData>>;
export declare const getHrisTimeOffBalancesInfiniteOptions: (options: Options<GetHrisTimeOffBalancesData>) => any;
export declare const getHrisAbsencesQueryKey: (options: Options<GetHrisAbsencesData>) => (Pick<Options<GetHrisAbsencesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisAbsencesOptions: (options: Options<GetHrisAbsencesData>) => any;
export declare const getHrisAbsencesInfiniteQueryKey: (options: Options<GetHrisAbsencesData>) => QueryKey<Options<GetHrisAbsencesData>>;
export declare const getHrisAbsencesInfiniteOptions: (options: Options<GetHrisAbsencesData>) => any;
export declare const postHrisAbsencesQueryKey: (options: Options<PostHrisAbsencesData>) => (Pick<Options<PostHrisAbsencesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postHrisAbsencesOptions: (options: Options<PostHrisAbsencesData>) => any;
export declare const postHrisAbsencesMutation: (options?: Partial<Options<PostHrisAbsencesData>>) => UseMutationOptions<import("../types.gen").PostHrisAbsencesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostHrisAbsencesData>>;
export declare const deleteHrisAbsencesAbsenceIdMutation: (options?: Partial<Options<DeleteHrisAbsencesAbsenceIdData>>) => UseMutationOptions<import("../types.gen").DeleteHrisAbsencesAbsenceIdSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<DeleteHrisAbsencesAbsenceIdData>>;
export declare const getHrisLegalEntitiesQueryKey: (options: Options<GetHrisLegalEntitiesData>) => (Pick<Options<GetHrisLegalEntitiesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisLegalEntitiesOptions: (options: Options<GetHrisLegalEntitiesData>) => any;
export declare const getHrisLegalEntitiesInfiniteQueryKey: (options: Options<GetHrisLegalEntitiesData>) => QueryKey<Options<GetHrisLegalEntitiesData>>;
export declare const getHrisLegalEntitiesInfiniteOptions: (options: Options<GetHrisLegalEntitiesData>) => any;
export declare const getHrisAttendanceQueryKey: (options: Options<GetHrisAttendanceData>) => (Pick<Options<GetHrisAttendanceData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisAttendanceOptions: (options: Options<GetHrisAttendanceData>) => any;
export declare const getHrisTimesheetsQueryKey: (options: Options<GetHrisTimesheetsData>) => (Pick<Options<GetHrisTimesheetsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getHrisTimesheetsOptions: (options: Options<GetHrisTimesheetsData>) => any;
export declare const getAtsApplicationsQueryKey: (options: Options<GetAtsApplicationsData>) => (Pick<Options<GetAtsApplicationsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsApplicationsOptions: (options: Options<GetAtsApplicationsData>) => any;
export declare const getAtsApplicationsInfiniteQueryKey: (options: Options<GetAtsApplicationsData>) => QueryKey<Options<GetAtsApplicationsData>>;
export declare const getAtsApplicationsInfiniteOptions: (options: Options<GetAtsApplicationsData>) => any;
export declare const putAtsApplicationsApplicationIdStageMutation: (options?: Partial<Options<PutAtsApplicationsApplicationIdStageData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PutAtsApplicationsApplicationIdStageData>>;
export declare const postAtsApplicationsApplicationIdResultLinksQueryKey: (options: Options<PostAtsApplicationsApplicationIdResultLinksData>) => (Pick<Options<PostAtsApplicationsApplicationIdResultLinksData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsApplicationsApplicationIdResultLinksOptions: (options: Options<PostAtsApplicationsApplicationIdResultLinksData>) => any;
export declare const postAtsApplicationsApplicationIdResultLinksMutation: (options?: Partial<Options<PostAtsApplicationsApplicationIdResultLinksData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsApplicationsApplicationIdResultLinksData>>;
export declare const postAtsApplicationsApplicationIdNotesQueryKey: (options: Options<PostAtsApplicationsApplicationIdNotesData>) => (Pick<Options<PostAtsApplicationsApplicationIdNotesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsApplicationsApplicationIdNotesOptions: (options: Options<PostAtsApplicationsApplicationIdNotesData>) => any;
export declare const postAtsApplicationsApplicationIdNotesMutation: (options?: Partial<Options<PostAtsApplicationsApplicationIdNotesData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsApplicationsApplicationIdNotesData>>;
export declare const getAtsApplicationsApplicationIdAttachmentsQueryKey: (options: Options<GetAtsApplicationsApplicationIdAttachmentsData>) => (Pick<Options<GetAtsApplicationsApplicationIdAttachmentsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsApplicationsApplicationIdAttachmentsOptions: (options: Options<GetAtsApplicationsApplicationIdAttachmentsData>) => any;
export declare const postAtsApplicationsApplicationIdAttachmentsQueryKey: (options: Options<PostAtsApplicationsApplicationIdAttachmentsData>) => (Pick<Options<PostAtsApplicationsApplicationIdAttachmentsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsApplicationsApplicationIdAttachmentsOptions: (options: Options<PostAtsApplicationsApplicationIdAttachmentsData>) => any;
export declare const postAtsApplicationsApplicationIdAttachmentsMutation: (options?: Partial<Options<PostAtsApplicationsApplicationIdAttachmentsData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsApplicationsApplicationIdAttachmentsData>>;
export declare const postAtsApplicationsApplicationIdRejectQueryKey: (options: Options<PostAtsApplicationsApplicationIdRejectData>) => (Pick<Options<PostAtsApplicationsApplicationIdRejectData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsApplicationsApplicationIdRejectOptions: (options: Options<PostAtsApplicationsApplicationIdRejectData>) => any;
export declare const postAtsApplicationsApplicationIdRejectMutation: (options?: Partial<Options<PostAtsApplicationsApplicationIdRejectData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsApplicationsApplicationIdRejectData>>;
export declare const getAtsCandidatesQueryKey: (options: Options<GetAtsCandidatesData>) => (Pick<Options<GetAtsCandidatesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsCandidatesOptions: (options: Options<GetAtsCandidatesData>) => any;
export declare const getAtsCandidatesInfiniteQueryKey: (options: Options<GetAtsCandidatesData>) => QueryKey<Options<GetAtsCandidatesData>>;
export declare const getAtsCandidatesInfiniteOptions: (options: Options<GetAtsCandidatesData>) => any;
export declare const postAtsCandidatesQueryKey: (options: Options<PostAtsCandidatesData>) => (Pick<Options<PostAtsCandidatesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsCandidatesOptions: (options: Options<PostAtsCandidatesData>) => any;
export declare const postAtsCandidatesMutation: (options?: Partial<Options<PostAtsCandidatesData>>) => UseMutationOptions<import("../types.gen").PostAtsCandidatesSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsCandidatesData>>;
export declare const patchAtsCandidatesCandidateIdMutation: (options?: Partial<Options<PatchAtsCandidatesCandidateIdData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PatchAtsCandidatesCandidateIdData>>;
export declare const getAtsCandidatesCandidateIdAttachmentsQueryKey: (options: Options<GetAtsCandidatesCandidateIdAttachmentsData>) => (Pick<Options<GetAtsCandidatesCandidateIdAttachmentsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsCandidatesCandidateIdAttachmentsOptions: (options: Options<GetAtsCandidatesCandidateIdAttachmentsData>) => any;
export declare const postAtsCandidatesCandidateIdAttachmentsQueryKey: (options: Options<PostAtsCandidatesCandidateIdAttachmentsData>) => (Pick<Options<PostAtsCandidatesCandidateIdAttachmentsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsCandidatesCandidateIdAttachmentsOptions: (options: Options<PostAtsCandidatesCandidateIdAttachmentsData>) => any;
export declare const postAtsCandidatesCandidateIdAttachmentsMutation: (options?: Partial<Options<PostAtsCandidatesCandidateIdAttachmentsData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsCandidatesCandidateIdAttachmentsData>>;
export declare const postAtsCandidatesCandidateIdResultLinksQueryKey: (options: Options<PostAtsCandidatesCandidateIdResultLinksData>) => (Pick<Options<PostAtsCandidatesCandidateIdResultLinksData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsCandidatesCandidateIdResultLinksOptions: (options: Options<PostAtsCandidatesCandidateIdResultLinksData>) => any;
export declare const postAtsCandidatesCandidateIdResultLinksMutation: (options?: Partial<Options<PostAtsCandidatesCandidateIdResultLinksData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsCandidatesCandidateIdResultLinksData>>;
export declare const deleteAtsCandidatesCandidateIdTagsMutation: (options?: Partial<Options<DeleteAtsCandidatesCandidateIdTagsData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<DeleteAtsCandidatesCandidateIdTagsData>>;
export declare const postAtsCandidatesCandidateIdTagsQueryKey: (options: Options<PostAtsCandidatesCandidateIdTagsData>) => (Pick<Options<PostAtsCandidatesCandidateIdTagsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsCandidatesCandidateIdTagsOptions: (options: Options<PostAtsCandidatesCandidateIdTagsData>) => any;
export declare const postAtsCandidatesCandidateIdTagsMutation: (options?: Partial<Options<PostAtsCandidatesCandidateIdTagsData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsCandidatesCandidateIdTagsData>>;
export declare const patchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdMutation: (options?: Partial<Options<PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PatchAtsCandidatesCandidateIdIntegrationFieldsIntegrationFieldIdData>>;
export declare const getAtsTagsQueryKey: (options: Options<GetAtsTagsData>) => (Pick<Options<GetAtsTagsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsTagsOptions: (options: Options<GetAtsTagsData>) => any;
export declare const getAtsTagsInfiniteQueryKey: (options: Options<GetAtsTagsData>) => QueryKey<Options<GetAtsTagsData>>;
export declare const getAtsTagsInfiniteOptions: (options: Options<GetAtsTagsData>) => any;
export declare const getAtsApplicationStagesQueryKey: (options: Options<GetAtsApplicationStagesData>) => (Pick<Options<GetAtsApplicationStagesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsApplicationStagesOptions: (options: Options<GetAtsApplicationStagesData>) => any;
export declare const getAtsApplicationStagesInfiniteQueryKey: (options: Options<GetAtsApplicationStagesData>) => QueryKey<Options<GetAtsApplicationStagesData>>;
export declare const getAtsApplicationStagesInfiniteOptions: (options: Options<GetAtsApplicationStagesData>) => any;
export declare const getAtsJobsQueryKey: (options: Options<GetAtsJobsData>) => (Pick<Options<GetAtsJobsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsJobsOptions: (options: Options<GetAtsJobsData>) => any;
export declare const getAtsJobsInfiniteQueryKey: (options: Options<GetAtsJobsData>) => QueryKey<Options<GetAtsJobsData>>;
export declare const getAtsJobsInfiniteOptions: (options: Options<GetAtsJobsData>) => any;
export declare const postAtsJobsJobIdApplicationsQueryKey: (options: Options<PostAtsJobsJobIdApplicationsData>) => (Pick<Options<PostAtsJobsJobIdApplicationsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postAtsJobsJobIdApplicationsOptions: (options: Options<PostAtsJobsJobIdApplicationsData>) => any;
export declare const postAtsJobsJobIdApplicationsMutation: (options?: Partial<Options<PostAtsJobsJobIdApplicationsData>>) => UseMutationOptions<import("../types.gen").PostAtsJobsJobIdApplicationsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostAtsJobsJobIdApplicationsData>>;
export declare const getAtsUsersQueryKey: (options: Options<GetAtsUsersData>) => (Pick<Options<GetAtsUsersData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsUsersOptions: (options: Options<GetAtsUsersData>) => any;
export declare const getAtsUsersInfiniteQueryKey: (options: Options<GetAtsUsersData>) => QueryKey<Options<GetAtsUsersData>>;
export declare const getAtsUsersInfiniteOptions: (options: Options<GetAtsUsersData>) => any;
export declare const getAtsOffersQueryKey: (options: Options<GetAtsOffersData>) => (Pick<Options<GetAtsOffersData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsOffersOptions: (options: Options<GetAtsOffersData>) => any;
export declare const getAtsOffersInfiniteQueryKey: (options: Options<GetAtsOffersData>) => QueryKey<Options<GetAtsOffersData>>;
export declare const getAtsOffersInfiniteOptions: (options: Options<GetAtsOffersData>) => any;
export declare const getAtsRejectionReasonsQueryKey: (options: Options<GetAtsRejectionReasonsData>) => (Pick<Options<GetAtsRejectionReasonsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAtsRejectionReasonsOptions: (options: Options<GetAtsRejectionReasonsData>) => any;
export declare const getAtsRejectionReasonsInfiniteQueryKey: (options: Options<GetAtsRejectionReasonsData>) => QueryKey<Options<GetAtsRejectionReasonsData>>;
export declare const getAtsRejectionReasonsInfiniteOptions: (options: Options<GetAtsRejectionReasonsData>) => any;
export declare const getAssessmentPackagesQueryKey: (options: Options<GetAssessmentPackagesData>) => (Pick<Options<GetAssessmentPackagesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAssessmentPackagesOptions: (options: Options<GetAssessmentPackagesData>) => any;
export declare const putAssessmentPackagesMutation: (options?: Partial<Options<PutAssessmentPackagesData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PutAssessmentPackagesData>>;
export declare const getAssessmentOrdersOpenQueryKey: (options: Options<GetAssessmentOrdersOpenData>) => (Pick<Options<GetAssessmentOrdersOpenData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getAssessmentOrdersOpenOptions: (options: Options<GetAssessmentOrdersOpenData>) => any;
export declare const getAssessmentOrdersOpenInfiniteQueryKey: (options: Options<GetAssessmentOrdersOpenData>) => QueryKey<Options<GetAssessmentOrdersOpenData>>;
export declare const getAssessmentOrdersOpenInfiniteOptions: (options: Options<GetAssessmentOrdersOpenData>) => any;
export declare const putAssessmentOrdersAssessmentOrderIdResultMutation: (options?: Partial<Options<PutAssessmentOrdersAssessmentOrderIdResultData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PutAssessmentOrdersAssessmentOrderIdResultData>>;
export declare const postConnectCreateLinkQueryKey: (options?: Options<PostConnectCreateLinkData>) => (Pick<Options<PostConnectCreateLinkData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postConnectCreateLinkOptions: (options?: Options<PostConnectCreateLinkData>) => any;
export declare const postConnectCreateLinkMutation: (options?: Partial<Options<PostConnectCreateLinkData>>) => UseMutationOptions<import("../types.gen").PostConnectCreateLinkSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostConnectCreateLinkData>>;
export declare const getConnectIntegrationByTokenTokenQueryKey: (options: Options<GetConnectIntegrationByTokenTokenData>) => (Pick<Options<GetConnectIntegrationByTokenTokenData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getConnectIntegrationByTokenTokenOptions: (options: Options<GetConnectIntegrationByTokenTokenData>) => any;
export declare const postConnectActivateIntegrationQueryKey: (options?: Options<PostConnectActivateIntegrationData>) => (Pick<Options<PostConnectActivateIntegrationData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postConnectActivateIntegrationOptions: (options?: Options<PostConnectActivateIntegrationData>) => any;
export declare const postConnectActivateIntegrationMutation: (options?: Partial<Options<PostConnectActivateIntegrationData>>) => UseMutationOptions<import("../types.gen").PostConnectActivateIntegrationSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostConnectActivateIntegrationData>>;
export declare const getCustomDatevSystemInformationQueryKey: (options: Options<GetCustomDatevSystemInformationData>) => (Pick<Options<GetCustomDatevSystemInformationData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCustomDatevSystemInformationOptions: (options: Options<GetCustomDatevSystemInformationData>) => any;
export declare const postCustomDatevPassthroughQueryKey: (options: Options<PostCustomDatevPassthroughData>) => (Pick<Options<PostCustomDatevPassthroughData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postCustomDatevPassthroughOptions: (options: Options<PostCustomDatevPassthroughData>) => any;
export declare const postCustomDatevPassthroughMutation: (options?: Partial<Options<PostCustomDatevPassthroughData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostCustomDatevPassthroughData>>;
export declare const getCustomDatevCheckEauPermissionQueryKey: (options: Options<GetCustomDatevCheckEauPermissionData>) => (Pick<Options<GetCustomDatevCheckEauPermissionData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCustomDatevCheckEauPermissionOptions: (options: Options<GetCustomDatevCheckEauPermissionData>) => any;
export declare const getCustomDatevEauRequestsEauIdQueryKey: (options: Options<GetCustomDatevEauRequestsEauIdData>) => (Pick<Options<GetCustomDatevEauRequestsEauIdData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCustomDatevEauRequestsEauIdOptions: (options: Options<GetCustomDatevEauRequestsEauIdData>) => any;
export declare const getCustomDatevCheckDocumentPermissionQueryKey: (options: Options<GetCustomDatevCheckDocumentPermissionData>) => (Pick<Options<GetCustomDatevCheckDocumentPermissionData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCustomDatevCheckDocumentPermissionOptions: (options: Options<GetCustomDatevCheckDocumentPermissionData>) => any;
export declare const getCustomDatevAvailableDocumentsQueryKey: (options: Options<GetCustomDatevAvailableDocumentsData>) => (Pick<Options<GetCustomDatevAvailableDocumentsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCustomDatevAvailableDocumentsOptions: (options: Options<GetCustomDatevAvailableDocumentsData>) => any;
export declare const postCustomDatevDownloadDocumentQueryKey: (options: Options<PostCustomDatevDownloadDocumentData>) => (Pick<Options<PostCustomDatevDownloadDocumentData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postCustomDatevDownloadDocumentOptions: (options: Options<PostCustomDatevDownloadDocumentData>) => any;
export declare const postCustomDatevDownloadDocumentMutation: (options?: Partial<Options<PostCustomDatevDownloadDocumentData>>) => UseMutationOptions<import("../types.gen").PostCustomDatevDownloadDocumentSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostCustomDatevDownloadDocumentData>>;
export declare const postCustomDatevEmployeesEmployeeIdDownloadDocumentQueryKey: (options: Options<PostCustomDatevEmployeesEmployeeIdDownloadDocumentData>) => (Pick<Options<PostCustomDatevEmployeesEmployeeIdDownloadDocumentData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postCustomDatevEmployeesEmployeeIdDownloadDocumentOptions: (options: Options<PostCustomDatevEmployeesEmployeeIdDownloadDocumentData>) => any;
export declare const postCustomDatevEmployeesEmployeeIdDownloadDocumentMutation: (options?: Partial<Options<PostCustomDatevEmployeesEmployeeIdDownloadDocumentData>>) => UseMutationOptions<import("../types.gen").PostCustomDatevEmployeesEmployeeIdDownloadDocumentSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostCustomDatevEmployeesEmployeeIdDownloadDocumentData>>;
export declare const postCustomDatevEmployeesEmployeeIdEauRequestsQueryKey: (options: Options<PostCustomDatevEmployeesEmployeeIdEauRequestsData>) => (Pick<Options<PostCustomDatevEmployeesEmployeeIdEauRequestsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postCustomDatevEmployeesEmployeeIdEauRequestsOptions: (options: Options<PostCustomDatevEmployeesEmployeeIdEauRequestsData>) => any;
export declare const postCustomDatevEmployeesEmployeeIdEauRequestsMutation: (options?: Partial<Options<PostCustomDatevEmployeesEmployeeIdEauRequestsData>>) => UseMutationOptions<import("../types.gen").PostCustomDatevEmployeesEmployeeIdEauRequestsSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostCustomDatevEmployeesEmployeeIdEauRequestsData>>;
export declare const putCustomDatevEmployeesEmployeeIdPreparePayrollMutation: (options?: Partial<Options<PutCustomDatevEmployeesEmployeeIdPreparePayrollData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PutCustomDatevEmployeesEmployeeIdPreparePayrollData>>;
export declare const putCustomDatevEmployeesEmployeeIdCompensationsMutation: (options?: Partial<Options<PutCustomDatevEmployeesEmployeeIdCompensationsData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PutCustomDatevEmployeesEmployeeIdCompensationsData>>;
export declare const getCustomDatevCheckWritePermissionQueryKey: (options: Options<GetCustomDatevCheckWritePermissionData>) => (Pick<Options<GetCustomDatevCheckWritePermissionData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCustomDatevCheckWritePermissionOptions: (options: Options<GetCustomDatevCheckWritePermissionData>) => any;
export declare const getCustomDatevDataPushesQueryKey: (options: Options<GetCustomDatevDataPushesData>) => (Pick<Options<GetCustomDatevDataPushesData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const getCustomDatevDataPushesOptions: (options: Options<GetCustomDatevDataPushesData>) => any;
export declare const postCustomDatevPushDataGeneralQueryKey: (options: Options<PostCustomDatevPushDataGeneralData>) => (Pick<Options<PostCustomDatevPushDataGeneralData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postCustomDatevPushDataGeneralOptions: (options: Options<PostCustomDatevPushDataGeneralData>) => any;
export declare const postCustomDatevPushDataGeneralMutation: (options?: Partial<Options<PostCustomDatevPushDataGeneralData>>) => UseMutationOptions<import("../types.gen").PostCustomDatevPushDataGeneralSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostCustomDatevPushDataGeneralData>>;
export declare const postCustomDatevPushDataPayrollQueryKey: (options: Options<PostCustomDatevPushDataPayrollData>) => (Pick<Options<PostCustomDatevPushDataPayrollData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postCustomDatevPushDataPayrollOptions: (options: Options<PostCustomDatevPushDataPayrollData>) => any;
export declare const postCustomDatevPushDataPayrollMutation: (options?: Partial<Options<PostCustomDatevPushDataPayrollData>>) => UseMutationOptions<import("../types.gen").PostCustomDatevPushDataPayrollSuccessfulResponse, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostCustomDatevPushDataPayrollData>>;
export declare const postCustomSilaeEmployeesEmployeeIdPayrollSupplementsQueryKey: (options: Options<PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData>) => (Pick<Options<PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData>, "path" | "body" | "headers" | "query" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
})[];
export declare const postCustomSilaeEmployeesEmployeeIdPayrollSupplementsOptions: (options: Options<PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData>) => any;
export declare const postCustomSilaeEmployeesEmployeeIdPayrollSupplementsMutation: (options?: Partial<Options<PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData>>) => UseMutationOptions<string, {
    status: "error";
    error: {
        message: string;
    };
}, Options<PostCustomSilaeEmployeesEmployeeIdPayrollSupplementsData>>;
export {};
//# sourceMappingURL=react-query.gen.d.ts.map