import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Typeahead from '@/components/ui/Typeahead';

const options = [
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' }
];

describe('Typeahead', () => {
  it('renders with all options initially', () => {
    render(
      <Typeahead
        options={options}
        value=""
        onChange={() => { }}
        placeholder="Select country"
      />
    );

    expect(screen.getByPlaceholderText('Select country')).toBeInTheDocument();
  });

  it('filters options based on query', async () => {
    render(
      <Typeahead
        options={options}
        value=""
        onChange={() => { }}
        placeholder="Search"
      />
    );

    const input = screen.getByPlaceholderText('Search');
    await userEvent.type(input, 'ger');

    const option = await screen.findByText('Germany');
    expect(option).toBeInTheDocument();

    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  it('selects an option and calls onChange', async () => {
    const handleChange = jest.fn();

    render(
      <Typeahead
        options={options}
        value=""
        onChange={handleChange}
        placeholder="Country"
      />
    );

    const input = screen.getByPlaceholderText('Country');
    await userEvent.type(input, 'fra');

    const franceOption = await screen.findByText('France');
    await userEvent.click(franceOption);

    expect(handleChange).toHaveBeenCalledWith('fr');
  });

  it('does not show dropdown if no match is found', async () => {
    render(
      <Typeahead
        options={options}
        value=""
        onChange={() => { }}
        placeholder="Search"
      />
    );

    const input = screen.getByPlaceholderText('Search');
    await userEvent.type(input, 'xyz');

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
