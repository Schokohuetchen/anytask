export const setToken = (token: string) => {
  localStorage.setItem('authToken', JSON.stringify(token));
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};

export const getAccessToken = () => localStorage.getItem('authToken')?.slice(1, -1);
