import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { categoriesReducer } from './categories/categories.reducer'
import { notificationsReducer } from './notifications/notifications.reducer'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    notifications: notificationsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
