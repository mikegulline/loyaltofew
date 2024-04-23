import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Copyright } from '@/components/Footer/Footer';

test('renders a copyright', () => {
  const { asFragment, getByText } = render(<Copyright />);
  expect(getByText('Loyal to Few®')).toBeInTheDocument();
});
