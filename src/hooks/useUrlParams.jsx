// hooks/useUrlParams.js
import { useState, useEffect } from 'react';

export const useUrlParams = () => {
  const [urlParams, setUrlParams] = useState({});

  const checkUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const paramsObj = {};
    
    for (const [key, value] of params.entries()) {
      paramsObj[key] = value;
    }
    
    setUrlParams(paramsObj);
  };

  useEffect(() => {
    // Check on initial load
    checkUrlParams();
    
    // Listen for URL changes
    const handleUrlChange = () => {
      console.info("URL CHANGE");
      // Add a small delay to ensure the URL has been updated
      setTimeout(() => {
        checkUrlParams();
      }, 0);
    };
    
    window.addEventListener('urlchange', handleUrlChange);
    
    return () => {
      window.removeEventListener('urlchange', handleUrlChange);
    };
  }, []);

  const toggleParameter = (param, value) => {
    const url = new URL(window.location);
    const urlParams = url.searchParams;
    
    if (urlParams.has(param) && urlParams.get(param) === value) {
      // Remove the parameter
      urlParams.delete(param);
    } else {
      // Add the parameter
      urlParams.set(param, value);
    }
    window.dispatchEvent(new Event('urlchange'));
    window.history.pushState({}, '', url.toString());
  };

  const getParam = (param) => {
    return urlParams[param] || null;
  };

  const hasParam = (param, value = null) => {
    if (value === null) {
      return param in urlParams;
    }
    return urlParams[param] === value;
  };

  return {
    urlParams,
    toggleParameter,
    getParam,
    hasParam
  };
};