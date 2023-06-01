import { createReducer } from '@reduxjs/toolkit'
import { Notification } from '../../model/notification'
import { createNotification, getNotifications } from './notifications.actions'

interface NotificationState {
  notifications: Notification[]
}

const initialState: NotificationState = {
  notifications: [],
}

export const notificationsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getNotifications.pending, (state) => ({
    ...state,
    notifications: [],
  }))

  builder.addCase(getNotifications.rejected, (state) => ({
    ...state,
    notifications: [],
  }))

  builder.addCase(getNotifications.fulfilled, (state, action) => ({
    ...state,
    notifications: action.payload,
  }))

  builder.addCase(createNotification.fulfilled, (state, action) => ({
    ...state,
    notifications: [...action.payload, ...state.notifications],
  }))
})
