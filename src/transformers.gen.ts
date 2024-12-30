// This file is auto-generated by @hey-api/openapi-ts

import type {
	GetIntegrationsIntegrationIdResponse,
	PostHrisProvisioningGroupsGroupIdSetupLinksResponse,
	GetHrisEmployeesResponse,
	PostHrisEmployeesResponse,
	PatchHrisEmployeesEmployeeIdResponse,
	GetHrisEmployeeDocumentCategoriesResponse,
	GetHrisTeamsResponse,
	GetHrisGroupsResponse,
	GetHrisEmploymentsResponse,
	GetHrisLocationsResponse,
	GetHrisAbsenceTypesResponse,
	GetHrisTimeOffBalancesResponse,
	GetHrisAbsencesResponse,
	PostHrisAbsencesResponse,
	DeleteHrisAbsencesAbsenceIdResponse,
	GetHrisLegalEntitiesResponse,
	GetAtsApplicationsResponse,
	GetAtsApplicationsApplicationIdAttachmentsResponse,
	GetAtsCandidatesResponse,
	PostAtsCandidatesResponse,
	GetAtsCandidatesCandidateIdAttachmentsResponse,
	GetAtsTagsResponse,
	GetAtsApplicationStagesResponse,
	GetAtsJobsResponse,
	PostAtsJobsJobIdApplicationsResponse,
	GetAtsUsersResponse,
	GetAtsOffersResponse,
	GetAtsRejectionReasonsResponse,
	GetAssessmentPackagesResponse,
	GetCustomDatevDataPushesResponse
} from './types.gen'

const getIntegrationsIntegrationIdSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.created_at = new Date(data.data.created_at)
	return data.data
	return data
}

export const getIntegrationsIntegrationIdResponseTransformer = async (data: any): Promise<GetIntegrationsIntegrationIdResponse> => {
	data = getIntegrationsIntegrationIdSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const postHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.expires_at = new Date(data.data.expires_at)
	return data.data
	return data
}

export const postHrisProvisioningGroupsGroupIdSetupLinksResponseTransformer = async (data: any): Promise<PostHrisProvisioningGroupsGroupIdSetupLinksResponse> => {
	data = postHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisEmployeesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.date_of_birth = new Date(item.date_of_birth)
		item.start_date = new Date(item.start_date)
		item.termination_date = new Date(item.termination_date)
		item.remote_created_at = new Date(item.remote_created_at)
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		item.employments = item.employments.map((item: any) => {
			item.effective_date = new Date(item.effective_date)
			item.changed_at = new Date(item.changed_at)
			item.remote_deleted_at = new Date(item.remote_deleted_at)
			return item
		})
		item.time_off_balances = item.time_off_balances.map((item: any) => {
			item.changed_at = new Date(item.changed_at)
			item.remote_deleted_at = new Date(item.remote_deleted_at)
			return item
		})
		item.manager.termination_date = new Date(item.manager.termination_date)
		return item.manager
		item.work_location.changed_at = new Date(item.work_location.changed_at)
		item.work_location.remote_deleted_at = new Date(item.work_location.remote_deleted_at)
		return item.work_location
		return item
	})
	return data.data
	return data
}

export const getHrisEmployeesResponseTransformer = async (data: any): Promise<GetHrisEmployeesResponse> => {
	data = getHrisEmployeesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const postHrisEmployeesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.date_of_birth = new Date(data.data.date_of_birth)
	data.data.start_date = new Date(data.data.start_date)
	data.data.termination_date = new Date(data.data.termination_date)
	data.data.remote_created_at = new Date(data.data.remote_created_at)
	data.data.changed_at = new Date(data.data.changed_at)
	data.data.remote_deleted_at = new Date(data.data.remote_deleted_at)
	return data.data
	return data
}

export const postHrisEmployeesResponseTransformer = async (data: any): Promise<PostHrisEmployeesResponse> => {
	data = postHrisEmployeesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const patchHrisEmployeesEmployeeIdSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.date_of_birth = new Date(data.data.date_of_birth)
	data.data.start_date = new Date(data.data.start_date)
	data.data.termination_date = new Date(data.data.termination_date)
	data.data.remote_created_at = new Date(data.data.remote_created_at)
	data.data.changed_at = new Date(data.data.changed_at)
	data.data.remote_deleted_at = new Date(data.data.remote_deleted_at)
	return data.data
	return data
}

