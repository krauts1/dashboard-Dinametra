import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';
import useArtist from '../../hooks/useArtist';

const renderUseArtistHook = () => {
    return renderHook(() => useArtist());
};

beforeEach(() => {
    jest.resetModules();
});

afterEach(() => {
    cleanup();
});

describe('useArtist', () => {
    it('return correctly data', () => {
        const contextValue = {
            artistData: {
                name: 'artist test',
                followers: 10000,
                popularity: 75,
                genres: [
                    'rock', 'test'
                ]
            }
        };
        const artistChartMock = {
            title: { text: 'artist test' },
            tooltip: {},
            legend: { data: ['Datos del Artista'] },
            xAxis: { data: ['Seguidores', 'Popularidad'] },
            yAxis: {},
            series: { type: 'bar', data: [10000, 75] }
        };
        const radarDataMock = {
            title: { text: 'Generos', x: 'center' },
            tooltip: {},
            legend: { orient: 'vertical', left: 'left', data: ['rock', 'test'] },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{ value: 50, name: 'rock' }, { value: 50, name: 'test' }],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        jest.spyOn(React, 'useContext').mockImplementation(() => [contextValue]);
        const { result } = renderUseArtistHook();
        expect(result.current.artistDataChart).toEqual(artistChartMock);
        expect(result.current.radarChartData).toEqual(radarDataMock);
        expect(result.current.artistData).toEqual(contextValue.artistData);
    });
});
