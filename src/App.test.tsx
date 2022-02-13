import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";

test('renders learn react link', () => {
  render(<Provider store={store}><App /></Provider>);
  expect(screen.getByText(/RADAR Geo Helper/i)).toBeInTheDocument()
  expect(screen.getByText(/WEATHER APP/i)).toBeInTheDocument()
  expect(screen.getByRole('button',{name: 'Search'})).toBeInTheDocument()
});