export const patchHrisEmployeesEmployeeIdResponseTransformer = async (data: any): Promise<PatchHrisEmployeesEmployeeIdResponse> => {
	data = patchHrisEmployeesEmployeeIdSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisEmployeeDocumentCategoriesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getHrisEmployeeDocumentCategoriesResponseTransformer = async (data: any): Promise<GetHrisEmployeeDocumentCategoriesResponse> => {
	data = getHrisEmployeeDocumentCategoriesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisTeamsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getHrisTeamsResponseTransformer = async (data: any): Promise<GetHrisTeamsResponse> => {
	data = getHrisTeamsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisGroupsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getHrisGroupsResponseTransformer = async (data: any): Promise<GetHrisGroupsResponse> => {
	data = getHrisGroupsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisEmploymentsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.effective_date = new Date(item.effective_date)
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getHrisEmploymentsResponseTransformer = async (data: any): Promise<GetHrisEmploymentsResponse> => {
	data = getHrisEmploymentsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisLocationsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getHrisLocationsResponseTransformer = async (data: any): Promise<GetHrisLocationsResponse> => {
	data = getHrisLocationsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisAbsenceTypesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getHrisAbsenceTypesResponseTransformer = async (data: any): Promise<GetHrisAbsenceTypesResponse> => {
	data = getHrisAbsenceTypesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisTimeOffBalancesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		item.type.changed_at = new Date(item.type.changed_at)
		item.type.remote_deleted_at = new Date(item.type.remote_deleted_at)
		return item.type
		return item
	})
	return data.data
	return data
}

export const getHrisTimeOffBalancesResponseTransformer = async (data: any): Promise<GetHrisTimeOffBalancesResponse> => {
	data = getHrisTimeOffBalancesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisAbsencesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		item.type.changed_at = new Date(item.type.changed_at)
		item.type.remote_deleted_at = new Date(item.type.remote_deleted_at)
		return item.type
		return item
	})
	return data.data
	return data
}

export const getHrisAbsencesResponseTransformer = async (data: any): Promise<GetHrisAbsencesResponse> => {
	data = getHrisAbsencesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const postHrisAbsencesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.changed_at = new Date(data.data.changed_at)
	data.data.remote_deleted_at = new Date(data.data.remote_deleted_at)
	return data.data
	return data
}

export const postHrisAbsencesResponseTransformer = async (data: any): Promise<PostHrisAbsencesResponse> => {
	data = postHrisAbsencesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const deleteHrisAbsencesAbsenceIdSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.changed_at = new Date(data.data.changed_at)
	data.data.remote_deleted_at = new Date(data.data.remote_deleted_at)
	return data.data
	return data
}

export const deleteHrisAbsencesAbsenceIdResponseTransformer = async (data: any): Promise<DeleteHrisAbsencesAbsenceIdResponse> => {
	data = deleteHrisAbsencesAbsenceIdSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getHrisLegalEntitiesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getHrisLegalEntitiesResponseTransformer = async (data: any): Promise<GetHrisLegalEntitiesResponse> => {
	data = getHrisLegalEntitiesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsApplicationsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		item.remote_created_at = new Date(item.remote_created_at)
		item.remote_updated_at = new Date(item.remote_updated_at)
		item.interviews = item.interviews.map((item: any) => {
			item.starting_at = new Date(item.starting_at)
			item.ending_at = new Date(item.ending_at)
			return item
		})
		return item
	})
	return data.data
	return data
}

export const getAtsApplicationsResponseTransformer = async (data: any): Promise<GetAtsApplicationsResponse> => {
	data = getAtsApplicationsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsApplicationsApplicationIdAttachmentsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.remote_created_at = new Date(item.remote_created_at)
		item.remote_updated_at = new Date(item.remote_updated_at)
		return item
	})
	return data.data
	return data
}

