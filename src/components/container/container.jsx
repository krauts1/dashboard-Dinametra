import React from 'react';
import useNewReleases from '../../hooks/useNewReleases';
import useArtist from '../../hooks/useArtist';
import { Chart, Filter } from '../';
import { message } from 'antd';
import './style.scss';

const Container = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { newReleases } = useNewReleases({messageApi});
    const {
        artistDataChart,
        artistData,
        radarChartData
    } = useArtist();

    return (
        <div className='general-container'>
            <div className='general-container_charts'>
                {contextHolder}
                <Filter messageApi={messageApi}/>
                <img
                    src={artistData?.image?.url}
                    width={100}
                    className='img-artist'
                />
                <Chart options={artistDataChart} />
                <Chart options={radarChartData}/>
                <Chart options={newReleases} />
            </div>
        </div>
    )
}
export default Container;
