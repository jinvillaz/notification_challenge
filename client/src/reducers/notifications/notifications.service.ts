import axios from 'axios'
import { Notification } from '../../model/notification'

const api = process.env.REACT_APP_API_URL + '/notifications'

class NotificationService {
  async getAll(): Promise<Notification[]> {
    const { data } = await axios.get(api)
    return data
  }

  async create(body: any): Promise<Notification[]> {
    const { data } = await axios.post(api, body)
    return data
  }
}

export const notificationService = new NotificationService()
