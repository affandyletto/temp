import { apiGet, apiPost, apiPut, apiDelete, apiUpload, createFormData } from './client';

export const getUsers = async (showToast) => {
  try {
    return await apiGet('/users/');
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to fetch users');
    }
    throw error;
  }
};

export const createUser = async (userData, showToast) => {
  try {
    const result = await apiPost('/User/api/registerUser', userData);
    if (showToast) {
      showToast('success', 'Success', 'User created successfully');
    }
    return result;
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to create user');
    }
    throw error;
  }
};

export const updateUser = async (id, userData, showToast) => {
  try {
    const result = await apiPut(`/users/${id}/`, userData);
    if (showToast) {
      showToast('success', 'Success', 'User updated successfully');
    }
    return result;
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to update user');
    }
    throw error;
  }
};

export const deleteUser = async (id, showToast) => {
  try {
    const result = await apiDelete(`/users/${id}/`);
    if (showToast) {
      showToast('success', 'Success', 'User deleted successfully');
    }
    return result;
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to delete user');
    }
    throw error;
  }
};

export const uploadUserAvatar = async (userId, file, onProgress, showToast) => {
  try {
    const formData = createFormData({
      avatar: file,
      user_id: userId
    });
    
    const result = await apiUpload(`/users/${userId}/avatar/`, formData, onProgress);
    if (showToast) {
      showToast('success', 'Success', 'Avatar uploaded successfully');
    }
    return result;
  } catch (error) {
    if (showToast) {
      showToast('error', 'Error', 'Failed to upload avatar');
    }
    throw error;
  }
};