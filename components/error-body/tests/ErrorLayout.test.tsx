import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorLayout from '../ErrorLayout';

jest.mock('lucide-react', () => ({
  WifiOff: () => <svg data-testid='wifi-off-icon'></svg>,
  SearchX: () => <svg data-testid='search-x-icon'></svg>,
  ServerOff: () => <svg data-testid='server-off-icon'></svg>,
}));

describe('ErrorLayout Component', () => {
  test('renders ErrorLayout component with description', () => {
    render(<ErrorLayout description='Error' />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('renders default error message when error message is unknown', () => {
    render(
      <ErrorLayout description='Error' error={{ message: 'Unknown error' }} />
    );
    expect(screen.getByText('Something went Wrong')).toBeInTheDocument();
  });

  test('renders refresh button', () => {
    render(<ErrorLayout description='Error' />);
    const refreshBtn = screen.getByText('Refresh');

    expect(refreshBtn).toBeInTheDocument();
  });
});
