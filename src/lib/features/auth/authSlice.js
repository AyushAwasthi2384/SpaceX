import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  userData: null,
  isLoading: false,
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await fetch('/api/getcurrentuser');
  const data = await response.json();
  if (data.success) {
    return data.data;
  } else {
    throw new Error('Unauthorized or user not found');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = false;
        state.userData = null;
        state.isLoading = false;
      });
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;