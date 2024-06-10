import api from '../api/api';

export const getAlbums = async (token, ids) =>
    api.albums
        .getAlbums(token, ids)
        .then(async (response) => {
            return await response.json();
        })
        .catch((error) => ({ error }));

export default getAlbums;
