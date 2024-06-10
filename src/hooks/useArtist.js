import { useMemo, useContext } from 'react';
import DashboardContext from '../contexts/generalContext';

export default function useNewReleases() {

    const [state, ] = useContext(DashboardContext);
    const {
        artistData
    } = state;

    const artistDataChart = useMemo(() =>  ({
            title: {
                text: artistData?.name
            },
            tooltip: {},
            legend: {
                data: ['Datos del Artista']
            },
            xAxis: {
                data: ['Seguidores', 'Popularidad']
            },
            yAxis: {},
            series: {
                type: 'bar',
                data: [
                    artistData?.followers,
                    artistData?.popularity, 
                ]
            }
        })
    , [artistData]);

    const radarChartData = useMemo(() => ({
        title: {
            text: 'Generos',
            x:'center'
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data: artistData?.genres
          },
          series : [
            {
            name: '',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: artistData?.genres?.map(genre => {
                const value = 100 / artistData?.genres.length
                return {
                    value, 
                    name: genre
                }
            }),
            itemStyle: {
              emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
            }
          ]
    }), [artistData])

    return {
        artistDataChart,
        artistData,
        radarChartData
    }
}
