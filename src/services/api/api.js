import headers from './headers';
import { formatBodyUrlEncoded } from '../../utils/format';
import {
    clientID,
    clientSecret,
    autenticationUrl,
    urlAPI
} from '../../constants/api-constants';

const api = {
    autentication: {
        getToken() {
            var details = {
                'grant_type': 'client_credentials',
                'client_id': clientID,
                'client_secret': clientSecret
            };
            const url = `${autenticationUrl}/api/token`;
            headers.post_urlencoded.body = formatBodyUrlEncoded(details);
            return fetch(url, headers.post_urlencoded);
        },
    },
    tracks: {
        newReleases(token) {
            const url = `${urlAPI}/browse/new-releases`;
            headers.get.headers.authorization = `Bearer ${token}`;
            return fetch(url, headers.get);
        }
    },
    albums: {
        getAlbums(token, ids) {
            const url = `${urlAPI}/albums?ids=${ids}`;
            headers.get.headers.authorization = `Bearer ${token}`;
            return fetch(url, headers.get);
        }
    },
    artis: {
        getArtistByName(token, name) {
            const url = `${urlAPI}/search?q=${name.replaceAll(' ', '+')}&type=artist`;
            headers.get.headers.authorization = `Bearer ${token}`;
            return fetch(url, headers.get);
        }
    }
};

export default api;
