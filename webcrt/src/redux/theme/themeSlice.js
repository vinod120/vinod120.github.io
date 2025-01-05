import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mytheme: 'light',
};

const themeSlice = createSlice({
  name: 'mytheme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mytheme = state.mytheme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
