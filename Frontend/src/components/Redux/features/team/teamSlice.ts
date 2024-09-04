import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TTeam = {
  name: string;
  role: string;
  contact: string;
};

type TItemState = {
  teams: TTeam[];
};

const initialState: TItemState = {
  teams: [],
};

export const teamSlice = createSlice({
  name: 'addTeam',
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<TTeam | TTeam[]>) => {
      const values = action.payload;

      // Check if payload is an array and concatenate, otherwise push single item
      if (Array.isArray(values)) {
        state.teams = [...state.teams, ...values];
      } else {
        state.teams.push(values);
      }
    },
  },
});

export const { addTeam } = teamSlice.actions;
export default teamSlice.reducer;
