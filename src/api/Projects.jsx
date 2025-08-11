import { apiGet, apiPost, apiPut, apiDelete, apiUpload, createFormData } from './client';

export const getProjects = async (showToast, params) => {
  try {
    return await apiGet('/Console/api/projects/', params);
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to fetch users');
    }
    throw error;
  }
};

export const getSurveys = async (showToast, params) => {
  try {
    return await apiGet('/Survey/api/surveys/by_project', params);
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to fetch users');
    }
    throw error;
  }
};