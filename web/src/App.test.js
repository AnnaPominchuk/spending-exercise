import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/Header';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Form from './components/Loader';
import FiltersAndOrderings from './components/FiltersAndOrderings';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Layout renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Layout />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Loader renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loader />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Header renders correctly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  expect(div.querySelector('h1').textContent).toBe('Spendings');
  ReactDOM.unmountComponentAtNode(div);
});

it('Form renders correctly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Form />, div);

  expect(div.querySelector('InputStyles[name="description"]')).toBeDefined();
  expect(div.querySelector('InputStyles[name="amount"]')).toBeDefined();
  expect(div.querySelector('InputStyles[name="currency"]')).toBeDefined();
  expect(div.querySelector('InputStyles[type="submit"]')).toBeDefined();
  
  ReactDOM.unmountComponentAtNode(div);
});

it('FiltersAndOrderings renders correctly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FiltersAndOrderings />, div);

  expect(div.querySelector('CurrencyFilters[name="HUF"]')).toBeDefined();
  expect(div.querySelector('CurrencyFilters[name="USD"]')).toBeDefined();

  ReactDOM.unmountComponentAtNode(div);
});

