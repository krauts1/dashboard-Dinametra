import api from '../api/api';

export const getToken = async () =>
    api.autentication
        .getToken()
        .then(async (response) => {
            return await response.json();
        })
        .catch((error) => ({ error }));

export default getToken;
