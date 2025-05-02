import axios from 'axios';

let isInterceptorSet = false;

const setupInterceptors = (navigate) => {
  if (isInterceptorSet) return;

  axios.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        console.error("Connection lost. Logging out.");
        localStorage.clear();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  isInterceptorSet = true;
};

export default setupInterceptors;
