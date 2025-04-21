import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from '@/components/ui/Accordion';

describe('Accordion component', () => {
  const title = 'Test Section';
  const content = 'Accordion content goes here';
  const toggleMock = jest.fn();

  const setup = (isOpen: boolean = false) =>
    render(
      <Accordion title={title} isOpen={isOpen} onToggle={toggleMock}>
        <div>{content}</div>
      </Accordion>
    );

  beforeEach(() => {
    toggleMock.mockClear();
  });

  it('renders with title and toggle button', () => {
    setup(false);

    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    setup(false);
    fireEvent.click(screen.getByTestId('accordion-toggle'));

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it('shows content when open', () => {
    setup(true);

    expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
    expect(screen.getByText(content)).toBeVisible();
  });

  it('has appropriate aria attributes', () => {
    setup(true);

    const button = screen.getByTestId('accordion-toggle');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', expect.stringContaining('accordion-content'));
  });

  it('hides content when closed', () => {
    setup(false);

    expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument();
  });
});
