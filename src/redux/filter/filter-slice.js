import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};
const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState.filter,
  reducers: {
    toFilter: (store, { payload }) => (store = payload),
  },
});

export const { toFilter } = filterSlice.actions;
export default filterSlice.reducer;
