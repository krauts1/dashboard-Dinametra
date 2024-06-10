import api from '../api/api';

export const getNewReleases = async (token) =>
    api.tracks
        .newReleases(token)
        .then(async (response) => {
            return await response.json();
        })
        .catch((error) => ({ error }));

export default getNewReleases;
