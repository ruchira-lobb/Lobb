// src/components/__tests__/TopBar.test.tsx

// ----- Mocks (must be before imports) -----
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('../../hooks/useMeals', () => ({
  useMeals: () => ({
    meals: [],
    loading: false,
    error: null,
    fetchMore: jest.fn(),
    refresh: jest.fn(),
    updateQuery: jest.fn(),
    totalCount: 0,
  }),
}));

// Mock axios just in case the hook is imported elsewhere
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { meals: [] } }),
}));

// ----- Imports -----
import React from 'react';
import { render } from '@testing-library/react-native';
import TopBar from '../../components/TopBar';

// ----- Test -----
test('TopBar renders correctly', () => {
  const { getByTestId } = render(<TopBar />);
  const topBar = getByTestId('top-bar');
  expect(topBar).toBeTruthy();
});
