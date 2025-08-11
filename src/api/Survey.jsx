import { apiGet, apiPost, apiPut, apiDelete, apiUpload, createFormData, apiPatch } from './client';

export const getSurveyDetail = async (showToast, id) => {
  try {
    return await apiGet(`/Survey/api/survey/${id}`);
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to fetch users');
    }
    throw error;
  }
};

// In your API service file
export const addIconPicture = async (iconId, pictureData, onProgress = null) => {
  const formData = createFormData(pictureData);
  return await apiUpload(`/Survey/api/icons/${iconId}/add_picture/`, formData, onProgress);
};

export const updateIconApi = async (iconId, data) => {
  return await apiPatch(`/Survey/api/icons/${iconId}/`, data);
};