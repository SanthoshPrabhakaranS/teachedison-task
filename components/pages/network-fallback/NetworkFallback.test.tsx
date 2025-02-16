import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import NetworkFallback from './NetworkFallback';

jest.mock('../../hooks/useNetworkStatus', () => jest.fn());

jest.mock('lucide-react', () => ({
  CloudAlert: () => <svg data-tesid='cloud-icon'></svg>,
}));

describe('Network Fallback Cpomponent', () => {
  test('renders Network fallback page when online', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue(true);

    render(
      <NetworkFallback>
        <div data-testid='child-content'>Online Content</div>
      </NetworkFallback>
    );

    const element = screen.getByTestId('child-content');
    expect(element).toBeInTheDocument();
  });

  test('renders Network fallback page when offline', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue(false);

    render(
      <NetworkFallback>
        <div>Offline Content</div>
      </NetworkFallback>
    );

    const button = screen.getByRole('button');
    const titleElement = screen.getByTestId('title');
    const descElement = screen.getByTestId('description');

    expect(button).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
