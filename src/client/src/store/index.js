import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('user_id') || null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
    },
  },
});

export const { setUser, logout } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
