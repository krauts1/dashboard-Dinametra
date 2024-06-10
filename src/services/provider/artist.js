import api from '../api/api';

export const getArtistByName = async (token, name) =>
    api.artis
        .getArtistByName(token, name)
        .then(async (response) => {
            return await response.json();
        })
        .catch((error) => ({ error }));

export default getArtistByName;
