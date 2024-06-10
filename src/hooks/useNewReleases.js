import { useMemo, useEffect, useCallback, useContext } from 'react';
import DashboardContext from '../contexts/generalContext';
import { getNewReleases } from '../services/provider/tracks';
import { getAlbums } from '../services/provider/albums';
import { setState } from '../store/actions';

export default function useNewReleases({ messageApi }) {
    const [state, dispatch] = useContext(DashboardContext);
    const {
        token,
        newReleasesItems,
        albumsNewReleases
    } = state;

    const newReleases = useMemo(() => {
        let options = {
            title: {
                text: 'Nuevos lanzamientos Spotify'
            },
            tooltip: {},
            legend: {
                data: ['Duración por lanzamiento']
            },
            xAxis: {
                data: [],
                show: false
            },
            yAxis: {},
        }
        let data = [];
        albumsNewReleases.forEach(item => {
            let duration = 0;
            const dataArtist = item?.artists?.map(artist => artist.name);
            options.xAxis.data.push(`${item.name} - ${dataArtist.join('/')}`);
            item.tracks.items.forEach(track => {
                duration += Math.round(track.duration_ms / 60000);
            });
            data.push(duration);
        });
        options['series'] = [{
            name: 'minutos',
            type: 'bar',
            data
        }];
        return options;
    }, [newReleasesItems, albumsNewReleases, token]);

    const getNewReleasesData = useCallback(async () => {
        try {
            if (token) {
                const { albums } = await getNewReleases(token);
                const idsTracks = albums.items.map(item => item.id).join();
                const resultAlbums = await getAlbums(token, idsTracks);
                dispatch(setState({
                    newReleasesItems: albums?.items,
                    albumsNewReleases: resultAlbums?.albums
                }));
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Error al obtener la información',
            });
        }
    }, [token, messageApi]);

    useEffect(() => {
        getNewReleasesData();
    }, [token, messageApi]);

    return {
        newReleases
    }
}
