import { render, screen } from '@testing-library/react';
import App from './App';

// Test 1: App එකේ නම 
test('renders Estate Agent App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Estate Agent App/i);
  expect(headerElement).toBeInTheDocument();
});

// Test 2: Search Bar 
test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search properties.../i);
  expect(searchInput).toBeInTheDocument();
});

// Test 3: Properties list
test('renders Latest Properties heading', () => {
  render(<App />);
  const subHeader = screen.getByText(/Latest Properties/i);
  expect(subHeader).toBeInTheDocument();
});

// Test 4: Favorites Button
test('renders Add to Favorites buttons', () => {
  render(<App />);
  const favButtons = screen.getAllByText(/Add to Favorites/i);
  // Buttons
  expect(favButtons.length).toBeGreaterThan(0);
});

// Test 5: footer
test('renders Footer section', () => {
  render(<App />);
  const footerLink = screen.getByText(/Quick Links/i);
  expect(footerLink).toBeInTheDocument();
});