import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Container';

test('renders Container component', () => {
  render(
    <Container>
      <div>Hello</div>
    </Container>
  );
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
