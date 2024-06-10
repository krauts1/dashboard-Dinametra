import { useContext, useCallback } from 'react';
import { setFilter, setState } from '../store/actions';
import DashboardContext from '../contexts/generalContext';
import { getArtistByName } from '../services/provider/artist';

export default function useFilter({messageApi}){
    const [state, dispatch] = useContext(DashboardContext);
    const { filters, token } = state;
    const setSearchType = useCallback((name, type) => {
        dispatch(setFilter({[type]: name}))
    }, []);
    
    const searchByFilters = useCallback(async () => {
        try {
            const { artists } = await getArtistByName(token, filters.artistName);
            if(artists && artists?.items.length > 0){
                dispatch(setState({
                    artistData: {
                        name: artists?.items[0].name,
                        followers: artists?.items[0].followers.total,
                        popularity: artists?.items[0].popularity,
                        image: artists?.items[0]?.images[0],
                        genres: artists?.items[0]?.genres
                    }
                }))
            }else {
                messageApi.open({
                    type: 'error',
                    content: 'Error al obtener la información',
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Error al obtener la información',
            });
        }
    }, [filters, token]);

    return {
        setSearchType,
        searchByFilters
    }
}
