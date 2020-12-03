import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerList from './PlayersList';

test('Con un Array di Player vuoto renderizza un testo di default', () => {
    render(<PlayerList players={[]} />);
    const resultElement = screen.getByText(/No player was found/i);
    expect(resultElement).toBeInTheDocument();
});
