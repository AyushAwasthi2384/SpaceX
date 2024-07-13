import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
    }
  })
}