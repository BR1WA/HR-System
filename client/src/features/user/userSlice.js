// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
  },
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { addEmail } = userSlice.actions;
export default userSlice.reducer;
