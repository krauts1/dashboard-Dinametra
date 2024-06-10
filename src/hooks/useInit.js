import { useEffect, useContext } from 'react';
import { getToken } from '../services/provider/autentication';
import { setState } from '../store/actions';
import DashboardContext from '../contexts/generalContext';

export default function useInit(){
    const [, dispatch] = useContext(DashboardContext);
    
    const getData = async () => {
        const token = await getToken();
        dispatch(setState({token: token.access_token}));
    }

    useEffect(() => {
        getData();
        const intervalId = setInterval(() => {
            getData();
        }, 3580000);
      
        return () => {
          clearInterval(intervalId);
        };
      }, []);
}
