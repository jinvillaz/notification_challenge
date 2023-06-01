import { createAsyncThunk } from '@reduxjs/toolkit'
import { notificationService } from './notifications.service'
import { Notification } from '../../model/notification'

export const getNotifications = createAsyncThunk<Notification[]>(
  'notifications/getNotifications',
  async (): Promise<Notification[]> => {
    return await notificationService.getAll()
  },
)

export const createNotification = createAsyncThunk<Notification[], any>(
  'notifications/createNotification',
  async (data: any): Promise<Notification[]> => {
    return await notificationService.create(data)
  },
)
