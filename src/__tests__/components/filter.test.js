import React from 'react';
import {
    render,
    screen
  } from '@testing-library/react';
import { Filter } from '../../components';
import useFilter from '../../hooks/useFilter';

jest.mock('../../hooks/useFilter', () => jest.fn(() => ({
    setSearchType: () => {},
    searchByFilters: () => {},
})));

  const renderComponent = () => {
    return render(<Filter/>)
  }

describe('filter component', () => {
    it('should render filter', () => {
        useFilter.mockResolvedValue({
            setSearchType: () => {},
            searchByFilters: () => {},
        })
        renderComponent();
        const input = screen.findByPlaceholderText("Nombre del artista");
        const btn = screen.findByText("Buscar");
        expect(input).toBeDefined();
        expect(btn).toBeDefined();
    });
});
