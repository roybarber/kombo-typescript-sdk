// This file is auto-generated by @hey-api/openapi-ts
const getIntegrationsIntegrationIdSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.created_at = new Date(data.data.created_at);
    return data.data;
    return data;
};
export const getIntegrationsIntegrationIdResponseTransformer = async (data) => {
    data = getIntegrationsIntegrationIdSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const postHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.expires_at = new Date(data.data.expires_at);
    return data.data;
    return data;
};
export const postHrisProvisioningGroupsGroupIdSetupLinksResponseTransformer = async (data) => {
    data = postHrisProvisioningGroupsGroupIdSetupLinksSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisEmployeesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.date_of_birth = new Date(item.date_of_birth);
        item.start_date = new Date(item.start_date);
        item.termination_date = new Date(item.termination_date);
        item.remote_created_at = new Date(item.remote_created_at);
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        item.employments = item.employments.map((item) => {
            item.effective_date = new Date(item.effective_date);
            item.changed_at = new Date(item.changed_at);
            item.remote_deleted_at = new Date(item.remote_deleted_at);
            return item;
        });
        item.time_off_balances = item.time_off_balances.map((item) => {
            item.changed_at = new Date(item.changed_at);
            item.remote_deleted_at = new Date(item.remote_deleted_at);
            return item;
        });
        item.manager.termination_date = new Date(item.manager.termination_date);
        return item.manager;
        item.work_location.changed_at = new Date(item.work_location.changed_at);
        item.work_location.remote_deleted_at = new Date(item.work_location.remote_deleted_at);
        return item.work_location;
        return item;
    });
    return data.data;
    return data;
};
export const getHrisEmployeesResponseTransformer = async (data) => {
    data = getHrisEmployeesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const postHrisEmployeesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.date_of_birth = new Date(data.data.date_of_birth);
    data.data.start_date = new Date(data.data.start_date);
    data.data.termination_date = new Date(data.data.termination_date);
    data.data.remote_created_at = new Date(data.data.remote_created_at);
    data.data.changed_at = new Date(data.data.changed_at);
    data.data.remote_deleted_at = new Date(data.data.remote_deleted_at);
    return data.data;
    return data;
};
export const postHrisEmployeesResponseTransformer = async (data) => {
    data = postHrisEmployeesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const patchHrisEmployeesEmployeeIdSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.date_of_birth = new Date(data.data.date_of_birth);
    data.data.start_date = new Date(data.data.start_date);
    data.data.termination_date = new Date(data.data.termination_date);
    data.data.remote_created_at = new Date(data.data.remote_created_at);
    data.data.changed_at = new Date(data.data.changed_at);
    data.data.remote_deleted_at = new Date(data.data.remote_deleted_at);
    return data.data;
    return data;
};
export const patchHrisEmployeesEmployeeIdResponseTransformer = async (data) => {
    data = patchHrisEmployeesEmployeeIdSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisEmployeeDocumentCategoriesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getHrisEmployeeDocumentCategoriesResponseTransformer = async (data) => {
    data = getHrisEmployeeDocumentCategoriesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisTeamsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getHrisTeamsResponseTransformer = async (data) => {
    data = getHrisTeamsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisGroupsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getHrisGroupsResponseTransformer = async (data) => {
    data = getHrisGroupsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisEmploymentsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.effective_date = new Date(item.effective_date);
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getHrisEmploymentsResponseTransformer = async (data) => {
    data = getHrisEmploymentsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisLocationsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getHrisLocationsResponseTransformer = async (data) => {
    data = getHrisLocationsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisAbsenceTypesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getHrisAbsenceTypesResponseTransformer = async (data) => {
    data = getHrisAbsenceTypesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisTimeOffBalancesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        item.type.changed_at = new Date(item.type.changed_at);
        item.type.remote_deleted_at = new Date(item.type.remote_deleted_at);
        return item.type;
        return item;
    });
    return data.data;
    return data;
};
export const getHrisTimeOffBalancesResponseTransformer = async (data) => {
    data = getHrisTimeOffBalancesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisAbsencesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        item.type.changed_at = new Date(item.type.changed_at);
        item.type.remote_deleted_at = new Date(item.type.remote_deleted_at);
        return item.type;
        return item;
    });
    return data.data;
    return data;
};
export const getHrisAbsencesResponseTransformer = async (data) => {
    data = getHrisAbsencesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const postHrisAbsencesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.changed_at = new Date(data.data.changed_at);
    data.data.remote_deleted_at = new Date(data.data.remote_deleted_at);
    return data.data;
    return data;
};
export const postHrisAbsencesResponseTransformer = async (data) => {
    data = postHrisAbsencesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const deleteHrisAbsencesAbsenceIdSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.changed_at = new Date(data.data.changed_at);
    data.data.remote_deleted_at = new Date(data.data.remote_deleted_at);
    return data.data;
    return data;
};
export const deleteHrisAbsencesAbsenceIdResponseTransformer = async (data) => {
    data = deleteHrisAbsencesAbsenceIdSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getHrisLegalEntitiesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getHrisLegalEntitiesResponseTransformer = async (data) => {
    data = getHrisLegalEntitiesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsApplicationsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        item.remote_created_at = new Date(item.remote_created_at);
        item.remote_updated_at = new Date(item.remote_updated_at);
        item.interviews = item.interviews.map((item) => {
            item.starting_at = new Date(item.starting_at);
            item.ending_at = new Date(item.ending_at);
            return item;
        });
        return item;
    });
    return data.data;
    return data;
};
export const getAtsApplicationsResponseTransformer = async (data) => {
    data = getAtsApplicationsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsApplicationsApplicationIdAttachmentsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.remote_created_at = new Date(item.remote_created_at);
        item.remote_updated_at = new Date(item.remote_updated_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsApplicationsApplicationIdAttachmentsResponseTransformer = async (data) => {
    data = getAtsApplicationsApplicationIdAttachmentsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsCandidatesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.remote_created_at = new Date(item.remote_created_at);
        item.remote_updated_at = new Date(item.remote_updated_at);
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsCandidatesResponseTransformer = async (data) => {
    data = getAtsCandidatesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const postAtsCandidatesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.remote_created_at = new Date(data.data.remote_created_at);
    data.data.remote_updated_at = new Date(data.data.remote_updated_at);
    data.data.changed_at = new Date(data.data.changed_at);
    data.data.remote_deleted_at = new Date(data.data.remote_deleted_at);
    return data.data;
    return data;
};
export const postAtsCandidatesResponseTransformer = async (data) => {
    data = postAtsCandidatesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsCandidatesCandidateIdAttachmentsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.remote_created_at = new Date(item.remote_created_at);
        item.remote_updated_at = new Date(item.remote_updated_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsCandidatesCandidateIdAttachmentsResponseTransformer = async (data) => {
    data = getAtsCandidatesCandidateIdAttachmentsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsTagsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsTagsResponseTransformer = async (data) => {
    data = getAtsTagsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsApplicationStagesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsApplicationStagesResponseTransformer = async (data) => {
    data = getAtsApplicationStagesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsJobsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.opened_at = new Date(item.opened_at);
        item.closed_at = new Date(item.closed_at);
        item.remote_created_at = new Date(item.remote_created_at);
        item.remote_updated_at = new Date(item.remote_updated_at);
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsJobsResponseTransformer = async (data) => {
    data = getAtsJobsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const postAtsJobsJobIdApplicationsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.changed_at = new Date(data.data.changed_at);
    data.data.remote_deleted_at = new Date(data.data.remote_deleted_at);
    data.data.remote_created_at = new Date(data.data.remote_created_at);
    data.data.remote_updated_at = new Date(data.data.remote_updated_at);
    data.data.candidate.remote_created_at = new Date(data.data.candidate.remote_created_at);
    data.data.candidate.remote_updated_at = new Date(data.data.candidate.remote_updated_at);
    data.data.candidate.changed_at = new Date(data.data.candidate.changed_at);
    data.data.candidate.remote_deleted_at = new Date(data.data.candidate.remote_deleted_at);
    return data.data.candidate;
    return data.data;
    return data;
};
export const postAtsJobsJobIdApplicationsResponseTransformer = async (data) => {
    data = postAtsJobsJobIdApplicationsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsUsersSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsUsersResponseTransformer = async (data) => {
    data = getAtsUsersSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsOffersSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.employment_start_date = new Date(item.employment_start_date);
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        item.remote_created_at = new Date(item.remote_created_at);
        item.remote_updated_at = new Date(item.remote_updated_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsOffersResponseTransformer = async (data) => {
    data = getAtsOffersSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAtsRejectionReasonsSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.results = data.data.results.map((item) => {
        item.changed_at = new Date(item.changed_at);
        item.remote_deleted_at = new Date(item.remote_deleted_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAtsRejectionReasonsResponseTransformer = async (data) => {
    data = getAtsRejectionReasonsSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getAssessmentPackagesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.packages = data.data.packages.map((item) => {
        item.updated_at = new Date(item.updated_at);
        return item;
    });
    return data.data;
    return data;
};
export const getAssessmentPackagesResponseTransformer = async (data) => {
    data = getAssessmentPackagesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
const getCustomDatevDataPushesSuccessfulResponseSchemaResponseTransformer = (data) => {
    data.data.data_pushes = data.data.data_pushes.map((item) => {
        item.created_at = new Date(item.created_at);
        return item;
    });
    return data.data;
    return data;
};
export const getCustomDatevDataPushesResponseTransformer = async (data) => {
    data = getCustomDatevDataPushesSuccessfulResponseSchemaResponseTransformer(data);
    return data;
};
//# sourceMappingURL=transformers.gen.js.map