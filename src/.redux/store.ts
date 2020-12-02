import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../types';

type SelectedPlayer = {
    selectedPlayer: Player;
};

const initialState: SelectedPlayer = {
    selectedPlayer: {
        id: 0,
        first_name: 'N/D',
        last_name: 'N/D',
        position: '',
        height_feet: undefined,
        height_inches: undefined,
        weight_pounds: undefined,
        team: undefined,
    },
};

export type { SelectedPlayer };

const playerSlice = createSlice({
    name: 'selectedPlayer',
    initialState,
    reducers: {
        playerSelected: (
            state: SelectedPlayer,
            action: PayloadAction<Player>
        ) => {
            // Redux Toolkit usa Immer come libreria per produrre stati immutabili,
            // l'assegnamento qui non muta direttamente lo stato
            state.selectedPlayer = action.payload;
        },
    },
});

export const { playerSelected } = playerSlice.actions;

const store = configureStore({
    reducer: playerSlice.reducer,
});

export default store;
