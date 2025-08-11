
import api from "@/api/client"

export const apiGet = (url, params = {}) => {
  return api.get(url, { params });
};

export const apiPost = (url, data = {}) => {
  return api.post(url, data);
};

export const apiPut = (url, data = {}) => {
  return api.put(url, data);
};

export const apiPatch = (url, data = {}) => {
  return api.patch(url, data);
};

export const apiDelete = (url) => {
  return api.delete(url);
};

// Special function for FormData uploads with progress
export const apiUpload = (url, formData, onProgress = null) => {
  return api.post(url, formData, {
    onUploadProgress: onProgress ? (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress(progress);
    } : undefined,
  });
};

export const createFormData = (data) => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    
    if (value instanceof File || value instanceof Blob) {
      // Handle files
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // Handle arrays
      value.forEach((item, index) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(`${key}`, item);
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      // Handle objects (convert to JSON string)
      formData.append(key, JSON.stringify(value));
    } else {
      // Handle primitives
      formData.append(key, value);
    }
  });
  
  return formData;
};