export const getAtsApplicationsApplicationIdAttachmentsResponseTransformer = async (data: any): Promise<GetAtsApplicationsApplicationIdAttachmentsResponse> => {
	data = getAtsApplicationsApplicationIdAttachmentsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsCandidatesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.remote_created_at = new Date(item.remote_created_at)
		item.remote_updated_at = new Date(item.remote_updated_at)
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getAtsCandidatesResponseTransformer = async (data: any): Promise<GetAtsCandidatesResponse> => {
	data = getAtsCandidatesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const postAtsCandidatesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.remote_created_at = new Date(data.data.remote_created_at)
	data.data.remote_updated_at = new Date(data.data.remote_updated_at)
	data.data.changed_at = new Date(data.data.changed_at)
	data.data.remote_deleted_at = new Date(data.data.remote_deleted_at)
	return data.data
	return data
}

export const postAtsCandidatesResponseTransformer = async (data: any): Promise<PostAtsCandidatesResponse> => {
	data = postAtsCandidatesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsCandidatesCandidateIdAttachmentsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.remote_created_at = new Date(item.remote_created_at)
		item.remote_updated_at = new Date(item.remote_updated_at)
		return item
	})
	return data.data
	return data
}

export const getAtsCandidatesCandidateIdAttachmentsResponseTransformer = async (data: any): Promise<GetAtsCandidatesCandidateIdAttachmentsResponse> => {
	data = getAtsCandidatesCandidateIdAttachmentsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsTagsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getAtsTagsResponseTransformer = async (data: any): Promise<GetAtsTagsResponse> => {
	data = getAtsTagsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsApplicationStagesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getAtsApplicationStagesResponseTransformer = async (data: any): Promise<GetAtsApplicationStagesResponse> => {
	data = getAtsApplicationStagesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsJobsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.opened_at = new Date(item.opened_at)
		item.closed_at = new Date(item.closed_at)
		item.remote_created_at = new Date(item.remote_created_at)
		item.remote_updated_at = new Date(item.remote_updated_at)
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getAtsJobsResponseTransformer = async (data: any): Promise<GetAtsJobsResponse> => {
	data = getAtsJobsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const postAtsJobsJobIdApplicationsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.changed_at = new Date(data.data.changed_at)
	data.data.remote_deleted_at = new Date(data.data.remote_deleted_at)
	data.data.remote_created_at = new Date(data.data.remote_created_at)
	data.data.remote_updated_at = new Date(data.data.remote_updated_at)
	data.data.candidate.remote_created_at = new Date(data.data.candidate.remote_created_at)
	data.data.candidate.remote_updated_at = new Date(data.data.candidate.remote_updated_at)
	data.data.candidate.changed_at = new Date(data.data.candidate.changed_at)
	data.data.candidate.remote_deleted_at = new Date(data.data.candidate.remote_deleted_at)
	return data.data.candidate
	return data.data
	return data
}

export const postAtsJobsJobIdApplicationsResponseTransformer = async (data: any): Promise<PostAtsJobsJobIdApplicationsResponse> => {
	data = postAtsJobsJobIdApplicationsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsUsersSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getAtsUsersResponseTransformer = async (data: any): Promise<GetAtsUsersResponse> => {
	data = getAtsUsersSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsOffersSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.employment_start_date = new Date(item.employment_start_date)
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		item.remote_created_at = new Date(item.remote_created_at)
		item.remote_updated_at = new Date(item.remote_updated_at)
		return item
	})
	return data.data
	return data
}

export const getAtsOffersResponseTransformer = async (data: any): Promise<GetAtsOffersResponse> => {
	data = getAtsOffersSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAtsRejectionReasonsSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.results = data.data.results.map((item: any) => {
		item.changed_at = new Date(item.changed_at)
		item.remote_deleted_at = new Date(item.remote_deleted_at)
		return item
	})
	return data.data
	return data
}

export const getAtsRejectionReasonsResponseTransformer = async (data: any): Promise<GetAtsRejectionReasonsResponse> => {
	data = getAtsRejectionReasonsSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getAssessmentPackagesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.packages = data.data.packages.map((item: any) => {
		item.updated_at = new Date(item.updated_at)
		return item
	})
	return data.data
	return data
}

export const getAssessmentPackagesResponseTransformer = async (data: any): Promise<GetAssessmentPackagesResponse> => {
	data = getAssessmentPackagesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}

const getCustomDatevDataPushesSuccessfulResponseSchemaResponseTransformer = (data: any) => {
	data.data.data_pushes = data.data.data_pushes.map((item: any) => {
		item.created_at = new Date(item.created_at)
		return item
	})
	return data.data
	return data
}

export const getCustomDatevDataPushesResponseTransformer = async (data: any): Promise<GetCustomDatevDataPushesResponse> => {
	data = getCustomDatevDataPushesSuccessfulResponseSchemaResponseTransformer(data)
	return data
}
