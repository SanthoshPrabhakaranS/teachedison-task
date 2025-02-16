import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBody from '../ErrorBody';

describe('ErrorBody Component', () => {
  test('renders error body component', () => {
    render(
      <ErrorBody Icon={<span>Icon</span>} description='Something went wrong' />
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
