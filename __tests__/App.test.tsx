/**
 * @format
 */
// __tests__/App.test.tsx

// Mock external modules before importing the component under test
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { meals: [] } }),
}));

jest.mock('../src/hooks/useMeals', () => ({
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

// Prevent navigation stack components from rendering real screens
jest.mock('../src/navigation/BottomTabNavigator', () => () => null);
jest.mock('../src/screens/InfoScreen', () => () => null);

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<App />);
  });
});
test('renders correctly', async () => {
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<App />);
  });
});
